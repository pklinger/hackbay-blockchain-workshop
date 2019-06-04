App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load Slots from Contract
      var slotRow = $('#slotRow');
      var slotTemplate = $('#slotTemplate');

      // get slot size from contract
      for (var i = 0; i < 6; i++) {
        slotTemplate.find('.slot-number').text(i);
        slotTemplate.find('.btn-slot').attr('id', i);

        slotRow.append(slotTemplate.html());
      }

    return App.initWeb3();
  },

  initWeb3: async function() {
      window.web3 = new Web3(ethereum);
      try {
          await ethereum.enable();
      } catch (error) {
          console.log(error);
      }

      if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
      } else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      web3 = new Web3(App.web3Provider);

      $('#account').text(' loaded: \'' + web3.eth.defaultAccount + '\'');
      $('#accountBalance').text(App.getAccountBalance(web3.eth.defaultAccount));

      return App.initContract();
  },

  initContract: function() {
      $.getJSON('SmartLottery.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var SmartLotteryArtifact = data;
          App.contracts.SmartLottery = TruffleContract(SmartLotteryArtifact);

          App.contracts.SmartLottery.setProvider(App.web3Provider);

          return App.getContractAddress(), App.getAdminAddress(), App.getSoldSlots(), App.getSlotPrice(), App.markSlotsSold();
      });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-slot', App.makeBet);
  },

  getContractAddress: function() {
      var smartLotteryInstance;

      App.contracts.SmartLottery.deployed().then(function(instance) {
          smartLotteryInstance = instance;
          return smartLotteryInstance.address;
      }).then(function(address)  {
          $('.contractAtAddress').text('at \'' + address+ '\'');
      }).catch(function(err) {
          console.log(err.message);
      });
  },

  getAdminAddress: function() {
     var smartLotteryInstance;

     App.contracts.SmartLottery.deployed().then(function(instance) {
        smartLotteryInstance = instance;
        return smartLotteryInstance.admin();
     }).then(function(admin)  {
        $('#adminAddress').text(admin);
     }).catch(function(err) {
        console.log(err.message);
     });
  },

  getSoldSlots: function() {
        var smartLotteryInstance;

        App.contracts.SmartLottery.deployed().then(function(instance) {
            smartLotteryInstance = instance;
            return smartLotteryInstance.soldSlots();
        }).then(function(slotsSold)  {
            $('#slotsSold').text(slotsSold);
        }).catch(function(err) {
            console.log(err.message);
        });
  },

  getSlotPrice: function() {
        var smartLotteryInstance;

        App.contracts.SmartLottery.deployed().then(function(instance) {
            smartLotteryInstance = instance;
            return smartLotteryInstance.slotPrice();
        }).then(function(slotPrice)  {
            $('#slotPrice').text(slotPrice + ' wei');
        }).catch(function(err) {
            console.log(err.message);
        });
  },

  markSlotsSold: function() {
      var smartLotteryInstance;

      App.contracts.SmartLottery.deployed().then(function(instance) {
          smartLotteryInstance = instance;
          return smartLotteryInstance.getParticipants.call();
      }).then(function(participants)  {

          console.log(participants);

          for (var i = 0; i < participants.length; i++) {
              // 0x0000000000000000000000000000000000000000 empty address
              if (participants[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-slot').eq(i).find('.participant').text(participants[i].substr(0,40)+'...');
                  $('.panel-slot').eq(i).addClass('sold');
                  $('.outerSlot').eq(i).find('.corner').removeClass('invisible');
                  $('.panel-slot').eq(i).find('button').addClass('invisible');
              }
          }
      }).catch(function(err) {
          console.log(err.message);
      });
  },

  getAccountBalance: function(address) {
      web3.eth.getBalance(address, 'latest', function(err, result) {
          if (err) {
              console.error("Something went wrong." + err);
          }
          var balance = Number(web3.fromWei(result, "ether"));
          $('#accountBalance').text(balance.valueOf() + ' ether');

      });
  },

  makeBet: function(event) {
    var slotId = parseInt($(event.target).attr('id'));
      var smartLotteryInstance;
      web3.eth.getAccounts(function(error, accounts) {
          var account = accounts[0];
          App.contracts.SmartLottery.deployed().then(function(instance) {
              smartLotteryInstance = instance;
              console.log(smartLotteryInstance);
              var ret = smartLotteryInstance.bet(slotId, {from: account, value: 1000000000000000000});
              console.log(ret);
              return ret;

          }).then(function(result) {
              console.log("Result");
              console.log(result);
              return App.markSlotsSold();
          }).catch(function(err) {
              console.log(err.message);
          });
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

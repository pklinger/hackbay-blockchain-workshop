var SmartLottery = artifacts.require("./SmartLottery.sol");

var log = console.log;

contract('Smart Lottery', function(accounts) {

    describe('Smart Lottery walkthrough', function() {

        var lotteryContract = null;
        var participants = [
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000'
        ];

        before(function(done) {
            SmartLottery.new({
                from: accounts[0]
            })
                .catch(log)
                .then(function(contract) {
                    lotteryContract = contract;
                })
                .then(done);
        });

        /*
         * Initialization Tests definition
         */
        function testSmartLotteryInitialization() {

            it("should have initialized SmartLottery", function() {
                assert.notEqual(lotteryContract, null);
            });


            it("should be empty in the beginning", function() {
                return lotteryContract.getParticipants.call()
                    .then(function(result) {
                        assert.deepEqual(result, participants, "there are already participants in the lottery.");
                    });
            });
        }

        /*
         * Running the tests as defined above
         */

        testSmartLotteryInitialization();


        /*
         * Smart Contract Functionality Tests
         */

        describe('Smart Contract functionality', function() {

            it("should be able to set a bet", function() {
                return lotteryContract.bet(0, {
                    from: accounts[0],
                    value: web3.toWei(1, "ether")
                })
                    .then(function(tx) {
                        assert.isOk(tx.receipt);
                    });
            });

            it("should have a participant", function() {
                return lotteryContract.getParticipants.call()
                    .then(function(result) {
                        var tempParticipants = participants.slice();
                        tempParticipants[0] = accounts[0];
                        assert.deepEqual(result, tempParticipants, "participants not as expected");
                    });
            });

            it("should pay for slot", function() {

                var beforeTest = web3.fromWei(web3.eth.getBalance(accounts[0])).toString(10);
                var afterTest = null;

                lotteryContract.bet(1, {
                    from: accounts[0],
                    value: web3.toWei(1, "ether")
                })
                .then(function(tx) {
                    afterTest = web3.fromWei(web3.eth.getBalance(accounts[0])).toString(10);
                    console.log("After: " + afterTest);
                    assert.isOk(tx.receipt);
                });

                return assert(afterTest < beforeTest, "did not pay for slot");
            });

            it("should distribute pot after winning", function() {

                // fill further slots
                return lotteryContract.bet(2, {
                    from: accounts[0],
                    value: web3.toWei(1, "ether")
                })
                    .then(function() {
                        return lotteryContract.bet(3, {
                            from: accounts[0],
                            value: web3.toWei(1, "ether")
                        })
                    }).then(function() {
                        return lotteryContract.bet(4, {
                            from: accounts[0],
                            value: web3.toWei(1, "ether")
                        })
                    }).then(function() {
                        return lotteryContract.getPotValue();
                    }).then(function(result) {
                        // there should be ether in the contract
                        assert.equal(result.toNumber(), web3.toWei(5, "ether"), "Pot is not empty.");
                    }).then(function() {
                        // the last slot will get all ether in the contract
                        return lotteryContract.bet(5, {
                            from: accounts[0],
                            value: web3.toWei(1, "ether")
                        })
                    }).then(function() {
                        return lotteryContract.getPotValue();
                    }).then(function(result) {
                        // and the contract is empty again
                        assert.equal(result, 0, "Pot is empty.");
                    });

            });

            it("should reset the lottery after winner was chosen", function() {
                return lotteryContract.getParticipants.call()
                    .then(function(result) {
                        assert.deepEqual(result, participants, "there should not be any participants");
                        return lotteryContract.soldSlots.call();
                    }).then(function(result) {
                        assert.equal(result.toNumber(), 0, "there should not be any participants");
                    });
            });

        });

    });
});

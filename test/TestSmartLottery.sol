pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SmartLottery.sol";

contract TestSmartLottery {

    SmartLottery smartLottery = SmartLottery(DeployedAddresses.SmartLottery());

    // Testing the bet() function
    // SmartLottery.deployed().then(function(instance){return instance.bet(5, {from: web3.eth.accounts[0], value: 1000000000000000000});})
    // SmartLottery.at("0x66078a97def9d40b2ca7abb44733dd897ec6231d").then(function(instance){return instance.bet(5, {from: web3.eth.accounts[0], value: 1000000000000000000});})

    /*
    function testBet() public {
        uint returnedId = smartLottery.bet.value(1000000000000000000)(4);

        uint expected = 4;

        Assert.equal(returnedId, expected, "Bet should be recorded as 4");
    }
    */
    /*
    // Testing writing of address
    function testGetAdopterAddressByPetId() public {
        address expected = this;

        address participant = smartLottery.getParticipantById(4);

        Assert.equal(participant, expected, "Bet address of slot ID 4 should be recorded.");
    }

    // Testing retrieval of all pet owners
    function testGetParticipants() public {
        // Expected owner is this contract
        address expected = this;

        // Store adopters in memory rather than contract's storage
        //address[6] memory participants = smartLottery.getParticipants();
        //address[6] memory participants = smartLottery.getParticipants();
        address[6] memory participants = smartLottery.getParticipants();


    Assert.equal(participants[4], expected, "Owner of slot ID 4 should be recorded.");
    }
    */

}

pragma solidity ^0.5.1;

contract SmartLottery {
    /*
     * Contract parameters & fields
     */
    uint public constant slotSize = 6;
    uint public constant slotPrice = 1 ether; // 1000000000000000000 wei
    uint public soldSlots = 0;

    address payable[6] public slots;
    address public admin;

    /* Contract constructor */
    constructor() public {
        admin = msg.sender;
    }

    /* Modifiers */
    modifier adminOnly {
        require(msg.sender == admin);
        _;
    }

    /*
     * Contract functions
     */
    function bet(uint slotId) payable public returns (uint) {
        require(slotId >= 0 && slotId < slotSize);
        require(slots[slotId] == address(0));
        require(msg.value == slotPrice);

        slots[slotId] = msg.sender;
        soldSlots = soldSlots + 1;

        if (soldSlots >= slotSize) {
            pickWinner();
        }

        return slotId;
    }

    function getParticipants() public view returns (address payable[6] memory) {
        return slots;
    }

    function getParticipantById(uint slotId) public view returns (address) {
        return slots[slotId];
    }

    function pickWinner() private returns (address) { // only callable from this contract
        // pick winner
        uint winnerSlot = badRandomFunction();
        address payable winner = slots[winnerSlot];

        // send pot to winner
        winner.transfer(address(this).balance);

        // reset SmartLottery for next run
        resetSmartLottery();
        return winner;
    }

    function getPotValue() public view returns (uint256) {
        return address(this).balance;
    }

    function resetSmartLottery() private {
        delete soldSlots;
        delete slots;
    }

    function resetSmartLotteryManual() public adminOnly {
        // give people their money back
        for(uint i = 0; i < soldSlots; i++) {
            slots[i].transfer(slotPrice);
        }
        // reset variables
        resetSmartLottery();
    }

    function badRandomFunction() public view returns (uint) {
        // bad example, better use: https://gist.github.com/alexvandesande/259b4ffb581493ec0a1c
        return uint(keccak256(abi.encodePacked(soldSlots, block.timestamp))) % slotSize;
    }

    /* Fallback function, if other functions don't match */
    function() external {
        revert();
    }

}

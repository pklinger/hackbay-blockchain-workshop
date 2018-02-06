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
        // code missing here
    }

    /* Modifiers */
    modifier adminOnly {
        // code missing here
        _;
    }

    /*
     * Contract functions
     */
    function bet(uint slotId) payable public returns (uint) {
        // code missing here
    }

    function getParticipants() public view returns (address[6] memory) {
        // code missing here
    }

    function getParticipantById(uint slotId) public view returns (address) {
        // code missing here
    }

    function pickWinner() private returns (address) { // only callable from this contract
        // code missing here
    }

    function getPotValue() public view returns (uint256) {
        // code missing here
    }

    function resetSmartLottery() private {
        // code missing here
    }

    function resetSmartLotteryManual() public adminOnly {
        // code missing here
    }

    function badRandomFunction() public view returns (uint) {
        // code missing here
    }

    /* Fallback function, if other functions don't match */
    function() external {
        revert();
    }

}

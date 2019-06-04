var SmartLottery = artifacts.require("./SmartLottery.sol");

var log = console.log;

contract('Smart Lottery', function (accounts) {

    describe('Smart Lottery walkthrough', async () => {

        var lotteryContract = null;
        var participants = [
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000'
        ];

        before(function (done) {
            SmartLottery.new({
                from: accounts[0]
            })
                .catch(log)
                .then(function (contract) {
                    lotteryContract = contract;
                })
                .then(done);
        });

        /*
         * Initialization Tests definition
         */
        function testSmartLotteryInitialization() {

            it("should have initialized SmartLottery", function () {
                assert.notEqual(lotteryContract, null);
            });


            it("should be empty in the beginning", function () {
                return lotteryContract.getParticipants.call()
                    .then(function (result) {
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

        describe('Smart Contract functionality', async () => {

            it("should be able to set a bet", async () => {

                var tx = await lotteryContract.bet(0, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });

                return assert.isOk(tx.receipt);

            });

            it("should have a participant", async () => {
                var participants = await lotteryContract.getParticipants.call();

                var tempParticipants = participants.slice();
                tempParticipants[0] = accounts[0];
                return assert.deepEqual(participants, tempParticipants, "participants not as expected");

            });

            it("should pay for slot", async () => {

                var beforeBalance = await web3.eth.getBalance(accounts[0]);

                var beforeTest = await web3.utils.fromWei(beforeBalance.toString());

                var tx = await lotteryContract.bet(1, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });
                assert.isOk(tx.receipt);

                var afterBalance = await web3.eth.getBalance(accounts[0]);
                var afterTest = await web3.utils.fromWei(afterBalance.toString());

                return assert(afterTest < beforeTest, "did not pay for slot");
            });

            it("should distribute pot after winning", async () => {

                // fill further slots
                await lotteryContract.bet(2, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });

                await lotteryContract.bet(3, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });

                await lotteryContract.bet(4, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });


                var potValue = await lotteryContract.getPotValue();
                assert.equal(potValue, web3.utils.toWei("5", "ether"), "Pot is not empty.");

                await lotteryContract.bet(5, {
                    from: accounts[0],
                    value: web3.utils.toWei("1", "ether")
                });


                var newPotValue = await lotteryContract.getPotValue();
                assert.equal(newPotValue, 0, "Pot is empty.");

            });

            it("should reset the lottery after winner was chosen", async () => {
                var currentParticipants = await lotteryContract.getParticipants.call();
                assert.deepEqual(currentParticipants, participants, "there should not be any participants");

                var soldSlots = await lotteryContract.soldSlots.call();
                assert.equal(soldSlots, 0, "there should not be any participants");
            });

        });

    });
});

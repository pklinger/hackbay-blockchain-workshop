# Smart Contract Workshop

### Development framework truffle

Writing code in Remix is tedious and testing should be automated. For this reason and to facilitate
DApp development, truffle may help as an integrated Smart Contract framework. It describes itself as "a swiss army knive" for Ethereum.

With executing `npm install -g truffle` you already installed truffle and may initialize truffle projects.
This step of initialization `truffle init `is already done, by checking out this branch. You should be able to see the  typical truffle framework folder structure:

```
/contracts/ - Solidity contracts folder
/migrations/ - Contract deployment instructions folder
/test/ - Contract testing folder
/src/ - DApp frontend code folder
truffle.js - Truffle configuration file
package.json - Project info, build instructions and dependencies
```

Run `npm install` inside the `SmartLottery` directory of your branch `stage-testing` to download missing dependencies of the truffle framwork.

### Truffle migrations

Migrations help deploying contracts to a blockchain network. They perform tedious tasks like compiling and detecting deviations in contracts automatically and deploy the contracts on a blockchain as specified by the migration script.
 
For testing or local deployments, these contract migration scripts might seem a little over the top. But keep in mind, that every deployment on a real
network would cost gas/ether and you typically would like to keep costs at a minimum when deploying changing/updating contracts. If in a series of contracts, only one contract needs to be updated, you may define in a migration script, which contracts is affected of changes and only this contract will get updated by the migration script detecting a change in the contract and updating it solely.

The Javascript contract deployment script for the SmartLottery in `/migrations/` looks like this:

```
var SmartLottery = artifacts.require("SmartLottery");

module.exports = function(deployer) {
    deployer.deploy(SmartLottery);
};
```

If your blockchain is running, try running these commands from the base project folder:

1. `truffle compile` to create the contract ABIs in the /build/ folder
2. `truffle migrate` to deploy (existing/unchanged) ABIs to the blockchain network

You may choose which network configuration to choose from when doing a `truffle migrate`.
Have a look at `truffle-config.js` file. There you will find settings for different deployment networks.
All in all, you can find four different deployment configurations for truffle migrate command in `truffle-config.js`.

You should run the migration script with the matching network setting, e.g.: `truffle migrate --network=ganachecli` to deploy on port `8545`. Additionally, you may pass `--reset` to force truffle into redeploying.

The output should be similiar to:

```
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/SmartLottery.sol...

Writing artifacts to ./build/contracts

Using network 'ganachecli'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x4fba34c3ac4b300b3560a242c72d96c81556f52dd13dcb5c6069bd0fa0d22cbe
  Migrations: 0xdcd80c6b752323e74a389e5f638bd7754ad93aa2
Saving successful migration to network...
  ... 0x0714d1ccc5a0a98057f48b9169e3765239f27c136ae6a0b8d32417af2e85dbc2
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying SmartLottery...
  ... 0x6d02d739241d811656000c82232801d7aaddd47852df9552244a4dd06a7db506
  SmartLottery: 0xe81bc4b4bdaa2aa0c10fd0f30d87e507cd91c1c2
Saving artifacts...
```

### Test your contract with truffle test

You successfully wrote your contract? Copy your contract code from Remix into `contracts/SmartLottery.sol`. If your code was incomplete or had bugs, take the code from `/notes/02_SmartLottery.sol` instead.

In `tests/testSmartLottery.js`you can find Javascript tests that make calls and transactions via web3 to test the contract code. They make use of Mocha as a testing framework and Chai assertions, two popular testing frameworks.

Make sure ganache-cli is still working and execute `truffle test` on your command line to execute the given Javascript tests. Again, you may define the network, the tests should be performed under with passing the option flag `--network=<networkname>` alongside `truffle test`. Feel free to change or add more tests.
The command line output should look similiar like this:
```
  Contract: Smart Lottery
    Smart Lottery walkthrough
      ✓ should have initialized SmartLottery
      ✓ should be empty in the beginning (91ms)
    Smart Contract functionality
      ✓ should be able to set a bet (77ms)
      ✓ should have a participant (41ms)
      ✓ should pay for slot (262ms)
      ✓ should distribute pot after winning (487ms)
      ✓ should reset the lottery after winner was chosen (53ms)

  7 passing (1s)
```

### Congratulations!

You may now start with developing the matching frontend application to your contract.
To progress to the next part, inside the project directory, type `git checkout stage-frontend` and have a look at the instructions in  the readme file.

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

    /*
     * for usage with Ganache:
     * > ganache-cli
     * > truffle test --network development
     */

  networks: {
    development: {
      // for usage with e.g. Ganache
      host: "127.0.0.1",
      port: 8545,
      network_id: "4321", // specify network id to avoid Metamask nonce calculation problem
      gas: 2100000
    },
    ganachecli: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 2100000
    },
    ganachegui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 2100000
    },
    rinkeby: {
      network_id: 4,       // Rinkeby's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
    // additional deployment information could go here, e.g. for main net (network_id: 1)
  }
};

# Smart Contract Workshop

## Build your own Lottery DApp

![Animated DApp](./notes/01-screenshot.png)

## Instructions

### Requirements & Tooling

Make sure to have the following tools installed on your machine

 1. [nodejs](https://nodejs.org/en/download/) in the latest version (tested node.js (>= v6.11.5) )
 2. [ganache-cli](https://github.com/trufflesuite/ganache-cli) see instructions in project setup
 3. [Metamask](http://metamask.io) Chrome or Firefox extension
 4. [Sublime Text](http://sublimetext.com) or any other text editor/IDE you already use
 5. [Git](https://git-scm.com/downloads)

### Stage approach

We will follow this example in multiple steps. Even if you cannot finish e.g. one of the programming tasks in time, you may always
skip to the next branch and start with the previous step. Instructions for the follow-up branch are given at the very bottom of each README file.

### Project setup

For windows users: use the Windows Powershell or Git Bash (right click in Explorer, open Git Bash here)

1. In a destination of your choice, e.g. your desktop or `~/code/`, clone this repository with `git clone <repository url>` or download it
2. Navigate with terminal to the folder you just cloned. Type `cd SmartLottery`. From now on, all commands shown should be executed inside this `SmartLottery` directory.
3. If you haven't already, run `npm install -g ganache-cli` to install the ganache command line interface client. Ganache-cli (former name: "testrpc") is a node.js based Ethereum client, especially useful for testing and development purposes by simulating a full Ethereum client. Be patient as installation may take some time.

That's it, you are ready to roll!

### Running ganache

1. In your `SmartLottery` folder start up ganache with executing `ganache-cli` in your terminal
2. The output will look like this, giving you a simulated ethereum client on your local machine exposed on port 8545 with predefined accounts, that have 100 testethers each. Save the mnemonic words somewhere for later.

```
Available Accounts
==================
(0) 0x8e03294385e5c8130512a2da3f3162a3aa9aa386
(1) 0xaac72bdd60cb3acb69cb6cd628d0fd4a23da1bf5
(2) 0xb38e1be95b5ba779bc7f4b65734d651ef0e641c4
...

Private Keys
==================
(0) a621b1e12823b46ce970aaedd149b3c83d4bc47c59871a59f16648e4cffb370d
(1) 24d408a509a497132e983ffbe15aa0cadaebd384102985ca84749f1fc2ae0000
(2) d05723f0d16906b34e4b5ed95243fa052a6b09fd0a7b7c33215a8fe0e595b9ee
...

HD Wallet
==================
Mnemonic:      carry easy spice pupil expand later night jewel screen torch advance turkey
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
```

### Smart Contract development with Remix

1. Visit http://remix.ethereum.org in your browser to get the Remix Ethereum IDE.
2. Copy the provided code from the `contracts/SmartLottery.sol` file into the editor to have syntax highlighting and code annotations. Advanced setup: You can alternatively link your local folder to Remix or use your own IDE/editor with Solidity code support.
3. Try to fill out the missing pieces of code, diving deep into the Solidity language. As a reference, the [Solidity documentation](https://solidity.readthedocs.io/en/develop/) might be helpful. 

Tips:
* Do *not* change the given methods, method parameters or variables.
* Start small, write the getter-methods first.
* Try to understand the concepts, even if you can't get everything running, the code will be provided during the next steps.

### Done coding? Test your contract manually using Remix

In Remix settings:

1. Go to `Run > Environment` and set Environment to `Javascript VM` to use the built-in Remix virtual machine.
2. Select the account, you want to deploy the contract with (any of them should be fine)
3. Select `SmartLottery` as the contract name you want to deploy and press the red `Create` button to send the contract creation transaction to the (simulated) blockchain client. You should now see some buttons to interact with the contract functions.

### Deploy the contract locally on ganache

Alternatively, you can run your contract locally on ganache-cli and interact with it using Remix.

1. Check if ganache-cli is still running, otherwise fire it up again with `ganache-cli` in your terminal. By default it should communicate on `http://localhost:8545`. If you want to reuse the same accounts, you can start ganache-cli by feeding it the 12 mnemonic words 
as listed on the first start of the program. Try to recreate the same accounts with executing `ganache-cli -m "carry easy spice pupil expand later night jewel screen torch advance turkey"`. Whereas you may substitute the 12 menemonic words with those you have saved previously.
2. In Remix, set `Run > Environment` to `Web3 Provider` and  enter `http://localhost:8545`, if issues occur try `http://127.0.01:8545`. You can use this method to provide *any* ethereum client, e.g. geth or parity. For convenience, we will just use ganache-cli in this workshop, 
as geth or other clients might take a longer while to sync. After you successfully connected to the client, you should be able to see the same 10 addresses, as previously shown when firing up ganache-cli on the commandline, each of them pre-filled with 100 testethers. 

    *Alternatively, you may set up Metamask at this stage. Install Metamask browser extension app e.g. from the Chrome Web Store if you are using Google Chrome or install the Firefox Plugin. 
    Initialize Metamask with the seedwords/mnemonic words provided by ganache-cli you saved earlier. When logging in click on `Import using account seed phrase`. Following the instructions, you should end up with the same accounts as listed in ganache earlier.
    Make sure to connect to the correct network using Metamask. We will have to connect to `localhost 8545`, which is, you guessed it, our running ganache-cli instance.
    In Remix, under `Run > Environment` select `Injected Web3` to let Metamask inject the web3 instance configured previously.*
    
3. Select `SmartLottery` as the contract name you want to deploy and press the red `Create` button to send the contract creation transaction to the (simulated) blockchain client. You should now see some buttons to interact with the contract functions.

### Play the lottery without a frontend (in Remix)

In Remix, you should now have a functioning contract you can interact with. Feel free to play around, the steps given in this tutorial may help you. 

As you may see, there are buttons in different colors. Blue colored buttons are *calls*, that only query data in a "read-only" fashion, therefore do not cost any ether. On the other side, red buttons depict *transactions*, that perform write-operations on a blockchain that need to update state or update other accounts. As something gets persisted on the chain, ether must be sent to pay for the miner to include the transaction in a block.


### Congratulations!

You may now start with developing the matching frontend application to your contract.
To progress to the next part, inside the project directory, type `git checkout stage-testing` and have a look at the instructions in  the readme file.

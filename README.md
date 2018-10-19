# mitweb3.js 0.1.0
## Getting Started
### Getting Started
The mitweb3.js library is a collection of modules which contain specific functionality for the mit ecosystem.
* The mitweb3-mit is for the mit blockchain and smart contracts
* The mitweb3-shh is for the whisper protocol to communicate p2p and broadcast
* The mitweb3-bzz is for the swarm protocol, the decentralized file storage
* The mitweb3-utils contains useful helper functions for Dapp developers
### Adding mitweb3.js
You need to get mitweb3.js into your projsct.This can be done using the following methods:  
```
npm: npm install mitweb3  
```

After that you need to create a mitweb3 instance and set a provider. 
```
// in node.js use: 
var MitWeb3 = require("mitweb3");
var mitweb3 = new MitWeb3(MitWeb3.givenProvider || "ws://localhost:8546");
```
That’s it! now you can use the mitweb3 object.

## Callbacks Promises Events
To help mitweb3 integrate into all kind of projects with different standards we provide multiple ways to act on asynchronous functions.

Most mitweb3.js objects allow a callback as the last parameter, as well as returning promises to chain functions.

Mit as a blockchain has different levels of finality and therefore needs to return multiple “stages” of an action. To cope with requirement we return a “promiEvent” for functions like mitweb3.mit.sendTransaction or contract methods. This “promiEvent” is a promise combined with an event emitter to allow acting on different stages of action on the blockchain, like a transaction.

PromiEvents work like a normal promises with added on, once and off functions. This way developers can watch for additional events like on “receipt” or “transactionHash”.
```
mitweb3.mit.sendTransaction({from: '0x123...', data: '0x432...'})
.once('transactionHash', function(hash){ ... })
.once('receipt', function(receipt){ ... })
.on('confirmation', function(confNumber, receipt){ ... })
.on('error', function(error){ ... })
.then(function(receipt){
    // will be fired once the receipt its mined
});
```
## Glossary
### json interface  
The json interface is a json object describing the Application Binary Interface (ABI) for a mit smart contract.

Using this json interface mitweb3.js is able to create JavaScript object representing the smart contract and its methods and events using the mitweb3.mit.Contract object.  
* Specification
    * Functions:
        * type: "function", "constructor" (can be omitted, defaulting to "function"; "fallback" also possible but not relevant in mitweb3.js);
        * name: the name of the function (only present for function types);  
        * constant: true if function is specified to not modify the blockchain state;  
        * payable: true if function accepts mit, defaults to false;  
        * stateMutability: a string with one of the following values: pure (specified to not read blockchain state), view (same as constant above), nonpayable and payable (same as payable above);  
        * inputs: an array of objects, each of which contains:  
            * name: the name of the parameter;  
            * type: the canonical type of the parameter.  
        * outputs: an array of objects same as inputs, can be omitted if no outputs exist.  
    * Events:
    
        * type: always "event"
        * name: the name of the event;
        * inputs: an array of objects, each of which contains:
            * name: the name of the parameter;
            * type: the canonical type of the parameter.
            * indexed: true if the field is part of the log’s topics, false if it one of the log’s data segment.
        * anonymous: true if the event was declared as anonymous.
* Example
```
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}

// would result in the JSON:
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```
## mitweb3
* **version**  
    ```
    mitweb3.version
    ```
    Contains the version of the mitweb3 container object.
    * Returns  
        String: The current version.
    * Example  
    ```
    mitweb3.version;
    > "1.0.0"
    ```
* **modules**  
    ```
    mitweb3.modules
    ```
    Will return an object with the classes of all major sub modules, to be able to instantiate them manually.
    * Returns  
        * Object: A list of modules: 
            * Mit - Function: the Mit module for interacting with the mit network see mitweb3.mit for more.  
            * Net - Function: the Net module for interacting with network properties see mitweb3.mit for more.  
            *  Personal - Function: the Personal module for interacting with the mit accounts see mitweb3.mit.personal for more.  
            * Shh - Function: the Shh module for interacting with the whisper protocol see mitweb3.shh for more.  
            * Bzz - Function: the Bzz module for interacting with the swarm network see mitweb3.bzz for more.  
    * Example  
    ```
    mitweb3.modules
    > {
        Mit: Mit function(provider),
        Net: Net function(provider),
        Personal: Personal function(provider),
        Shh: Shh function(provider),
        Bzz: Bzz function(provider),
    }
    ```
* **utils**
    ```
    mitweb3.utils
    ```
    Utility functions are also exposes on the MitWeb3 class object directly.  
    See mitweb3.utils for more.
* **setProvider** 
    ```
    mitweb3.setProvider(myProvider)
    mitweb3.mit.setProvider(myProvider)
    mitweb3.shh.setProvider(myProvider)
    mitweb3.bzz.setProvider(myProvider)
    ...
    ```
    Will change the provider for its module.  
    <font color=red size=3>! note :</font>
    When called on the umbrella package mitweb3 it will also set the provider for all sub modules mitweb3.mit, mitweb3.shh, etc EXCEPT mitweb3.bzz which needs a separate provider at all times.
    * Parameters  
    object - myProvider: a valid provider.
    * Returns  
    Boolean
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    var mitweb3 = new MitWeb3('http://localhost:8545');
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.HttpProvider('http://localhost:8545'));
    
    // change provider
    mitweb3.setProvider('ws://localhost:8546');
    // or
    mitweb3.setProvider(new MitWeb3.providers.WebsocketProvider('ws://localhost:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **providers** 
    ```
    mitweb3.providers
    mitweb3.mit.providers
    mitweb3.shh.providers
    mitweb3.bzz.providers
    ...
    ```
    Contains the current available providers. 
    * Value  
    Object with the following providers:  
        * Object - HttpProvider: The HTTP provider is deprecated, as it won’t work for subscriptions.
        * Object - WebsocketProvider: The Websocket provider is the standard for usage in legacy browsers.
        * Object - IpcProvider: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://remotenode.com:8546');
    // or
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || new MitWeb3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **givenProvider** 
    ```
    mitweb3.givenProvider
    mitweb3.mit.givenProvider
    mitweb3.shh.givenProvider
    mitweb3.bzz.givenProvider
    ...
    ```
    When using mitweb3.js in an mit compatible browser, it will set with the current native provider by that browser. Will return the given provider by the (browser) environment, otherwise null.
    * Returns  
        Object: The given provider set or null;
    * Example  
* **currentProvider** 
    ```
    mitweb3.currentProvider
    mitweb3.mit.currentProvider
    mitweb3.shh.currentProvider
    mitweb3.bzz.currentProvider
    ...
    ```
    Will return the current provider, otherwise null.
    * Returns  
    object: The current provider set or null;
    * Example
    ```
    mitweb3.currentProvider
    >{
      newAccount: function(),
      openWallet: function(),
      send: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sendAsync: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sign: function(),
      unlockAccount: function()
    }
    ```
* **BatchRequest** 
    ```
    new mitweb3.BatchRequest()
    new mitweb3.mit.BatchRequest()
    new mitweb3.shh.BatchRequest()
    new mitweb3.bzz.BatchRequest()
    ...
    ```
    Class to create and execute batch requests.
    * Parameters  
    none
    * Returns  
    Object: With the following methods:
        * add(request): To add a request object to the batch call.
        * execute(): Will execute the batch request.
    * Example
    ```
    var contract = new mitweb3.mit.Contract(abi, address);

    var batch = new mitweb3.BatchRequest();
    batch.add(mitweb3.mit.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    batch.execute();
    ```
* **extend** 
    ```
    mitweb3.extend(methods)
    mitweb3.mit.extend(methods)
    mitweb3.shh.extend(methods)
    mitweb3.bzz.extend(methods)
    ...
    ```
    Allows extending the mitweb3 modules.  
    <font color=red size=3>! note :</font>
    You also have *.extend.formatters as additional formatter functions to be used for in and output formatting. Please see the source file for function details.
    * Parameters  
    methods - Object: Extension object with array of methods description objects as follows: provider.  
        * property - String: (optional) The name of the property to add to the module. If no property is set it will be added to the module directly.
        * methods - Array: The array of method descriptions:  
            * name - String: Name of the method to add.
            * call - String: The RPC method name.
            * params - Number: (optional) The number of parameters for that function. Default 0.
            * inputFormatter - Array: (optional) Array of inputformatter functions. Each array item responds to a function parameter, so if you want some parameters not to be formatted, add a null instead.
            * outputFormatter - ``Function: (optional) Can be used to format the output of the method.
    * Returns  
        Object: The extended module.
    * Example  
    ```
    mitweb3.extend({
        property: 'myModule',
        methods: [{
            name: 'getBalance',
            call: 'mit_getBalance',
            params: 2,
            inputFormatter: [mitweb3.extend.formatters.inputAddressFormatter, mitweb3.extend.formatters.inputDefaultBlockNumberFormatter],
            outputFormatter: mitweb3.utils.hexToNumberString
        },{
            name: 'getGasPriceSuperFunction',
            call: 'mit_gasPriceSuper',
            params: 2,
            inputFormatter: [null, mitweb3.utils.numberToHex]
        }]
    });
    
    mitweb3.extend({
        methods: [{
            name: 'directCall',
            call: 'mit_callForFun',
        }]
    });
    
    console.log(mitweb3);
    >MitWeb3{
        myModule: {
            getBalance: function(){},
            getGasPriceSuperFunction: function(){}
        },
        directCall: function(){},
        mit: Mit {...},
        bzz: Bzz {...},
        ...
    }
    ```
## mitweb3.mit  
* **setProvider** 
    ```
    mitweb3.setProvider(myProvider)
    mitweb3.mit.setProvider(myProvider)
    mitweb3.shh.setProvider(myProvider)
    mitweb3.bzz.setProvider(myProvider)
    ...
    ```
    Will change the provider for its module.  
    <font color=red size=3>! note :</font>
    When called on the umbrella package mitweb3 it will also set the provider for all sub modules mitweb3.mit, mitweb3.shh, etc EXCEPT mitweb3.bzz which needs a separate provider at all times.
    * Parameters  
    object - myProvider: a valid provider.
    * Returns  
    Boolean
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    var mitweb3 = new MitWeb3('http://localhost:8545');
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.HttpProvider('http://localhost:8545'));
    
    // change provider
    mitweb3.setProvider('ws://localhost:8546');
    // or
    mitweb3.setProvider(new MitWeb3.providers.WebsocketProvider('ws://localhost:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **providers** 
    ```
    mitweb3.providers
    mitweb3.mit.providers
    mitweb3.shh.providers
    mitweb3.bzz.providers
    ...
    ```
    Contains the current available providers. 
    * Value  
    Object with the following providers:  
        * Object - HttpProvider: The HTTP provider is deprecated, as it won’t work for subscriptions.
        * Object - WebsocketProvider: The Websocket provider is the standard for usage in legacy browsers.
        * Object - IpcProvider: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://remotenode.com:8546');
    // or
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || new MitWeb3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **givenProvider** 
    ```
    mitweb3.givenProvider
    mitweb3.mit.givenProvider
    mitweb3.shh.givenProvider
    mitweb3.bzz.givenProvider
    ...
    ```
    When using mitweb3.js in an mit compatible browser, it will set with the current native provider by that browser. Will return the given provider by the (browser) environment, otherwise null.
    * Returns  
        Object: The given provider set or null;
    * Example  
* **currentProvider** 
    ```
    mitweb3.currentProvider
    mitweb3.mit.currentProvider
    mitweb3.shh.currentProvider
    mitweb3.bzz.currentProvider
    ...
    ```
    Will return the current provider, otherwise null.
    * Returns  
        object: The current provider set or null;
    * Example
    ```
    mitweb3.currentProvider
    >{
      newAccount: function(),
      openWallet: function(),
      send: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sendAsync: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sign: function(),
      unlockAccount: function()
    }
    ```
* **BatchRequest** 
    ```
    new mitweb3.BatchRequest()
    new mitweb3.mit.BatchRequest()
    new mitweb3.shh.BatchRequest()
    new mitweb3.bzz.BatchRequest()
    ...
    ```
    Class to create and execute batch requests.
    * Parameters  
    none
    * Returns  
    Object: With the following methods:
        * add(request): To add a request object to the batch call.
        * execute(): Will execute the batch request.
    * Example
    ```
    var contract = new mitweb3.mit.Contract(abi, address);

    var batch = new mitweb3.BatchRequest();
    batch.add(mitweb3.mit.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    batch.execute();
    ```
* **extend** 
    ```
    mitweb3.extend(methods)
    mitweb3.mit.extend(methods)
    mitweb3.shh.extend(methods)
    mitweb3.bzz.extend(methods)
    ...
    ```
    Allows extending the mitweb3 modules.  
    <font color=red size=3>! note :</font>
    You also have *.extend.formatters as additional formatter functions to be used for in and output formatting. Please see the source file for function details.
    * Parameters  
    methods - Object: Extension object with array of methods description objects as follows: provider.  
        * property - String: (optional) The name of the property to add to the module. If no property is set it will be added to the module directly.
        * methods - Array: The array of method descriptions:  
            * name - String: Name of the method to add.
            * call - String: The RPC method name.
            * params - Number: (optional) The number of parameters for that function. Default 0.
            * inputFormatter - Array: (optional) Array of inputformatter functions. Each array item responds to a function parameter, so if you want some parameters not to be formatted, add a null instead.
            * outputFormatter - ``Function: (optional) Can be used to format the output of the method.
    * Returns  
        Object: The extended module.
    * Example  
    ```
    mitweb3.extend({
        property: 'myModule',
        methods: [{
            name: 'getBalance',
            call: 'mit_getBalance',
            params: 2,
            inputFormatter: [mitweb3.extend.formatters.inputAddressFormatter, mitweb3.extend.formatters.inputDefaultBlockNumberFormatter],
            outputFormatter: mitweb3.utils.hexToNumberString
        },{
            name: 'getGasPriceSuperFunction',
            call: 'mit_gasPriceSuper',
            params: 2,
            inputFormatter: [null, mitweb3.utils.numberToHex]
        }]
    });
    
    mitweb3.extend({
        methods: [{
            name: 'directCall',
            call: 'mit_callForFun',
        }]
    });
    
    console.log(mitweb3);
    > MitWeb3{
        myModule: {
            getBalance: function(){},
            getGasPriceSuperFunction: function(){}
        },
        directCall: function(){},
        mit: Mit {...},
        bzz: Bzz {...},
        ...
    }
    ```
* **defaultAccount**  
    * Property  
        string - 20 Bytes: Any mit address. You should have the private key for that address in your node or keystore. (Default is undefined)
    * Example  
    ```
    mitweb3.mit.defaultAccount;
    > undefined
    
    // set the default account
    mitweb3.mit.defaultAccount = '0x9261785e239f12d23d9230553ef6d8e21d9348c5';
    ```
* **defaultBlock**  
    * Property  
        * Default block parameters can be one of the following:  
            * Number: A block number
            * "genesis" - string: The genesis block
            * "latest" - string: The latest block (current head of the blockchain)
            * "pending" - string: The currently mined block (including pending transactions)  
        * Default is "latest"
    * Example  
    ```
    mitweb3.mit.defaultBlock;
    > "latest"
    
    // set the default block
    mitweb3.mit.defaultBlock = 110;
    ```
* **getProtocolVersion** 
    ```
    mitweb3.mit.getProtocolVersion([callback])
    ```
    Returns the mit protocol version of the node.
    * Returns  
        Promise returns String: the protocol version.
    * Example  
    ```
    mitweb3.mit.getProtocolVersion()
    .then(console.log);
    > "63"
    ```
* **isSyncing** 
    ```
    mitweb3.mit.isSyncing([callback])
    ```
    Checks if the node is currently syncing and returns either a syncing object, or false.
    * Returns  
        Promise returns Object|Boolean - A sync object when the node is currently syncing or false:  
            * startingBlock - Number: The block number where the sync started.
            * currentBlock - Number: The block number where at which block the node currently synced to already.
            * highestBlock - Number: The estimated block number to sync to.
            * knownStates - Number: The estimated states to download
            * pulledStates - Number: The already downloaded states
    * Example  
    ```
    mitweb3.mit.isSyncing()
    .then(console.log);
    
    > {
        startingBlock: 100,
        currentBlock: 312,
        highestBlock: 512,
        knownStates: 234566,
        pulledStates: 123455
    }
    ```
* **getCoinbase**  
    Returns the coinbase address to which mining rewards will go.  
    * Returns  
    Promise returns string - bytes 20: The coinbase address set in the node for mining rewards.
    * Example  
    ```
    mitweb3.mit.getCoinbase()
    .then(console.log);
    > "0x9261785e239f12d23d9230553ef6d8e21d9348c"
    ```
* **isMining**  
    ```
    mitweb3.mit.isMining([callback])
    ```
    Checks whether the node is mining or not.
    * Returns  
    Promise returns Boolean: true if the node is mining, otherwise false.
    * Example  
    ```
    mitweb3.mit.isMining()
    .then(console.log);
    > true
    ```
* **getHashrate**  
    ```
    mitweb3.mit.getHashrate(callback(error, result){ ... })
    ```
    Returns the number of hashes per second that the node is mining with.
    * Returns  
    Promise returns Number: Number of hashes per second.
    * Example  
    ```
    mitweb3.mit.getHashrate()
    .then(console.log);
    > 493736
    ```
* **getGasPrice**  
    ```
    mitweb3.mit.getGasPrice([callback])
    ```
    Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.  
    * Returns  
    Promise returns string - Number string of the current gas price in wei.  
    See the A note on dealing with big numbers in JavaScript.
    * Example  
    ```
    mitweb3.mit.getGasPrice()
    .then(console.log);
    > "18000000000"
    ```
* **getAccounts**  
    Returns a list of accounts the node controls.
    * Returns  
    Promise returns string - An array of addresses controlled by node.
    * Example  
    ```
    mitweb3.mit.getAccounts()
    .then(console.log);
    > ["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
    ```
* **getBlockNumber**  
    Returns the current block number.
    * Returns  
    Promise returns Number - The number of the most recent block.
    * Example  
    ```
    mitweb3.mit.getBlockNumber()
    .then(console.log);
    > 110785
    ```
* **getBalance**  
    Get the balance of an address at a given block.  
    * Parameters
        * String - The address to get the balance of.
        * Number|String - (optional) If you pass this parameter it will not use the default block set with mitweb3.mit.defaultBlock.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The current balance for the given address in wei.
    See the A note on dealing with big numbers in JavaScript.
    * Example  
    ```
    mitweb3.mit.getBalance('0x9261785e239f12d23d9230553ef6d8e21d9348c5');
    >9.999999999824399999999999e+25
    ```
* **getStorageAt**  
    Get the storage at a specific position of an address.  
    * Parameters  
        * String - The address to get the storage from.
        * Number - The index position of the storage.
        * Number|String - (optional) If you pass this parameter it will not use the default block set with mitweb3.mit.defaultBlock.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns String - The value in storage at the given position.
    * Example  
    ```
    mitweb3.mit.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0)
    > "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
    ```
* **getCode**  
    Get the code at a specific address.  
    * Parameters  
        * String - The address to get the code from.
        * Number|String - (optional) If you pass this parameter it will not use the default block set with mitweb3.mit.defaultBlock.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns String - The data at given address address.
    * Example  
    ```
    //Contract address
    mitweb3.mit.getCode("0x5c8d084cd7a32f8a6e583e95b672fbdab2ae34c1");
    > "0x606060405260043610610133576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461025b578063095ea7b31....."
    //Ordinary address
    mitweb3.mit.getCode("0x9261785e239f12d23d9230553ef6d8e21d9348c5");
    > "0x"
    ```
* **getBlock**  
    Returns a block matching the block number or block hash.
    * Parameters  
        * String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
        * Boolean - (optional, default false) If true, the returned block will contain all transactions as objects, if false it will only contains the transaction hashes.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Object  
        * number - Number: The block number. null when its pending block.
        * hash 32 Bytes - String: Hash of the block. null when its pending block.
        * parentHash 32 Bytes - String: Hash of the parent block.
        * nonce 8 Bytes - String: Hash of the generated proof-of-work. null when its pending block.
        * sha3Uncles 32 Bytes - String: SHA3 of the uncles data in the block.
        * logsBloom 256 Bytes - String: The bloom filter for the logs of the block. null when its pending block.
        * transactionsRoot 32 Bytes - String: The root of the transaction trie of the block
        * stateRoot 32 Bytes - String: The root of the final state trie of the block.
        * miner - String: The address of the beneficiary to whom the mining rewards were given.
        * difficulty - String: Integer of the difficulty for this block.
        * totalDifficulty - String: Integer of the total difficulty of the chain until this block.
        * extraData - String: The “extra data” field of this block.
        * size - Number: Integer the size of this block in bytes.
        * gasLimit - Number: The maximum gas allowed in this block.
        * gasUsed - Number: The total used gas by all transactions in this block.
        * timestamp - Number: The unix timestamp for when the block was collated.
        * transactions - Array: Array of transaction objects, or 32 Bytes transaction hashes depending on the returnTransactionObjects parameter.
        * uncles - Array: Array of uncle hashes.
    * Example  
    ```
    mitweb3.mit.getBlock(1234)
    > {
          difficulty: 2,
          extraData: "0xd883010808846765746888676f312e31302e31856c696e7578000000000000004e6239d31940b458c259ff9dfcdf5c7801b421935ae7a3954d87a654cce8d2e770bd8786151397d7ebe3a13653f6d8b937e8ee6c5f83327b71d355c360986cfd01",
          gasLimit: 5025720,
          gasUsed: 0,
          hash: "0x3a6ae2dcf8d932e43c7c5cd29a61b0f0fd7239049c23299fab98965df867836c",
          logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          miner: "0x0000000000000000000000000000000000000000",
          mixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
          nonce: "0x0000000000000000",
          number: 1234,
          parentHash: "0x6bb2aa601a6ebb8f55311ed605e134e27cdffd03ed337f7e29b6040a291ff706",
          receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
          sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          size: 608,
          stateRoot: "0x5dff2f47961d5d0c5ed5a8ada201f448cfe64f1dbd81ba63c6adb4b947015d74",
          timestamp: 1527212699,
          totalDifficulty: 1050118,
          transactions: [],
          transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
          uncles: []
        }
    ```
* getBlockTransactionCount  
    Returns the number of transaction in a given block.  
    * Parameters  
        * String|Number - The block number or hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Number - The number of transactions in the given block.
    * Example  
    ```
    mitweb3.mit.getBlockTransactionCount('0x3a6ae2dcf8d932e43c7c5cd29a61b0f0fd7239049c23299fab98965df867836c');
    > 0
    ```
* **getUncle**  
    Returns a blocks uncle by a given uncle index position.  
    * Parameters  
        * String|Number - The block number or hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
        * Number - The index position of the uncle.
        * Boolean - (optional, default false) If true, the returned block will contain all transactions as objects, if false it will only contains the transaction hashes.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Object - the returned uncle. For a return value see mitweb3.mit.getBlock().  
    <font color=red size=3>note:</font>  
    An uncle doesn’t contain individual transactions.
    * Example  
    ```
    mitweb3.mit.getUncle(500, 0)
    .then(console.log);
    > // see mitweb3.mit.getBlock
    ```
* **getTransaction**  
    Returns a transaction matching the given transaction hash.
     * Parameters  
        * String - The transaction hash.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Object - A transaction object its hash transactionHash:
        * hash 32 Bytes - String: Hash of the transaction.
        * nonce - Number: The number of transactions made by the sender prior to this one.
        * blockHash 32 Bytes - String: Hash of the block where this transaction was in. null when its pending.
        * blockNumber - Number: Block number where this transaction was in. null when its pending.
        * transactionIndex - Number: Integer of the transactions index position in the block. null when its pending.
        * from - String: Address of the sender.
        * to - String: Address of the receiver. null when its a contract creation transaction.
        * value - String: Value transferred in wei.
        * gasPrice - String: Gas price provided by the sender in wei.
        * gas - Number: Gas provided by the sender.
        * input - String: The data sent along with the transaction.
    * Example  
    ```
    mitweb3.mit.getTransaction('0x59dd1902a67b974c4fbe6db87145bde0f5745fb858aebb14002b4c5528336b0b');
    >{
          blockHash: "0x316c4ecea81a98d263d66a16819e1a84870bd10f923f4cec5e4e7522ae2b67f9",
          blockNumber: 114956,
          from: "0x9261785e239f12d23d9230553ef6d8e21d9348c5",
          gas: 90000,
          gasPrice: 18000000000,
          hash: "0x59dd1902a67b974c4fbe6db87145bde0f5745fb858aebb14002b4c5528336b0b",
          input: "0x",
          nonce: 0,
          r: "0x893453839291f6ca7f6d07a83d9cef4181ba50b158d75857047c66f787013f28",
          s: "0x234ddf71f8c2e31f03a9cabf466a4e112eb3d3245fc73f5638d52834fe010073",
          to: "0xefd6da3079f47f6a1f0696c9b84ec17b45f2838c",
          transactionIndex: 0,
          v: "0x558",
          value: 10
        }
    ```
* **getTransactionFromBlock**  
    Returns a transaction based on a block hash or number and the transactions index position.  
    * Parameters
        * String - A block number or hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
        * Number - The transactions index position.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Promise returns Object - A transaction object, see mitweb3.mit.getTransaction:
    * Example
    ```
    mitweb3.mit.getTransactionFromBlock('114956');
    >{
          blockHash: "0x316c4ecea81a98d263d66a16819e1a84870bd10f923f4cec5e4e7522ae2b67f9",
          blockNumber: 114956,
          from: "0x9261785e239f12d23d9230553ef6d8e21d9348c5",
          gas: 90000,
          gasPrice: 18000000000,
          hash: "0x59dd1902a67b974c4fbe6db87145bde0f5745fb858aebb14002b4c5528336b0b",
          input: "0x",
          nonce: 0,
          r: "0x893453839291f6ca7f6d07a83d9cef4181ba50b158d75857047c66f787013f28",
          s: "0x234ddf71f8c2e31f03a9cabf466a4e112eb3d3245fc73f5638d52834fe010073",
          to: "0xefd6da3079f47f6a1f0696c9b84ec17b45f2838c",
          transactionIndex: 0,
          v: "0x558",
          value: 10
    }
    ```
* **getTransactionReceipt**  
    Returns the receipt of a transaction by transaction hash.  
    <font color=red size=3>! note:</font>
    The receipt is not available for pending transactions and returns null.
    * Parameters  
        * String - The transaction hash.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Object - A transaction receipt object, or null when no receipt was found:
        * status - Boolean: TRUE if the transaction was susccessfull, FALSE, if the EVM reverted the transaction.
        * blockHash 32 Bytes - String: Hash of the block where this transaction was in.
        * blockNumber - Number: Block number where this transaction was in.
        * transactionHash 32 Bytes - String: Hash of the transaction.
        * transactionIndex- Number: Integer of the transactions index position in the block.
        * from - String: Address of the sender.
        * to - String: Address of the receiver. null when its a contract creation transaction.
        * contractAddress - String: The contract address created, if the transaction was a contract creation, otherwise null.
        * cumulativeGasUsed - Number: The total amount of gas used when this transaction was executed in the block.
        * gasUsed- Number: The amount of gas used by this specific transaction alone.
        * logs - Array: Array of log objects, which this transaction generated.
    * Example
    ```
    mitweb3.mit.getTransactionReceipt('0x59dd1902a67b974c4fbe6db87145bde0f5745fb858aebb14002b4c5528336b0b');
    >{
          blockHash: "0x316c4ecea81a98d263d66a16819e1a84870bd10f923f4cec5e4e7522ae2b67f9",
          blockNumber: 114956,
          contractAddress: null,
          cumulativeGasUsed: 21000,
          from: "0x9261785e239f12d23d9230553ef6d8e21d9348c5",
          gasUsed: 21000,
          logs: [],
          logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          status: "0x1",
          to: "0xefd6da3079f47f6a1f0696c9b84ec17b45f2838c",
          transactionHash: "0x59dd1902a67b974c4fbe6db87145bde0f5745fb858aebb14002b4c5528336b0b",
          transactionIndex: 0
        }
    ```
* **getTransactionCount**  
    Get the numbers of transactions sent from this address.
    * Parameters
        * String - The address to get the numbers of transactions from.
        * Number|String - (optional) If you pass this parameter it will not use the default block set with mitweb3.mit.defaultBlock.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
        Promise returns Number - The number of transactions sent from the given address.
    * Example
    ```
    mitweb3.mit.getTransactionCount('0x9261785e239f12d23d9230553ef6d8e21d9348c5');
    >2
    ```
* **sendTransaction**  
    Sends a transaction to the network.  
    * Parameters  
        * Object - The transaction object to send:
            * from - String|Number: The address for the sending account. Uses the mitweb3.mit.defaultAccount property, if not specified. Or an address or index of a local wallet in mitweb3.mit.accounts.wallet.
            * to - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
            * value - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
            * gas - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
            * gasPrice - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to mitweb3.mit.gasPrice.
            * data - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
            * nonce - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.       
        * callback - Function: (optional) Optional callback, returns an error object as first parameter and the result as second.  
    <font color=red size=3>! note :</font>  
    The from property can also be an address or index from the mitweb3.mit.accounts.wallet. It will then sign locally using the private key of that account, and send the transaction via mitweb3.mit.sendSignedTransaction().
    * Returns  
        * The callback will return the 32 bytes transaction hash.
        * PromiEvent: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:
            * "transactionHash" returns String: Is fired right after the transaction is send and a transaction hash is available.
            * "receipt" returns Object: Is fired when the transaction receipt is available.
            * "confirmation" returns Number, Object: Is fired for every confirmation up to the 12th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 0 on, which is the block where its minded.
            * "error" returns Error: Is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.
    * Example
    ```
    var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";


        // using the callback
        mitweb3.mit.sendTransaction({
            from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
            data: code // deploying a contracrt
        }, function(error, hash){
            ...
        });
        
        // using the promise
        mitweb3.mit.sendTransaction({
            from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
            to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
            value: '1000000000000000'
        })
        .then(function(receipt){
            ...
        });
        
        
        // using the event emitter
        mitweb3.mit.sendTransaction({
            from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
            to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
            value: '1000000000000000'
        })
        .on('transactionHash', function(hash){
            ...
        })
        .on('receipt', function(receipt){
            ...
        })
        .on('confirmation', function(confirmationNumber, receipt){ ... })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    ```
* **sendSignedTransaction**
    ```
    mitweb3.mit.sendSignedTransaction(signedTransactionData [, callback])
    ```
    Sends an already signed transaction, generated for example using mitweb3.mit.accounts.signTransaction.
    * Parameters
        * String - Signed transaction data in HEX format
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    PromiEvent: A promise combined event emitter. Will be resolved when the transaction receipt is available.  
    Please see the return values for mitweb3.mit.sendTransaction for details.
    * Example
    ```
    var Tx = require('mitjs-tx');
    var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')
    
    var rawTx = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
    }
    
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    
    var serializedTx = tx.serialize();
    
    // console.log(serializedTx.toString('hex'));
    // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
    
    mitweb3.mit.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
    
    > // see mit.getTransactionReceipt() for details
    ```
* **sign**
    ```
    Signs data using a specific account. This account needs to be unlocked.
    ```
    Signs data using a specific account. This account needs to be unlocked.
    * Parameters
        * String - Data to sign. If String it will be converted using mitweb3.utils.utf8ToHex.
        * String|Number - Address to sign data with. Or an address or index of a local wallet in mitweb3.mit.accounts.wallet.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The signature.
    * Example
    ```
    mitweb3.mit.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
    
    // the below is the same
    mitweb3.mit.sign(mitweb3.utils.utf8ToHex("Hello world"), "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

    ```
* **signTransaction**
    ```
    mitweb3.mit.signTransaction(transactionObject, address [, callback])
    ```
    Signs a transaction. This account needs to be unlocked.
    * Parameters
        * Object - The transaction data to sign mitweb3.mit.sendTransaction() for more.
        * String - Address to sign transaction with.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns Object - The RLP encoded transaction. The raw property can be used to send the transaction using mitweb3.mit.sendSignedTransaction.
    * Example
    ```
    mitweb3.mit.signTransaction({
        from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }).then(console.log);
    > {
        raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        tx: {
            nonce: '0x0',
            gasPrice: '0x4a817c800',
            gas: '0x5208',
            to: '0x3535353535353535353535353535353535353535',
            value: '0xde0b6b3a7640000',
            input: '0x',
            v: '0x25',
            r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
            s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
            hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
        }
    }
    ```
* **call**
    ```
    mitweb3.mit.call(callObject [, defaultBlock] [, callback])
    ```
    Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
    * Parameters
        * Object - A transaction object see mitweb3.mit.sendTransaction, with the difference that for calls the from property is optional as well.
        * Number|String - (optional) If you pass this parameter it will not use the default block set with mitweb3.mit.defaultBlock.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String: The returned data of the call, e.g. a smart contract functions return value.
    * Example
    ```
    mitweb3.mit.call({
        to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
        data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    })
    .then(console.log);
    > "0x000000000000000000000000000000000000000000000000000000000000000a"
    ```
* **estimateGas**
    ```
    mitweb3.mit.estimateGas(callObject [, callback])
    ```
    Executes a message call or transaction and returns the amount of the gas used.
    * Parameters
        * Object - A transaction object see mitweb3.mit.sendTransaction, with the difference that for calls the from property is optional as well.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns Number - the used gas for the simulated call/transaction.
    * Example
    ```
    mitweb3.mit.estimateGas({
        to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    })
    .then(console.log);
    > "0x0000000000000000000000000000000000000000000000000000000000000015"
    ```
* **getPastLogs**
    ```
    mitweb3.mit.getPastLogs(options [, callback])
    ```
    Gets past logs, matching the given options.
    * Parameters  
        Object - The filter options as follows:  
        * fromBlock - Number|String: The number of the earliest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".  
        * toBlock - Number|String: The number of the latest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".
        * address - String|Array: An address or a list of addresses to only get logs from particular account(s).
        * topics - Array: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x12...']. You can also pass an array for each topic with options for that topic e.g. [null, ['option1', 'option2']]
    * Returns  
    Promise returns Array - Array of log objects.   
    The structure of the returned event Object in the Array looks as follows:
        * address - String: From which this event originated from.
        * data - String: The data containing non-indexed log parameter.
        * topics - Array: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
        * logIndex - Number: Integer of the event index position in the block.
        * transactionIndex - Number: Integer of the transaction’s index position, the event was created in.
        * transactionHash 32 Bytes - String: Hash of the transaction this event was created in.
        * blockHash 32 Bytes - String: Hash of the block where this event was created in. null when its still pending.
        * blockNumber - Number: The block number where this log was created in. null when still pending.
    * Example
    ```
    mitweb3.mit.getPastLogs({
        address: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        topics: ["0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
    })
    .then(console.log);
    
    > [{
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },{...}]
    ```
* **getCompilers**
    ```
    mitweb3.mit.getCompilers([callback])
    ```
    Gets a list of available compilers.
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns Array - An array of strings of available compilers.
    * Example
    ```
    mitweb3.mit.getCompilers()
    .then(console.log);
    > ["lll", "solidity", "serpent"]
    ```
* **compile.solidity**
    ```
    mitweb3.mit.compile.solidity(sourceCode [, callback])
    ```
    Compiles solidity source code.
    * Parameters
        * String - The solidity source code.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
    Promise returns Object - Contract and compiler info.
    * Example
    ```
    var source = "" +
        "contract test {\n" +
        "   function multiply(uint a) returns(uint d) {\n" +
        "       return a * 7;\n" +
        "   }\n" +
        "}\n";
    
    mitweb3.mit.compile.solidity(source)
    .then(console.log);
    
    > {
      "test": {
        "code": "0x605280600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b60376004356041565b8060005260206000f35b6000600782029050604d565b91905056",
        "info": {
          "source": "contract test {\n\tfunction multiply(uint a) returns(uint d) {\n\t\treturn a * 7;\n\t}\n}\n",
          "language": "Solidity",
          "languageVersion": "0",
          "compilerVersion": "0.8.2",
          "abiDefinition": [
            {
              "constant": false,
              "inputs": [
                {
                  "name": "a",
                  "type": "uint256"
                }
              ],
              "name": "multiply",
              "outputs": [
                {
                  "name": "d",
                  "type": "uint256"
                }
              ],
              "type": "function"
            }
          ],
          "userDoc": {
            "methods": {}
          },
          "developerDoc": {
            "methods": {}
          }
        }
      }
    }
    ```
* **compile.lll**
    ```
    mitweb3.mit.compile.lll(sourceCode [, callback])
    ```
    Compiles LLL source code.
    * Parameters
        * String - The LLL source code.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The compiled LLL code as HEX string.
    * Example
    ```
    var source = "...";

    mitweb3.mit.compile.lll(source)
    .then(console.log);
    > "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056"
    ```
* **compile.serpent**
    ```
    mitweb3.mit.compile.serpent(sourceCode [, callback])
    ```
    Compiles serpent source code.
    * Parameters
        * String - The serpent source code.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The compiled serpent code as HEX string.
    * Example
    ```
    var source = "...";

    var code = mitweb3.mit.compile.serpent(source)
    .then(console.log);
    > "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056"
    ```
* **getWork**
    ```
    mitweb3.mit.getWork([callback])
    ```
    Gets work for miners to mine on. Returns the hash of the current block, the seedHash, and the boundary condition to be met (“target”).
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
        Promise returns Array - the mining work with the following structure:
            * String 32 Bytes - at index 0: current block header pow-hash
            * String 32 Bytes - at index 1: the seed hash used for the DAG.
            * String 32 Bytes - at index 2: the boundary condition (“target”), 2^256 / difficulty.
    * Example
    ```
    mitweb3.mit.getWork()
    .then(console.log);
    > [
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "0x5EED00000000000000000000000000005EED0000000000000000000000000000",
      "0xd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000"
    ]
    ```
* **submitWork**
    ```
    mitweb3.mit.submitWork(nonce, powHash, digest, [callback])
    ```
    Used for submitting a proof-of-work solution.
    * Parameters
        * String 8 Bytes: The nonce found (64 bits)
        * String 32 Bytes: The header’s pow-hash (256 bits)
        * String 32 Bytes: The mix digest (256 bits)
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
        * 
    * Returns
    Promise returns Boolean - Returns TRUE if the provided solution is valid, otherwise false.
    * Example
    ```
    mitweb3.mit.submitWork([
        "0x0000000000000001",
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000"
    ])
    .then(console.log);
    > true
    ```
## mitweb3.mit.subscribe
The mitweb3.mit.subscribe function lets you subscribe to specific events in the blockchain.
* **subscribe**
    ```
    mitweb3.mit.subscribe(type [, options] [, callback]);
    ```
    * Parameters
        * String - The subscription, you want to subscribe to.
        * Mixed - (optional) Optional additional parameters, depending on the subscription type.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription, and the subscription itself as 3 parameter.
    * Returns  
    EventEmitter - A Subscription instance
        * subscription.id: The subscription id, used to identify and unsubscribing the subscription.
        * subscription.subscribe([callback]): Can be used to re-subscribe with the same parameters.
        * subscription.unsubscribe([callback]): Unsubscribes the subscription and returns TRUE in the callback if successfull.
        * subscription.arguments: The subscription arguments, used when re-subscribing.
        * on("data") returns Object: Fires on each incoming log with the log object as argument.
        * on("changed") returns Object: Fires on each log which was removed from the blockchain. The log will have the additional property "removed: true".
        * on("error") returns Object: Fires when an error in the subscription occurs.
    * Notification returns  
    Mixed - depends on the subscription, see the different subscriptions for more.
    * Example
    ```
    var subscription = mitweb3.mit.subscribe('logs', {
        address: '0x123456..',
        topics: ['0x12345...']
    }, function(error, result){
        if (!error)
            console.log(log);
    });
    
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
    ```
* **clearSubscriptions**
    ```
    mitweb3.mit.clearSubscriptions()
    ```
    Resets subscriptions.
    * Parameters
        * Boolean: If true it keeps the "syncing" subscription.
    * Returns
    Boolean
    * Example
    ```
    mitweb3.mit.subscribe('logs', {} ,function(){ ... });
    
    ...

    mitweb3.mit.clearSubscriptions();
    ```
* **subscribe(“pendingTransactions”)**
    ```
    mitweb3.mit.subscribe('pendingTransactions' [, callback]);
    ```
    Subscribes to incoming pending transactions.
    * Parameters
        * String - "pendingTransactions", the type of the subscription.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.
    * Returns
    EventEmitter: An subscription instance as an event emitter with the following events:
        * "data" returns Object: Fires on each incoming pending transaction.
        * "error" returns Object: Fires when an error in the subscription occurs.
    For the structure of the returned object see mitweb3.mit.getTransaction() return values.
    * Notification returns
        * Object|Null - First parameter is an error object if the subscription failed.
        * Object - The block header object like above.
    * Example
    ```
        var subscription = mitweb3.mit.subscribe('pendingTransactions', function(error, result){
            if (!error)
                console.log(result);
        })
        .on("data", function(transaction){
            console.log(transaction);
        });
        
        // unsubscribes the subscription
        subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
    ```
* **subscribe(“newBlockHeaders”)**
    ```
    mitweb3.mit.subscribe('newBlockHeaders' [, callback]);
    ```
    Subscribes to incoming block headers. This can be used as timer to check for changes on the blockchain.
    * Parameters
        * String - "newBlockHeaders", the type of the subscription.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.
    * Returns
    EventEmitter: An subscription instance as an event emitter with the following events:
        * "data" returns Object: Fires on each incoming block header.
        * "error" returns Object: Fires when an error in the subscription occurs.  
    The structure of a returned block header is as follows:  
        * number - Number: The block number. null when its pending block.
        * hash 32 Bytes - String: Hash of the block. null when its pending block.
        * parentHash 32 Bytes - String: Hash of the parent block.
        * nonce 8 Bytes - String: Hash of the generated proof-of-work. null when its pending block.
        * sha3Uncles 32 Bytes - String: SHA3 of the uncles data in the block.
        * logsBloom 256 Bytes - String: The bloom filter for the logs of the block. null when its pending block.
        * transactionsRoot 32 Bytes - String: The root of the transaction trie of the block
        * stateRoot 32 Bytes - String: The root of the final state trie of the block.
        receiptRoot 32 Bytes - String: The root of the receipts.
        * miner - String: The address of the beneficiary to whom the mining rewards were given.
        * extraData - String: The “extra data” field of this block.
        * gasLimit - Number: The maximum gas allowed in this block.
        * gasUsed - Number: The total used gas by all transactions in this block.
        timestamp - Number: The unix timestamp for when the block was collated.
    * Notification returns  
        * Object|Null - First parameter is an error object if the subscription failed.
        * Object - The block header object like above.
    * Example
    ```
    var subscription = mitweb3.mit.subscribe('newBlockHeaders', function(error, result){
        if (error)
            console.log(error);
    })
    .on("data", function(blockHeader){
    });
    
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
    ```
* **subscribe(“syncing”)**
    ```
    mitweb3.mit.subscribe('syncing' [, callback]);
    ```
    Subscribe to syncing events. This will return an object when the node is syncing and when its finished syncing will return FALSE.
    * Parameters
        * String - "syncing", the type of the subscription.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.
    * Returns  
    EventEmitter: An subscription instance as an event emitter with the following events:
        * "data" returns Object: Fires on each incoming sync object as argument.
        * "changed" returns Object: Fires when the synchronisation is started with true and when finished with false.
        * "error" returns Object: Fires when an error in the subscription occurs.  
    For the structure of a returned event Object see mitweb3.mit.isSyncing return values.
    * Notification returns  
        * Object|Null - First parameter is an error object if the subscription failed.
        * Object|Boolean - The syncing object, when started it will return true once or when finished it will return false once.
    * Example
    ```
    var subscription = mitweb3.mit.subscribe('syncing', function(error, sync){
        if (!error)
            console.log(sync);
    })
    .on("data", function(sync){
        // show some syncing stats
    })
    .on("changed", function(isSyncing){
        if(isSyncing) {
            // stop app operation
        } else {
            // regain app operation
        }
    });
    
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
    ```
* **subscribe(“logs”)**
    ```
    mitweb3.mit.subscribe('logs', options [, callback]);
    ```
    Subscribes to incoming logs, filtered by the given options.  
    * Parameters  
        * "logs" - String, the type of the subscription.  
        * Object - The subscription options 
            * fromBlock - Number: The number of the earliest block. By default null.
            * address - String|Array: An address or a list of addresses to only get logs from particular account(s).
            * topics - Array: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x00...']. You can also pass another array for each topic with options for that topic e.g. [null, ['option1', 'option2']]
        * callback - Function: (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription.
    * Returns  
    EventEmitter: An subscription instance as an event emitter with the following events:
        * "data" returns Object: Fires on each incoming log with the log object as argument.
        * "changed" returns Object: Fires on each log which was removed from the blockchain. The log will have the additional property "removed: true".
        * "error" returns Object: Fires when an error in the subscription occurs.
    * Notification returns
        * Object|Null - First parameter is an error object if the subscription failed.
        * Object - The log object like in mitweb3.mit.getPastEvents return values.
    * Example
    ```
    var subscription = mitweb3.mit.subscribe('logs', {
        address: '0x123456..',
        topics: ['0x12345...']
    }, function(error, result){
        if (!error)
            console.log(result);
    })
    .on("data", function(log){
        console.log(log);
    })
    .on("changed", function(log){
    });
    
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
    ```
## mitweb3.mit.Contract  
The mitweb3.mit.Contract object makes it easy to interact with smart contracts on the mit blockchain. When you create a new contract object you give it the json interface of the respective smart contract and mitweb3 will auto convert all calls into low level ABI calls over RPC for you.  

This allows you to interact with smart contracts as if they were JavaScript objects.  

To use it standalone:

* **new contract**
    ```
    new mitweb3.mit.Contract(jsonInterface[, address][, options])
    ```
    Creates a new contract instance with all its methods and events defined in its json interface object.
    * Parameters  
        * jsonInterface - Object: The json interface for the contract to instantiate
        * address - String (optional): The address of the smart contract to call, can be added later using myContract.options.address = '0x1234..'
        * options - Object (optional): The options of the contract. Some are used as fallbacks for calls and transactions:
            * from - String: The address transactions should be made from.
            * gasPrice - String: The gas price in wei to use for transactions.
            * gas - Number: The maximum gas provided for a transaction (gas limit).
            * data - String: The byte code of the contract. Used when the contract gets deployed.
    * Returns
    Object: The contract instance with all its methods and events.
    * Example
    ```
    var myContract = new mitweb3.mit.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        from: '0x1234567890123456789012345678901234567891', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

    ```
**= Properties =**
* options
    ```
    myContract.options
    ```
    The options object for the contract instance. from, gas and gasPrice are used as fallback values when sending transactions.
    * Properties
    Object - options:
        * address - String: The address where the contract is deployed. See options.address.
        * jsonInterface - Array: The json interface of the contract. See options.jsonInterface.
        * data - String: The byte code of the contract. Used when the contract gets deployed.
        * from - String: The address transactions should be made from.
        * gasPrice - String: The gas price in wei to use for transactions.
        * gas - Number: The maximum gas provided for a transaction (gas limit).
    * Example
    ```
    myContract.options;
    > {
        address: '0x1234567890123456789012345678901234567891',
        jsonInterface: [...],
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        gasPrice: '10000000000000',
        gas: 1000000
    }
    
    myContract.options.from = '0x1234567890123456789012345678901234567891'; // default from address
    myContract.options.gasPrice = '20000000000000'; // default gas price in wei
    myContract.options.gas = 5000000; // provide as fallback always 5M gas
    ```
* options.address
    ```
    myContract.options.address
    ```
    The address used for this contract instance. All transactions generated by mitweb3.js from this contract will contain this address as the “to”.  
    
    The address will be stored in lowercase.
    * Property
        * address - String|null: The address for this contract, or null if it’s not yet set.
    * Example
    ```
    myContract.options.address;
    > '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
    
    // set a new address
    myContract.options.address = '0x1234FFDD...';
    ```
* options.jsonInterface
    ```
    myContract.options.jsonInterface
    ```
    The json interface object derived from the ABI of this contract.
    * Property
        * jsonInterface - Array: The json interface for this contract. Re-setting this will regenerate the methods and events of the contract instance.
    * Example
    ```
    myContract.options.jsonInterface;
    > [{
        "type":"function",
        "name":"foo",
        "inputs": [{"name":"a","type":"uint256"}],
        "outputs": [{"name":"b","type":"address"}]
    },{
        "type":"event",
        "name":"Event"
        "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
    }]
    
    // set a new interface
    myContract.options.jsonInterface = [...];
    ```
**= Methods =**
* clone
    ```
    myContract.clone()
    ```
    Clones the current contract instance.  
    * Parameters  
        none  
    * Returns  
        Object: The new contract instance.  
    * Example  
        ```
        var contract1 = new mit.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});
    
        var contract2 = contract1.clone();
        contract2.options.address = address2;
        
        (contract1.options.address ! contract2.options.address);
        > true
        ```
* deploy
    ```
    myContract.deploy(options)
    ```
    Call this function to deploy the contract to the blockchain. After successful deployment the promise will resolve with a new contract instance.  
    * Parameters  
        options - Object: The options used for deployment.   
            * data - String: The byte code of the contract.   
            * arguments - Array (optional): The arguments which get passed to the constructor on deployment.   
    * Returns  
        Object: The transaction object:  
            * Array - arguments: The arguments passed to the method before. They can be changed.  
            * Function - send: Will deploy the contract. The promise will resolve with the new contract instance, instead of the receipt!  
            * Function - estimateGas: Will estimate the gas used for deploying.  
            * Function - encodeABI: Encodes the ABI of the deployment, which is contract data + constructor parameters
            For details to the methods see the documentation below.
    * Example
    ```
    myContract.deploy({
        data: '0x12345...',
        arguments: [123, 'My String']
    })
    .send({
        from: '0x1234567890123456789012345678901234567891',
        gas: 1500000,
        gasPrice: '30000000000000'
    }, function(error, transactionHash){ ... })
    .on('error', function(error){ ... })
    .on('transactionHash', function(transactionHash){ ... })
    .on('receipt', function(receipt){
       console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){ ... })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
    
    
    // When the data is already set as an option to the contract itself
    myContract.options.data = '0x12345...';
    
    myContract.deploy({
        arguments: [123, 'My String']
    })
    .send({
        from: '0x1234567890123456789012345678901234567891',
        gas: 1500000,
        gasPrice: '30000000000000'
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
    
    
    // Simply encoding
    myContract.deploy({
        data: '0x12345...',
        arguments: [123, 'My String']
    })
    .encodeABI();
    > '0x12345...0000012345678765432'
    
    
    // Gas estimation
    myContract.deploy({
        data: '0x12345...',
        arguments: [123, 'My String']
    })
    .estimateGas(function(err, gas){
        console.log(gas);
    });
    ```
* methods  
    ```
    myContract.methods.myMethod([param1[, param2[, ...]]])
    ```
    Creates a transaction object for that method, which then can be called, send, estimated.  
    The methods of this smart contract are available through:  
        * The name: myContract.methods.myMethod(123)
        * The name with parameters: myContract.methods\['myMethod(uint256)']\(123)\
        * The signature: myContract.methods\['0x58cf5f10']\(123)\
    This allows calling functions with same name but different parameters from the JavaScript contract object.  
    * Parameters   
        Parameters of any method depend on the smart contracts methods, defined in the JSON interface.
    * Returns   
        Object: The transaction object:  
            * Array - arguments: The arguments passed to the method before. They can be changed.
            * Function - call: Will call the “constant” method and execute its smart contract method in the EVM without sending a transaction (Can’t alter the smart contract state).
            * Function - send: Will send a transaction to the smart contract and execute its method (Can alter the smart contract state).
            * Function - estimateGas: Will estimate the gas used when the method would be executed on chain.
            * Function - encodeABI: Encodes the ABI for this method. This can be send using a transaction, call the method or passing into another smart contracts method as argument.
            For details to the methods see the documentation below.
    * Example
    ```
    // calling a method

    myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
        ...
    });
    
    // or sending and using a promise
    myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    });
    
    // or sending and using the events
    
    myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .on('transactionHash', function(hash){
        ...
    })
    .on('receipt', function(receipt){
        ...
    })
    .on('confirmation', function(confirmationNumber, receipt){
        ...
    })
    .on('error', console.error);
    ```
* methods.myMethod.call
    ```
    myContract.methods.myMethod([param1[, param2[, ...]]]).call(options[, callback])
    ```
    Will call a “constant” method and execute its smart contract method in the EVM without sending any transaction. Note calling can not alter the smart contract state.
    * Parameters  
        * options - Object (optional): The options used for calling.   
            * from - String (optional): The address the call “transaction” should be made from.
            * gasPrice - String (optional): The gas price in wei to use for this call “transaction”.
            * gas - Number (optional): The maximum gas provided for this call “transaction” (gas limit).
        * callback - Function (optional): This callback will be fired with the result of the smart contract method execution as the second argument, or with an error object as the first argument.
    * Returns  
        Promise returns Mixed: The return value(s) of the smart contract method. If it returns a single value, it’s returned as is. If it has multiple return values they are returned as an object with properties and indices:
    * Example  
        ```
        // using the callback
        myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
            ...
        });
        
        // using the promise
        myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
        .then(function(result){
            ...
        });
        
        
        // MULTI-ARGUMENT RETURN:
        
        // Solidity
        contract MyContract {
            function myFunction() returns(uint256 myNumber, string myString) {
                return (23456, "Hello!%");
            }
        }
        
        // mitweb3.js
        var MyContract = new mitweb3.mit.contract(abi, address);
        MyContract.methods.myFunction().call()
        .then(console.log);
        > Result {
            myNumber: '23456',
            myString: 'Hello!%',
            0: '23456', // these are here as fallbacks if the name is not know or given
            1: 'Hello!%'
        }
        
        
        // SINGLE-ARGUMENT RETURN:
        
        // Solidity
        contract MyContract {
            function myFunction() returns(string myString) {
                return "Hello!%";
            }
        }
        
        // mitweb3.js
        var MyContract = new mitweb3.mit.contract(abi, address);
        MyContract.methods.myFunction().call()
        .then(console.log);
        > "Hello!%"
        ```
* methods.myMethod.send
    ```
    myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])
    ```
    Will send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.
    * Parameters  
        * options - Object: The options used for sending.  
            * from - String: The address the transaction should be sent from.
            * gasPrice - String (optional): The gas price in wei to use for this transaction.
            * gas - Number (optional): The maximum gas provided for this transaction (gas limit).
            * value - ``Number|String|BN|BigNumber``(optional): The value transferred for the transaction in wei.
        * callback - Function (optional): This callback will be fired first with the “transactionHash”, or with an error object as the first argument.
    * Returns  
        The callback will return the 32 bytes transaction hash.
        
        PromiEvent: A promise combined event emitter. Will be resolved when the transaction receipt is available, OR if this send() is called from a someContract.deploy(), then the promise will resolve with the new contract instance. Additionally the following events are available:  
            * "transactionHash" returns String: is fired right after the transaction is sent and a transaction hash is available.  
            * "receipt" returns Object: is fired when the transaction receipt is available. Receipts from contracts will have no logs property, but instead an events property with event names as keys and events as properties. See getPastEvents return values for details about the returned event object.  
            * "confirmation" returns Number, Object: is fired for every confirmation up to the 24th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 0 on, which is the block where it’s minded.  
            * "error" returns Error: is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.  
    * Example  
        ```
        // using the callback
        myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash){
            ...
        });
        
        // using the promise
        myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
        .then(function(receipt){
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
        
        
        // using the event emitter
        myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
        .on('transactionHash', function(hash){
            ...
        })
        .on('confirmation', function(confirmationNumber, receipt){
            ...
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
            > {
                "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
                "transactionIndex": 0,
                "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
                "blockNumber": 3,
                "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
                "cumulativeGasUsed": 314159,
                "gasUsed": 30234,
                "events": {
                    "MyEvent": {
                        returnValues: {
                            myIndexedParam: 20,
                            myOtherIndexedParam: '0x123456789...',
                            myNonIndexParam: 'My String'
                        },
                        raw: {
                            data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                            topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
                        },
                        event: 'MyEvent',
                        signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                        logIndex: 0,
                        transactionIndex: 0,
                        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                        blockNumber: 1234,
                        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
                    },
                    "MyOtherEvent": {
                        ...
                    },
                    "MyMultipleEvent":[{...}, {...}] // If there are multiple of the same event, they will be in an array
                }
            }
        })
        .on('error', console.error); // If there's an out of gas error the second parameter is the receipt.
        ```
* methods.myMethod.estimateGas
    ```
    myContract.methods.myMethod([param1[, param2[, ...]]]).estimateGas(options[, callback])
    ```
    Will call estimate the gas a method execution will take when executed in the EVM without. The estimation can differ from the actual gas used when later sending a transaction, as the state of the smart contract can be different at that time.
    * Parameters  
        * options - Object (optional): The options used for calling.  
            * from - String (optional): The address the call “transaction” should be made from.  
            * gas - Number (optional): The maximum gas provided for this call “transaction” (gas limit). Setting a specific value helps to detect out of gas errors. If all gas is used it will return the same number.  
            * value - ``Number|String|BN|BigNumber``(optional): The value transferred for the call “transaction” in wei.  
        * callback - Function (optional): This callback will be fired with the result of the gas estimation as the second argument, or with an error object as the first argument.  
    * Returns  
        Promise returns Number: The gas amount estimated.  
    * Example  
        ```
        // using the callback
        myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount){
            if(gasAmount  5000000)
                console.log('Method ran out of gas');
        });
        
        // using the promise
        myContract.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
        .then(function(gasAmount){
            ...
        })
        .catch(function(error){
            ...
        });
        ```
* methods.myMethod.encodeABI
    ```
    myContract.methods.myMethod([param1[, param2[, ...]]]).encodeABI()
    ```
    Encodes the ABI for this method. This can be used to send a transaction, call a method, or pass it into another smart contracts method as arguments.
    * Parameters  
        none  
    * Returns  
        String: The encoded ABI byte code to send via a transaction or call.  
    * Example  
        ```
        myContract.methods.myMethod(123).encodeABI();
        > '0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
        ```
**= Events =**
* once
    ```
    myContract.once(event[, options], callback)
    ```
    Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.
    * Parameters  
        * event - String: The name of the event in the contract, or "allEvents" to get all events.  
        * options - Object (optional): The options used for deployment.  
            * filter - Object (optional): Lets you filter events by indexed parameters, e.g. {filter: {myNumber: [12,13]}} means all events where “myNumber” is 12 or 13.
            * topics - Array (optional): This allows you to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.
        * callback - Function: This callback will be fired for the first event as the second argument, or an error as the first argument. See getPastEvents return values for details about the event structure.
    * Returns  
        undefined
    * Example  
        ```
        myContract.once('MyEvent', {
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error, event){ console.log(event); });
        
        // event output example
        > {
            returnValues: {
                myIndexedParam: 20,
                myOtherIndexedParam: '0x123456789...',
                myNonIndexParam: 'My String'
            },
            raw: {
                data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
            },
            event: 'MyEvent',
            signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            logIndex: 0,
            transactionIndex: 0,
            transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            blockNumber: 1234,
            address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
        }
        ```
* events
    ```
    myContract.events.MyEvent([options][, callback])
    ```
    Subscribe to an event
    * Parameters  
        * options - Object (optional): The options used for deployment.  
            * filter - Object (optional): Let you filter events by indexed parameters, e.g. {filter: {myNumber: [12,13]}} means all events where “myNumber” is 12 or 13.
            * fromBlock - Number (optional): The block number from which to get events on.
            * topics - Array (optional): This allows to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.
        * callback - Function (optional): This callback will be fired for each event as the second argument, or an error as the first argument.
    * Returns  
        EventEmitter: The event emitter has the following events:  
            * "data" returns Object: Fires on each incoming event with the event object as argument.  
            * "changed" returns Object: Fires on each event which was removed from the blockchain. The event will have the additional property "removed: true".  
            * "error" returns Object: Fires when an error in the subscription occours.  
            * The structure of the returned event Object looks as follows:  
                * event - String: The event name.
                * signature - String|Null: The event signature, null if it’s an anonymous event.  
                * address - String: Address this event originated from.
                * returnValues - Object: The return values coming from the event, e.g. {myVar: 1, myVar2: '0x234...'}.  
                * logIndex - Number: Integer of the event index position in the block.  
                * transactionIndex - Number: Integer of the transaction’s index position the event was created in.
                * transactionHash 32 Bytes - String: Hash of the transaction this event was created in.  
                * blockHash 32 Bytes - String: Hash of the block this event was created in. null when it’s still pending.  
                * blockNumber - Number: The block number this log was created in. null when still pending.
                * raw.data - String: The data containing non-indexed log parameter.  
                * raw.topics - Array: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the event.
    * Example  
        ```
        myContract.events.MyEvent({
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error, event){ console.log(event); })
        .on('data', function(event){
            console.log(event); // same results as the optional callback above
        })
        .on('changed', function(event){
            // remove event from local database
        })
        .on('error', console.error);
        
        // event output example
        > {
            returnValues: {
                myIndexedParam: 20,
                myOtherIndexedParam: '0x123456789...',
                myNonIndexParam: 'My String'
            },
            raw: {
                data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
            },
            event: 'MyEvent',
            signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            logIndex: 0,
            transactionIndex: 0,
            transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            blockNumber: 1234,
            address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
        }
        ```
* events.allEvents
    ```
    myContract.events.allEvents([options][, callback])
    ```
    Same as events but receives all events from this smart contract. Optionally the filter property can filter those events.
* getPastEvents
    ```
    myContract.getPastEvents(event[, options][, callback])
    ```
    Gets past events for this contract.
    * Parameters  
        * event - String: The name of the event in the contract, or "allEvents" to get all events.  
        * options - Object (optional): The options used for deployment.  
            * filter - Object (optional): Lets you filter events by indexed parameters, e.g. {filter: {myNumber: [12,13]}} means all events where “myNumber” is 12 or 13.  
            * fromBlock - Number (optional): The block number from which to get events on.  
            * toBlock - Number (optional): The block number to get events up to (Defaults to "latest").  
            * topics - Array (optional): This allows manually setting the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.  
        * callback - Function (optional): This callback will be fired with an array of event logs as the second argument, or an error as the first argument.
    * Returns
        Promise returns Array: An array with the past event Objects, matching the given event name and filter.  
        For the structure of a returned event Object see getPastEvents return values.
    * Example
    ```
    myContract.getPastEvents('MyEvent', {
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });
    
    > [{
        returnValues: {
            myIndexedParam: 20,
            myOtherIndexedParam: '0x123456789...',
            myNonIndexParam: 'My String'
        },
        raw: {
            data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        },
        event: 'MyEvent',
        signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },{
        ...
    }]
    ```
    
    
## mitweb3.mit.accounts
The mitweb3.mit.accounts contains functions to generate mit accounts and sign transactions and data.

To use this package standalone use:
```
var Accounts = require('mitweb3-mit-accounts');

// Passing in the mit or mitweb3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
var accounts = new Accounts('ws://localhost:8546');
```
* **create**
    ```
    mitweb3.mit.accounts.create([entropy]);
    ```
    Generates an account object with private key and public key.
    * Parameters
        * entropy - String (optional): A random string to increase entropy. If given it should be at least 32 characters. If none is given a random string will be generated using randomhex.
    * Returns  
    Object - The account object with the following structure:
        * address - string: The account address.
        * privateKey - string: The accounts private key. This should never be shared or stored unencrypted in localstorage! Also make sure to null the memory after usage.
        * signTransaction(tx [, callback]) - Function: The function to sign transactions. See mitweb3.mit.accounts.signTransaction() for more.
        * sign(data) - Function: The function to sign transactions. See mitweb3.mit.accounts.sign() for more.
    * Example
    ```
    mitweb3.mit.accounts.create();
    > {
        address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
        privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    
    mitweb3.mit.accounts.create('2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567');
    > {
        address: "0xF2CD2AA0c7926743B1D4310b2BC984a0a453c3d4",
        privateKey: "0xd7325de5c2c1cf0009fac77d3d04a9c004b038883446b065871bc3e831dcd098",
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    
    mitweb3.mit.accounts.create(mitweb3.utils.randomHex(32));
    > {
        address: "0xe78150FaCD36E8EB00291e251424a0515AA1FF05",
        privateKey: "0xcc505ee6067fba3f6fc2050643379e190e087aeffe5d958ab9f2f3ed3800fa4e",
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    ```
* **privateKeyToAccount**
    ```
    mitweb3.mit.accounts.privateKeyToAccount(privateKey);
    ```
    Creates an account object from a private key.
    * Parameters
        * privateKey - String: The private key to convert.
    * Returns
    Object - The account object with the structure seen here.
    * Example
    ```
    mitweb3.mit.accounts.privateKeyToAccount('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709');
    > {
        address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
        privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    
    mitweb3.mit.accounts.privateKeyToAccount('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709');
    > {
        address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
        privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    ```
* **signTransaction**
    ```
    mitweb3.mit.accounts.signTransaction(tx, privateKey [, callback]);
    ```
    Signs a mit transaction with a given private key.
    * Parameters
    * tx - Object: The transaction object as follows:
        * nonce - String: (optional) The nonce to use when signing this * * * * transaction. Default will use mitweb3.mit.getTransactionCount().
        * chainId - String: (optional) The chain id to use when signing this transaction. Default will use mitweb3.mit.net.getId().
        * to - String: (optional) The recevier of the transaction, can be empty when deploying a contract.
        * data - String: (optional) The call data of the transaction, can be empty for simple value transfers.
        * value - String: (optional) The value of the transaction in wei.
        * gasPrice - String: (optional) The gas price set by this transaction, if empty, it will use mitweb3.mit.gasPrice()
        * gas - String: The gas provided by the transaction.
    * privateKey - String: The private key to sign with.
    * callback - Function: (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returning Object: The signed data RLP encoded transaction, or if returnSignature is true the signature values as follows:
        * messageHash - String: The hash of the given message.
        * r - String: First 32 bytes of the signature
        * s - String: Next 32 bytes of the signature
        * v - String: Recovery value + 27
        * rawTransaction - String: The RLP encoded transaction, ready to be send using mitweb3.mit.sendSignedTransaction.
    * Example
    ```
    mitweb3.mit.accounts.signTransaction({
        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: '1000000000',
        gas: 2000000
    }, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
    .then(console.log);
    > {
        messageHash: '0x88cfbd7e51c7a40540b233cf68b62ad1df3e92462f1c6018d6d67eae0f3b08f5',
        v: '0x25',
        r: '0xc9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895',
        s: '0x727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68',
        rawTransaction: '0xf869808504e3b29200831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a0c9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895a0727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68'
    }
    
    mitweb3.mit.accounts.signTransaction({
        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: '1000000000',
        gas: 2000000,
        gasPrice: '234567897654321',
        nonce: 0,
        chainId: 1
    }, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
    .then(console.log);
    > {
        messageHash: '0x6893a6ee8df79b0f5d64a180cd1ef35d030f3e296a5361cf04d02ce720d32ec5',
        r: '0x9ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9c',
        s: '0x440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
        v: '0x25',
        rawTransaction: '0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428'
    }
    ```
* **recoverTransaction**
    ```
    mitweb3.mit.accounts.recoverTransaction(rawTransaction);
    ```
    Recovers the mit address which was used to sign the given RLP encoded transaction.
    * Parameters
        * signature - String: The RLP encoded transaction.
    * Returns
    String: The mit address used to sign this transaction.
    * Example
    ```
    mitweb3.mit.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
    > "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
    ```
* **hashMessage**
    ```
    mitweb3.mit.accounts.hashMessage(message);
    ```
    Hashes the given message to be passed mitweb3.mit.accounts.recover() function. The data will be UTF-8 HEX decoded and enveloped as follows:   
    "\x19mit Signed Message:\n" + message.length + message and hashed using keccak256.
    * Parameters
        * message - String: A message to hash, if its HEX it will be UTF8 decoded before.
    * Returns
    String: The hashed message
    * Example
    ```
    mitweb3.mit.accounts.hashMessage("Hello World")
    > "0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2"
    
    // the below results in the same hash
    mitweb3.mit.accounts.hashMessage(mitweb3.utils.utf8ToHex("Hello World"))
    > "0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2"
    ```
* **sign**
    ```
    mitweb3.mit.accounts.sign(data, privateKey);
    ```
    Signs arbitrary data. This data is before UTF-8 HEX decoded and enveloped as follows:  
    "\x19mit Signed Message:\n" + message.length + message.
    * Parameters
        * data - String: The data to sign. If its a string it will be
        * privateKey - String: The private key to sign with.
    * Returns
    String|Object: The signed data RLP encoded signature, or if returnSignature is true the signature values as follows:
        * message - String: The the given message.
        * messageHash - String: The hash of the given message.
        * r - String: First 32 bytes of the signature
        * s - String: Next 32 bytes of the signature
        * v - String: Recovery value + 27
    * Example
    ```
    mitweb3.mit.accounts.sign('Some data', '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
    > {
        message: 'Some data',
        messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',
        v: '0x1c',
        r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',
        s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029',
        signature: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c'
    }
    ```
* **recover**
    ```
    mitweb3.mit.accounts.recover(signatureObject);
    mitweb3.mit.accounts.recover(message, signature [, preFixed]);
    mitweb3.mit.accounts.recover(message, v, r, s [, preFixed]);
    ```
    Recovers the mit address which was used to sign the given data.
    * Parameters
        * message|signatureObject - String|Object: Either signed message or hash, or the signature object as following values:
            * messageHash - String: The hash of the given message already prefixed with "\x19mit Signed Message:\n" + message.length + message.
            * r - String: First 32 bytes of the signature
            * s - String: Next 32 bytes of the signature
            * v - String: Recovery value + 27
        * signature - String: The raw RLP encoded signature, OR parameter 2-4 as v, r, s values.
        * preFixed - Boolean (optional, default: false): If the last parameter is true, the given message will NOT automatically be prefixed with "\x19mit Signed Message:\n" + message.length + message, and assumed to be already prefixed.
    * Returns
    String: The mit address used to sign this data.
    * Example
    ```
    mitweb3.mit.accounts.recover({
        messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',
        v: '0x1c',
        r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',
        s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029'
    })
    > "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"
    
    // hash signature
    mitweb3.mit.accounts.recover('0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c');
    > "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"
    
    // hash, v, r, s
    mitweb3.mit.accounts.recover('0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655', '0x1c', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd', '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029');
    > "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"
    ```
* **encrypt**
    ```
    mitweb3.mit.accounts.encrypt(privateKey, password);
    ```
    Encrypts a private key to the mitweb3 keystore v3 standard.
    * Parameters
        * privateKey - String: The private key to encrypt.
        * password - String: The password used for encryption.
    * Returns
    Object: The encrypted keystore v3 JSON.
    * Example
    ```
    mitweb3.mit.accounts.encrypt('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', 'test!')
    > {
        version: 3,
        id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
        address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
        crypto: {
            ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
            cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
                n: 262144,
                r: 8,
                p: 1
            },
            mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
        }
    }

    ```
* **decrypt**
    ```
    mitweb3.mit.accounts.decrypt(keystoreJsonV3, password);
    ```
    Decrypts a keystore v3 JSON, and creates the account.
    * Parameters
        * encryptedPrivateKey - String: The encrypted private key to decrypt.
        * password - String: The password used for encryption.
    * Returns
    Object: The decrypted account.
    * Example
    ```
    mitweb3.mit.accounts.decrypt({
        version: 3,
        id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
        address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
        crypto: {
            ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
            cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
                n: 262144,
                r: 8,
                p: 1
            },
            mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
        }
    }, 'test!');
    > {
        address: "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23",
        privateKey: "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318",
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    ```
* **wallet**
    ```
    mitweb3.mit.accounts.wallet;
    ```
    Contains an in memory wallet with multiple accounts. These accounts can be used when using mitweb3.mit.sendTransaction().
    * Example
    ```
    mitweb3.mit.accounts.wallet;
    > Wallet {
        0: {...}, // account by index
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},  // same account by address
        "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},  // same account by address lowercase
        1: {...},
        "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...},
        "0xd0122fc8df283027b6285cc889f5aa624eac1d23": {...},
    
        add: function(){},
        remove: function(){},
        save: function(){},
        load: function(){},
        clear: function(){},
    
        length: 2,
    }
    ```
* **wallet.create**
    ```
    mitweb3.mit.accounts.wallet.create(numberOfAccounts [, entropy]);
    ```
    Generates one or more accounts in the wallet. If wallets already exist they will not be overridden.
    * Parameters
        * numberOfAccounts - Number: Number of accounts to create. Leave empty to create an empty wallet.
        * entropy - String (optional): A string with random characters as additional entropy when generating accounts. If given it should be at least 32 characters.
    * Returns
    Object: The wallet object.
    * Example
    ```
    mitweb3.mit.accounts.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
    > Wallet {
        0: {...},
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
        "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},
        ...
    }
    ```
* **wallet.add**
    ```
    mitweb3.mit.accounts.wallet.add(account);
    ```
    Adds an account using a private key or account object to the wallet.
    * Parameters
        * account - String|Object: A private key or account object created with mitweb3.mit.accounts.create().
    * Returns
    Object: The added account.
    * Example
    ```
    mitweb3.mit.accounts.wallet.add('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
    > {
        index: 0,
        address: '0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
        privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    
    mitweb3.mit.accounts.wallet.add({
        privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
        address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
    });
    > {
        index: 0,
        address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
        privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
        signTransaction: function(tx){...},
        sign: function(data){...},
        encrypt: function(password){...}
    }
    ```
* **wallet.remove**
    ```
    mitweb3.mit.accounts.wallet.remove(account);
    ```
    Removes an account from the wallet.
    * Parameters
        * account - String|Number: The account address, or index in the wallet.
    * Returns
    Boolean: true if the wallet was removed. false if it couldn’t be found.
    * Example
    ```
    mitweb3.mit.accounts.wallet;
    > Wallet {
        0: {...},
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...}
        1: {...},
        "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01": {...}
        ...
    }
    
    mitweb3.mit.accounts.wallet.remove('0xF0109fC8DF283027b6285cc889F5aA624EaC1F55');
    > true
    
    mitweb3.mit.accounts.wallet.remove(3);
    > false
    ```
* **wallet.clear**
    ```
    mitweb3.mit.accounts.wallet.clear();
    ```
    Securely empties the wallet and removes all its accounts.
    * Parameters
        none
    * Returns
    Object: The wallet object.
    * Example
    ```
    mitweb3.mit.accounts.wallet.clear();
    > Wallet {
        add: function(){},
        remove: function(){},
        save: function(){},
        load: function(){},
        clear: function(){},
    
        length: 0
    }
    ```
* **wallet.encrypt**
    ```
    mitweb3.mit.accounts.wallet.encrypt(password);
    ```
    Encrypts all wallet accounts to and array of encrypted keystore v3 objects.
    * Parameters
        * password - String: The password which will be used for encryption.
    * Returns
    Array: The encrypted keystore v3.
    * Example
    ```
    mitweb3.mit.accounts.wallet.encrypt('test');
    > [ { version: 3,
        id: 'dcf8ab05-a314-4e37-b972-bf9b86f91372',
        address: '06f702337909c06c82b09b7a22f0a2f0855d1f68',
        crypto:
         { ciphertext: '0de804dc63940820f6b3334e5a4bfc8214e27fb30bb7e9b7b74b25cd7eb5c604',
           cipherparams: [Object],
           cipher: 'aes-128-ctr',
           kdf: 'scrypt',
           kdfparams: [Object],
           mac: 'b2aac1485bd6ee1928665642bf8eae9ddfbc039c3a673658933d320bac6952e3' } },
      { version: 3,
        id: '9e1c7d24-b919-4428-b10e-0f3ef79f7cf0',
        address: 'b5d89661b59a9af0b34f58d19138baa2de48baaf',
        crypto:
         { ciphertext: 'd705ebed2a136d9e4db7e5ae70ed1f69d6a57370d5fbe06281eb07615f404410',
           cipherparams: [Object],
           cipher: 'aes-128-ctr',
           kdf: 'scrypt',
           kdfparams: [Object],
           mac: 'af9eca5eb01b0f70e909f824f0e7cdb90c350a802f04a9f6afe056602b92272b' } }
    ]
    ```
* **wallet.decrypt**
    ```
    mitweb3.mit.accounts.wallet.decrypt(keystoreArray, password);
    ```
    Decrypts keystore v3 objects.
    * Parameters
        * keystoreArray - Array: The encrypted keystore v3 objects to decrypt.
        * password - String: The password which will be used for encryption.
    * Returns
    Object: The wallet object.
    * Example
    ```
    mitweb3.mit.accounts.wallet.decrypt([
      { version: 3,
      id: '83191a81-aaca-451f-b63d-0c5f3b849289',
      address: '06f702337909c06c82b09b7a22f0a2f0855d1f68',
      crypto:
       { ciphertext: '7d34deae112841fba86e3e6cf08f5398dda323a8e4d29332621534e2c4069e8d',
         cipherparams: { iv: '497f4d26997a84d570778eae874b2333' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams:
          { dklen: 32,
            salt: '208dd732a27aa4803bb760228dff18515d5313fd085bbce60594a3919ae2d88d',
            n: 262144,
            r: 8,
            p: 1 },
         mac: '0062a853de302513c57bfe3108ab493733034bf3cb313326f42cf26ea2619cf9' } },
       { version: 3,
      id: '7d6b91fa-3611-407b-b16b-396efb28f97e',
      address: 'b5d89661b59a9af0b34f58d19138baa2de48baaf',
      crypto:
       { ciphertext: 'cb9712d1982ff89f571fa5dbef447f14b7e5f142232bd2a913aac833730eeb43',
         cipherparams: { iv: '8cccb91cb84e435437f7282ec2ffd2db' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams:
          { dklen: 32,
            salt: '08ba6736363c5586434cd5b895e6fe41ea7db4785bd9b901dedce77a1514e8b8',
            n: 262144,
            r: 8,
            p: 1 },
         mac: 'd2eb068b37e2df55f56fa97a2bf4f55e072bef0dd703bfd917717d9dc54510f0' } }
    ], 'test');
    > Wallet {
        0: {...},
        1: {...},
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
        "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...}
        ...
    }
    ```
* **wallet.save**
    ```
    mitweb3.mit.accounts.wallet.save(password [, keyName]);
    ```
    Stores the wallet encrypted and as string in local storage.
    * Parameters
        * password - String: The password to encrypt the wallet.
        * keyName - String: (optional) The key used for the local storage position, defaults to "mitweb3js_wallet".
    * Returns
    Boolean
    * Example
    ```
    mitweb3.mit.accounts.wallet.save('test#!$');
    > true
    ```
* **wallet.load**
    ```
    mitweb3.mit.accounts.wallet.load(password [, keyName]);
    ```
    Loads a wallet from local storage and decrypts it.
    * Parameters
        * password - String: The password to decrypt the wallet.
        * keyName - String: (optional) The key used for the localstorage position, defaults to "mitweb3js_wallet".
    * Returns
    Object: The wallet object.
    * Example
    ```
    mitweb3.mit.accounts.wallet.load('test#!$', 'myWalletKey');
    > Wallet {
        0: {...},
        1: {...},
        "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
        "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...}
        ...
    }
    ```
## mitweb3.mit.personal
The mitweb3-mit-personal package allows you to interact with the mit node’s accounts.

```
var Personal = require('mitweb3-mit-personal');

// "Personal.providers.givenProvider" will be set if in an mit supported browser.
var personal = new Personal(Personal.givenProvider || 'ws://some.local-or-remote.node:8546');


// or using the mitweb3 umbrella package

var MitWeb3 = require('mitweb3');
var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://some.local-or-remote.node:8546');

// -> mitweb3.mit.personal
```
* **setProvider** 
    ```
    mitweb3.setProvider(myProvider)
    mitweb3.mit.setProvider(myProvider)
    mitweb3.shh.setProvider(myProvider)
    mitweb3.bzz.setProvider(myProvider)
    ...
    ```
    Will change the provider for its module.  
    <font color=red size=3>! note :</font>
    When called on the umbrella package mitweb3 it will also set the provider for all sub modules mitweb3.mit, mitweb3.shh, etc EXCEPT mitweb3.bzz which needs a separate provider at all times.
    * Parameters  
    object - myProvider: a valid provider.
    * Returns  
    Boolean
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    var mitweb3 = new MitWeb3('http://localhost:8545');
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.HttpProvider('http://localhost:8545'));
    
    // change provider
    mitweb3.setProvider('ws://localhost:8546');
    // or
    mitweb3.setProvider(new MitWeb3.providers.WebsocketProvider('ws://localhost:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **providers** 
    ```
    mitweb3.providers
    mitweb3.mit.providers
    mitweb3.shh.providers
    mitweb3.bzz.providers
    ...
    ```
    Contains the current available providers. 
    * Value  
    Object with the following providers:  
        * Object - HttpProvider: The HTTP provider is deprecated, as it won’t work for subscriptions.
        * Object - WebsocketProvider: The Websocket provider is the standard for usage in legacy browsers.
        * Object - IpcProvider: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://remotenode.com:8546');
    // or
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || new MitWeb3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **providers** 
    ```
    mitweb3.givenProvider
    mitweb3.mit.givenProvider
    mitweb3.shh.givenProvider
    mitweb3.bzz.givenProvider
    ...
    ```
    When using mitweb3.js in an mit compatible browser, it will set with the current native provider by that browser. Will return the given provider by the (browser) environment, otherwise null.
    * Returns  
    Object: The given provider set or null;
    * Example  
* **currentProvider** 
    ```
    mitweb3.currentProvider
    mitweb3.mit.currentProvider
    mitweb3.shh.currentProvider
    mitweb3.bzz.currentProvider
    ...
    ```
    Will return the current provider, otherwise null.
    * Returns  
    object: The current provider set or null;
    * Example
    ```
    mitweb3.currentProvider
    >{
      newAccount: function(),
      openWallet: function(),
      send: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sendAsync: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sign: function(),
      unlockAccount: function()
    }
    ```
* **BatchRequest** 
    ```
    new mitweb3.BatchRequest()
    new mitweb3.mit.BatchRequest()
    new mitweb3.shh.BatchRequest()
    new mitweb3.bzz.BatchRequest()
    ...
    ```
    Class to create and execute batch requests.
    * Parameters  
    none
    * Returns  
    Object: With the following methods:
        * add(request): To add a request object to the batch call.
        * execute(): Will execute the batch request.
    * Example
    ```
    var contract = new mitweb3.mit.Contract(abi, address);

    var batch = new mitweb3.BatchRequest();
    batch.add(mitweb3.mit.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    batch.execute();
    ```
* **extend** 
    ```
    mitweb3.extend(methods)
    mitweb3.mit.extend(methods)
    mitweb3.shh.extend(methods)
    mitweb3.bzz.extend(methods)
    ...
    ```
    Allows extending the mitweb3 modules.  
    <font color=red size=3>! note :</font>
    You also have *.extend.formatters as additional formatter functions to be used for in and output formatting. Please see the source file for function details.
    * Parameters  
    methods - Object: Extension object with array of methods description objects as follows: provider.  
        * property - String: (optional) The name of the property to add to the module. If no property is set it will be added to the module directly.
        * methods - Array: The array of method descriptions:  
            * name - String: Name of the method to add.
            * call - String: The RPC method name.
            * params - Number: (optional) The number of parameters for that function. Default 0.
            * inputFormatter - Array: (optional) Array of inputformatter functions. Each array item responds to a function parameter, so if you want some parameters not to be formatted, add a null instead.
            * outputFormatter - ``Function: (optional) Can be used to format the output of the method.
    * Returns  
    Object: The extended module.
    * Example  
    ```
    mitweb3.extend({
        property: 'myModule',
        methods: [{
            name: 'getBalance',
            call: 'mit_getBalance',
            params: 2,
            inputFormatter: [mitweb3.extend.formatters.inputAddressFormatter, mitweb3.extend.formatters.inputDefaultBlockNumberFormatter],
            outputFormatter: mitweb3.utils.hexToNumberString
        },{
            name: 'getGasPriceSuperFunction',
            call: 'mit_gasPriceSuper',
            params: 2,
            inputFormatter: [null, mitweb3.utils.numberToHex]
        }]
    });
    
    mitweb3.extend({
        methods: [{
            name: 'directCall',
            call: 'mit_callForFun',
        }]
    });
    
    console.log(mitweb3);
    > MitWeb3{
        myModule: {
            getBalance: function(){},
            getGasPriceSuperFunction: function(){}
        },
        directCall: function(){},
        mit: Mit {...},
        bzz: Bzz {...},
        ...
    }
    ```
* **newAccount**
    ```
    mitweb3.mit.personal.newAccount(password, [callback])
    ```
    * Parameters
        * password - String: The password to encrypt this account with.
    * Returns
    Promise returns String: The address of the newly created account.
    * Example
    ```
    mitweb3.mit.personal.newAccount('!@superpassword')
    .then(console.log);
    > '0x1234567891011121314151617181920212223456'
    ```
* **sign**
    ```
    mitweb3.mit.personal.sign(dataToSign, address, password [, callback])
    ```
    Signs data using a specific account.
    * Parameters
        * String - Data to sign. If String it will be converted using mitweb3.utils.utf8ToHex.
        * String - Address to sign data with.
         *String - The password of the account to sign data with.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The signature.
    * Example
    ```
    mitweb3.mit.personal.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
    
    // the below is the same
    mitweb3.mit.personal.sign(mitweb3.utils.utf8ToHex("Hello world"), "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

    ```
* **ecRecover**
    ```
    mitweb3.mit.personal.ecRecover(dataThatWasSigned, signature [, callback])
    ```
    Recovers the account that signed the data.
    * Parameters
        * String - Data that was signed. If String it will be converted using mitweb3.utils.utf8ToHex.
        * String - The signature.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns String - The account.
    * Example
    ```
    mitweb3.mit.personal.ecRecover("Hello world", "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400").then(console.log);
    > "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"
    ```
* **signTransaction**
    ```
    mitweb3.mit.personal.signTransaction(transaction, password [, callback])
    ```
    Signs a transaction. This account needs to be unlocked.
    * Parameters
        * Object - The transaction data to sign mitweb3.mit.sendTransaction() for more.
        * String - The password of the from account, to sign the transaction with.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns
    Promise returns Object - The RLP encoded transaction. The raw property can be used to send the transaction using mitweb3.mit.sendSignedTransaction.
    * Example
    ```
    mitweb3.mit.signTransaction({
        from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }, 'MyPassword!').then(console.log);
    > {
        raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        tx: {
            nonce: '0x0',
            gasPrice: '0x4a817c800',
            gas: '0x5208',
            to: '0x3535353535353535353535353535353535353535',
            value: '0xde0b6b3a7640000',
            input: '0x',
            v: '0x25',
            r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
            s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
            hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
        }
    }

    ```
    //TODO
    getAccounts, unlockAccount, lockAccount, sendTransaction
## mitweb3.mit.Iban
The mitweb3.mit.Iban function lets convert mit addresses from and to IBAN and BBAN.
* Iban
    ```
    new mitweb3.mit.Iban(ibanAddress)
    ```
    Generates a iban object with conversion methods and vailidity checks. Also has singleton functions for conversion like Iban.toAddress(), Iban.toIban(), Iban.fromMitAddress(), Iban.fromBban(), Iban.createIndirect(), Iban.isValid().
    * Parameters  
        String: the IBAN address to instantiate an Iban instance from.
    * Returns  
        Object - The Iban instance.
    * Example
    ```
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    ```
* toAddress
    ```
    mitweb3.mit.Iban.toAddress(ibanAddress)
    ```
    Singleton: Converts a direct IBAN address into a mit address.
    * Parameters  
        String: the IBAN address to convert.
    * Returns  
        String - The mit address.
    * Example
    ```
    mitweb3.mit.Iban.toAddress("XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS");
    > "0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8"

    ```
* toIban
    ```
    mitweb3.mit.Iban.toIban(address)
    ```
    Singleton: Converts a mit address to a direct IBAN address.
    * Parameters  
        String: the mit address to convert.
    * Returns  
        String - The IBAN address.
    * Example
    ```
    mitweb3.mit.Iban.toIban("0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8");
    > "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"

    ```
* fromMitAddress
    ```
    mitweb3.mit.Iban.fromMitAddress(address)
    ```
    Singleton: Converts a mit address to a direct IBAN instance.
    * Parameters  
        String: the mit address to convert.
    * Returns  
        Object - The IBAN instance.
    * Example
    ```
    mitweb3.mit.Iban.fromMitAddress("0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8");
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}
    ```
* fromBban
    ```
    mitweb3.mit.Iban.fromBban(bbanAddress)
    ```
    Singleton: Converts an BBAN address to a direct IBAN instance.
    * Parameters  
        String: the BBAN address to convert.
    * Returns  
        Object - The IBAN instance.
    * Example
    ```
    mitweb3.mit.Iban.fromBban('TNBXREGGAVOFYORK');
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}
    ```
* createIndirect
    ```
    mitweb3.mit.Iban.createIndirect(options)
    ```
    Singleton: Creates an indirect IBAN address from a institution and identifier.
    * Parameters  
        Object: the options object as follows:
        * institution - String: the institution to be assigned
        * identifier - String: the identifier to be assigned
    * Returns  
        Object - The IBAN instance.
    * Example
    ```
    mitweb3.mit.Iban.createIndirect({
      institution: "XREG",
      identifier: "GAVOFYORK"
    });
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}
    ```
* isValid
    ```
    mitweb3.mit.Iban.isValid(address)
    ```
    Singleton: Checks if an IBAN address is valid.
    * Parameters  
       String: the IBAN address to check.
    * Returns  
        Boolean
    * Example
    ```
    mitweb3.mit.Iban.isValid("XE81TNBXREGGAVOFYORK");
    > true
    
    mitweb3.mit.Iban.isValid("XE82TNBXREGGAVOFYORK");
    > false // because the checksum is incorrect
    
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.isValid();
    > true
    ```
* isDirect
    ```
    mitweb3.mit.Iban.isDirect()
    ```
    Checks if the IBAN instance is direct.
    * Parameters  
        none
    * Returns  
        Boolean
    * Example
    ```
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.isDirect();
    > false

    ```
* isIndirect
    ```
    mitweb3.mit.Iban.isIndirect()
    ```
    Checks if the IBAN instance is indirect.
    * Parameters  
        none
    * Returns  
        Boolean
    * Example
    ```
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.isIndirect();
    > true
    ```
* checksum
    ```
    mitweb3.mit.Iban.checksum()
    ```
    Returns the checksum of the IBAN instance.
    * Parameters  
        none
    * Returns  
        String: The checksum of the IBAN
    * Example
    ```
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.checksum();
    > "81"
    ```
* institution
    ```
    mitweb3.mit.Iban.institution()
    ```
    Returns the institution of the IBAN instance.
    * Parameters  
        none
    * Returns  
        String: The institution of the IBAN
    * Example
    ```
    var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.institution();
    > 'XREG'
    ```
* client
    ```
    mitweb3.mit.Iban.client()
    ```
    Returns the client of the IBAN instance.
    * Parameters  
        none
    * Returns  
        String: The client of the IBAN
    * Example
    ```
   var iban = new mitweb3.mit.Iban("XE81TNBXREGGAVOFYORK");
    iban.client();
    > 'GAVOFYORK'
    ```
* toAddress
    ```
    mitweb3.mit.Iban.toAddress()
    ```
    Returns the mit address of the IBAN instance.
    * Parameters  
        none
    * Returns  
        String: The mit address of the IBAN
    * Example
    ```
    var iban = new mitweb3.mit.Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
    iban.toAddress();
    > '0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8'
    ```
* toString
    ```
    mitweb3.mit.Iban.toString()
    ```
    Returns the IBAN address of the IBAN instance.
    * Parameters  
        none
    * Returns  
        String: The IBAN address.
    * Example
    ```
    var iban = new mitweb3.mit.Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
    iban.toString();
    > 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'
    ```
## mitweb3.mit.abi
The mitweb3.mit.abi functions let you de- and encode parameters to ABI (Application Binary Interface) for function calls to the EVM (Mit Virtual Machine).
* encodeFunctionSignature
    ```
    mitweb3.mit.abi.encodeFunctionSignature(functionName);
    ```
    Encodes the function name to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including types.
    * Parameters  
        functionName - String|Object: The function name to encode. or the JSON interface object of the function. If string it has to be in the form function(type,type,...), e.g: myFunction(uint256,uint32[],bytes10,bytes)
    * Returns  
        String - The ABI signature of the function.
    * Example
    ```
    // From a JSON interface object
    mitweb3.mit.abi.encodeFunctionSignature({
        name: 'myMethod',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'myNumber'
        },{
            type: 'string',
            name: 'myString'
        }]
    })
    > 0x24ee0097
    
    // Or string
    mitweb3.mit.abi.encodeFunctionSignature('myMethod(uint256,string)')
    > '0x24ee0097'
    ```
* encodeEventSignature
    ```
    mitweb3.mit.abi.encodeEventSignature(eventName);
    ```
    Encodes the event name to its ABI signature, which are the sha3 hash of the event name including input types.
    * Parameters  
        eventName - String|Object: The event name to encode. or the JSON interface object of the event. If string it has to be in the form event(type,type,...), e.g: myEvent(uint256,uint32[],bytes10,bytes)
    * Returns  
        String - The ABI signature of the event.
    * Example
    ```
    mitweb3.mit.abi.encodeEventSignature('myEvent(uint256,bytes32)')
    > 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
    
    // or from a json interface object
    mitweb3.mit.abi.encodeEventSignature({
        name: 'myEvent',
        type: 'event',
        inputs: [{
            type: 'uint256',
            name: 'myNumber'
        },{
            type: 'bytes32',
            name: 'myBytes'
        }]
    })
    > 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
    ```
* encodeParameter
    ```
    mitweb3.mit.abi.encodeParameter(type, parameter);
    ```
    Encodes a parameter based on its type to its ABI representation.
    * Parameters  
        * type - String: The type of the parameter, see the solidity documentation for a list of types.
        * parameter - Mixed: The actual parameter to encode.
    * Returns  
        String - The ABI encoded parameter.
    * Example
    ```
    mitweb3.mit.abi.encodeParameter('uint256', '2345675643');
    > "0x000000000000000000000000000000000000000000000000000000008bd02b7b"
    
    mitweb3.mit.abi.encodeParameter('uint256', '2345675643');
    > "0x000000000000000000000000000000000000000000000000000000008bd02b7b"
    
    mitweb3.mit.abi.encodeParameter('bytes32', '0xdf3234');
    > "0xdf32340000000000000000000000000000000000000000000000000000000000"
    
    mitweb3.mit.abi.encodeParameter('bytes', '0xdf3234');
    > "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000"
    
    mitweb3.mit.abi.encodeParameter('bytes32[]', ['0xdf3234', '0xfdfd']);
    > "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000"

    ```
* encodeParameters
    ```
    mitweb3.mit.abi.encodeParameters(typesArray, parameters);
    ```
    Encodes a function parameters based on its JSON interface object.
    * Parameters  
        * typesArray - Array|Object: An array with types or a JSON interface of a function. See the solidity documentation for a list of types.
        * parameters - Array: The parameters to encode.
    * Returns  
        String - The ABI encoded parameters.
    * Example
    ```
    mitweb3.mit.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%']);
    > "0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"
    
    mitweb3.mit.abi.encodeParameters(['uint8[]','bytes32'], [['34','434'], '0x324567fff']);
    > "0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000001b2"
    ```
* encodeFunctionCall
    ```
    mitweb3.mit.abi.encodeFunctionCall(jsonInterface, parameters);
    ```
    Encodes a function call using its JSON interface object and given paramaters.
    * Parameters  
        * jsonInterface - Object: The JSON interface object of a function.
        * parameters - Array: The parameters to encode.
    * Returns  
        String - The ABI encoded function call. Means function signature + parameters.
    * Example
    ```
    mitweb3.mit.abi.encodeFunctionCall({
        name: 'myMethod',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'myNumber'
        },{
            type: 'string',
            name: 'myString'
        }]
    }, ['2345675643', 'Hello!%']);
    > "0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"
    ```
* decodeParameter
    ```
    mitweb3.mit.abi.decodeParameter(type, hexString);
    ```
    Decodes an ABI encoded parameter to its JavaScript type.
    * Parameters  
        * type - String: The type of the parameter, see the solidity documentation for a list of types.
        * hexString - String: The ABI byte code to decode.
    * Returns  
        Mixed - The decoded parameter.
    * Example
    ```
    mitweb3.mit.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010');
    > "16"

    mitweb3.mit.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000');
    > "Hello!%!"
    ```
* decodeParameters
    ```
    mitweb3.mit.abi.decodeParameters(typesArray, hexString);
    ```
    Decodes ABI encoded parameters to its JavaScript types.
    * Parameters  
        * typesArray - Array|Object: An array with types or a JSON interface outputs array. See the solidity documentation for a list of types.
        * hexString - String: The ABI byte code to decode.
    * Returns  
        Object - The result object containing the decoded parameters.
    * Example
    ```
    mitweb3.mit.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000');
    > Result { '0': 'Hello!%!', '1': '234' }
    
    mitweb3.mit.abi.decodeParameters([{
        type: 'string',
        name: 'myString'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000');
    > Result {
        '0': 'Hello!%!',
        '1': '234',
        myString: 'Hello!%!',
        myNumber: '234'
    }
    ```
* decodeLog
    ```
    mitweb3.mit.abi.decodeLog(inputs, hexString, topics);
    ```
    Decodes ABI encoded log data and indexed topic data.
    * Parameters  
        * inputs - Object: A JSON interface inputs array. See the solidity documentation for a list of types.
        * hexString - String: The ABI byte code in the data field of a log.
        * topics - Array: An array with the index parameter topics of the log, without the topic[0] if its a non-anonymous event, otherwise with topic[0].
    * Returns  
        Object - The result object containing the decoded parameters.
    * Example
    ```
    mitweb3.mit.abi.decodeLog([{
        type: 'string',
        name: 'myString'
    },{
        type: 'uint256',
        name: 'myNumber',
        indexed: true
    },{
        type: 'uint8',
        name: 'mySmallNumber',
        indexed: true
    }],
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
    ['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010']);
    > Result {
        '0': 'Hello%!',
        '1': '62224',
        '2': '16',
        myString: 'Hello%!',
        myNumber: '62224',
        mySmallNumber: '16'
    }
    ```
## mitweb3.*.net
The mitweb3-net package allows you to interact with the mit nodes network properties.
```
var Net = require('mitweb3-net');

// "Personal.providers.givenProvider" will be set if in a mit supported browser.
var net = new Net(Net.givenProvider || 'ws://some.local-or-remote.node:8546');


// or using the mitweb3 umbrella package

var MitWeb3 = require('mitweb3');
var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://some.local-or-remote.node:8546');

// -> mitweb3.mit.net
// -> mitweb3.bzz.net
// -> mitweb3.shh.net
```
* getId
    ```
    mitweb3.mit.net.getId([callback])
    mitweb3.bzz.net.getId([callback])
    mitweb3.shh.net.getId([callback])
    ```
    Gets the current network ID.
    * Parameters  
        none
    * Returns  
        Promise returns Number: The network ID.
    * Example
    ```
    mitweb3.mit.net.getId()
    .then(console.log);
    > 1
    ```
* isListening
    ```
    mitweb3.mit.net.isListening([callback])
    mitweb3.bzz.net.isListening([callback])
    mitweb3.shh.net.isListening([callback])
    ```
    Checks if the node is listening for peers.
    * Parameters  
        none
    * Returns  
        Promise returns Boolean
    * Example
    ```
    mitweb3.mit.isListening()
    .then(console.log);
    > true
    ```
* getPeerCount
    ```
    mitweb3.mit.net.getPeerCount([callback])
    mitweb3.bzz.net.getPeerCount([callback])
    mitweb3.shh.net.getPeerCount([callback])
    ```
    Get the number of peers connected to.
    * Parameters  
        none
    * Returns  
        Promise returns Number
    * Example
    ```
    mitweb3.mit.getPeerCount()
    .then(console.log);
    > 25
    ```
## mitweb3.bzz
The mitweb3-bzz package allows you to interact swarm the decentralized file store. For more see the Swarm Docs.
```
var Bzz = require('mitweb3-bzz');

// will autodetect if the "mit" object is present and will either connect to the local swarm node, or the swarm-gateways.net.
// Optional you can give your own provider URL; If no provider URL is given it will use "http://swarm-gateways.net"
var bzz = new Bzz(Bzz.givenProvider || 'http://swarm-gateways.net');


// or using the mitweb3 umbrella package

var MitWeb3 = require('mitweb3');
var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://some.local-or-remote.node:8546');

// -> mitweb3.bzz.currentProvider // if MitWeb3.givenProvider was a mit provider it will set: "http://localhost:8500" otherwise it will set: "http://swarm-gateways.net"

// set the provider manually if necessary
mitweb3.bzz.setProvider("http://localhost:8500");
```
* setProvider
    ```
    mitweb3.bzz.setProvider(myProvider)
    ```
    Will change the provider for its module.
    * Parameters  
        Object - myProvider: a valid provider.
    * Returns  
        Boolean
    * Example
    ```
    var Bzz = require('mitweb3-bzz');
    var bzz = new Bzz('http://localhost:8500');

    // change provider
    bzz.setProvider('http://swarm-gateways.net');
    ```
* givenProvider
    ```
    mitweb3.bzz.givenProvider
    ```
    When using mitweb3.js in a mit compatible browser, it will set with the current native provider by that browser. Will return the given provider by the (browser) environment, otherwise null.
    * Returns  
        Object: The given provider set or null;
    * Example
    ```
    bzz.givenProvider;
    > {
        send: function(),
        on: function(),
        bzz: "http://localhost:8500",
        shh: true,
        ...
    }
    
    bzz.setProvider(bzz.givenProvider || "http://swarm-gateways.net");

    ```
* currentProvider
    ```
    bzz.currentProvider
    ```
    Will return the current provider URL, otherwise null.
    * Returns  
        Object: The current provider URL or null;
    * Example
    ```
    bzz.currentProvider;
    > "http://localhost:8500"
    
    
    if(!bzz.currentProvider) {
        bzz.setProvider("http://swarm-gateways.net");
    }
    
    ```
* upload
    ```
    mitweb3.bzz.upload(mixed)
    ```
    Uploads files folders or raw data to swarm.
    * Parameters  
        * mixed - String|Buffer|Uint8Array|Object: The data to upload, can be a file content, file Buffer/Uint8Array, multiple files, or a directory or file (only in node.js). The following types are allowed:  
            * String|Buffer|Uint8Array: A file content, file Uint8Array or Buffer to upload, or:
            * Object:
                * Multiple key values for files and directories. The paths will be kept the same:
                    * key must be the files path, or name, e.g. "/foo.txt" and its value is an object with:
                        * type: The mime-type of the file, e.g. "text/html".
                    * data: A file content, file Uint8Array or Buffer to upload.
                * Upload a file or a directory from disk in Node.js. Requires and object with the following properties:
                    * path: The path to the file or directory.
                    * kind: The type of the source "directory", "file" or "data".
                    * defaultFile (optional): Path of the “defaultFile” when "kind": "directory", e.g. "/index.html".
                * Upload file or folder in the browser. Requres and object with the following properties:
                    * pick: The file picker to launch. Can be "file", "directory" or "data".
    * Returns  
        Promise returning String: Returns the content hash of the manifest.
    * Example
    ```
   var bzz = mitweb3.bzz;

    // raw data
    bzz.upload("test file").then(function(hash) {
        console.log("Uploaded file. Address:", hash);
    })
    
    // raw directory
    var dir = {
        "/foo.txt": {type: "text/plain", data: "sample file"},
        "/bar.txt": {type: "text/plain", data: "another file"}
    };
    bzz.upload(dir).then(function(hash) {
        console.log("Uploaded directory. Address:", hash);
    });
    
    // upload from disk in node.js
    bzz.upload({
        path: "/path/to/thing",      // path to data / file / directory
        kind: "directory",           // could also be "file" or "data"
        defaultFile: "/index.html"   // optional, and only for kind = "directory"
    })
    .then(console.log)
    .catch(console.log);
    
    // upload from disk in the browser
    bzz.upload({pick: "file"}) // could also be "directory" or "data"
    .then(console.log);
    ```
* download
    ```
    mitweb3.bzz.download(bzzHash [, localpath])
    ```
    Downloads files and folders from swarm, as buffer or to disk (only node.js).
    * Parameters  
        * bzzHash - String: The file or directory to download. If the hash is a raw file it will return a Buffer, if a manifest file, it will return the directory structure. If the localpath is given, it will return that path where it downloaded the files to.
        * localpath - String: The local folder to download the content into. (only node.js)
    * Returns  
        Promise returning Buffer|Object|String: The Buffer of the file downloaded, an object with the directory structure, or the path where it was downloaded to.
    * Example
    ```
    var bzz = mitweb3.bzz;

    // download raw file
    var fileHash = "a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23";
    bzz.download(fileHash).then(function(buffer) {
        console.log("Downloaded file:", buffer.toString());
    });
    
    // download directory, if the hash is manifest file.
    var dirHash = "7e980476df218c05ecfcb0a2ca73597193a34c5a9d6da84d54e295ecd8e0c641";
    bzz.download(dirHash).then(function(dir) {
        console.log("Downloaded directory:");
        > {
            'bar.txt': { type: 'text/plain', data: <Buffer 61 6e 6f 74 68 65 72 20 66 69 6c 65> },
            'foo.txt': { type: 'text/plain', data: <Buffer 73 61 6d 70 6c 65 20 66 69 6c 65> }
        }
    });
    
    // download file/directory to disk (only node.js)
    var dirHash = "a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23";
    bzz.download(dirHash, "/target/dir")
    .then(path => console.log(`Downloaded directory to ${path}.`))
    .catch(console.log);
    ```
* pick
    ```
    mitweb3.bzz.pick.file()
    mitweb3.bzz.pick.directory()
    mitweb3.bzz.pick.data()
    ```
    Opens a file picker in the browser to select file(s), directory or data.
    * Parameters  
        none
    * Returns  
        Promise returning Object: Returns the file or multiple files.
    * Example
    ```
    mitweb3.bzz.pick.file()
    .then(console.log);
    > {
        ...
    }
    ```
## mitweb3.shh
* **setProvider** 
    ```
    mitweb3.setProvider(myProvider)
    mitweb3.mit.setProvider(myProvider)
    mitweb3.shh.setProvider(myProvider)
    mitweb3.bzz.setProvider(myProvider)
    ...
    ```
    Will change the provider for its module.  
    <font color=red size=3>! note :</font>
    When called on the umbrella package mitweb3 it will also set the provider for all sub modules mitweb3.mit, mitweb3.shh, etc EXCEPT mitweb3.bzz which needs a separate provider at all times.
    * Parameters  
    object - myProvider: a valid provider.
    * Returns  
    Boolean
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    var mitweb3 = new MitWeb3('http://localhost:8545');
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.HttpProvider('http://localhost:8545'));
    
    // change provider
    mitweb3.setProvider('ws://localhost:8546');
    // or
    mitweb3.setProvider(new MitWeb3.providers.WebsocketProvider('ws://localhost:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **providers** 
    ```
    mitweb3.providers
    mitweb3.mit.providers
    mitweb3.shh.providers
    mitweb3.bzz.providers
    ...
    ```
    Contains the current available providers. 
    * Value  
    Object with the following providers:  
        * Object - HttpProvider: The HTTP provider is deprecated, as it won’t work for subscriptions.
        * Object - WebsocketProvider: The Websocket provider is the standard for usage in legacy browsers.
        * Object - IpcProvider: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.
    * Example  
    ```
    var MitWeb3 = require('mitweb3');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || 'ws://remotenode.com:8546');
    // or
    var mitweb3 = new MitWeb3(MitWeb3.givenProvider || new MitWeb3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    
    // Using the IPC provider in node.js
    var net = require('net');
    
    var mitweb3 = new MitWeb3('/Users/myuser/Library/mit/mit.ipc', net); // mac os path
    // or
    var mitweb3 = new MitWeb3(new MitWeb3.providers.IpcProvider('/Users/myuser/Library/mit/mit.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\mit.ipc"
    // on linux the path is: "/users/myuser/.mit/mit.ipc"
    ```
* **givenProvider** 
    ```
    mitweb3.givenProvider
    mitweb3.mit.givenProvider
    mitweb3.shh.givenProvider
    mitweb3.bzz.givenProvider
    ...
    ```
    When using mitweb3.js in an mit compatible browser, it will set with the current native provider by that browser. Will return the given provider by the (browser) environment, otherwise null.
    * Returns  
    Object: The given provider set or null;
    * Example  
* **currentProvider** 
    ```
    mitweb3.currentProvider
    mitweb3.mit.currentProvider
    mitweb3.shh.currentProvider
    mitweb3.bzz.currentProvider
    ...
    ```
    Will return the current provider, otherwise null.
    * Returns  
    object: The current provider set or null;
    * Example
    ```
    mitweb3.currentProvider
    >{
      newAccount: function(),
      openWallet: function(),
      send: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sendAsync: function github.com/timenewbank/go-mit/console.(*bridge).Send-fm(),
      sign: function(),
      unlockAccount: function()
    }
    ```
* **BatchRequest** 
    ```
    new mitweb3.BatchRequest()
    new mitweb3.mit.BatchRequest()
    new mitweb3.shh.BatchRequest()
    new mitweb3.bzz.BatchRequest()
    ...
    ```
    Class to create and execute batch requests.
    * Parameters  
    none
    * Returns  
    Object: With the following methods:
        * add(request): To add a request object to the batch call.
        * execute(): Will execute the batch request.
    * Example
    ```
    var contract = new mitweb3.mit.Contract(abi, address);

    var batch = new mitweb3.BatchRequest();
    batch.add(mitweb3.mit.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    batch.execute();
    ```
* **extend** 
    ```
    mitweb3.extend(methods)
    mitweb3.mit.extend(methods)
    mitweb3.shh.extend(methods)
    mitweb3.bzz.extend(methods)
    ...
    ```
    Allows extending the mitweb3 modules.  
    <font color=red size=3>! note :</font>
    You also have *.extend.formatters as additional formatter functions to be used for in and output formatting. Please see the source file for function details.
    * Parameters  
    methods - Object: Extension object with array of methods description objects as follows: provider.  
        * property - String: (optional) The name of the property to add to the module. If no property is set it will be added to the module directly.
        * methods - Array: The array of method descriptions:  
            * name - String: Name of the method to add.
            * call - String: The RPC method name.
            * params - Number: (optional) The number of parameters for that function. Default 0.
            * inputFormatter - Array: (optional) Array of inputformatter functions. Each array item responds to a function parameter, so if you want some parameters not to be formatted, add a null instead.
            * outputFormatter - ``Function: (optional) Can be used to format the output of the method.
    * Returns  
    Object: The extended module.
    * Example  
    ```
    mitweb3.extend({
        property: 'myModule',
        methods: [{
            name: 'getBalance',
            call: 'mit_getBalance',
            params: 2,
            inputFormatter: [mitweb3.extend.formatters.inputAddressFormatter, mitweb3.extend.formatters.inputDefaultBlockNumberFormatter],
            outputFormatter: mitweb3.utils.hexToNumberString
        },{
            name: 'getGasPriceSuperFunction',
            call: 'mit_gasPriceSuper',
            params: 2,
            inputFormatter: [null, mitweb3.utils.numberToHex]
        }]
    });
    
    mitweb3.extend({
        methods: [{
            name: 'directCall',
            call: 'mit_callForFun',
        }]
    });
    
    console.log(mitweb3);
    > MitWeb3 {
        myModule: {
            getBalance: function(){},
            getGasPriceSuperFunction: function(){}
        },
        directCall: function(){},
        mit: Mit {...},
        bzz: Bzz {...},
        ...
    }
    ```
* getId
    ```
    mitweb3.mit.net.getId([callback])
    mitweb3.bzz.net.getId([callback])
    mitweb3.shh.net.getId([callback])
    ```
    Gets the current network ID. 
    * Parameters
        none
    * Returns  
        Promise returns Number: The network ID.
    * Example
    ```
    mitweb3.mit.net.getId()
    .then(console.log);
    > 1
    ```
* isListening
    ```
    mitweb3.mit.net.isListening([callback])
    mitweb3.bzz.net.isListening([callback])
    mitweb3.shh.net.isListening([callback])

    ```
    Checks if the node is listening for peers.
    * Parameters
        none
    * Returns  
        Promise returns Boolean
    * Example
    ```
    mitweb3.mit.isListening()
    .then(console.log);
    > true

    ```
* getPeerCount
    ```
    mitweb3.mit.net.getPeerCount([callback])
    mitweb3.bzz.net.getPeerCount([callback])
    mitweb3.shh.net.getPeerCount([callback])
    ```
    Get the number of peers connected to.
    * Parameters
        none
    * Returns  
        Promise returns Number
    * Example
    ```
    mitweb3.mit.getPeerCount()
    .then(console.log);
    > 25
    ```
* getVersion
    ```
    mitweb3.shh.getVersion([callback])
    ```
    Returns the version of the running whisper.
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - The version of the current whisper running.
    * Example
    ```
    mitweb3.shh.getVersion()
    .then(console.log);
    > "5.0" 
    ```
* getInfo
    ```
    mitweb3.shh.getInfo([callback])
    ```
    Gets information about the current whisper node.
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Object - The information of the node with the following properties:
            * messages - Number: Number of currently floating messages.
            * maxMessageSize - Number: The current message size limit in bytes.
            * memory - Number: The memory size of the floating messages in bytes.
            * minPow - Number: The current minimum PoW requirement.
    * Example
    ```
   mitweb3.shh.getInfo()
    .then(console.log);
    > {
        "minPow": 0.8,
        "maxMessageSize": 12345,
        "memory": 1234335,
        "messages": 20
    }
    ```
* setMaxMessageSize
    ```
    mitweb3.shh.setMaxMessageSize(size, [callback])
    ```
    Sets the maximal message size allowed by this node. Incoming and outgoing messages with a larger size will be rejected. Whisper message size can never exceed the limit imposed by the underlying P2P protocol (10 Mb).
    * Parameters
        * Number - Message size in bytes.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on success, error on failure.
    * Example
    ```
    mitweb3.shh.setMaxMessageSize(1234565)
    .then(console.log);
    > true
    ```
* setMinPoW
    ```
    mitweb3.shh.setMinPoW(pow, [callback])
    ```
    Sets the minimal PoW required by this node.
    
    This experimental function was introduced for the future dynamic adjustment of PoW requirement. If the node is overwhelmed with messages, it should raise the PoW requirement and notify the peers. The new value should be set relative to the old value (e.g. double). The old value can be obtained via mitweb3.shh.getInfo().
    * Parameters
        * Number - The new PoW requirement.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on success, error on failure.
    * Example
    ```
    mitweb3.shh.setMinPoW(0.9)
    .then(console.log);
    > true
    ```
* markTrustedPeer
    ```
    mitweb3.shh.markTrustedPeer(enode, [callback])
    ```
    Marks specific peer trusted, which will allow it to send historic (expired) messages.
    * Parameters
        * String - Enode of the trusted peer.  
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on success, error on failure.
    * Example
    ```
    mitweb3.shh.markTrustedPeer()
    .then(console.log);
    > true
    ```
* newKeyPair
    ```
    mitweb3.shh.newKeyPair([callback])
    ```
    Generates a new public and private key pair for message decryption and encryption.
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Key ID on success and an error on failure.
    * Example
    ```
   mitweb3.shh.newKeyPair()
    .then(console.log);
    > "5e57b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f"
    ```
* addPrivateKey
    ```
    mitweb3.shh.addPrivateKey(privateKey, [callback])
    ```
   Stores a key pair derived from a private key, and returns its ID.
    * Parameters
        * String - The private key as HEX bytes to import.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Key ID on success and an error on failure.
    * Example
    ```
    mitweb3.shh.addPrivateKey('0x8bda3abeb454847b515fa9b404cede50b1cc63cfdeddd4999d074284b4c21e15')
    .then(console.log);
    > "3e22b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f"
    ```
* deleteKeyPair
    ```
    mitweb3.shh.deleteKeyPair(id, [callback])
    ```
    Deletes the specifies key if it exists.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).  
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on success, error on failure.
    * Example
    ```
    mitweb3.shh.deleteKeyPair('3e22b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > true
    ```
* hasKeyPair
    ```
    mitweb3.shh.hasKeyPair(id, [callback])
    ```
    Checks if the whisper node has a private key of a key pair matching the given ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).  
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
       Boolean - true on if the key pair exist in the node, false if not. Error on failure.
    * Example
    ```
    mitweb3.shh.hasKeyPair('fe22b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > true
    ```
* getPublicKey
    ```
    mitweb3.shh.getPublicKey(id, [callback])
    ```
    Returns the public key for a key pair ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).  
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Public key on success and an error on failure.
    * Example
    ```
    mitweb3.shh.getPublicKey('3e22b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > "0x04d1574d4eab8f3dde4d2dc7ed2c4d699d77cbbdd09167b8fffa099652ce4df00c4c6e0263eafe05007a46fdf0c8d32b11aeabcd3abbc7b2bc2bb967368a68e9c6"
    ```
* getPrivateKey
    ```
    mitweb3.shh.getPrivateKey(id, [callback])
    ```
    Returns the private key for a key pair ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).  
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Private key on success and an error on failure.
    * Example
    ```
    mitweb3.shh.getPrivateKey('3e22b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > "0x234234e22b9ffc2387e18636e0534534a3d0c56b0243567432453264c16e78a2adc"
    ```
* newSymKey
    ```
    mitweb3.shh.newSymKey([callback])
    ```
    Generates a random symmetric key and stores it under an ID, which is then returned. Will be used for encrypting and decrypting of messages where the sym key is known to both parties.
    * Parameters
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Key ID on success and an error on failure.
    * Example
    ```
    mitweb3.shh.newSymKey()
    .then(console.log);
    > "cec94d139ff51d7df1d228812b90c23ec1f909afa0840ed80f1e04030bb681e4"
    ```
* addSymKey
    ```
    mitweb3.shh.addSymKey(symKey, [callback])
    ```
    Stores the key, and returns its ID.
    * Parameters
        * String - The raw key for symmetric encryption as HEX bytes.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Key ID on success and an error on failure.
    * Example
    ```
    mitweb3.shh.addSymKey('0x5e11b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > "fea94d139ff51d7df1d228812b90c23ec1f909afa0840ed80f1e04030bb681e4"
    ```
* generateSymKeyFromPassword
    ```
    mitweb3.shh.generateSymKeyFromPassword(password, [callback])
    ```
    Generates the key from password, stores it, and returns its ID.
    * Parameters
        * String - A password to generate the sym key from.
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - Key ID on success and an error on failure.
    * Example
    ```
    mitweb3.shh.generateSymKeyFromPassword('Never use this password - password!')
    .then(console.log);
    > "2e57b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f"
    ```
* hasSymKey
    ```
    mitweb3.shh.hasSymKey(id, [callback])
    ```
    Checks if there is a symmetric key stored with the given ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newSymKey, shh.addSymKey or shh.generateSymKeyFromPassword).
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on if the symmetric key exist in the node, false if not. Error on failure.
    * Example
    ```
    mitweb3.shh.hasSymKey('f6dcf21ed6a17bd78d8c4c63195ab997b3b65ea683705501eae82d32667adc92')
    .then(console.log);
    > true
    ```
* getSymKey
    ```
    mitweb3.shh.getSymKey(id, [callback])
    ```
    Returns the symmetric key associated with the given ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        String - The raw symmetric key on success and an error on failure.
    * Example
    ```
    mitweb3.shh.getSymKey('af33b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > "0xa82a520aff70f7a989098376e48ec128f25f767085e84d7fb995a9815eebff0a"
    ```
* deleteSymKey
    ```
    mitweb3.shh.deleteSymKey(id, [callback])
    ```
    Deletes the symmetric key associated with the given ID.
    * Parameters
        * String - The key pair ID, returned by the creation functions (shh.newKeyPair and shh.addPrivateKey).
        * Function - (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Boolean - true on if the symmetric key was deleted, error on failure.
    * Example
    ```
    mitweb3.shh.deleteSymKey('bf31b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f')
    .then(console.log);
    > true
    ```
* post
    ```
    mitweb3.shh.post(object [, callback])
    ```
    This method should be called, when we want to post whisper a message to the network.
    * Parameters
        * Object - The post object:  
            * symKeyID - String (optional): ID of symmetric key for message encryption (Either symKeyID or pubKey must be present. Can not be both.).  
            * pubKey - String (optional): The public key for message encryption (Either symKeyID or pubKey must be present. Can not be both.).    
            * sig - String (optional): The ID of the signing key.
            * ttl - Number: Time-to-live in seconds.  
            * topic - String: 4 Bytes (mandatory when key is symmetric): Message topic.  
            * payload - String: The payload of the message to be encrypted.
            * padding - Number (optional): Padding (byte array of arbitrary length).  
            * powTime - Number (optional)?: Maximal time in seconds to be spent on proof of work.
            * powTarget - Number (optional)?: Minimal PoW target required for this message.  
            * targetPeer - Number (optional): Peer ID (for peer-to-peer message only).
        * callback - Function: (optional) Optional callback, returns an error object as first parameter and the result as second.
    * Returns  
        Promise - returns a promise. Upon success, the then function will be passed a string representing the hash of the sent message. On error, the catch function will be passed a string containing the reason for the error.
    * Example
    ```
    var identities = [];
    var subscription = null;
    
    Promise.all([
        mitweb3.shh.newSymKey().then((id) => {identities.push(id);}),
        mitweb3.shh.newKeyPair().then((id) => {identities.push(id);})
    
    ]).then(() => {
    
        // will receive also its own message send, below
        subscription = shh.subscribe("messages", {
            symKeyID: identities[0],
            topics: ['0xffaadd11']
        }).on('data', console.log);
    
    }).then(() => {
       mitweb3.shh.post({
            symKeyID: identities[0], // encrypts using the sym key ID
            sig: identities[1], // signs the message using the keyPair ID
            ttl: 10,
            topic: '0xffaadd11',
            payload: '0xffffffdddddd1122',
            powTime: 3,
            powTarget: 0.5
        }).then(h => console.log(`Message with hash ${h} was successfuly sent`))
        .catch(err => console.log("Error: ", err));
    });
    ```
* subscribe
    ```
    mitweb3.shh.subscribe('messages', options [, callback])
    ```
    Subscribe for incoming whisper messages.
    * Parameters
        * "messages" - String: Type of the subscription.
        * Object - The subscription options:  
            * symKeyID - String: ID of symmetric key for message decryption.  
            * privateKeyID - String: ID of private (asymmetric) key for message decryption.  
            * sig - String (optional): Public key of the signature, to verify.     
            * topics- Array (optional when “privateKeyID” key is given): Filters messages by this topic(s). Each topic must be a 4 bytes HEX string.  
            * minPow - Number (optional): Minimal PoW requirement for incoming messages.  
            * allowP2P - Boolean (optional): Indicates if this filter allows processing of direct peer-to-peer messages (which are not to be forwarded any further, because they might be expired). This might be the case in some very rare cases, e.g. if you intend to communicate to MailServers, etc.  
        * callback - Function: (optional) Optional callback, returns an error object as first parameter and the result as second. Will be called for each incoming subscription, and the subscription itself as 3 parameter.
    * Notification Returns  
        * Object - The incoming message:
            * hash - String: Hash of the enveloped message.  
            * sig - String: Public key which signed this message.  
            * recipientPublicKey - String: The recipients public key.  
            * timestamp - String: Unix timestamp of the message genertion.  
            * ttl - Number: Time-to-live in seconds.
            * topic - String: 4 Bytes HEX string message topic.
            * payload - String: Decrypted payload.
            * padding - Number: Optional padding (byte array of arbitrary length).
            * pow - Number: Proof of work value.
    * Example
    ```
    mitweb3.shh.subscribe('messages', {
        symKeyID: 'bf31b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f',
        sig: '0x04d1574d4eab8f3dde4d2dc7ed2c4d699d77cbbdd09167b8fffa099652ce4df00c4c6e0263eafe05007a46fdf0c8d32b11aeabcd3abbc7b2bc2bb967368a68e9c6',
        ttl: 20,
        topics: ['0xffddaa11'],
        minPow: 0.8,
    }, function(error, message, subscription){
    
        console.log(message);
        > {
            "hash": "0x4158eb81ad8e30cfcee67f20b1372983d388f1243a96e39f94fd2797b1e9c78e",
            "padding": "0xc15f786f34e5cef0fef6ce7c1185d799ecdb5ebca72b3310648c5588db2e99a0d73301c7a8d90115a91213f0bc9c72295fbaf584bf14dc97800550ea53577c9fb57c0249caeb081733b4e605cdb1a6011cee8b6d8fddb972c2b90157e23ba3baae6c68d4f0b5822242bb2c4cd821b9568d3033f10ec1114f641668fc1083bf79ebb9f5c15457b538249a97b22a4bcc4f02f06dec7318c16758f7c008001c2e14eba67d26218ec7502ad6ba81b2402159d7c29b068b8937892e3d4f0d4ad1fb9be5e66fb61d3d21a1c3163bce74c0a9d16891e2573146aa92ecd7b91ea96a6987ece052edc5ffb620a8987a83ac5b8b6140d8df6e92e64251bf3a2cec0cca",
            "payload": "0xdeadbeaf",
            "pow": 0.5371803278688525,
            "recipientPublicKey": null,
            "sig": null,
            "timestamp": 1496991876,
            "topic": "0x01020304",
            "ttl": 50
        }
    })
    // or
    .on('data', function(message){ ... });.log);
    > true
    ```
* clearSubscriptions
    ```
    mitweb3.shh.clearSubscriptions()
    ```
    Resets subscriptions.
    * Parameters
        * Boolean: If true it keeps the "syncing" subscription.
    * Returns  
        Boolean
    * Example
    ```
    mitweb3.shh.subscribe('messages', {...} ,function(){ ... });

    ...

    mitweb3.shh.clearSubscriptions();
    ```
* newMessageFilter
    ```
    mitweb3.shh.newMessageFilter(options)
    ```
    Create a new filter within the node. This filter can be used to poll for new messages that match the set of criteria.
    * Parameters
        * Object: See mitweb3.shh.subscribe() options for details.
    * Returns  
        String: The filter ID.
    * Example
    ```
    mitweb3.shh.newMessageFilter()
    .then(console.log);
    > "2b47fbafb3cce24570812a82e6e93cd9e2551bbc4823f6548ff0d82d2206b326"
    ```
* deleteMessageFilter
    ```
    mitweb3.shh.deleteMessageFilter(id)
    ```
    Deletes a message filter in the node.
    * Parameters
        * String: The filter ID created with shh.newMessageFilter().
    * Returns  
        Boolean: true on success, error on failure.
    * Example
    ```
    mitweb3.shh.deleteMessageFilter('2b47fbafb3cce24570812a82e6e93cd9e2551bbc4823f6548ff0d82d2206b326')
    .then(console.log);
    > true
    ```
* getFilterMessages
    ```
    mitweb3.shh.getFilterMessages(id)
    ```
    Retrieve messages that match the filter criteria and are received between the last time this function was called and now.
    * Parameters
        * String: The filter ID created with shh.newMessageFilter().
    * Returns  
        Array: Returns an array of message objects like mitweb3.shh.subscribe() notification returns
    * Example
    ```
    mitweb3.shh.getFilterMessages('2b47fbafb3cce24570812a82e6e93cd9e2551bbc4823f6548ff0d82d2206b326')
    .then(console.log);
    > [{
        "hash": "0x4158eb81ad8e30cfcee67f20b1372983d388f1243a96e39f94fd2797b1e9c78e",
        "padding": "0xc15f786f34e5cef0fef6ce7c1185d799ecdb5ebca72b3310648c5588db2e99a0d73301c7a8d90115a91213f0bc9c72295fbaf584bf14dc97800550ea53577c9fb57c0249caeb081733b4e605cdb1a6011cee8b6d8fddb972c2b90157e23ba3baae6c68d4f0b5822242bb2c4cd821b9568d3033f10ec1114f641668fc1083bf79ebb9f5c15457b538249a97b22a4bcc4f02f06dec7318c16758f7c008001c2e14eba67d26218ec7502ad6ba81b2402159d7c29b068b8937892e3d4f0d4ad1fb9be5e66fb61d3d21a1c3163bce74c0a9d16891e2573146aa92ecd7b91ea96a6987ece052edc5ffb620a8987a83ac5b8b6140d8df6e92e64251bf3a2cec0cca",
        "payload": "0xdeadbeaf",
        "pow": 0.5371803278688525,
        "recipientPublicKey": null,
        "sig": null,
        "timestamp": 1496991876,
        "topic": "0x01020304",
        "ttl": 50
    },{...}]
    ```
## mitweb3.utils  
This package provides utility functions for mit dapps and other mitweb3.js packages.
* **randomHex**  
    The randomHex library to generate cryptographically strong pseudo-random HEX strings from a given byte size.
    * Parameters  
        * size - Number: The byte size for the HEX string, e.g. 32 will result in a 32 bytes HEX string with 64 characters preficed with “0x”.
    * Returns  
       String: The generated random HEX string.
    * Example
    ```
    mitweb3.utils.randomHex(32)
    > "0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"
    
    mitweb3.utils.randomHex(4)
    > "0x6892ffc6"
    
    mitweb3.utils.randomHex(2)
    > "0x99d6"
    
    mitweb3.utils.randomHex(1)
    > "0x9a"
    
    mitweb3.utils.randomHex(0)
    > "0x"
    ```
* **-**  
    The underscore library for many convenience JavaScript functions.
    * Example
    ```
     var _ = mitweb3.utils._;

    _.union([1,2],[3]);
    > [1,2,3]
    
    _.each({my: 'object'}, function(value, key){ ... })

    ...

    ```
* **BN**  
    * Parameters  
        *  mixed - String|Number: A number, number string or HEX string to convert to a BN object.
    * Returns  
        Object: The BN.js instance.
    * Example
    ```
    var BN = mitweb3.utils.BN;

    new BN(1234).toString();
    > "1234"
    
    new BN('1234').add(new BN('1')).toString();
    > "1235"
    
    new BN('0xea').toString();
    > "234"
    ```
* **isBN**  
    Checks if a given value is a BN.js instance.
    * Parameters  
        bn - Object: An BN.js instance.
    * Returns  
        Boolean
    * Example
    ```
    var number = new BN(10);

    mitweb3.utils.isBN(number);
    > true
    ```
* **isBigNumber**  
    Checks if a given value is a BigNumber.js instance.
    * Parameters  
        * bignumber - Object: A BigNumber.js instance.
    * Returns  
       Boolean
    * Example
    ```
    var number = new BigNumber(10);

    mitweb3.utils.isBigNumber(number);
    > true
    ```
* **sha3**  
    * Parameters  
        * String - The string to hash using the Keccak-256 SHA3 algorithm
        * Object - (optional) Set encoding to hex if the string to hash is encoded in hex. A leading 0x will be automatically ignored.
    * Returns  
        String - The Keccak-256 SHA3 of the given data.
    * Example
    ```
     mitweb3.sha3("Some string to be hashed");
     >"0xed973b234cf2238052c9ac87072c71bcf33abc1bbd721018e0cca448ef79b379"
    ```
* **soliditySha3**  
    Will calculate the sha3 of given input parameters in the same way solidity would. This means arguments will be ABI converted and tightly packed before being hashed.
    * Parameters 
        paramX - Mixed: Any type, or an object with {type: 'uint', value: '123456'} or {t: 'bytes', v: '0xfff456'}. Basic types are autodetected as follows:
            * String non numerical UTF-8 string is interpreted as string.
            * String|Number|BN|HEX positive number is interpreted as uint256.
            * String|Number|BN negative number is interpreted as int256.
            * Boolean as bool.
            * String HEX string with leading 0x is interpreted as bytes.
            * HEX HEX number representation is interpreted as uint256.
    * Returns  
       String: the result hash.
    * Example
    ```
    mitweb3.utils.soliditySha3('234564535', '0xfff23243', true, -10);
    // auto detects:        uint256,      bytes,     bool,   int256
    > "0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179"
    
    
    mitweb3.utils.soliditySha3('Hello!%'); // auto detects: string
    > "0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc"
    
    
    mitweb3.utils.soliditySha3('234'); // auto detects: uint256
    > "0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"
    
    mitweb3.utils.soliditySha3(0xea); // same as above
    > "0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"
    
    mitweb3.utils.soliditySha3(new BN('234')); // same as above
    > "0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"
    
    mitweb3.utils.soliditySha3({type: 'uint256', value: '234'})); // same as above
    > "0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"
    
    mitweb3.utils.soliditySha3({t: 'uint', v: new BN('234')})); // same as above
    > "0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"
    
    
    mitweb3.utils.soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1');
    > "0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b"
    
    mitweb3.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same result as above
    
    
    mitweb3.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same as above, but will do a checksum check, if its multi case
    
    
    mitweb3.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4" // different result as above
    
    
    mitweb3.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'});
    > "0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955"
    ```
* **isHex**  
    Checks if a given string is a HEX string.
    * Parameters  
       hex - String|HEX: The given HEX string.
    * Returns  
       Boolean
    * Example
    ```
    mitweb3.utils.isHex('0xc1912');
    > true
    
    mitweb3.utils.isHex(0xc1912);
    > true
    
    mitweb3.utils.isHex('c1912');
    > true
    
    mitweb3.utils.isHex(345);
    > true // this is tricky, as 345 can be a a HEX representation or a number, be careful when not having a 0x in front!
    
    mitweb3.utils.isHex('0xZ1912');
    > false
    
    mitweb3.utils.isHex('Hello');
    > false
    ```
* **isHexStrict**  
    Checks if a given string is a HEX string. Difference to mitweb3.utils.isHex() is that it expects HEX to be prefixed with 0x.
    * Parameters  
       hex - String|HEX: The given HEX string.
    * Returns  
       Boolean
    * Example
    ```
    mitweb3.utils.isHexStrict('0xc1912');
    > true
    
    mitweb3.utils.isHexStrict(0xc1912);
    > false
    
    mitweb3.utils.isHexStrict('c1912');
    > false
    
    mitweb3.utils.isHexStrict(345);
    > false // this is tricky, as 345 can be a a HEX representation or a number, be careful when not having a 0x in front!
    
    mitweb3.utils.isHexStrict('0xZ1912');
    > false
    
    mitweb3.utils.isHex('Hello');
    > false
    ```
* **isAddress**  
    Checks if the given string is an address. instance.
    * Parameters  
       String - A HEX string.
    * Returns  
       Boolean - false if it's not on a valid address format. Returns true if it's an all lowercase or all uppercase valid address. If it's a mixed case address, it checks using mitweb3.isChecksumAddress().
    * Example
    ```
    mitweb3.isAddress("0x8888f1f195afa192cfee860698584c030f4c9db1");
    >true
    ```
* **toChecksumAddress**  
    Will convert an upper or lowercase mit address to a checksum address.
    * Parameters  
       address - String: An address string.
    * Returns  
       String: The checksum address.
    * Example
    ```
    mitweb3.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff2323');
    > "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"
    
    mitweb3.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
    > "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" // same as above

    ```
* **checkAddressChecksum**  
    Checks the checksum of a given address. Will also return false on non-checksum addresses.
    * Parameters  
      address - String: An address string.
    * Returns  
       Boolean: true when the checksum of the address is valid, false if its not a checksum address, or the checksum is invalid.
    * Example
    ```
    mitweb3.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
    > true
    ```
* **toHex**  
    Converts any value into HEX.
    * Parameters  
       String|Number|Object|Array|BigNumber - The value to parse to HEX. If its an object or array it will be JSON.stringify first. If its a BigNumber it will make it the HEX value of a number.
    * Returns  
        String - The hex string of mixed.
    * Example
    ```
     mitweb3.toHex({test: 'test'});
     >"0x7b2274657374223a2274657374227d"
    ```
* **toBN**  
    Will safly convert any given value (including BigNumber.js instances) into a BN.js instance, for handling big numbers in JavaScript.
    * Parameters  
      number - String|Number|HEX: Number to convert to a big number.
    * Returns  
       Object: The BN.js instance.
    * Example
    ```
    mitweb3.utils.toBN(1234).toString();
    > "1234"
    
    mitweb3.utils.toBN('1234').add(mitweb3.utils.toBN('1')).toString();
    > "1235"
    
    mitweb3.utils.toBN('0xea').toString();
    > "234"
    ```
* **hexToNumberString**  
    Returns the number representation of a given HEX value as a string.
    * Parameters  
      hexString - String|HEX: A string to hash.
    * Returns  
       String: The number as a string.
    * Example
    ```
    mitweb3.utils.hexToNumberString('0xea');
    > "234"
    ```
* **hexToNumber**  
    Returns the number representation of a given HEX value.
    * Parameters  
       hexString - String|HEX: A string to hash.
    * Returns  
       Number
    * Example
    ```
    mitweb3.utils.hexToNumber('0xea');
    > 234
    ```
* **numberToHex**  
    Returns the HEX representation of a given number value.
    * Parameters  
       number - String|Number|BN|BigNumber: A number as string or number.
    * Returns  
       String: The HEX value of the given number.
    * Example
    ```
    mitweb3.utils.numberToHex('234');
    > '0xea'
    ```
* **hexToUtf8**  
    ```
    mitweb3.utils.hexToUtf8(hex)
    mitweb3.utils.hexToString(hex) // ALIAS
    mitweb3.utils.toUtf8(hex) // ALIAS, deprecated
    ```
    Returns the UTF-8 string representation of a given HEX value.
    * Parameters  
       hex - String: A HEX string to convert to a UTF-8 string.
    * Returns  
       String: The UTF-8 string.
    * Example
    ```
    mitweb3.utils.hexToUtf8('0x49206861766520313030e282ac');
    > "I have 100€"
    ```
* **hexToAscii**  
    ```
    mitweb3.utils.hexToAscii(hex)
    mitweb3.utils.toAscii(hex) // ALIAS, deprecated
    ```
    Returns the ASCII string representation of a given HEX value.
    * Parameters  
       hex - String: A HEX string to convert to a ASCII string.
    * Returns  
       String: The ASCII string.
    * Example
    ```
   mitweb3.utils.hexToAscii('0x4920686176652031303021');
    > "I have 100!"
    ```
* **utf8ToHex**  
    ```
    mitweb3.utils.utf8ToHex(string)
    mitweb3.utils.stringToHex(string) // ALIAS
    mitweb3.utils.fromUtf8(string) // ALIAS, deprecated
    ```
    Returns the HEX representation of a given UTF-8 string.
    * Parameters  
       string - String: A UTF-8 string to convert to a HEX string.
    * Returns  
       String: The HEX string.
    * Example
    ```
    mitweb3.utils.utf8ToHex('I have 100€');
    > "0x49206861766520313030e282ac"
    ```
* **asciiToHex**  
    ```
    mitweb3.utils.asciiToHex(string)
    mitweb3.utils.fromAscii(string) // ALIAS, deprecated
    ```
    Returns the HEX representation of a given ASCII string.
    * Parameters  
       string - String: A ASCII string to convert to a HEX string.
    * Returns  
       String: The HEX string.
    * Example
    ```
    mitweb3.utils.asciiToHex('I have 100!');
    > "0x4920686176652031303021"
    ```
* **hexToBytes**  
    ```
    mitweb3.utils.hexToBytes(hex)
    ```
    Returns a byte array from the given HEX string.
    * Parameters  
       hex - String|HEX: A HEX to convert.
    * Returns  
       Array: The byte array.
    * Example
    ```
    mitweb3.utils.hexToBytes('0x000000ea');
    > [ 0, 0, 0, 234 ]
    
    mitweb3.utils.hexToBytes(0x000000ea);
    > [ 234 ]
    ```
* **bytesToHex**  
    ```
    mitweb3.utils.bytesToHex(byteArray)
    ```
    Returns a HEX string from a byte array.
    * Parameters  
       byteArray - Array: A byte array to convert.
    * Returns  
       String: The HEX string.
    * Example
    ```
    mitweb3.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
    > "0x48656c6c6f2125"
    ```
* **toWei**  
    ```
    mitweb3.utils.toWei(number [, unit])
    ```
    Converts any wei value into a tnb value.
    * Parameters  
        * number - String|Number|BN: The value. 1. unit - String (optional, defaults to "tnb"): The tnb to convert from. Possible units are:  
            * notnb: ‘0’
            * wei: ‘1’
            * kwei: ‘1000’
            * Kwei: ‘1000’
            * babbage: ‘1000’
            * femtotnb: ‘1000’
            * mwei: ‘1000000’
            * Mwei: ‘1000000’
            * lovelace: ‘1000000’
            * picotnb: ‘1000000’
            * gwei: ‘1000000000’
            * Gwei: ‘1000000000’
            * shannon: ‘1000000000’
            * nanotnb: ‘1000000000’
            * nano: ‘1000000000’
            * szabo: ‘1000000000000’
            * microtnb: ‘1000000000000’
            * micro: ‘1000000000000’
            * finney: ‘1000000000000000’
            * millitnb: ‘1000000000000000’
            * milli: ‘1000000000000000’
            * tnb: ‘1000000000000000000’
            * ktnb: ‘1000000000000000000000’
            * grand: ‘1000000000000000000000’
            * mtnb: ‘1000000000000000000000000’
            * gtnb: ‘1000000000000000000000000000’
            * ttnb: ‘1000000000000000000000000000000’
       
    * Returns  
       String|BN: If a number, or string is given it returns a number string, otherwise a BN.js instance.
    * Example
    ```
    mitweb3.utils.toWei('1', 'tnb');
    > "1000000000000000000"
    
    mitweb3.utils.toWei('1', 'finney');
    > "1000000000000000"
    
    mitweb3.utils.toWei('1', 'szabo');
    > "1000000000000"
    
    mitweb3.utils.toWei('1', 'shannon');
    > "1000000000"
    ```
* **fromWei**  
    ```
    mitweb3.utils.fromWei(number [, unit])
    ```
    Converts any wei value into a tnb value.
    * Parameters  
        * number - String|Number|BN: The value in wei. 1. unit - String (optional, defaults to "tnb"): The tnb to convert to. Possible units are:  
            * notnb: ‘0’
            * wei: ‘1’
            * kwei: ‘1000’
            * Kwei: ‘1000’
            * babbage: ‘1000’
            * femtotnb: ‘1000’
            * mwei: ‘1000000’
            * Mwei: ‘1000000’
            * lovelace: ‘1000000’
            * picotnb: ‘1000000’
            * gwei: ‘1000000000’
            * Gwei: ‘1000000000’
            * shannon: ‘1000000000’
            * nanotnb: ‘1000000000’
            * nano: ‘1000000000’
            * szabo: ‘1000000000000’
            * microetnb: ‘1000000000000’
            * micro: ‘1000000000000’
            * finney: ‘1000000000000000’
            * millitnb: ‘1000000000000000’
            * milli: ‘1000000000000000’
            * tnb: ‘1000000000000000000’
            * ktnb: ‘1000000000000000000000’
            * grand: ‘1000000000000000000000’
            * mtnb: ‘1000000000000000000000000’
            * gtnb: ‘1000000000000000000000000000’
            * ttnb: ‘1000000000000000000000000000000’
       
    * Returns  
       String|BN: If a number, or string is given it returns a number string, otherwise a BN.js instance.
    * Example
    ```
    mitweb3.utils.fromWei('1', 'tnb');
    > "0.000000000000000001"
    
    mitweb3.utils.fromWei('1', 'finney');
    > "0.000000000000001"
    
    mitweb3.utils.fromWei('1', 'szabo');
    > "0.000000000001"
    
    mitweb3.utils.fromWei('1', 'shannon');
    > "0.000000001"

    ```
* **unitMap**  
    ```
    mitweb3.utils.unitMap
    ```
    * Retrun value  
        * Object with the following properties:
            * notnb: ‘0’
            * wei: ‘1’
            * kwei: ‘1000’
            * Kwei: ‘1000’
            * babbage: ‘1000’
            * femtotnb: ‘1000’
            * mwei: ‘1000000’
            * Mwei: ‘1000000’
            * lovelace: ‘1000000’
            * picotnb: ‘1000000’
            * gwei: ‘1000000000’
            * Gwei: ‘1000000000’
            * shannon: ‘1000000000’
            * nanotnb: ‘1000000000’
            * nano: ‘1000000000’
            * szabo: ‘1000000000000’
            * microtnb: ‘1000000000000’
            * micro: ‘1000000000000’
            * finney: ‘1000000000000000’
            * millitnb: ‘1000000000000000’
            * milli: ‘1000000000000000’
            * tnb: ‘1000000000000000000’
            * ktnb: ‘1000000000000000000000’
            * grand: ‘1000000000000000000000’
            * mtnb: ‘1000000000000000000000000’
            * gtnb: ‘1000000000000000000000000000’
            * ttnb: ‘1000000000000000000000000000000’
    * Example
    ```
    mitweb3.utils.unitMap
    > {
        notnb: '0',
        wei:        '1',
        kwei:       '1000',
        Kwei:       '1000',
        babbage:    '1000',
        femtotnb: '1000',
        mwei:       '1000000',
        Mwei:       '1000000',
        lovelace:   '1000000',
        picotnb:  '1000000',
        gwei:       '1000000000',
        Gwei:       '1000000000',
        shannon:    '1000000000',
        nanotnb:  '1000000000',
        nano:       '1000000000',
        szabo:      '1000000000000',
        microtnb: '1000000000000',
        micro:      '1000000000000',
        finney:     '1000000000000000',
        millitnb: '1000000000000000',
        milli:      '1000000000000000',
        tnb:      '1000000000000000000',
        ktnb:     '1000000000000000000000',
        grand:      '1000000000000000000000',
        mtnb:     '1000000000000000000000000',
        gtnb:     '1000000000000000000000000000',
        ttnb:     '1000000000000000000000000000000'
    }
    ```
* **padLeft**  
    ```
    mitweb3.utils.padLeft(string, characterAmount [, sign])
    mitweb3.utils.leftPad(string, characterAmount [, sign]) // ALIAS
    ```
    Adds a padding on the left of a string, Useful for adding paddings to HEX strings.
    * Parameters  
        * string - String: The string to add padding on the left.
        *characterAmount - Number: The number of characters the total string should have.
        * sign - String (optional): The character sign to use, defaults to "0".
    * Returns  
       String: The padded string.
    * Example
    ```
    mitweb3.utils.padLeft('0x3456ff', 20);
    > "0x000000000000003456ff"
    
    mitweb3.utils.padLeft(0x3456ff, 20);
    > "0x000000000000003456ff"
    
    mitweb3.utils.padLeft('Hello', 20, 'x');
    > "xxxxxxxxxxxxxxxHello"

    ```
* **padRight**  
    ```
    mitweb3.utils.padRight(string, characterAmount [, sign])
    mitweb3.utils.rightPad(string, characterAmount [, sign]) // ALIAS

    ```
    Adds a padding on the right of a string, Useful for adding paddings to HEX strings.
    * Parameters  
        * string - String: The string to add padding on the right.
        * characterAmount - Number: The number of characters the total string should have.
        * sign - String (optional): The character sign to use, defaults to "0".
    * Returns  
       String: The padded string.
    * Example
    ```
    mitweb3.utils.padRight('0x3456ff', 20);
    > "0x3456ff00000000000000"

    mitweb3.utils.padRight(0x3456ff, 20);
    > "0x3456ff00000000000000"
    
    mitweb3.utils.padRight('Hello', 20, 'x');
    > "Helloxxxxxxxxxxxxxxx"
    
    ```
* **toTwosComplement**  
    ```
    mitweb3.utils.toTwosComplement(number)

    ```
    Converts a negative numer into a two’s complement.
    * Parameters  
        * number - Number|String|BigNumber: The number to convert.
    * Returns  
       String: The converted hex string.
    * Example
    ```
    mitweb3.utils.toTwosComplement('-1');
    > "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    
    mitweb3.utils.toTwosComplement(-1);
    > "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    
    mitweb3.utils.toTwosComplement('0x1');
    > "0x0000000000000000000000000000000000000000000000000000000000000001"
    
    mitweb3.utils.toTwosComplement(-15);
    > "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1"
    
    mitweb3.utils.toTwosComplement('-0x1');
    > "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    
    ```

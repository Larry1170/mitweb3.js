# mitweb3-mit-contract

This is a sub package of mitweb3.js

This is the contract package to be used in the `mitweb3-mit` package.

## Installation

### Node.js

```bash
npm install mitweb3-mit-contract
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit-contract.js` in your html file.
This will expose the `Web3MitContract` object on the window object.


## Usage

```js
// in node.js
var Web3MitContract = require('mitweb3-mit-contract');

// set provider for all later instances to use
Web3MitContract.setProvider('ws://localhost:8546');

var contract = new Web3MitContract(jsonInterface, address);
contract.methods.somFunc().send({from: ....})
.on('receipt', function(){
    ...
});
```



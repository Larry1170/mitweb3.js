# mitweb3-mit-abi

This is a sub package of mitweb3.js

This is the abi package to be used in the `mitweb3-mit` package.

## Installation

### Node.js

```bash
npm install mitweb3-mit-abi
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit-abi.js` in your html file.
This will expose the `Web3MitAbi` object on the window object.


## Usage

```js
// in node.js
var Web3MitAbi = require('mitweb3-mit-abi');

Web3MitAbi.encodeFunctionSignature('myMethod(uint256,string)');
> '0x24ee0097'
```
-



# mitweb3-core-method

This is a sub package of mitweb3.js

The Method package used within most mitweb3.js packages.

## Installation

### Node.js

```bash
npm install mitweb3-core-method
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-core-method.js` in your html file.
This will expose the `Web3Method` object on the window object.


## Usage

```js
// in node.js
var Web3Method = require('mitweb3-core-method');

var method = new Web3Method({
    name: 'sendTransaction',
    call: 'mit_sendTransaction',
    params: 1,
    inputFormatter: [inputTransactionFormatter]
});
method.attachToObject(myCoolLib);

myCoolLib.sendTransaction({...}, function(){ ... });
```




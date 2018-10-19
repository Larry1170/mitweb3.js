# mitweb3-mit-iban

This is a sub package of mitweb3.js

This is the IBAN package to be used in the `mitweb3-mit` package.

## Installation

### Node.js

```bash
npm install mitweb3-mit-iban
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit-iban.js` in your html file.
This will expose the `Web3EthIban` object on the window object.


## Usage

```js
// in node.js
var Web3EthIban = require('mitweb3-mit-iban');

var iban = new Web3EthIban('XE75JRZCTTLBSYEQBGAS7GID8DKR7QY0QA3');
iban.toAddress()
> '0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B'
```




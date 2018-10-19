# mitweb3-mit-accounts

This is a sub package of mitweb3.js

This is the accounts package to be used in the `mitweb3-mit` package.

## Installation

### Node.js

```bash
npm install mitweb3-mit-accounts
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit-accounts.js` in your html file.
This will expose the `Web3MitAccounts` object on the window object.


## Usage

```js
// in node.js
var Web3MitAccounts = require('mitweb3-mit-accounts');

var account = new Web3MitAccounts('ws://localhost:8546');
account.create();
> {
  address: '0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
  privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
  signTransaction: function(tx){...},
  sign: function(data){...},
  encrypt: function(password){...}
}
```




# mitweb3-utils

This is a sub package of mitweb3.js

This contains useful utility functions for Dapp developers.   

## Installation

### Node.js

```bash
npm install mitweb3-utils
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-utils.js` in your html file.
This will expose the `Web3Utils` object on the window object.


## Usage

```js
// in node.js
var Web3Utils = require('mitweb3-utils');
console.log(Web3Utils);
{
    sha3: function(){},
    soliditySha3: function(){},
    isAddress: function(){},
    ...
}
```




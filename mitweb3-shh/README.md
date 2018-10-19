# mitweb3-shh

This is a sub package of mitweb3.js

This is the whisper v5 package.   

## Installation

### Node.js

```bash
npm install mitweb3-shh
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-shh.js` in your html file.
This will expose the `Web3Personal` object on the window object.


## Usage

```js
// in node.js
var Web3Personal = require('mitweb3-shh');

var shh = new Web3Personal('ws://localhost:8546');
```




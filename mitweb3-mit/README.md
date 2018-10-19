# mitweb3-mit

This is a sub package of mitweb3.js

This is the mit package to be used mitweb3.js.

## Installation

### Node.js

```bash
npm install mitweb3-mit
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit.js` in your html file.
This will expose the `Web3Mit` object on the window object.


## Usage

```js
// in node.js
var Web3Mit = require('mitweb3-mit');

var mit = new Web3Mit('ws://localhost:8546');
```



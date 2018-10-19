# mitweb3-core-requestmanager

This is a sub package of mitweb3.js

The requestmanager package is used by most mitweb3.js packages.

## Installation

### Node.js

```bash
npm install mitweb3-core-requestmanager
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-core-requestmanager.js` in your html file.
This will expose the `Web3RequestManager` object on the window object.


## Usage

```js
// in node.js
var Web3WsProvider = require('mitweb3-providers-ws');
var Web3RequestManager = require('mitweb3-core-requestmanager');

var requestManager = new Web3RequestManager(new Web3WsProvider('ws://localhost:8546'));
```



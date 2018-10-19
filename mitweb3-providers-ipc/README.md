# mitweb3-providers-ipc

This is a sub package of mitweb3.js

This is a IPC provider for mitweb3.js.

## Installation

### Node.js

```bash
npm install mitweb3-providers-ipc
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-providers-ipc.js` in your html file.
This will expose the `Web3IpcProvider` object on the window object.


## Usage

```js
// in node.js
var Web3IpcProvider = require('mitweb3-providers-ipc');
var net = require(net);

var ipc = new Web3IpcProvider('tmit.ipc', net);
```




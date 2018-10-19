# mitweb3-providers-ws

This is a sub package of mitweb3.js

This is a websocket provider for mitweb3.js.

## Installation

### Node.js

```bash
npm install mitweb3-providers-ws
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-providers-ws.js` in your html file.
This will expose the `Web3WsProvider` object on the window object.


## Usage

```js
// in node.js
var Web3WsProvider = require('mitweb3-providers-ws');

var options = { timeout: 30000, headers: {authorization: 'Basic username:password'} } // set a custom timeout at 30 seconds, and credentials (you can also add the credentials to the URL: ws://username:password@localhost:8546)
var ws = new Web3WsProvider('ws://localhost:8546', options);
```


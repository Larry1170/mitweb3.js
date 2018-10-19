# mitweb3-providers-http

*This is a sub package of mitweb3.js*

This is a HTTP provider for mitweb3.js.

## Installation

### Node.js

```bash
npm install mitweb3-providers-http
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-providers-http.js` in your html file.
This will expose the `Web3HttpProvider` object on the window object.


## Usage

```js
// in node.js
var Web3HttpProvider = require('mitweb3-providers-http');

var http = new Web3HttpProvider('http://localhost:8545');
```


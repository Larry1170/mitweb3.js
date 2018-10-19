# mitweb3-net

This is a sub package of mitweb3.js

This is the net package to be used in other mitweb3.js packages.

## Installation

### Node.js

```bash
npm install mitweb3-net
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-net.js` in your html file.
This will expose the `Web3Net` object on the window object.


## Usage

```js
// in node.js
var Web3Net = require('mitweb3-net');

var net = new Web3Net('ws://localhost:8546');
```


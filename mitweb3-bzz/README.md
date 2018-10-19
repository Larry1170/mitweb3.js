# mitweb3-bzz

This is a sub package of mitweb3.js

This is the swarm package.

## Installation

### Node.js

```bash
npm install mitweb3-bzz
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-bzz.js` in your html file.
This will expose the `Web3Personal` object on the window object.


## Usage

```js
// in node.js
var Web3Bzz = require('mitweb3-bzz');

var bzz = new Web3Bzz('http://swarm-gateways.net');
```




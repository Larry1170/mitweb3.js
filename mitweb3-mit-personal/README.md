# mitweb3-mit-personal

This is a sub package of mitweb3.js

This is the personal package to be used in the `mitweb3-mit` package.

## Installation

### Node.js

```bash
npm install mitweb3-mit-personal
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-mit-personal.js` in your html file.
This will expose the `Web3MitPersonal` object on the window object.


## Usage

```js
// in node.js
var Web3MitPersonal = require('mitweb3-mit-personal');

var personal = new Web3MitPersonal('ws://localhost:8546');
```




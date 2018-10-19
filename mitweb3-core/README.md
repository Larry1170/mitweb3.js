# mitweb3-core

This is a sub package of mitweb3.js

The core package contains core functions for mitweb3.js packages.

## Installation

### Node.js

```bash
npm install mitweb3-core
```


## Usage

```js
// in node.js
var core = require('mitweb3-core');

var CoolLib = function CoolLib() {

    // sets _requestmanager and adds basic functions
    core.packageInit(this, arguments);
    
};


CoolLib.providers;
CoolLib.givenProvider;
CoolLib.setProvider();
CoolLib.BatchRequest();
CoolLib.extend();
...
```




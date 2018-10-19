# mitweb3-core-promievent

This is a sub package of mitweb3.js

This is the PromiEvent package is used to return a EventEmitter mixed with a Promise to allow multiple final states as well as chaining.

## Installation

### Node.js

```bash
npm install mitweb3-core-promievent
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-core-promievent.js` in your html file.
This will expose the `Web3PromiEvent` object on the window object.


## Usage

```js
// in node.js
var Web3PromiEvent = require('mitweb3-core-promievent');

var myFunc = function(){
    var promiEvent = Web3PromiEvent();
    
    setTimeout(function() {
        promiEvent.eventEmitter.emit('done', 'Hello!');
        promiEvent.resolve('Hello!');
    }, 10);
    
    return promiEvent.eventEmitter;
};


// and run it
myFunc()
.then(console.log);
.on('done', console.log);
```




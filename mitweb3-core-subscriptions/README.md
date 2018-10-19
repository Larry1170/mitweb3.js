# mitweb3-core-subscriptions

This is a sub package of mitweb3.js

The subscriptions package used within some mitweb3.js packages.

## Installation

### Node.js

```bash
npm install mitweb3-core-subscriptions
```

### In the Browser

Build running the following in the mitweb3.js repository:

```bash
npm run-script build-all
```

Then include `dist/mitweb3-core-subscriptions.js` in your html file.
This will expose the `Web3Subscriptions` object on the window object.


## Usage

```js
// in node.js
var Web3Subscriptions = require('mitweb3-core-subscriptions');

var sub = new Web3Subscriptions({
    name: 'subscribe',
    type: 'tnb',
    subscriptions: {
        'newBlockHeaders': {
            subscriptionName: 'newHeads',
            params: 0,
            outputFormatter: formatters.outputBlockFormatter
        },
        'pendingTransactions': {
            params: 0,
            outputFormatter: formatters.outputTransactionFormatter
        }
    }
});
sub.attachToObject(myCoolLib);

myCoolLib.subscribe('newBlockHeaders', function(){ ... });
```



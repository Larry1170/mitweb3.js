## mitjs-unit

A simple module for handling mit unit convertion.

## Install

```
npm install --save mitjs-unit
```

## Usage

```js
const unit = require('mitjs-unit');

var val1 = unit.toWei(249824778, 'tnb');

// result <BN ...> 249824778000000000000000000

var val2 = unit.fromWei('249824778000000000000000000', 'tnb');

// result '249824778'
```

## About

A port from the `mitweb3.js` library, that just handles the unit convertion between the various types of mit currency units.

Note, the `toWei` returns a BN instance while `fromWei` always returns a string number.

## Amorphic Data Formatting

`mitjs-unit` uses the [number-to-bn](http://github.com/silentcicero/number-to-bn) module to format all number values (hex or otherwise) into digestable BN.js number instances.

## Methods Available & Objects

```
unitMap         { unitName: singleUnitWeiValue, ... }
getValueOfUnit  <Function (unit) : (BN)>
toWei           <Function (value, unit) : (BN)>
fromWei         <Function (value, unit) : (String)>
```

## Supported Units

```
'wei':          '1',
'kwei':         '1000',
'Kwei':         '1000',
'babbage':      '1000',
'femtotnb':     '1000',
'mwei':         '1000000',
'Mwei':         '1000000',
'lovelace':     '1000000',
'picotnb':      '1000000',
'gwei':         '1000000000',
'Gwei':         '1000000000',
'shannon':      '1000000000',
'nanotnb':      '1000000000',
'nano':         '1000000000',
'szabo':        '1000000000000',
'microtnb':     '1000000000000',
'micro':        '1000000000000',
'finney':       '1000000000000000',
'millitnb':     '1000000000000000',
'milli':        '1000000000000000',
'tnb':          '1000000000000000000',
'ktnb':         '1000000000000000000000',
'grand':        '1000000000000000000000',
'mtnb':         '1000000000000000000000000',
'gtnb':         '1000000000000000000000000000',
'ttnb':         '1000000000000000000000000000000'
```


## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
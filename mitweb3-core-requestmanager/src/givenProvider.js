/*
 This file is part of mitweb3.js.

 mitweb3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 mitweb3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with mitweb3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file givenProvider.js
 */

"use strict";

var givenProvider = null;

// ADD GIVEN PROVIDER
/* jshint ignore:start */
var global = Function('return this')();

// EthereumProvider
if(typeof global.ethereumProvider !== 'undefined') {
    givenProvider = global.ethereumProvider;

// Legacy mitweb3.currentProvider
} else if(typeof global.mitweb3 !== 'undefined' && global.mitweb3.currentProvider) {

    if(global.mitweb3.currentProvider.sendAsync) {
        global.mitweb3.currentProvider.send = global.mitweb3.currentProvider.sendAsync;
        delete global.mitweb3.currentProvider.sendAsync;
    }

    // if connection is 'ipcProviderWrapper', add subscription support
    if(!global.mitweb3.currentProvider.on &&
        global.mitweb3.currentProvider.connection &&
        global.mitweb3.currentProvider.connection.constructor.name === 'ipcProviderWrapper') {

        global.mitweb3.currentProvider.on = function (type, callback) {

            if(typeof callback !== 'function')
                throw new Error('The second parameter callback must be a function.');

            switch(type){
                case 'data':
                    this.connection.on('data', function(data) {
                        var result = '';

                        data = data.toString();

                        try {
                            result = JSON.parse(data);
                        } catch(e) {
                            return callback(new Error('Couldn\'t parse response data'+ data));
                        }

                        // notification
                        if(!result.id && result.method.indexOf('_subscription') !== -1) {
                            callback(null, result);
                        }

                    });
                    break;

                default:
                    this.connection.on(type, callback);
                    break;
            }
        };
    }

    givenProvider = global.mitweb3.currentProvider;
}
/* jshint ignore:end */


module.exports = givenProvider;

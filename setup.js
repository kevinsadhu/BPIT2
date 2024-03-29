/* global process */
/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved.
 *
 * This app will run in one of 3 environments:
 * 1. Bluemix Production
 * 2. Bluemix Development
 * 3. Localhost Development
 *
 * This file will export objects including the port that the application should
 * listen on.  If the application is running on the localhost, port 3000 will be
 * used.
 *
 * Contributors:
 *   David Huffman - Initial implementation
 *******************************************************************************/
var TAG = 'SETUP.JS: ';

var vcap_app = {application_uris: ['']};
var ext_uri = '';


////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////    1. Bluemix Production    ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

if (process.env.VCAP_APPLICATION) {
    console.log(TAG + 'This app is running in Bluemix.');
    vcap_app = JSON.parse(process.env.VCAP_APPLICATION);
    for (var i in vcap_app.application_uris) {
        if (vcap_app.application_uris[i].indexOf(vcap_app.name) >= 0) {
            ext_uri = vcap_app.application_uris[i];
        }
    }
    exports.SERVER = {
        HOST: process.env.VCAP_APP_HOST || '0.0.0.0',
        PORT: process.env.VCAP_APP_PORT || process.env.PORT,
        DESCRIPTION: 'Bluemix - Production',
        EXTURI: ext_uri
    };
}


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     2. Localhost - Development    ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
else {
    console.log(TAG + 'Assuming this app is running on localhost.');
    exports.SERVER = {
        HOST: 'localhost',
        PORT: 3000,
        DESCRIPTION: 'Localhost',
        EXTURI: process.env.EXTURI || 'localhost:3000'
    };
}

exports.SERVER.vcap_app = vcap_app;

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////     Common     ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
exports.DEBUG = vcap_app;


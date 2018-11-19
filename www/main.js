// For any third party dependencies, like jQuery, place them in the lib folder.
'use strict';
//const fs = require('fs');

var app = null;
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    },
    i18n: {
    }
});
        //locale: 'en-gb'

// Start loading the main app file. Put all of
// your application logic in there.'pouchdb',
requirejs(['jquery', 'pouchdb.authentication', 'pouchdb-replication-stream', 'app/pbl', 'app/htmlConsole', "i18n!app/nls/lang"],
    function ($, authentication, replication, pbl, htmlConsole, lang) {
        app = pbl;
        app.lang = lang;
        app.console = htmlConsole;
        require(['app/handlebars/all', 'app/handlebars/' + lang.Sprache], function (all) {
            app.handlebars = all;
            document.getElementById("body").innerHTML = app.handlebars['body']({ str: app.lang });
            htmlConsole.initialize();
            pbl.initialize(lang);
            //app.onDeviceReady();
        });
    }
);

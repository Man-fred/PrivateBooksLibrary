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
    //    ,locale: 'fr'
});

// Start loading the main app file. Put all of
// your application logic in there.'pouchdb',
requirejs(['jquery', 'pouchdb.authentication', 'pouchdb-replication-stream', 'app/pbl', 'app/htmlConsole', "i18n!app/nls/lang"],
    function ($, authentication, replication, pbl, htmlConsole, lang) {
        app = pbl;
        app.lang = lang;
        app.console = htmlConsole;
        htmlConsole.initialize();
        pbl.initialize(lang);
    }
);

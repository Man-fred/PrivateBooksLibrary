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
    }
});

// Start loading the main app file. Put all of
// your application logic in there.'pouchdb',
requirejs(['jquery', 'pouchdb.authentication', 'pouchdb-replication-stream', 'app/pbl', "i18n!nls/lang"],
    function ($, authentication, replication, pbl, lang) {
    pbl.initialize(lang);
    //app = pbl;
    //app.lang = lang;
    //alert(navigator.languages+" or "+navigator.language+" or "+navigator.userLanguage + ': '+app.lang.books);
});

/*
    shim: {
        'socketio': {
            exports: 'io'
        }
     },
    <!-- script type="application/javascript" src="lib/log/console-log-html.min.js" >< script -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script data-main="main" src="lib/require.js"></script>

    <script src="js/pouchdb.min.js"></script> <!-- 6.3.4 -->
    <script src="js/pouchdb.find.js"></script>
    <script src="js/pouchdb.authentication.js"></script>
    <script src="js/pouchdb.cordova-sqlite.js"></script>
    <script src="lib/touchSwipe/jquery.touchSwipe.min.js"></script>
    <!-- script src="js/firstbulk.js"></script -->

*/
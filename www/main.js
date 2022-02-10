// For any third party dependencies, like jQuery, place them in the lib folder.
'use strict';
//const fs = require('fs');

var app = null;
console.log(window.Capacitor);
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
// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
	  reg.onupdatefound = () => {
		const installingWorker = reg.installing;
		installingWorker.onstatechange = () => {
		  if (installingWorker.state === 'installed' &&
			  navigator.serviceWorker.controller) {
			// Preferably, display a message asking the user to reload...
			location.reload();
		  }
		};
	  };
  });
}

// Start loading the main app file. Put all of
// your application logic in there.'pouchdb',
requirejs(['jquery/jquery-3.3.1', 'pouchdb.authentication', 'pouchdb-replication-stream', 'app/pbl', 'app/htmlConsole', "i18n!app/nls/lang"],
    function ($, authentication, replication, pbl, htmlConsole, lang) {
        app = pbl;
        app.lang = lang;
        app.console = htmlConsole;
        require(['app/handlebars/all', 'app/handlebars/' + lang.Sprache], function (all) {
            app.handlebars = all;
            document.getElementById("body").innerHTML = app.handlebars['body']({ str: app.lang });
            htmlConsole.initialize();
            pbl.initialize(lang);
            app.onDeviceReady();
        });
    }
);

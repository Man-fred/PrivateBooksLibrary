/* global app, Connection */

define(function (require) {
    var pbl = {
        currentApp: "pbl_v1",
        once: true,
        initialize: function (lang) {
            if (this.once) {
                this.once = false;
                lang._get = function (test, zahl = 1) {
                    if (zahl > 1 && app.lang[test + "2"] !== undefined) {
                        return app.lang[test + "2"];
                    } else if (zahl === 0 && app.lang[test + "0"] !== undefined) {
                        return app.lang[test + "0"];
                    } else {
                        return app.lang[test] === undefined ? test : app.lang[test];
                    }
                };
                console.log(navigator.languages, navigator.language, navigator.userLanguage, 'aktiv: ' + lang._get('Sprache'));
                console.log('userAgent', window.navigator.userAgent);

                document.addEventListener('deviceready', this.onDeviceReady, false);
                window.addEventListener("resize", this.onWindowLoadResize);
                if (window.DeviceOrientationEvent) {
                    window.addEventListener("deviceorientation", this.onWindowOrientation);
                }
                window.addEventListener('beforeinstallprompt', this.onBeforeinstallprompt);
                
                // Top/Bottom der Seite ist sonst scrollbar unter ios
                // hilft nicht
                //Keyboard.shrinkView(true);

                require(['./position'], function (position) {
                    position.initialize(pbl);
                    pbl.position = position;
                });

                require(['./tables'], function (tables) {
                    //tables.initialize();
                    pbl.myApp = tables;
                    require(['./data'], function (data) {
                        data.initialize(pbl.myApp);
                        pbl.data = data;
                        pbl.source += '~data';
                        pbl.onDeviceReady();
                    });
                    require(['./datalist'], function (datalist) {
                        datalist.initialize(pbl);
                        pbl.datalist = datalist;
                        pbl.source += '~datalist';
                        pbl.onDeviceReady();
                    });
                });
                require(['./pouch'], function (pouch) {
                    pouch.initialize(pbl);
                    pbl.pouch = pouch;
                    $('#appLogin').click(pbl.pouch.remoteLogin);
                    $('#appBackup').click(pbl.pouch.backup);
                    $('#appRestore').click(pbl.pouch.restore);
                    //console.log('pouch');
                    require(['./purchase'], function (purchase) {
                        pbl.purchase = purchase;
                        pbl.source += '~purchase';
                        pbl.onDeviceReady();
                    });
                });
                require(['./ui'], function (ui) {
                    ui.initialize(pbl);
                    pbl.ui = ui;
                    pbl.source += '~ui';
                    pbl.onDeviceReady();
                });
                require(['./book'], function (book) {
                    book.initialize(pbl);
                    pbl.book = book;
                    pbl.source += '~book';
                    pbl.onDeviceReady();
                });
                require(['./search'], function (search) {
                    search.initialize();
                    pbl.search = search;
                    pbl.source += '~search';
                    pbl.onDeviceReady();
                });
                require(['./info'], function (info) {
                    pbl.info = info;
                    pbl.source += '~info';
                    pbl.onDeviceReady();
                });
            }
        },
        //ui: null,
        //slide: require('./slide'),
        //pouch: null,
        menu: require('./menu'),
        init: require('./init'),
        password: require('./password'),
        //data: null,
        dbReady : 8,
        //system : null,
        seite: "",
        //appPage: 1,
        //appSort: 'name',
        //appSortUp: false,
        appPage: 1,
        select: '', // Vorauswahl über Menü
        showDeleted: false, // gelöschte Daten anzeigen oder nicht
        appCheck: [],
        //appResult: [],
        apiLibrarything : "",
        apiIsbndb : "",
        viewportXS: null,
        viewportXXS: null,
        viewportHeight: null,
        orientation: null,
        installPrompt: null,
        listeningElement: null,
        receivedElement: null,
        countBooks: 0,
        countLog: 0,
        loglevel: 5,
        showInit: null,
        onlineState: false,           // abhängig von netzwerkerkennung (gsm / wifi) und config
        backgroundState: false,       // app im Hintergrund?
        onDeviceReady: function () {
            pbl.dbReady--;
            //console.log(pbl.dbReady);
            if (pbl.dbReady === 0) {
                //app.ui.load(document.getElementById("action"), 'data_action', app.data.data_action);
                app.info.initialize();
                app.pouch.infoSync = document.getElementById('info-sync');
                app.pouch.infoSync.innerHTML = 'initialize';

                //console.log(cordova.file);
                //pbl.takeOverConsole(pbl.loglevel);
                $('#appSettings').click(function () {
                    pbl.data.show('**_login'+pbl.pouch.dbIdPrivate, 'login');
                });

                document.addEventListener("pause", pbl.onPause, false);
                document.addEventListener("resume", pbl.onResume, false);
                document.addEventListener("offline", pbl.onOffline, false);
                document.addEventListener("online", pbl.onOnline, false);
                document.getElementById('appPrint').addEventListener("click", app.ui.print); 
                document.getElementById("mSettings").addEventListener("click", app.ui.dropdown); 

                //cordova.plugins.notification.badge.set(1);

                pbl.onWindowLoadResize();
                // oberhalb neu, war vor pbl.dbReady--;
                pbl.menu.main(pbl.myApp);
                pbl.pouch.dbNew();
                pbl.purchase.init();
                //navigator.vibrate(200);
                //console.log("vibration: "+(navigator.vibrate ? true : false) );
            }
        },
        onWindowLoadResize: function () {
            // @xs < 568
            // @xxs < 458
            var viewportTemp = $(window).width();
            if (viewportTemp < 568 && pbl.viewportXS >= 568) {
                //$("#partner").html('');
                $("#singleform").removeClass(" pure-form-aligned").addClass("pure-form pure-form-stacked");
                pbl.viewportXS = viewportTemp;
            } else if (viewportTemp >= 568 && pbl.viewportXS < 568) {
                //$("#partner").html('<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=29&l=ur1&category=books&f=ifr&linkID=d5d77bd50e3d0c95cef3edf83dd6cc87&t=bielemeierde-21&tracking_id=bielemeierde-21" width="120" height="600" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>');
                $("#singleform").addClass("pure-form pure-form-aligned").removeClass("pure-form-stacked");
                pbl.viewportXS = viewportTemp;
            }
            if (viewportTemp < 458 && pbl.viewportXXS >= 458) {
                $('#appTitle').html(""); //PBL
                pbl.viewportXXS = viewportTemp;
            } else if (viewportTemp >= 458 && pbl.viewportXXS < 458) {
                $('#appTitle').html("Private Books Library");
                pbl.viewportXXS = viewportTemp;
            }
            var viewportHeight = $(window).height();
            if (viewportHeight !== pbl.viewportHeight) {
                viewportHeight = viewportHeight - 2 * $('#footer').height();
                document.getElementById("myDropdown1").style.maxHeight = viewportHeight + 'px';
                document.getElementById("myDropdown2").style.maxHeight = viewportHeight + 'px';
                pbl.viewportHeight = viewportHeight;
            }
        },
        onWindowOrientation: function(event) {
            // alpha: rotation around z-axis
            var rotateDegrees = event.alpha;
            // gamma: left to right
            var leftToRight = event.gamma;
            // beta: front back motion
            var frontToBack = event.beta;
            
             //var orientationUp = (event.beta > 0 && event.beta < 180);
             //var orientationleft = (event.gamma > -90 && event.gamma < 90);
            //pbl.orientationPortrait = $(window).width() < $(window).height();
           if (pbl.orientation !== window.orientation) {
               pbl.orientation = window.orientation;
               //ios iPhone 11
               document.documentElement.style.setProperty('--safe-bottom', "env(safe-area-inset-bottom)");
               switch (window.orientation) {
                    case 90 :
                        document.documentElement.style.setProperty('--safe-left', "env(safe-area-inset-top)");
                        document.documentElement.style.setProperty('--safe-top',   "0px");
                        document.documentElement.style.setProperty('--safe-right',  "0px");
                         break;
                   case -90 :
                       document.documentElement.style.setProperty('--safe-right', "env(safe-area-inset-top)");
                       document.documentElement.style.setProperty('--safe-top',  "0px");
                       document.documentElement.style.setProperty('--safe-left',  "0px");
                       break;
               case 0 :
                   document.documentElement.style.setProperty('--safe-top', "env(safe-area-inset-left)");
                   document.documentElement.style.setProperty('--safe-left',  "0px");
                   document.documentElement.style.setProperty('--safe-right',  "0px");
                   break;

               }
               pbl.info.setDev("Orientierung: "+pbl.orientation
                        +","+document.documentElement.style.getPropertyValue('--safe-left')
                        +"-"+document.documentElement.style.getPropertyValue('--safe-top')
                        +"-"+document.documentElement.style.getPropertyValue('--safe-right')
                        +"-"+document.documentElement.style.getPropertyValue('--safe-bottom'));

            }
        },
        onPause: function () {
            // im Hintergrund offline gehen??
            app.backgroundState = true;
            app.setOnlineState();
            if (app.onlineState && !app.pouch.onlineBackground) {
                app.pouch.remoteLogout();
                console.info('App im Hintergrund, Sync pausiert');
            }
        },
        onResume: function () {
            // im Vordergrund wieder synchronisieren, falls Server aktiv
            app.backgroundState = false;
            if (!app.onlineState || !app.pouch.db.sync) {
                app.setOnlineState();
                if (app.onlineState) {
                    app.pouch.remoteLogin();
                    console.info('App im Vordergrund, Sync gestartet');
                }
            }
        },
        onOnline: function () {
            app.setOnlineState();
            if (app.onlineState && !app.pouch.db.sync) {
                app.pouch.remoteLogin();
                console.info('App online, Sync gestartet');
            }
        },
        onOffline: function () {
            app.setOnlineState();
            app.pouch.remoteLogout();
            console.info('App offline, Sync pausiert');
        },
        setOnlineState: function (setState = false) {
            if (app.pouch.online === undefined) app.pouch.online = 0;
            if (app.pouch.onlineCell === undefined) app.pouch.onlineCell = 0;
            if (app.pouch.onlineBackground === undefined) app.pouch.onlineBackground = 0;
            app.info.checkConnection();
            if (app.backgroundState && !app.pouch.onlineBackground) {
                app.onlineState = false;
            } else {
                switch (app.info.networkState) {
                    case Connection.UNKNOWN:
                    case Connection.ETHERNET:
                    case Connection.WIFI: app.onlineState = app.pouch.online;
                        break;
                    case Connection.CELL_2G: app.onlineState = app.pouch.online && app.pouch.onlineCell; break;
                    case Connection.CELL_3G: app.onlineState = app.pouch.online && app.pouch.onlineCell; break;
                    case Connection.CELL_4G: app.onlineState = app.pouch.online && app.pouch.onlineCell; break;
                    case Connection.CELL: app.onlineState = app.pouch.online && app.pouch.onlineCell;
                        break;
                    default: app.onlineState = false;
                        break;
                }
            }
            console.info('N:'+ app.info.networkState+ ' B:'+ app.backgroundState+ ' ON:'+ app.pouch.online+ ' OC:'+ app.pouch.onlineCell+ ' OB:'+ app.pouch.onlineBackground+ ' Status '+ app.onlineState);
            var temp = app.onlineState === '1' ? ', Online' : ', Offline';
            app.info.setDev('Conn ' + app.info.network[app.info.networkState] + temp, app.info.networkState === Connection.NONE ? 'offline' : 'online');

            if (setState) {
                if (app.onlineState) {
                    if (!app.pouch.db.sync) {
                        app.pouch.remoteLogin();
                    }
                } else {
                    app.pouch.remoteLogout();
                }
            }
        },

        onBeforeinstallprompt : function(e){
          // Prevent the mini-infobar from appearing on mobile
          e.preventDefault();
          // Stash the event so it can be triggered later.
          installPrompt = e;
          // Update UI notify the user they can install the PWA
          showInstallPromotion();
          // Optionally, send analytics event that PWA install promo was shown.
          console.log(`'beforeinstallprompt' event was fired.`);
        },
        
        main: function () {
             /* nur jQuery Mobile
              $(document).bind("mobileinit", function () {
              // Make your jQuery Mobile framework configuration changes here!
              $.support.cors = true;
              $.mobile.allowCrossDomainPages = true;
              });
              */
             /*
             var oldLog = console.log;
             console.log1 = function (message, a2, a3, a4) {
                 $("#info-log").append('<li>' + message + '</li>');
                 oldLog.apply(console, arguments);
             };
             
             window.onerror = function (message, source, lineno, colno, error) {
                 console.log(message + ' ' + source + ' (' + lineno + ', ' + colno + ') ' + error);
             }
             */

             function dbRenew(destroy = false, create = true) {
                 if (window.confirm('lokale Datenbank löschen?')) {
                     app.pouch.db.destroy().then(function () {
                         // database destroyed
                         dbNew();
                     }).catch(function (err) {
                         // error occurred
                     });
                 }
             }

             function onDeviceReady() {

                 // Code for Read Data from Indexed on for edit(Single Record)
                 $('#btnShow').click(function () {
                     var id = $('#txtSearch').val();
                     show_data(id);
                 });
                 $('#btnShowAll').click(function () {
                     show_all();
                 });



                 $("#mypanel").trigger("updatelayout");
             }
         },
         writeFile: function (fileEntry, dataObj) {
             // Create a FileWriter object for our FileEntry (log.txt).
             fileEntry.createWriter(function (fileWriter) {

                 fileWriter.onwriteend = function () {
                     console.log("Successful file write...");
                     readFile(fileEntry);
                 };

                 fileWriter.onerror = function (e) {
                     console.log("Failed file write: " + e.toString());
                 };

                 // If data object is not passed in,
                 // create a new Blob instead.
                 if (!dataObj) {
                     dataObj = new Blob(['some file data'], { type: 'text/plain' });
                 }

                 fileWriter.write(dataObj);
             });
         },
         getSampleFile: function (dirEntry) {

             var xhr = new XMLHttpRequest();
             xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
             xhr.responseType = 'blob';

             xhr.onload = function () {
                 if (this.status === 200) {

                     var blob = new Blob([this.response], { type: 'image/png' });
                     saveFile(dirEntry, blob, "downloadedImage.png");
                 }
             };
             xhr.send();
         }
    };
    return pbl;
});

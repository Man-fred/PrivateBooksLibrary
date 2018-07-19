define(function (require) {
    var pbl = {
        network: {},

        once: true,
        initialize: function (lang) {
            if (this.once) {
                this.once = false;
                console.log('pbl.js:initialize');
                app = pbl;
                app.lang = lang;
                lang._get = function (test, zahl = 1) {
                    if (zahl > 1 && app.lang[test + "2"] !== undefined) {
                        return app.lang[test + "2"];
                    } else if (zahl === 0 && app.lang[test + "0"] !== undefined) {
                        return app.lang[test + "0"];
                    } else {
                        return app.lang[test] === undefined ? test : app.lang[test];
                    }
                };
                console.log('Sprache: ' + lang._get('Sprache'));
                console.log(navigator.languages, navigator.language, navigator.userLanguage);
                app.log('Sprache: ' + lang._get('Sprache'));
                document.addEventListener('deviceready', this.onDeviceReady, false);
                window.addEventListener("resize", this.onWindowLoadResize);
                require(['app/handlebars/all', 'app/handlebars/'  + lang.Sprache], function (all) {
                    pbl.handlebars = all;
                });

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
                        pbl.onDeviceReady();
                    });
                    require(['./datalist'], function (datalist) {
                        datalist.initialize(pbl);
                        pbl.datalist = datalist;
                        pbl.onDeviceReady();
                    });
                });
                require(['./pouch'], function (pouch) {
                    pouch.initialize(pbl);
                    pbl.pouch = pouch;
                    $('#appLogin').click(pbl.pouch.remoteLogin);
                    //console.log('pouch');
                    pbl.onDeviceReady();
                });
                require(['./ui'], function (ui) {
                    ui.initialize(pbl);
                    pbl.ui = ui;
                    pbl.onDeviceReady();
                });
                require(['./book'], function (book) {
                    book.initialize(pbl);
                    pbl.book = book;
                    pbl.onDeviceReady();
                });
                require(['./search'], function (search) {
                    search.initialize();
                    pbl.search = search;
                    pbl.onDeviceReady();
                });
            }
        },
        ui: null,
        //slide: require('./slide'),
        //pouch: null,
        menu: require('./menu'),
        init: require('./init'),
        //data: null,
        dbReady : 7,
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
        //infoDev: null,
        listeningElement: null,
        receivedElement: null,
        countBooks: 0,
        countLog: 0,
        showInit: null,

        onDeviceReady: function () {
            pbl.dbReady--;
            //console.log(pbl.dbReady);
            if (pbl.dbReady === 0) {
                //var appTitle = 'Private Books Library';
                //$('#appTitle').html(appTitle);
                $('#appRefresh').click(this.refresh);
                $('#appSettings').click(function () {
                    pbl.data.show(pbl.pouch.dbIdPrivate + '_login', 'login');
                });
                document.addEventListener("pause", pbl.onPause, false);
                document.addEventListener("resume", pbl.onResume, false);
                document.addEventListener("offline", pbl.onOffline, false);
                document.addEventListener("online", pbl.onOnline, false);

                //cordova.plugins.notification.badge.set(1);
                pbl.infoDev = document.getElementById('info-dev');
                pbl.infoDev.innerHTML = "Ready";
                pbl.checkConnection();

                pbl.infoSync = document.getElementById('info-sync');
                /*pbl.listeningElement = pbl.infoDev.querySelector('.listening');
                pbl.receivedElement = pbl.infoDev.querySelector('.received');

                pbl.listeningElement.setAttribute('style', 'display:none;');
                pbl.receivedElement.setAttribute('style', 'display:block;');*/

                pbl.onWindowLoadResize();
                // oberhalb neu, war vor pbl.dbReady--;
                pbl.menu.main(pbl.myApp);
                console.log('dbNew');
                pbl.pouch.dbNew();
                pbl.datalist.fill("books");
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
                $('#appTitle').html("PBL");
                pbl.viewportXXS = viewportTemp;
            } else if (viewportTemp >= 458 && pbl.viewportXXS < 458) {
                $('#appTitle').html("Private Books Library");
                pbl.viewportXXS = viewportTemp;
            }
            //pbl.position.height();
        },
        onPause: function () {
            // im Hintergrund offline gehen??
        },
        onResume: function () {
            // im Vordergrund wieder synchronisieren, falls Server aktiv
        },
        onOnline: function () {
            pbl.checkConnection();
        },
        onOffline: function () {
            pbl.checkConnection();
        },
        checkConnection: function () {
            var networkState = navigator.connection.type;
            if (pbl.network[Connection.NONE] === undefined) {
                pbl.network[Connection.UNKNOWN] = 'Unknown';
                pbl.network[Connection.ETHERNET] = 'Ethernet';
                pbl.network[Connection.WIFI] = 'WiFi';
                pbl.network[Connection.CELL_2G] = '2G Cell';
                pbl.network[Connection.CELL_3G] = '3G Cell';
                pbl.network[Connection.CELL_4G] = '4G Cell';
                pbl.network[Connection.CELL] = 'Cell generic';
                pbl.network[Connection.NONE] = 'No network';
            }

            pbl.infoDev.innerHTML = 'Connection: ' + pbl.network[networkState];
        },
        refresh: function () {
             // page1 active?
             if (pbl.appPage === 1) {
                 pbl.pouch.appResult[pbl.seite] = null;
                 pbl.datalist.fill(pbl.seite, true);
             }
             //alert('refresh ' + seite);
         },
         log: function (message, a2, a3, a4) {
             var ng = new Date().toLocaleString();
             $("#info-log").prepend('<li id="info-log' + pbl.countLog+'">' + ng + ': ' + message + '</li>');
             if (pbl.countLog > 50) {
                 $("#info-log" + (pbl.countLog-50)).remove();
             }
             pbl.countLog++;
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
                     db.destroy().then(function () {
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
         }
    };
    return pbl;
});
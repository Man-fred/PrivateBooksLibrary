define(function (require) {
    var pbl = {
        initialize: function (lang) {
            app = pbl;
            app.lang = lang;
            console.log('initialize');
            document.addEventListener('deviceready', this.onDeviceReady, false);
            window.addEventListener("resize", this.onWindowLoadResize);
            $('#appRefresh').click(this.refresh);
            $('#appSettings').click(function () {
                pbl.data.show(pbl.pouch.dbIdPrivate + '_login', 'login');
            });
            $('#appReturn').click(function () {
                pbl.ui.show_page1(1);
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
                console.log('pouch');
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
        },
        ui: null,
        //slide: require('./slide'),
        //pouch: null,
        menu: require('./menu'),
        //data: null,
        dbReady : 7,
        //system : null,
        seite: "",
        //appPage: 1,
        //appSort: 'name',
        //appSortUp: false,
        appPage: 1,
        appCheck: [],
        appResult: [],
        apiLibrarything : "",
        apiIsbndb : "",
        viewportWidth: null,
        infoDev: null,
        listeningElement: null,
        receivedElement: null,
        countBooks: 0,
        countLog: 0,

        onDeviceReady: function () {
            var appTitle = 'Private Books Library';
            $('#appTitle').html(appTitle);
            pbl.infoDev = document.getElementById('info-dev');
            pbl.listeningElement = pbl.infoDev.querySelector('.listening');
            pbl.receivedElement = pbl.infoDev.querySelector('.received');

            pbl.listeningElement.setAttribute('style', 'display:none;');
            pbl.receivedElement.setAttribute('style', 'display:block;');
            require(['./position'], function (position) {
                position.initialize(pbl);
                pbl.position = position;
                //console.log('pouch');
                //pbl.onDeviceReady();
            });

            pbl.onWindowLoadResize();
            pbl.dbReady--;
            //console.log(pbl.dbReady);
            if (pbl.dbReady === 0) {
                pbl.menu.main(pbl.myApp);
                console.log('dbNew');
                pbl.pouch.dbNew();
                pbl.datalist.fill("books");
                navigator.vibrate(200);
                console.log("vibration: "+(navigator.vibrate ? true : false) );
            }
        },
        onWindowLoadResize: function () {
            var viewportTemp = $(window).width();
            if (pbl.viewportWidth < 568 ? viewportTemp >= 568 : viewportTemp < 568) {
                console.log(viewportTemp);
            }
            pbl.viewportWidth = viewportTemp;
            if (pbl.viewportWidth < 568) {
                //$("#partner").html('');
                $("#singleform").removeClass(" pure-form-aligned").addClass("pure-form pure-form-stacked");
            } else {
                //$("#partner").html('<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=29&l=ur1&category=books&f=ifr&linkID=d5d77bd50e3d0c95cef3edf83dd6cc87&t=bielemeierde-21&tracking_id=bielemeierde-21" width="120" height="600" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>');
                $("#singleform").addClass("pure-form pure-form-aligned").removeClass("pure-form-stacked");
            }
            //pbl.position.height();
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
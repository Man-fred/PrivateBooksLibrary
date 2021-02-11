/* global app */

﻿define(function () { //  

    var pouch = {
        cookie: require(['app/cookie'], function (cookie) {
            pouch.cookieGet(cookie);
        }),
        dbServer: null,
        dbPort: 6984,
        localdbA: 'PBL001B.db', // local name,
        localdb: 'PBL001S.db', // local name without attachments,
        dbName: null,
        dbUser: null,
        dbPass: null,
        dbIdPublic: null, //couchdb,
        dbIdPrivate: null, //pouchdb,

        db: null,
        dbA: null, //attachments (old complete)
        dbRemote: null, //couchdb,
        dbRemoteA: null, //couchdb attachments,
        dbSync: null, //sync-handle, used to stop syncing,
        dbSyncA: null, //sync-handle, used to stop syncing,
        dbReady: 2, //3,
        appResult: [],

        initialize: function (pbl) {
            this.pbl = pbl;
            //this.infoSync = document.getElementById('info-sync');
            //this.infoSync.innerHTML = 'initialize';
        },
        set: function (doc) {
            this.dbServer = doc.dbServer;
            this.dbPort = doc.dbPort;
            this.dbName = doc.dbUser;
            this.dbUser = doc.dbUser;
            this.dbPass = doc.dbPass;
            this.dbIdPublic = doc.dbId;
            this.appTitle = "PBL";//doc.appTitle;
            //pouch.apiIsbndb = doc.apiIsbndb;
            //pouch.apiLibrarything = doc.apiLibrarything;
            this.pbl.showInit = doc.showInit;
            this.online = doc.online;
            this.onlineCell = doc.onlineCell;
            this.onlineBackground = doc.onlineBackground;
        },
        infoSet: function (info) {
            this.infoSync.innerHTML = info;
        },
        remoteLogin: function () {
            if (app.purchase.inappabo1 && pouch.dbServer && pouch.dbPort) {
                if (app.onlineState) {
                    if (pouch.dbServer === 'pbl.bcss.de') {
                        pouch.prefix = 'pbl-';
                        pouch.prefixA = 'pbi-';
                    } else {
                        pouch.prefix = '';
                        pouch.prefixA = '';
                    }
                    if (pouch.db.mySync) {
                        // sync active, stopping first before connecting to another server
                        pouch.db.mySync.cancel();
                    }
                    pouch.dbRemote = new PouchDB('https://' + pouch.dbServer + ':' + pouch.dbPort + '/' + pouch.prefix + pouch.dbName, {skip_setup: true});
                    pouch.dbRemote.login(pouch.dbUser, pouch.dbPass, function (err, response) {
                        if (err) {
                            console.log(err);
                            //if (err.name === 'unauthorized' || err.name === 'authentication_error') {
                            // name or password incorrect
                            app.info.setSync(err.name, err.message, 'eLogin');//'server: name or password incorrect';
                        } else {
                            pouch.sync(pouch.db, pouch.dbRemote);
                            pouch.db.changes({
                                since: 'now',
                                live: true
                            }).on('change', pouch.newDocs);
                        }
                    });
                    if (pouch.dbA.mySync) {
                        // sync active, stopping first before connecting to another server
                        pouch.dbA.mySync.cancel();
                    }
                    pouch.dbRemoteA = new PouchDB('https://' + pouch.dbServer + ':' + pouch.dbPort + '/' + pouch.prefixA + pouch.dbName, {skip_setup: true});
                    pouch.dbRemoteA.login(pouch.dbUser, pouch.dbPass, function (err, response) {
                        if (err) {
                            console.log(err);
                            //if (err.name === 'unauthorized' || err.name === 'authentication_error') {
                            // name or password incorrect
                            app.info.setSync(err.name, err.message, 'eLogin');//'server: name or password incorrect';
                        } else {
                            /**/
                            pouch.sync(pouch.dbA, pouch.dbRemoteA);
                            pouch.dbA.changes({
                                since: 'now',
                                live: true
                            }).on('change', pouch.newDocs);

                        }
                    });
                } else {
                    app.info.setSync('Server: offline', 'Server-Verbindung gestoppt');
                }
            } else {
                app.info.setSync('local', 'Die Daten werden nicht synchronisiert', '');
            }
        },
        remoteLogout: function () {
            if (pouch.db.mySync) {
                // sync active, stopping
                pouch.db.mySync.cancel();
                app.info.setSync('Server: offline', 'Server-Verbindung gestoppt');
            }
            if (pouch.dbA.mySync) {
                // sync active, stopping
                pouch.dbA.mySync.cancel();
            }
        },
        setRemoteState: function () {
            if (app.purchase.inappabo1) {
                pouch.remoteLogin();
            } else {
                pouch.remoteLogout();
            }
        },
        newDocs: function (changes) {
            //console.log(changes);
        },
        // Initialise a sync with the remote server
        sync: function (localDb, remoteDb) {
            app.info.setSync('sync', 'Synchronisierung beginnt', 'syncing');
            localDb.replicate.from(remoteDb).on('complete', function (info) {
                //console.log(info.last_seq);
                console.info('Last Sequence: ' + parseInt(info.last_seq));
                // then two-way, continuous, retriable sync
                localDb.mySync = localDb.sync(remoteDb, {live: true, retry: true})
                        .on('change', pouch.onSyncChange)
                        .on('paused', pouch.onSyncPaused)
                        .on('complete', pouch.onSyncComplete)
                        .on('active', pouch.onSyncActive)
                        .on('denied', pouch.onSyncDenied)
                        .on('error', pouch.onSyncError);
            }).on('change', pouch.onSyncChange)
                    .on('paused', pouch.onSyncPaused)
                    .on('complete', pouch.onSyncComplete)
                    .on('active', pouch.onSyncActive)
                    .on('denied', pouch.onSyncDenied)
                    .on('error', pouch.onSyncError);
        },
        onSyncChange: function (info) {
            if (info.direction === "pull") {
                console.info('Last Sequence: ' + parseInt(info.change.last_seq));
            }
            console.log(info);
            app.info.setSync('Server: change ' + (typeof info.change === 'undefined' ? '' : info.change.ok), 'changed');
        },
        onSyncPaused: function (err) {
            app.info.setSync('Server: paused', (err ? err : ''), 'paused');
            pouch.db.info().then(function (result) {
                app.info.setSync('Server: paused', result.update_seq, 'paused');
                console.info('Server: paused ' + result.update_seq);
            }).catch(function (err) {
                console.log(err);
            });


        },
        onSyncActive: function () {
            app.info.setSync('Server: active', 'active');
        },
        onSyncDenied: function (err) {
            app.info.setSync('Server: denied', (err ? err : ''), 'error');
        },
        onSyncError: function (err) {
            app.info.setSync('Server: error ' + err, 'error');
        },
        onSyncComplete: function (info) {
            app.info.setSync('Server: complete', info.ok, 'insync');
        },
        dbOpen: function () {
            pouch.db = new PouchDB(pouch.localdb, {revs_limit: 10, auto_compaction: true});
            /* Aufräumen alter Datenbanken in Alpha, erledigt
            if (cordova.platformId === "ios") {
                pouch.dbA = new PouchDB('PBL001.db', {revs_limit: 1, auto_compaction: true});
                pouch.dbA.destroy().then(function (response) {
                    console.info(response);
                }).catch(function (err) {
                    console.info(err);
                });
            }
            // */
            pouch.dbA = new PouchDB(pouch.localdbA, {revs_limit: 1, auto_compaction: true});
        },
        dbNew: function () {
            //Test for browser webSQL compatibility
            console.info('Database start in pouch.js');
            this.infoSync.innerHTML = 'connect local';
            if (typeof cordova !== "undefined") {
                if (typeof cordova.platformId !== "undefined") {
                    console.info('cordova.platformId: ' + cordova.platformId);
                }
                if (typeof sqlitePlugin !== "undefined") {
                    console.info('cordova.sqlitePlugin: ' + sqlitePlugin);
                }
                if (typeof openDatabase !== "undefined") {
                    console.info('cordova.openDatabase: ' + openDatabase);
                }
            }
            /*
             if ((typeof cordova !== "undefined" && cordova.platformId !== 'browser' )
             && typeof sqlitePlugin !== 'undefined' && typeof openDatabase !== 'undefined') {
             this.dbA = new PouchDB(this.dbNameA, { revs_limit: 1, auto_compaction: true, adapter: 'cordova-sqlite' });
             this.db = new PouchDB(this.dbName, { revs_limit: 10, auto_compaction: true, adapter: 'cordova-sqlite' });
             console.info('Database: Cordova');
             } else if (!this.pbl.ui.isChrome() && window.openDatabase) {
             this.dbA = new PouchDB(this.dbNameA, { revs_limit: 10, adapter: 'websql' });
             this.db = new PouchDB(this.dbName, { revs_limit: 10, adapter: 'websql' });
             console.info('Database: webSQL');
             } else {
             this.dbA = new PouchDB(this.dbNameA, { revs_limit: 1, auto_compaction: true, size: 500 });
             this.db = new PouchDB(this.dbName, { revs_limit: 10, auto_compaction: true, size: 100 });
             console.info('Database: Pouchdb');
             }
             */
            this.dbOpen();
            pouch.dbLoad();
        },
        dbLoad: function () {
            pouch.dbReady--;
            if (pouch.dbReady === 0) {
                //einmalige Kopie von "mit Attachments" zu "nur Metadaten"
                /*
                 pouch.dbA.allDocs({
                 include_docs: true
                 //,attachments: true
                 })
                 .then(function (result) {
                 for (var i = 0; i < result.rows.length; i++) {
                 // _rev ist ungültig
                 delete result.rows[i].doc._rev;
                 if (result.rows[i].doc._attachments){
                 delete result.rows[i].doc._attachments;
                 }
                 pouch.db.put(result.rows[i].doc)
                 .catch(function (err) {
                 console.log('put '+err);
                 });
                 }
                 })
                 .catch(function (err) {
                 console.log('allDocs '+err);
                 });
                 */
                /*/ Liste 
                 for (var i = 0; i < localStorage.length; i++) {
                 console.info('localStorage: ' + localStorage.key(i) + ': ' + localStorage.getItem(localStorage.key(i)));
                 };
                 // Ende Liste */
                // normale Verarbeitung
                app.info.setSync('connect get login');
                pouch.db.get('**_login' + pouch.dbIdPrivate).then(function (doc) {
                    if (doc !== null) {
                        app.info.setSync('connect set login');
                        if (app.purchase.online && store.products[0]) {
                            var changed = 0;

                            var purchase = JSON.stringify(store.products);
                            if (doc.purchase !== purchase) {
                                doc.purchase = purchase;
                                pouch.db.put(doc).then(function (doc2) {
                                    // handle doc
                                    if (doc2) {
                                        app.ui.message(app.lang.ok + ": " + doc.name, 'ok');
                                    }
                                }).catch(function (err) {
                                    app.ui.message(app.lang.error + ": " + doc.name, 'error');
                                    console.log(err);
                                });
                            }
                        } else if (app.purchase.cache && doc.purchase) {
                            app.purchase.register(JSON.parse(doc.purchase), true);
                        }
                        //system = doc;
                        pouch.set(doc);

                        $('#appTitle').html(pouch.appTitle);
                        console.log(pouch.dbIdPrivate);
                        console.log(pouch.dbIdPublic);
                        //app.init.show(0);
                        app.ui.datalist("books");
                        app.setOnlineState();
                        pouch.remoteLogin();
                    }
                }).catch(function (err) {
                    // ersten Datensatz anlegen, falls nicht vorhanden    
                    app.info.setSync('connect new login');
                    pouch.dbIdPublic = pouch.dbIdPrivate;
                    pouch.db.put({
                        _id: '**_login' + pouch.dbIdPrivate,
                        name: 'local',
                        type: 'db',
                        dbServer: pouch.dbServer,
                        dbPort: pouch.dbPort,
                        //dbName: dbName,
                        dbUser: pouch.dbUser,
                        dbPass: pouch.dbPass,
                        dbId: pouch.dbIdPublic,
                        showInit: pouch.pbl.showInit,
                        title: '**_login' + pouch.dbIdPrivate
                    }).then(function (response) {
                        app.info.setSync('connect new login saved');
                        console.log(pouch.dbIdPrivate);
                        console.log(pouch.dbIdPublic);
                        console.info("Erster Start");
                        pouch.initPutConstants(pouch.dbIdPrivate);
                        app.ui.datalist("books");
                        app.init.show(0);
                        app.setOnlineState();
                        pouch.remoteLogin();
                    }).catch(function (err) {
                        app.info.setSync('connect no login', 'Datenbank ohne Funktion: ' + err, 'error');
                        console.error('Datenbank ohne Funktion: ' + err);
                    });
                });
            }
        },
        passwordChange: function (newpass) {
            pouch.db.get('**_login' + pouch.dbIdPrivate).then(function (doc) {
                if (doc !== null) {
                    if (doc.dbPass !== newpass) {
                        doc.dbPass = newpass;
                        pouch.db.put(doc).then(function (doc2) {
                            // handle doc
                            if (doc2) {
                                app.ui.message(app.lang.ok + ": " + doc.name, 'ok');
                            }
                        }).catch(function (err) {
                            app.ui.message(app.lang.error + ": " + doc.name, 'error');
                            console.log(err);
                        });
                    }
                    pouch.set(doc);

                    //app.setOnlineState();
                    pouch.remoteLogin();
                }
            }).catch(function (err) {
                app.info.setSync('connect no login', 'Datenbank ohne Funktion: ' + err, 'error');
                console.error('Datenbank ohne Funktion: ' + err);
            });
        },
        cookieGet: function (cookie) {
            pouch.dbIdPrivate = cookie('dbId');
            if (pouch.dbIdPrivate === null) {
                pouch.dbIdPrivate = Math.random();
                cookie('dbId', pouch.dbIdPrivate, 3650);
            }
            pouch.dbLoad();
        },
        getAll: function (seite, singleIsbn, cb) {
            if (!pouch.appResult[seite]) {
                var startkeystring = (seite === 'login' ? '**' : pouch.dbIdPublic) + '_' + seite;

                pouch.db.allDocs({
                    startkey: startkeystring
                    , endkey: startkeystring + 'a'
                    , include_docs: true
                            //,attachments: true
                })
                        .then(function (result) {
                            pouch.appResult[seite] = result;
                            cb(singleIsbn);
                        })
                        .catch(function (err) {
                            console.log(err);
                            console.log('show_all end');
                            app.ui.loading.style.display = "none";
                        });
            } else {
                cb(singleIsbn);
            }

        },
        setSync: function (myObj, state, table = "") {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            myObj.DBTimestamp = Math.floor(Date.now() / 1000);
            myObj.DBstate = state;
            if (state === "del") {
                myObj.DBdeleted = true;
            }
            if (!myObj.DBversion) {
                myObj.DBversion = 1;
            } else {
                myObj.DBversion += 1;
            }
            if (table === "")
                table = app.seite;
            if (!myObj._id) {
                if (app.myApp[table].idName) { // === 'state' || table === 'favorite') {
                    myObj._id = pouch.dbIdPublic + '_' + table + '_' + encodeURI(myObj.name);
                } else {
                    myObj._id = pouch.dbIdPublic + '_' + table + '2' + (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                }
        }
        },
        initPutConstants: function (id) {
            pouch.db.put({_id: id + '_state_0', name: '0', long: 'not owned'});
            pouch.db.put({_id: id + '_state_1', name: '1', long: 'ordered'});
            pouch.db.put({_id: id + '_state_2', name: '2', long: 'owned'});
            pouch.db.put({_id: id + '_state_6', name: '6', long: 'owned/read'});
            pouch.db.put({_id: id + '_state_9', name: '9', long: 'new'});
            pouch.db.put({_id: id + '_favorite_0', name: '0', long: 'Nein'});
            pouch.db.put({_id: id + '_favorite_1', name: '1', long: 'Ja'});
            // app-cache leeren
            var keys = Object.keys(pouch.appResult);
            //pouch.appResult.length = keys.length;
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] !== 'login') {
                    pouch.appResult[keys[i]] = null;
                }

            }
        },
        // funktioniert nicht unter Windows, Edge, Android !!
        // testen: https://cordova.apache.org/blog/2017/10/18/from-filetransfer-to-xhr2.html
        backup: function () {
            app.ui.loading.style.display = "block";
            pouch.db.allDocs({
                include_docs: true
            }).then(function (result) {
                pouch.dbA.allDocs({
                    include_docs: true
                    , attachments: true
                }).then(function (result2) {
                    app.ui.loading.style.display = "none";
                    result.img = result2;
                    var myJSON = JSON.stringify(result);
                    var textToSaveAsBlob = new Blob([myJSON], {type: "text/json"});
                    if (navigator.msSaveOrOpenBlob) {
                        navigator.msSaveOrOpenBlob(textToSaveAsURL, "pbl.backup");
                    } else {

                        window.URL = window.URL || window.webkitURL;
                        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
                        var fileNameToSaveAs = 'pbl.backup'; //document.getElementById("inputFileNameToSaveAs").value;

                        var downloadLink = document.createElement("a");
                        downloadLink.download = fileNameToSaveAs;
                        downloadLink.innerHTML = "Download File";
                        downloadLink.href = textToSaveAsURL;
                        downloadLink.onclick = function (event) {
                            document.body.removeChild(event.target);
                        };
                        downloadLink.onloadend = function (event) {
                            window.URL.revokeObjectURL(textToSaveAsURL);
                        };
                        downloadLink.style.display = "none";
                        document.body.appendChild(downloadLink);

                        downloadLink.click();
                    }
                });
            }).catch(function (err) {
                console.log(err);
                app.ui.loading.style.display = "none";
            });
        },
        updateLogin: function () {
            pouch.db.get('**_login' + pouch.dbIdPrivate).then(function (doc) {
                if (doc !== null) {
                    if (app.purchase.online && store.products[0]) {
                        var purchase = JSON.stringify(store.products);
                        if (doc.purchase !== purchase) {
                            doc.purchase = purchase;
                            pouch.db.put(doc).then(function (doc2) {
                            }).catch(function (err) {
                                app.ui.message(app.lang.error + ": " + doc.name, 'error');
                                console.error(err);
                            });
                        }
                    }
                }
            }).catch(function (err) {
                app.ui.message(app.lang.error + ": " + err, 'error');
                console.error(err);
            });

        },
        restore: function () {
            if (!pouch.overlayRestore) {
                pouch.overlayRestore = document.getElementById('overlayRestore');
                pouch.overlayRestore.innerHTML = app.handlebars['overlayRestore']({str: app.lang});
                document.getElementById("restoreStart").addEventListener("click", pouch.restoreStart);
                document.getElementById("restoreSchliessen").addEventListener("click", pouch.restoreSchliessen);
            }
            if (!pouch.dbServer) {
                document.getElementById("restoreLogoutDiv").style.display = "none";
            }
            pouch.overlayRestore.style.display = "flex";
        },
        restoreLoad: function () {
            var restoreLogout = !pouch.dbServer || document.getElementById("restoreLogout").checked === true;
            var restoreDelete = document.getElementById("restoreDelete").checked === true;

            if (restoreDelete && restoreLogout) {
                var fileToLoad = document.getElementById("fileToLoad").files[0];

                var fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    var textFromFileLoaded = fileLoadedEvent.target.result;
                    pouch.restoreResult = JSON.parse(textFromFileLoaded);
                    document.getElementById('restoreErg').innerHTML = 'Alles löschen, ' + pouch.restoreResult.total_rows + " Zeilen aus Datensicherung und " + pouch.restoreResult.img.total_rows + " Bilder laden?";
                    document.getElementById('restoreStart').style.display = "block";
                };
                fileReader.readAsText(fileToLoad, "UTF-8");
            }
        },
        restoreStart: function () {
            pouch.remoteLogout();
            pouch.dbServer = "";

            pouch.restoreCount = 2;
            pouch.restoreRows = pouch.restoreResult.total_rows + pouch.restoreResult.img.total_rows;

            pouch.db.destroy().then(function (response) {
                console.info(response);
                pouch.restoreRun();
            }).catch(function (err) {
                console.error(err);
                pouch.restoreRun();
            });
            pouch.dbA.destroy().then(function (response) {
                console.info(response);
                pouch.restoreRun();
            }).catch(function (err) {
                console.info(err);
                pouch.restoreRun();
            });

        },
        restoreRun: function () {
            pouch.restoreCount--;
            if (pouch.restoreCount === 0) {
                pouch.restoreNow();
            }
        },
        restoreNow: function () {
            var doc;
            pouch.dbOpen();
            var i = 0;
            for (i = 0; i < pouch.restoreResult.total_rows; i++) {
                doc = pouch.restoreResult.rows[i].doc;
                //console.log(i);
                pouch.db.put(doc, {force: true}).then(function (info) {
                    if (pouch.restoreRows-- <= 0) {
                        pouch.restoreFinish();
                    }
                }).catch(function (err) {
                    console.log(err);
                    //console.info('Datenbank ohne Funktion: ' + err);
                });
            }
            for (i = 0; i < pouch.restoreResult.img.total_rows; i++) {
                doc = pouch.restoreResult.img.rows[i].doc;
                //console.log(i);
                pouch.dbA.put(doc, {force: true}).then(function (info) {
                    if (pouch.restoreRows-- <= 0) {
                        pouch.restoreFinish();
                    }
                }).catch(function (err) {
                    console.log(err);
                    //console.info('Datenbank ohne Funktion: ' + err);
                });
            }
        },
        restoreFinish: function () {
            document.getElementById('restoreFinish').innerHTML = pouch.restoreResult.total_rows + " Zeilen aus Datensicherung und " + pouch.restoreResult.img.total_rows + " Bilder erfolgreich geladen.";
            pouch.dbLoad();
        },
        restoreSchliessen: function () {
            pouch.overlayRestore.style.display = "none";
            if (pouch.restoreResult) {
                delete pouch.restoreResult;
            }
        },
        changePass: function (oldPass, newPass, repeatPass) {
            if (newPass === repeatPass) {
                //curl -X GET http://localhost:5984/_users/org.couchdb.user:jan
                /*curl -X PUT http://localhost:5984/_users/org.couchdb.user:jan \
                 -H "Accept: application/json" \
                 -H "Content-Type: application/json" \
                 -H "If-Match: 1-e0ebfb84005b920488fc7a8cc5470cc0" \
                 -d '{"name":"jan", "roles":[], "type":"user", "password":"orange"}' */
            }
        }
    };
    return pouch;
});

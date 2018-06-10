define(function () { //  

    var pouch = {
        cookie: require(['app/cookie'], function (cookie) { pouch.cookieGet(cookie);}),
        dbServer: null,
        dbPort: 6984,
        dbNameA: 'PBL001.db', // local name,
        dbName:  'PBL001S.db', // local name without attachments,
        dbUser: null,
        dbPass: null,
        dbIdPublic: null,        //couchdb,
        dbIdPrivate: null,       //pouchdb,

        db: null,
        dbA: null,               //attachments (old complete)
        dbRemote: null,          //couchdb,
        dbSync: null,            //sync-handle, used to stop syncing,
        dbReady: 2,
        appResult: [],

        infoSync: null,
        initialize: function (pbl) {
            this.pbl = pbl;
            this.infoSync = document.getElementById('info-sync')
            this.infoSync.innerHTML = 'initialize';
        },
        set: function (doc) {
            this.dbServer = doc.dbServer;
            this.dbPort = doc.dbPort;
            this.dbName = doc.dbUser;
            this.dbUser = doc.dbUser;
            this.dbPass = doc.dbPass;
            this.dbIdPublic = doc.dbId;
        },
        infoSet: function (info) {
            this.infoSync.innerHTML = info;
        },
        remoteLogin: function () {
            if (pouch.dbServer && pouch.dbPort) {
                if (pouch.dbSync) {
                    // sync active, stopping first before connecting to another server
                    pouch.dbSync.cancel();
                }
                pouch.dbRemote = new PouchDB(pouch.dbServer + ':' + pouch.dbPort + '/' + pouch.dbName, { skip_setup: true });
                pouch.dbRemote.login(pouch.dbUser, pouch.dbPass, function (err, response) {
                    if (err) {
                        console.log(err);
                        if (err.name === 'unauthorized') {
                            // name or password incorrect
                            pouch.infoSync.innerHTML = 'unauthorized';//'server: name or password incorrect';
                        } else {
                            // cosmic rays, a meteor, etc.
                            pouch.infoSync.innerHTML = err.name;
                        }
                    } else {
                        pouch.infoSync.innerHTML = 'sync';
                        pouch.sync();
                        pouch.db.changes({
                            since: 'now',
                            live: true
                        }).on('change', pouch.newDocs);
                    }
                });
            } else {
                pouch.infoSync.innerHTML = 'local';
            }
        },
        newDocs: function (changes) {
            console.log(changes);
        },
        // Initialise a sync with the remote server
        sync: function () {
            pouch.infoSync.setAttribute('data-sync-state', 'syncing');
            pouch.db.replicate.from(pouch.dbRemote).on('complete', function (info) {
                console.log(info.last_seq);
                app.log('Last Sequence: ' + parseInt(info.last_seq));
                // then two-way, continuous, retriable sync
                pouch.dbSync = pouch.db.sync(pouch.dbRemote, { live: true, retry: true })
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
            /*
            pouch.dbSync = pouch.dbRemote.sync(pouch.db, {
                live: true, retry: true
            }).on('change', function (info) {
                pouch.infoSync.innerHTML = 'server: change ' + info.change.ok;
            }).on('paused', function (err) {
                pouch.infoSync.innerHTML = 'server: paused ' + (err ? err : '');
            }).on('active', function () {
                pouch.infoSync.innerHTML = 'server: active ';
            }).on('denied', function (err) {
                pouch.infoSync.innerHTML = 'server: denied ' + err;
            }).on('error', function (err) {
                pouch.infoSync.setAttribute('data-sync-state', 'error');
                pouch.infoSync.innerHTML = 'server: error ' + err;
            }).on('complete', function (info) {
                pouch.infoSync.setAttribute('data-sync-state', 'insync');
                pouch.infoSync.innerHTML = 'server: complete ' + info.ok;
            });
            */
        },
        onSyncChange: function (info) {
            if (info.direction == "pull") {
                app.log('Last Sequence: ' + parseInt(info.change.last_seq));
            };
            console.log(info);
            pouch.infoSync.setAttribute('data-sync-state', 'changed');
            pouch.infoSync.innerHTML = 'server: change ' + (typeof info.change == 'undefined' ? 'undefined' : info.change.ok);
        },
        onSyncPaused: function (err) {
            pouch.infoSync.setAttribute('data-sync-state', 'paused');
            pouch.infoSync.innerHTML = 'server: paused ' + (err ? err : '');
            pouch.db.info().then(function (result) {
                console.log(result);
                pouch.infoSync.innerHTML = 'server: paused ' + result.update_seq;
                app.log('server: paused ' + result.update_seq);
            }).catch(function (err) {
                console.log(err);
            });


        },
        onSyncActive: function () {
            pouch.infoSync.setAttribute('data-sync-state', 'paused');
            pouch.infoSync.innerHTML = 'server: active';
        },
        onSyncDenied: function (err) {
            pouch.infoSync.setAttribute('data-sync-state', 'error');
            pouch.infoSync.innerHTML = 'server: denied ' + (err ? err : '');
        },
        onSyncError: function (err) {
            pouch.infoSync.setAttribute('data-sync-state', 'error');
            pouch.infoSync.innerHTML = 'server: error ' + err;
        },
        onSyncComplete: function (info) {
            console.log(info);
            pouch.infoSync.setAttribute('data-sync-state', 'insync');
            pouch.infoSync.innerHTML = 'server: complete ' + info.ok;
        },
        /*/ There was some form or error syncing
        syncError: function () {
            pouch.infoSync.setAttribute('data-sync-state', 'error');
        },
        */
        dbNew: function () {
            //Test for browser webSQL compatibility
            app.log('Database start in pouch.js');
            this.infoSync.innerHTML = 'connect local';
            if (typeof cordova !== "undefined") {
                if (typeof cordova.platformId !== "undefined") {
                    app.log('cordova.platformId: ' + cordova.platformId);
                }
                if (typeof sqlitePlugin !== "undefined") {
                    app.log('cordova.sqlitePlugin: ' + sqlitePlugin);
                }
                if (typeof openDatabase !== "undefined") {
                    app.log('cordova.openDatabase: ' + openDatabase);
                }
            }
            /*
            if ((typeof cordova !== "undefined" && cordova.platformId !== 'browser' )
                && typeof sqlitePlugin !== 'undefined' && typeof openDatabase !== 'undefined') {
                this.dbA = new PouchDB(this.dbNameA, { revs_limit: 1, auto_compaction: true, adapter: 'cordova-sqlite' });
                this.db = new PouchDB(this.dbName, { revs_limit: 10, auto_compaction: true, adapter: 'cordova-sqlite' });
                app.log('Database: Cordova');
            } else if (!this.pbl.ui.isChrome() && window.openDatabase) {
                this.dbA = new PouchDB(this.dbNameA, { revs_limit: 10, adapter: 'websql' });
                this.db = new PouchDB(this.dbName, { revs_limit: 10, adapter: 'websql' });
                app.log('Database: webSQL');
            } else {
                this.dbA = new PouchDB(this.dbNameA, { revs_limit: 1, auto_compaction: true, size: 500 });
                this.db = new PouchDB(this.dbName, { revs_limit: 10, auto_compaction: true, size: 100 });
                app.log('Database: Pouchdb');
            }
            */
            this.dbA = new PouchDB(this.dbNameA, { revs_limit: 10, auto_compaction: true });
            this.db = new PouchDB(this.dbName, { revs_limit: 10, auto_compaction: true });

            this.infoSync.innerHTML = 'connect 2';
            if (cordova.platformId === "ios") {
                this.dbA.destroy().then(function (response) {
                    app.log(response)
                }).catch(function (err) {
                    app.log(err);
                });
            }
            this.infoSync.innerHTML = 'connect 3';
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
                    app.log('localStorage: ' + localStorage.key(i) + ': ' + localStorage.getItem(localStorage.key(i)));
                };
                // Ende Liste */
                // normale Verarbeitung
                this.infoSync.innerHTML = 'connect get login';
                pouch.db.get(pouch.dbIdPrivate + '_login').then(function (doc) {
                    if (doc !== null) {
                        //system = doc;
                        pouch.set(doc);
                        pouch.appTitle = doc.appTitle;
                        pouch.apiIsbndb = doc.apiIsbndb;
                        pouch.apiLibrarything = doc.apiLibrarything;
                        $('#appTitle').html(pouch.appTitle);
                        console.log(pouch.dbIdPrivate);
                        console.log(pouch.dbIdPublic);
                        pouch.pbl.datalist.fill("books");
                        pouch.remoteLogin();
                    }
                }).catch(function (err) {
                    // ersten Datensatz anlegen, falls nicht vorhanden    
                    pouch.dbIdPublic = pouch.dbIdPrivate;
                    pouch.db.put({
                        _id: pouch.dbIdPrivate + '_login',
                        name: 'Server',
                        type: 'db',
                        dbServer: pouch.dbServer,
                        dbPort: pouch.dbPort,
                        //dbName: dbName,
                        dbUser: pouch.dbUser,
                        dbPass: pouch.dbPass,
                        dbId: pouch.dbIdPublic,
                        title: pouch.dbIdPublic + '_login'
                    }).then(function (response) {
                        console.log(pouch.dbIdPrivate);
                        console.log(pouch.dbIdPublic);
                        console.log(response);
                        // handle response
                        pouch.remoteLogin();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
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
                 pouch.db.allDocs({
                     startkey: pouch.dbIdPublic + '_' + seite
                     , endkey: pouch.dbIdPublic + '_' + seite + 'a'
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
                 if (app.myApp[table].idName){ // === 'state' || table === 'favorite') {
                     myObj._id = pouch.dbIdPublic + '_' + table + '_' + encodeURI(myObj.name);
                 } else {
                     myObj._id = pouch.dbIdPublic + '_' + table + '2' + (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                 }
             }
         } /*,
         backup: function () {
             var ws = fs.createWriteStream('output.txt');

             pouch.db.dump(ws).then(function (res) {
                 // res should be {ok: true}
             });
         },
         restore: function () {
             var ws = fs.createReadStream('output.txt');

             pouch.db.load(ws).then(function (res) {
                 // res should be {ok: true}
             });
         } */
    };
    return pouch;
});

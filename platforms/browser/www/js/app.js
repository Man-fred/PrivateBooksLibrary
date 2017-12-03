var db;
var system;
var seite = "";
var myApp = {
//CREATE TABLE ZZOSHO ( Z_PK INTEGER PRIMARY KEY, Z_ENT INTEGER, Z_OPT INTEGER, ZFAVOR INTEGER, ZSTATE INTEGER, ZCHECKDATE TIMESTAMP, ZREADDATE TIMESTAMP, ZRELEASEDATE TIMESTAMP, ZISBNCODE VARCHAR, ZAUTHOR VARCHAR, ZAUTHORKANA VARCHAR, ZCODE VARCHAR, ZMEMO VARCHAR, ZPRICE VARCHAR, ZPUBLISHER VARCHAR, ZTICDSSYNCID VARCHAR, ZTITLE VARCHAR, ZIMAGE BLOB )
    books: {
        name: "books",
        title: "Bücher",
        menu: true,
        action: "show_element",
        head: false,
        tr: 'books',
        btn: {add: true, update: true},
        fields: {
            title: {
                name: "name",
                title: "title"
            },
            author: {
                name: "author",
                title: "author"
            },
            publisher: {
                name: "publisher",
                title: "publisher"
            },
            isbn: {
                name: "isbn",
                title: "isbn"
            },
            price: {
                name: "price",
                title: "price"
            },
            releasedate: {
                name: "releasedate",
                title: "releasedate"
            },
            state: {
                name: "state",
                title: "state",
                select: "state",
                field: "name",
                visible: "long"
            },
            memo: {
                name: "memo",
                title: "Memo"
            },
            checkdate: {
                name: "checkdate",
                title: "checkdate"
            },
            source: {
                name: "source",
                title: "source"
            },
            ent: {
                name: "ent",
                title: "ent"
            },
            opt: {
                name: "opt",
                title: "opt"
            },
            favor: {
                name: "favor",
                title: "favor"
            },
            url: {
                name: "url",
                title: "url"
            },
            thumbnail: {
                name: "thumbnail",
                title: "thumbnail"
            },
            smallThumbnail: {
                name: "smallThumbnail",
                title: "smallThumbnail"
            }
        }
    },
    authors: {
        name: "authors",
        title: "Autoren",
        menu: true,
        action: "show_element",
        head: true,
        tr: '',
        btn: {add: true, update: true},
        fields: {
            name: {
                name: "name",
                title: "name"
            }
        },
        data: []
    },
    state: {
        name: "state",
        title: "Status",
        menu: true,
        action: "show_element",
        head: true,
        tr: '',
        btn: {add: true, update: true},
        fields: {
            name: {
                name: "name",
                title: "Nr"
            },
            long: {
                name: "long",
                title: "Name"
            }
        },
        data: []
    },
    login: {
        name: "login",
        title: "Params",
        menu: true,
        action: "show_element",
        head: true,
        tr: '',
        btn: {add: false, update: true},
        fields: {
            name: {
                name: "name",
                title: "Verbindung"
            },
            dbServer: {
                name: "dbServer",
                title: "Server"
            },
            dbPort: {
                name: "dbPort",
                title: "Port"
            },
            dbName: {
                name: "dbName",
                title: "Datenbank"
            },
            dbUser: {
                name: "dbUser",
                title: "User"
            },
            dbPass: {
                name: "dbPass",
                title: "Pass"
            },
            dbId: {
                name: "dbId",
                title: "Prefix"
            },
            appTitle: {
                name: "appTitle",
                title: "Titel"
            },
            appHorsename: {
                name: "appHorsename",
                title: "Thema"
            },
            apiIsbndb: {
                name: "apiIsbndb",
                title: "apiIsbndb"
            },
            apiLibrarything: {
                name: "apiLibrarything",
                title: "apiLibrarything"
            },
            apiAmazonId: {
                name: "apiAmazonId",
                title: "apiAmazonId"
            },
            apiAmazonKey: {
                name: "apiAmazonKey",
                title: "apiAmazonKey"
            }
        },
        data: []
    },
    /* scan: {
     name: "scan",
     title: "Scan",
     menu: true,
     action: "show_scan",
     head: false,
     tr: '',
     btn: {add: false, update: false},
     fields: {
     title: {
     name: "name",
     title: "title"
     },
     author: {
     name: "author",
     title: "author"
     },
     publisher: {
     name: "publisher",
     title: "publisher"
     },
     isbn: {
     name: "isbn",
     title: "isbn"
     },
     price: {
     name: "price",
     title: "price"
     },
     releasedate: {
     name: "releasedate",
     title: "releasedate"
     },
     url: {
     name: "url",
     title: "url"
     },
     thumbnail: {
     name: "thumbnail",
     title: "thumbnail"
     },
     smallThumbnail: {
     name: "smallThumbnail",
     title: "smallThumbnail"
     },
     checkdate: {
     name: "checkdate",
     title: "checkdate"
     },
     source: {
     name: "source",
     title: "source"
     },
     state: {
     name: "state",
     title: "state"
     }
     }
     },*/
    sync: {
        name: "sync",
        title: "Syncronisation",
        fields: {
            table: {
                name: "table",
                title: "Table"
            },
            ClientTimestamp: {
                name: "ClientTimestamp",
                title: "ClientTimestamp",
                f_unc: function (f) {
                    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                }
            },
            ServerTimestamp: {
                name: "ServerTimestamp",
                title: "ServerTimestamp",
                f_unc: function (f) {
                    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                }
            }
        },
        data: []
    },
    parameter: {
        name: "parameter",
        title: "Parameter",
        fields: {
            couchdb: {
                name: "couchdb",
                title: "couchdb"
            },
            version: {
                name: "version",
                title: "version"
            }
        },
        data: []
    }

};

var dbName = 'pbl-894788' //'pbl-61h(fx';
/*var dbServer = 'http://fhem.fritz.box';
 var dbPort = '5984';
 var dbUser = 'p-todo';
 var dbPass = 'demo01';*/
var dbServer = '';
var dbPort = '';
var dbUser = '';
var dbPass = '';

var dbIdPublic;        //couchdb
var dbIdPrivate;       //pouchdb
var remote;            //couchdb
var startDom = false, startDb = false, startOk = false;
var apiLibrarything = "", apiIsbndb = "";
/* nur jQuery Mobile
 $(document).bind("mobileinit", function () {
 // Make your jQuery Mobile framework configuration changes here!
 $.support.cors = true;
 $.mobile.allowCrossDomainPages = true;
 });
 */

document.addEventListener("deviceready", function () {
    'use strict';
    var appTitle = 'Private Books:: Library';
    $('#appTitle').html(appTitle);

    var syncDom = document.getElementById('sync-wrapper');
    // EDITING STARTS HERE (you dont need to edit anything above this line)
    db = new PouchDB(dbName);
    //db = new PouchDB('pbl-61h(fx', {adapter: 'cordova-sqlite'});
    dbIdPrivate = cookie('dbId');
    if (dbIdPrivate === null) {
        dbIdPrivate = Math.random();
        cookie('dbId', dbIdPrivate, 3650);
    }
    db.get(dbIdPrivate + '_login').then(function (doc) {
        if (doc !== null) {
            system = doc;
            dbServer = doc.dbServer;
            dbPort = doc.dbPort;
            dbName = doc.dbName;
            dbUser = doc.dbUser;
            dbPass = doc.dbPass;
            dbIdPublic = doc.dbId;
            appTitle = doc.appTitle;
            apiIsbndb = doc.apiIsbndb;
            apiLibrarything = doc.apiLibrarything;
            //myApp.horse.title = doc.appHorsename;
            /*
             if(!exist(doc.name)) {
             doc.name="Server";
             db.put(doc);
             }
             */
            $('#appTitle').html(appTitle);
            //$('#m_horse').val(myApp.horse.title);
            console.log(dbIdPrivate);
            console.log(dbIdPublic);
            if (!startOk && startDom) {
                startOk = true;
                show_element("books");
            }
            startDb = true;
            remoteLogin();
//firstbulk();
        }
    }).catch(function (err) {
// Login-Formular    
        dbIdPublic = dbIdPrivate;
        db.put({
            _id: dbIdPrivate + '_login',
            name: 'Server',
            type: 'db',
            dbServer: dbServer,
            dbPort: dbPort,
            dbName: dbName,
            dbUser: dbUser,
            dbPass: dbPass,
            dbId: dbIdPublic,
            title: dbIdPublic + '_login'
        }).then(function (response) {
            console.log(dbIdPrivate);
            console.log(dbIdPublic);
            console.log(response);
            // handle response
            remoteLogin();
        }).catch(function (err) {
            console.log(err);
        });
    });

    db.changes({
        since: 'now',
        live: true
    }).on('change', showDocs);
    /*
     copyDatabaseFile('pbl-61h(fx').then(function () {
     // using the Cordova SQLite plugin. Make sure this plugin is loaded correctly!
     db = new PouchDB('pbl-61h(fx', {adapter: 'cordova-sqlite'});
     return db.allDocs({include_docs: true});
     }).then(function (results) {
     var pre = document.createElement('pre');
     pre.innerHTML = JSON.stringify(results, null, '  ');
     document.body.appendChild(pre);
     }).catch(console.log.bind(console));
     */

    /*/ einmalige initialisierung
     db.get('_local/preloaded2').then(function (doc) {
     }).catch(function (err) {
     if (err.name !== 'not_found') {
     throw err;
     }
     // we got a 404, so the local docuent doesn't exist. so let's preload!
     return db.load('books.json').then(function () {
     // create the local document to note that we've preloaded
     return db.put({_id: '_local/preloaded2'});
     });
     }).then(function () {
     return db.allDocs({include_docs: true});
     }).then(function (res) {
     $('#display').innerHTML = JSON.stringify(res, null, '  ');
     console.log(res);
     }).catch(console.log.bind(console));
     db.allDocs({include_docs: true}).then(function (res) {
     $('#display').innerHTML = JSON.stringify(res, null, '  ');
     }).catch(console.log.bind(console));
     */

    var parentElement = document.getElementById('deviceready');
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    // Show the current list of todos by reading them from the database

    function showDocs() {
        /*        db.allDocs({
         include_docs: true,
         descending: true,
         startkey: dbIdPublic + '_todo3',
         endkey: dbIdPublic + '_todo'},
         function (err, doc) {
         redrawUI('todo-list', doc.rows);
         });
         db.allDocs({
         include_docs: true,
         descending: true,
         startkey: dbIdPrivate + '_para3',
         endkey: dbIdPrivate + '_para'},
         function (err, doc) {
         redrawUI('para-list', doc.rows);
         });
         */
    }

    function remoteLogin() {
        if (dbServer && dbPort) {
            remote = new PouchDB(dbServer + ':' + dbPort + '/' + dbName, {skip_setup: true});
            remote.login(dbUser, dbPass, function (err, response) {
                if (err) {
                    console.log("!1!");
                    console.log(err);
                    console.log("!1!");
                    if (err.name === 'unauthorized') {
                        // name or password incorrect
                        syncDom.innerHTML = 'name or password incorrect';
                    } else {
                        // cosmic rays, a meteor, etc.
                        syncDom.innerHTML = err.name;
                    }
                } else {
                    sync();
                }
            });
        } else {
            syncDom.innerHTML = 'only local';
        }
    }

    // Initialise a sync with the remote server
    function sync() {
        syncDom.setAttribute('data-sync-state', 'syncing');
        remote.sync(db, {live: true, retry: true
        }).on('change', function (info) {
            syncDom.innerHTML = 'change ' + info.ok;
        }).on('paused', function (err) {
            syncDom.innerHTML = 'paused ' + (err ? err : '');
        }).on('active', function () {
            syncDom.innerHTML = 'active ';
        }).on('denied', function (err) {
            syncDom.innerHTML = 'denied ' + err;
        }).on('error', function (err) {
            syncDom.setAttribute('data-sync-state', 'error');
            syncDom.innerHTML = 'error ' + err;
        }).on('complete', function (info) {
            syncDom.setAttribute('data-sync-state', 'insync');
            syncDom.innerHTML = 'complete ' + info.ok;
        });
    }
    // EDITING STARTS HERE (you dont need to edit anything below this line)

    // There was some form or error syncing
    function syncError() {
        syncDom.setAttribute('data-sync-state', 'error');
    }



    // Code for Add New Record in IndexedDB
    $("#addBtn").click(function () {
        //debugger;
        var myObj = {};
        setSync(myObj, 'add');
        $.each(myApp[seite].header, function () {
            if (this.type === "checkbox")
                myObj[this.name] = $('#' + seite + '_' + this.name).prop("checked");
            else
                myObj[this.name] = $('#' + seite + '_' + this.name).val();
        });
        $.each(myApp[seite].fields, function () {
            if (this.type === "checkbox")
                myObj[this.name] = $('#' + seite + '_' + this.name).prop("checked");
            else
                myObj[this.name] = $('#' + seite + '_' + this.name).val();
        });
        if (seite === "books" & myObj.author !== "") {
            var myObjA = {};
            setSync(myObjA, 'add', 'authors');
            myObjA.name = myObj.author;
            db.put(myObjA);
        }
        //var myDoc = array2json(myObj);
        //console.log(myObj);
        db.put(myObj).then(function (doc) {
            //console.log(doc);

            ClearTextBox();
            show_all(seite);
        }).catch(function (err) {
            console.log(err);
        });

    });
    // Code for Read Data from Indexed on for edit(Single Record)
    $('#btnShow').click(function () {
        var id = $('#txtSearch').val();
        show_data(id);
    });
    // Code for Clear text Box
    $('#clearBtn').click(function () {
        ClearTextBox();
    });
    // Code for Update record on IndexedDB
    $('#updateBtn').click(function () {

        var _id = $('#_id').html();
        db.get(_id).then(function (doc) {
            console.log(doc);
            // handle doc
            if (doc) {
                $.each(myApp[seite].header, function () {
                    if (this.type === "checkbox")
                        doc[this.name] = $('#' + seite + '_' + this.name).prop("checked");
                    else
                        doc[this.name] = $('#' + seite + '_' + this.name).val();
                });
                $.each(myApp[seite].fields, function () {
                    if (this.type === "checkbox")
                        doc[this.name] = $('#' + seite + '_' + this.name).prop("checked");
                    else
                        doc[this.name] = $('#' + seite + '_' + this.name).val();
                });
                setSync(doc, 'upd');
                if (seite === "login") {
                    dbIdPublic = doc.dbId;
                    appTitle = doc.appTitle;
                    //myApp.main.title = doc.appHorsename;
                    $('#appTitle').html(appTitle);
                    //$('#m_horse').val(myApp.main.title);
                }
                if (seite === "books") {
                    var myObj = {};
                    setSync(myObj, 'add', 'authors');
                    myObj.name = doc.author;
                    db.put(myObj);
                }
                db.put(doc).then(function (doc2) {
                    console.log(doc2);

                    $('#result').html('Record No. ' + _id + ' Updated Successfully');
                    show_all(seite);
                }).catch(function (err) {
                    $('#result').html('Record No. ' + _id + ' Updated Successfully');
                });
            }
        });
    });
    //Code for Deleting record from indexedDB
    $('#deleteBtn').click(function () {
        var _id = $('#_id').html();
        db.get(_id).then(function (doc) {
            // handle doc
            if (doc) {
                setSync(doc, 'del');
                doc.DBdeleted = true;
                db.put(doc).then(function (doc2) {
                    // handle doc
                    if (doc2) {
                        $('#result').html('Record No. ' + doc._id + ' Deleted Successfully');
                        show_all(seite);
                    }
                    ;
                }).catch(function (err) {
                    console.log(err);
                });
                ;
            }
            ;
        }).catch(function (err) {
            console.log(err);
        });
    });
    $('#btnShowAll').click(function () {
        //Calling funtin for show all data from IndexedDB
        show_all();
    });

    $("#myTableList").swipe({
        swipe: function (event, direction, distance, duration, fingerCount) {
            $("#message").text("You swiped " + direction + " for " + distance + "px");
        }
        //,threshold: 10
    });

    function mainmenu() {
        var result = "";
        $.each(myApp, function () {
            //debugger;
            //show_seite(this.name);
            if (this.menu) {
                result += '<input type="button" name="m_' + this.name + '" value="' + this.title + '" id="m_' + this.name +
                        '" onclick="' + this.action + '(\'' + this.name + '\')" />';
            }
        });

        result += '<br /><br />';
        /*
         result += '<input type="button" value="Parameter" onclick="show_element(\'parameter\')" />';
         result += '<input type="button" value="Syncronisation" onclick="show_element(\'sync\')" />';
         result += '<input type="button" name="m_send" value="Send to Server" id="m_send" onclick="CouchdbStoreWrite()" />';
         result += '<input type="button" name="m_read" value="Read from Server" id="m_read" onclick="CouchdbStoreRead()" />';
         */
        result += '<input type="checkbox" id="showDeleted" onchange="show_element(\'\')"> showDeleted';
        $("#mainmenu").html(result);

        result = "";
        $.each(myApp, function () {
            //debugger;
            show_seite(this.name);
            if (this.menu) {
                //result += '<ons-list-item  onclick="' + this.action + '(\'' + this.name + '\')"  tappable>' + this.title + '</ons-list-item>';
                result += '<li class="pure-menu-item" onclick="' + this.action + '(\'' + this.name + '\')"><a class="pure-menu-link" href="#">' + this.title + '</a></li>';
            }
        });
        $("#sidelist").html(result);
    }
    mainmenu();

    $('#scansearch').click(search_isbn);

    if (!startOk && startDb) {
        startOk = true;
        show_element("books");
    }
    $("#mypanel").trigger("updatelayout");
    startDom = true;
    if (syncDom) {

    }

});

$(window).on("load, resize", function() {
    var viewportWidth = $(window).width();
    console.log(viewportWidth);
    if (viewportWidth < 600) {
            $("#singleform").removeClass(" pure-form-aligned").addClass("pure-form pure-form-stacked");
    } else {
            $("#singleform").addClass("pure-form pure-form-aligned").removeClass("pure-form-stacked");
    }
});

function search_isbn(singleIsbn) {
    function booksearch(index) {
        var ok = false;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                //document.getElementById("result").innerHTML = xhttp.responseText;
                var erg;
                if (index === 5 || index === 7) {
                    /*
                     if (document.implementation && document.implementation.createDocument) {
                     erg = new DOMParser().parseFromString(xhttp.responseText, 'text/xml');
                     } else if (window.ActiveXObject) {
                     erg = new ActiveXObject("Microsoft.XMLDOM");
                     erg.loadXML(xhttp.responseText);
                     } else {
                     alert("Your browser can't handle this script");
                     }
                     */
                    var xml = xhttp.responseXML;
                    try {
                        erg = JSON.parse(xml2json(xml, "  "));
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    erg = JSON.parse(xhttp.responseText);
                }
                //console.log(erg);
                switch (index) {
                    case 0: // google
                        if (erg.totalItems > 0) {
                            $("#books_name").val(erg.items[0].volumeInfo.title);
                            $("#books_publisher").val(erg.items[0].volumeInfo.publisher);
                            $("#books_releasedate").val(erg.items[0].volumeInfo.publishedDate);
                            $("#books_author").val(erg.items[0].volumeInfo.authors[0]);
                            if (erg.items[0].volumeInfo.industryIdentifiers.length > 0) {
                                if (erg.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_13")
                                    $("#books_isbn").val(erg.items[0].volumeInfo.industryIdentifiers[0].identifier);
                                if (erg.items[0].volumeInfo.industryIdentifiers[1].type === "ISBN_13")
                                    $("#books_isbn").val(erg.items[0].volumeInfo.industryIdentifiers[1].identifier);
                            }
                            $("#books_thumbnail").val(erg.items[0].volumeInfo.imageLinks.thumbnail);
                            $("#books_smallThumbnail").val(erg.items[0].volumeInfo.imageLinks.smallThumbnail);
                            $("#books_url").val(erg.items[0].volumeInfo.infoLink);
                            $("#books_link").attr("href", erg.items[0].volumeInfo.infoLink);
                            $("#img_books").attr("src", erg.items[0].volumeInfo.imageLinks.thumbnail);
                            ok = true;
                        }
                        break;
                    case 1:
                        if (erg.data[0]) {
                            $("#books_name").val(erg.data[0].title);
                            $("#books_publisher").val(erg.data[0].publisher_text);
                            $("#books_author").val(erg.data[0].author_data[0].name);
                            $("#books_isbn").val(erg.data[0].isbn13);
                            ok = true;
                        }
                        break;
                    case 2:
                        if (erg.stat === "ok") {
                            $("#books_name").val(erg.list[0].title);
                            $("#books_publisher").val(erg.list[0].publisher);
                            $("#books_releasedate").val(erg.list[0].year);
                            $("#books_author").val(erg.list[0].author);
                            if (erg.list[0].isbn.length > 0)
                                $("#books_isbn").val(erg.list[0].isbn[0]);
                            if (erg.list[0].url.length > 0)
                                $("#books_url").val(erg.list[0].url[0]);
                            ok = true;
                        }
                        break;
                    case 3: //noch kein Treffer
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 4: //noch kein Treffer
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 5: //noch kein Treffer
                        //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 6: //noch kein Treffer
                        //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        if (erg) {
                            try { $("#books_name").val(erg.Items.Item.ItemAttributes.Title); } catch(err){};
                            try { $("#books_publisher").val(erg.Items.Item.ItemAttributes.Publisher); } catch(err){};
                            try { $("#books_releasedate").val(erg.Items.Item.ItemAttributes.PublicationDate); } catch(err){}; //ReleaseDate
                            try { $("#books_author").val(erg.Items.Item.ItemAttributes.Author); } catch(err){};
                            try { $("#books_isbn").val(erg.Items.Item.ItemAttributes.EAN); } catch(err){};
                            try { $("#books_price").val(erg.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice); } catch(err){};
                            try { $("#books_thumbnail").val(erg.Items.Item.MediumImage.URL); } catch(err){};
                            try { $("#books_smallThumbnail").val(erg.Items.Item.SmallImage.URL); } catch(err){};
                            try { $("#books_url").val(erg.Items.Item.DetailPageURL); } catch(err){};
                            try { $("#books_link").attr("href", erg.Items.Item.DetailPageURL); } catch(err){};
                            try { $("#img_books").attr("src", erg.Items.Item.MediumImage.URL); } catch(err){};
                            ok = true;
                        }
                        break;
                    case 7: //noch kein Treffer
                        //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        if (erg) {
                            $("#books_name").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Title);
                            $("#books_publisher").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Publisher);
                            $("#books_releasedate").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.PublicationDate); //ReleaseDate
                            $("#books_author").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Author);
                            $("#books_isbn").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.EAN);
                            $("#books_price").val(erg.ItemLookupResponse.Items[1].Item.OfferSummary.LowestNewPrice.FormattedPrice);
                            $("#books_thumbnail").val(erg.ItemLookupResponse.Items[1].Item.MediumImage.URL);
                            $("#books_smallThumbnail").val(erg.ItemLookupResponse.Items[1].Item.SmallImage.URL);
                            $("#books_url").val(erg.ItemLookupResponse.Items[1].Item.DetailPageURL);
                            $("#books_link").attr("href", erg.ItemLookupResponse.Items[1].Item.DetailPageURL);
                            $("#books_img").attr("src", erg.ItemLookupResponse.Items[1].Item.MediumImage.URL);
                            ok = true;
                        }
                }
                if (ok)
                    $("#books_source").val(index);
            }
        }; //http://coverart.oclc.org/ImageWebSvc/oclc/+-+126411226_140.jpg?SearchOrder=+-+OT,OS,TN,GO,FA
        var searchString;
        switch (index) {
            case 0:
                searchString = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + $('#bc_text').val();
                break;
            case 1:
                searchString = "http://isbndb.com/api/v2/json/" + apiIsbndb + "/book/" + $('#bc_text').val();
                break;
            case 2:
                searchString = "http://xisbn.worldcat.org/webservices/xid/isbn/" + $('#bc_text').val() + "?method=getMetadata&format=json&fl=*";
                break;
            case 3:
                searchString = "https://openlibrary.org/api/books?bibkeys=ISBN:" + $('#bc_text').val() + "&jscmd=data&format=json";
                break;
            case 4:
                searchString = "https://www.galeritus.com/api/search.aspx?isbn=" + $('#bc_text').val();
                break;
            case 5:
                searchString = "http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&isbn=" + $('#bc_text').val() + "&apikey=" + apiLibrarything;
                break;
            case 6:
                searchString = "http://bcss.de/api/request.php?isbn=" + $('#bc_text').val();
                break;
            case 7:
                searchString = "http://" + opHelper.getHost() + opHelper.getUri('ItemSearch', {
                    'SearchIndex': 'Books',
                    'IdType': 'ISBN',
                    'ItemId': $('#bc_text').val(),
                    'ResponseGroup': 'ItemAttributes'
                })
        }
        console.log(searchString);
        xhttp.open("GET", searchString, true);
        xhttp.send();
        return(ok);
    }
    booksearch(6);
    /*
     if (!booksearch(0))
     if (!booksearch(2))
     if (!booksearch(3))
     if (!booksearch(4))
     if (!booksearch(5))
     booksearch(1);
     */
}

function scan() {
    console.log('scanning');

    var scanner = cordova.plugins.barcodeScanner;
    
    scanner.scan(function (result) {
        //alert( JSON.stringify(result) );
        if (!result.cancelled) {
            $("#bc_text").val(result.text);
            document.getElementById("bc_format").innerHTML = "Format " + result.format;
            show_all('books', 'isbn', result.text);
        } else {
            $("#bc_text").val(result.text);
            document.getElementById("bc_format").innerHTML = "Nicht erkannt " + result.format;
            //show_all('books', 'isbn', result.text);
            alert( JSON.stringify(result) );
        }
        //document.getElementById("bc_cancelled").innerHTML = result.cancelled;
        /*
         if (args.format == "QR_CODE") {
         window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
         }
         */

    }, function (error) {
        console.log("Scanning failed: ", error);
    });
}

function ClearTextBox() {
    $.each(myApp[seite].fields, function () {
        $('#' + seite + '_' + this.name).val('');
    });
    $('#txtSearch').val('');
    $('#DBTimestamp').html('');
    $('#DBServertime').html('');
    $('#DBstate').html('');
    $('#_id').html('');
    $('#_rev').html('');
    $('#DBversion').html('');
}

function show_all_header(s) {
    var table = '<table>';
    $.each(myApp[seite].header, function () {
        table += '<tr>';
        table += '<th>' + this.title + '</th><td>';
        if (s) {
            table += myApp[this.select]["data"][s[this.name]];
        }
        table += '</td></tr>';
    });
    table += '</table>';
    table += '<table id="myTableList"><thead>';
    //table += '<th>ID</th>';
    //var cb = $('#showDeleted');
    if ($('#showDeleted').is(':checked')) {
        table += '<th id="disabled">Deleted?</th>';
    } else {
        table += '<th id="disabled"></th>'
    }
    $.each(myApp[seite].fields, function () {
        table += '<th>' + this.title + '</th>';
    });
    table += '</thead><tbody>';
    return table;
}

function set_index(mySort) {
    var myIndex = {};
    switch (mySort) {
        case 'name':
            myIndex.fields = ['name', '_id', 'DBdeleted'];
            myIndex.name = 'indexNameId';
            myIndex.ddoc = 'indexNameId';
            break;
        case 'isbn':
            myIndex.fields = ['isbn', '_id', 'DBdeleted'];
            myIndex.name = 'indexIsbnId';
            myIndex.ddoc = 'indexIsbnId';
            break;
        case 'date':
            myIndex.fields = ['releasedate', '_id', 'DBdeleted'];
            myIndex.name = 'indexDateId';
            myIndex.ddoc = 'indexDateId';
            break;
    }
    return myIndex;
}

function set_find(table, mySort, singleIsbn) {
    var dbId;
    if (table === "login") {
        dbId = dbIdPrivate;
    } else {
        dbId = dbIdPublic;
    }
    var mySelektor = {
        //   name: {$gt: null},
        _id: {$gte: dbId + '_' + table, $lte: dbId + '_' + table + '_'}
    };
    if (!$('#showDeleted').is(':checked')) {
        mySelektor.DBdeleted = {$exists: false};
    }
    var myFind = {
        selector: mySelektor
        //, limit: 10000
        //, skip: 0
    };
    if (table !== 'login') {
        switch (mySort) {
            case 'name':
                mySelektor.name = {$gt: null};
                myFind.sort = ['name'];
                myFind.use_index = "indexNameId";
                break;
            case 'isbn':
                if (singleIsbn) {
                    mySelektor.isbn = {$eq: singleIsbn};
                } else {
                    mySelektor.isbn = {$gt: null};
                }
                myFind.sort = ['isbn'];
                myFind.use_index = "indexIsbnId";
                break;
            case 'date':
                mySelektor.releasedate = {$gt: null};
                myFind.sort = ['releasedate'];
                myFind.use_index = "indexDateId";
        }
    }
    return myFind;
}

function show_all(table, mySort = 'name', singleIsbn = "") {
//    db.allDocs({
//        include_docs: true
//        , descending: true
//        , startkey: dbIdPublic + '_' + table + '3'//+ table 
//        , endkey: dbIdPublic + '_' + table  //+ table
//    PouchDB.debug.enable('pouchdb:find');
    console.log('show_all ' + table);

    db.createIndex({
        index: set_index(mySort)
    }).then(function (result) {
        console.log(result);
        //console.log(myFind);
        //return db.find({ selector: mySelektor, sort: ['name'], use_index: "indexNameId" });
        return db.find(set_find(table, mySort, singleIsbn));
    }).then(function (result) {
        console.log('show_all result');
        if (result.docs.length > 1 | seite !== 'books') {
            var first = true;
            var table = "";
            var mySortPos = '';
            var mySearchlist = '<div class="searchlist"><a class="searchlink" href="#appSearch">&#x1F50D;</a></div>';
            var releasedate;
            var releaseyear;
            $.each(result.docs, function () {
                var s = this;
                //console.log(s);
                if (first) {
                    first = false;
                    if (myApp[seite].head) {
                        table = show_all_header(s);
                    } else {
                        table = '<table id ="myTableList">';
                    }
                }
                if (seite === 'books') {
                    //15.04.2008 -> 14.4.1977 -> 
                    //27:10:2011 -> 25:10:1980
                    releasedate = new Date((s['releasedate'] + 978393600) * 1000);
                    releaseyear = releasedate.getFullYear();

                    if (mySort === 'name' && mySortPos !== s['name'].substr(0, 1)) {
                        mySortPos = s['name'].substr(0, 1);
                        table += '<tr id="myTableSort' + mySortPos + '">';
                        mySearchlist += '<div class="searchlist"><a class="searchlink" href="#myTableSort' + mySortPos + '">' + mySortPos + '</a></div>';
                    } else if (mySort === 'date' && mySortPos !== releaseyear) {
                        mySortPos = releaseyear;
                        table += '<tr id="myTableSort' + mySortPos + '">';
                        mySearchlist += '<div class="searchlist"><a class="searchlink" href="#myTableSort' + mySortPos + '">' + mySortPos + '</a></div>';
                    } else {
                        table += '<tr>';
                    }
                }
                if (myApp[seite].tr === 'books') {
                    table += '<td class="books-img-tr" onclick="show_data(\'' + s['_id'] + '\')" ><div  class="books-img"><img class="books-image" src="' + bookImage(s) + '"/></div></td>';

                    table += '<td onclick="show_data(\'' + s['_id'] + '\')" >';
                    table += '<div class="books-title">' + s['name'] + '</div>';
                    table += '<div class="books-author">' + s['author'] + '</div>';
                    if (releaseyear > 1800)
                        table += '<div class="books-date">' + releasedate.toLocaleDateString() + '</div>';
                    else
                        table += '<div class="books-date">&nbsp;</div>';
                    table += '<div class="books-state">' + s['ent'] + '&nbsp;' + s['opt'] + '&nbsp;' + s['favor'] + '&nbsp;' + bookState(s['state']) + '</div>';
                    table += '</td>';

                } else {
                    if ($('#showDeleted').is(':checked')) {
                        table += '<td>' + (this.DBdeleted ? '*' : '&nbsp') + '</td>';
                    } else {
                        table += '<td>&nbsp;</td>';
                    }
                    $.each(myApp[seite].fields, function () {
                        if (this.select) {
                            table += '<td onclick="show_data(\'' + s['_id'] + '\')" >' + myApp[this.select]["data"][s[this.name]] + '</td>';
                        } else if (this.func) {
                            table += '<td onclick="show_data(\'' + s['_id'] + '\')" >' + s[this.name] + '</td>';
                            //	table += '<td onclick="show_data(\'' + s['_id'] + '\')" >' + myApp[this.func](s[this.name]) + '</td>';
                        } else if (this.type === "checkbox") {
                            table += '<td onclick="show_data(\'' + s['_id'] + '\')" ><input type="' + this.type + '"' + (s[this.name] ? 'checked' : '') + ' disabled></td>';
                        } else {
                            table += '<td onclick="show_data(\'' + s['_id'] + '\')" >' + s[this.name] + '</td>';
                        }
                    });
                }
                table += '</tr>';
            });
            if (first) {
                table = show_all_header(null);
            }
            table += '</tbody></table>';
            //alert(table);
            //return table;
            $("#datalist").html(table);
            $("#mySearchAZ").html(mySearchlist);
        } else if (result.docs.length === 1) {
            show_data(result.docs[0]._id);
        } else {
            show_page2('books');
            search_isbn(singleIsbn);
        }
        console.log('show_all end');
    }).catch(function (err) {
        console.log(err);
    });
}

function show_scan(aktiveSeite) {
    //show_page2();*/
    /*if (aktiveSeite !== seite) {
        if (aktiveSeite !== "") {
            $('#t_' + seite).hide();
            seite = aktiveSeite;
            $('#t_' + seite).show();
        }
    }*/
    scan(aktiveSeite);
}

function show_element(aktiveSeite) {
    show_page1(0);

    console.log(seite);
    if (aktiveSeite !== seite) {
        if (aktiveSeite !== "") {
            $('#t_' + seite).hide();
            seite = aktiveSeite;
            //$('#t_' + seite).show();
        }
        $.each(myApp[seite].header, function () {
            if (this.select) {
                select(this.select, seite, this.name, this.field, this.visible);
            }
        });
        $.each(myApp[seite].fields, function () {
            if (this.select) {
                select(this.select, seite, this.name, this.field, this.visible);
            }
        });
        show_all(seite);
    }
}

function show_seite(aktiveSeite) {
    //$('#'+aktiveSeite).show();
    var result = '<div id="t_' + aktiveSeite + '" name="t_' + aktiveSeite + '" class="t_seite">';
    result += '<div class="pure-control-group"><label for="email">Email Address</label><input id="email" type="email" placeholder="Email Address"></div>';
    result += '<table>';
    if (aktiveSeite == "books")
        //<img height="80" class="pure-img" src="' + bookImage(s) + '"/>
        result += '<tr><td colspan="2"><img  class="pure-img" id="img_' + aktiveSeite + '" height="200" src="blank.jpg"/></td></tr>';
    if (aktiveSeite == "books") {
        result += '<p>erkannter Barcode <input id="bc_text"/> (<span id="bc_format"></span>) Beispiel: 9783802587849</p>';
        result += '<p><a href="#" name="scansearch" id="scansearch">Suchen</a><br /><span id="result"></span></p>';
        result += '<p><span id="result"></span></p>';
        //result += '<tr><td colspan="2"><img id="img_' + aktiveSeite + '" height="200" src="blank.jpg"/></td></tr>';
    }
    $.each(myApp[aktiveSeite].header, function () {
        result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">'+this.title+'</label>';
        if (this.select) {
            result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '"></select>';
        } else if (this.type) {
            result += '<input type="' + this.type + '" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
        } else {
            result += '<input type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" /></div>';
        }
        result += '</div>';
    });
    if (myApp[aktiveSeite].header) {
        result += '<hr />';
    }
    $.each(myApp[aktiveSeite].fields, function () {
        result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">'+this.title+'</label>';
        if (this.select) {
            result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '"></select>';
        } else if (this.type) {
            result += '<input type="' + this.type + '" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
        } else {
            result += '<input type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
        }
        result += '</div>';
    });
    result += '</table></div>';
    $('#formdata').append(result);

}
function getScrollY() {
    if (self.pageYOffset) // all except Explorer
    {
        scrollY = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop)
            // Explorer 6 Strict
            {
                scrollY = document.documentElement.scrollTop;
            } else if (document.body) // all other Explorers
    {
        scrollY = document.body.scrollTop;
    }
}

function setScrollY(y) {
    window.scrollTo(0, y);
}
function show_page1(setzen) {
    $('#page1').show();
    $('#page2').hide();
    if (setzen)
        setScrollY(scrollY);
}
function show_page2(aktiveSeite) {
    getScrollY();
    if (aktiveSeite !=="") {
        if (seite !== "" & aktiveSeite !== seite) {
            $('#t_' + seite).hide();
        }
        seite = aktiveSeite;
        $('#t_' + seite).show();
    }

    $('#page2').show();
    $('#page1').hide();
    setScrollY(0);
}

function select(table, id, name, field, visible) {
    db.find({
        selector: {
            _id: {$gte: dbIdPublic + '_' + table, $lte: dbIdPublic + '_' + table + '3'},
            DBdeleted: {$exists: false}
        }

    }).then(function (result) {
        $("#" + id + '_' + name).empty();
        myApp[table].data = [];
        $("#" + id + '_' + name).append($('<option></option>'));
        $.each(result.docs, function () {
            $("#" + id + '_' + name).append($('<option></option>').val(this[field]).text(this[visible])); //  selected="selected"
            //myApp[table].data[this['_id']] = this[field];
            myApp[table].data[this[field]] = this[visible];
        });
    }).catch(function (err) {
        console.log(err);
    });
}

function show_data(id) {
    show_page2(seite);

    if (id === "") {
        ClearTextBox();
        $('#addBtn').prop("disabled", !myApp[seite].btn.add);
        $('#updateBtn').prop("disabled", true);
        $('#deleteBtn').prop("disabled", true);
        $('#clearBtn').prop("disabled", !myApp[seite].btn.add);
    } else {
        db.get(id, {attachments: true}).then(function (doc) {
            // handle doc
            if (doc) {
                if (seite === "books") {
                    $('#img_' + seite).attr("src", bookImage(doc));
                }
                $.each(myApp[seite].header, function () {
                    $('#' + seite + '_' + this.name).val(doc[this.name]);
                });
                $.each(myApp[seite].fields, function () {
                    if (this.type === "checkbox")
                        $('#' + seite + '_' + this.name).prop("checked", (doc[this.name] === true));//(doc[this.name]);
                    else
                        $('#' + seite + '_' + this.name).val(doc[this.name]);
                });
                $('#DBTimestamp').html(doc.DBTimestamp);
                $('#DBstate').html(doc.DBstate);
                $('#DBversion').html(doc.DBversion);
                $('#DBok').html(doc.DBok);
                $('#DBreason').html(doc.DBreason);
                //$('#txtSearch').html(r._id);
                $('#_id').html(doc._id);
                $('#_rev').html(doc._rev);
                $('#addBtn').prop("disabled", !myApp[seite].btn.add);
                $('#updateBtn').prop("disabled", !myApp[seite].btn.update);
                $('#deleteBtn').prop("disabled", !myApp[seite].btn.add);
                $('#clearBtn').prop("disabled", !myApp[seite].btn.add);
            } else {
                ClearTextBox();
                $('#addBtn').prop("disabled", !myApp[seite].btn.add);
                $('#updateBtn').prop("disabled", true);
                $('#deleteBtn').prop("disabled", true);
                $('#clearBtn').prop("disabled", !myApp[seite].btn.add);
                alert('Record Does not exist');
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
}
;

function setSync(myObj, state, table = "") {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    myObj.DBTimestamp = Math.floor(Date.now() / 1000);
    myObj.DBstate = state;
    if (!myObj.DBversion) {
        myObj.DBversion = 1;
    } else {
        myObj.DBversion += 1;
    }
    if (table === "")
        table = seite;
    if (table === "scan")
        table = "books";
    if (!myObj._id)
        myObj._id = dbIdPublic + '_' + table + '2' + (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function mySearch() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("appSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTableList");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function bookImage(doc) {
    var test = "blank.jpg";
    if (doc["image"]) {
        test = 'data:image/jpeg;base64, ' + doc.image;
    } else if (doc['thumbnail']) {
        test = doc['thumbnail'];
    }
    return test;
}

// 130 6 -> owned/read
// 110 0 -> not owned
// 110 1 -> ordered 
// 110 2 -> owned
// 150 6 -> owned/read
// 1 36 0 6   owned/read kindle

function bookState(state) {
    switch (state) {
        case 0:
            return 'not owned';
        case 1:
            return 'ordered';
        case 2:
            return 'owned';
        case 3:
            return 'S3';
        case 4:
            return 'S4';
        case 5:
            return 'S5';
        case 6:
            return 'owned/read';
        default:
            return 'S' + state;
    }
}

// copy a database file from www/ in the app directory to the data directory
function copyDatabaseFile(dbName) {
    var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
    var targetDirName = cordova.file.dataDirectory;
    // resolve the source and target filenames simultaneously
    return Promise.all([
        new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(sourceFileName, resolve, reject);
        }),
        new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(targetDirName, resolve, reject);
        })
    ]).then(function (files) {
        var sourceFile = files[0];
        var targetDir = files[1];
        // try to fetch the target file, to check if it exists
        return new Promise(function (resolve, reject) {
            targetDir.getFile(dbName, {}, resolve, reject);
        }).catch(function () {
            // target file doesn't exist already, so copy it
            return new Promise(function (resolve, reject) {
                sourceFile.copyTo(targetDir, dbName, resolve, reject);
            });
        });
    });
}


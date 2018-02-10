var db;
var system;
var seite = "";
var appPage = 1;
var appSort = 'name';
var appSortUp = false;
var appCheck = [];
var appResult = [];
var myApp = {
//CREATE TABLE ZZOSHO ( Z_PK INTEGER PRIMARY KEY, Z_ENT INTEGER, Z_OPT INTEGER, ZFAVOR INTEGER, ZSTATE INTEGER, ZCHECKDATE TIMESTAMP, ZREADDATE TIMESTAMP, ZRELEASEDATE TIMESTAMP, ZISBNCODE VARCHAR, ZAUTHOR VARCHAR, ZAUTHORKANA VARCHAR, ZCODE VARCHAR, ZMEMO VARCHAR, ZPRICE VARCHAR, ZPUBLISHER VARCHAR, ZTICDSSYNCID VARCHAR, ZTITLE VARCHAR, ZIMAGE BLOB )
    books: {
        name: "books",
        title: "Bücher",
        menu: true,
        action: "fill_datalist",
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
                //, noField: 1
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
        action: "fill_datalist",
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
        action: "fill_datalist",
        head: true,
        tr: '',
        dataIsConst: true,
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
        }
        //, data: []
    },
    login: {
        name: "login",
        title: "Params",
        //menu: true,
        action: "fill_datalist",
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
            /*dbName: {
                name: "dbName",
                title: "Datenbank"
                , noList: 1
            },*/
            dbUser: {
                name: "dbUser",
                title: "User"
                , noList: 1
            },
            dbPass: {
                name: "dbPass",
                title: "Pass"
                , noList: 1
            },
            dbId: {
                name: "dbId",
                title: "Prefix"
                , noList: 1
            },
            appTitle: {
                name: "appTitle",
                title: "Titel"
                , noList: 1
            } /*,
            appHorsename: {
                name: "appHorsename",
                title: "Thema"
                , hidden: 1
            },
            apiIsbndb: {
                name: "apiIsbndb",
                title: "apiIsbndb"
                , hidden: 1
            },
            apiLibrarything: {
                name: "apiLibrarything",
                title: "apiLibrarything"
                , hidden: 1
            },
            apiAmazonId: {
                name: "apiAmazonId",
                title: "apiAmazonId"
                , hidden: 1
            },
            apiAmazonKey: {
                name: "apiAmazonKey",
                title: "apiAmazonKey"
                , hidden: 1
            }*/
        },
    },
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

var dbName = 'PBL001.db'; // local name
var dbServer = '';
var dbPort = '';
var dbUser = '';
var dbPass = '';

var dbIdPublic;        //couchdb
var dbIdPrivate;       //pouchdb
var remote;            //couchdb
var dbSync;            //sync-handle, used to stop syncing
var startDom = false, startDb = false, startOk = false;
var apiLibrarything = "", apiIsbndb = "";
var viewportWidth;
var infoSync;
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
function dbNew() {
    //Test for browser wbSQL compatibility

    if (((typeof cordova !== "undefined" && cordova.platformId !== 'browser') || typeof PhoneGap !== "undefined" || typeof phonegap !== "undefined")
        && typeof sqlitePlugin !== 'undefined' && typeof openDatabase !== 'undefined') {
        db = new PouchDB(dbName, { adapter: 'cordova-sqlite' });
        console.log('Database: Cordova');
    } else if (!isChrome() && window.openDatabase) {
        db = new PouchDB(dbName, { adapter: 'websql' });
        console.log('Database: webSQL');
    } else {
        db = new PouchDB(dbName, { revs_limit: 1, auto_compaction: true });
        console.log('Database: Pouchdb');
    }
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
        dbName = doc.dbUser;
        dbUser = doc.dbUser;
        dbPass = doc.dbPass;
        dbIdPublic = doc.dbId;
        appTitle = doc.appTitle;
        apiIsbndb = doc.apiIsbndb;
        apiLibrarything = doc.apiLibrarything;
        $('#appTitle').html(appTitle);
        console.log(dbIdPrivate);
        console.log(dbIdPublic);
        if (!startOk && startDom) {
            startOk = true;
            fill_datalist("books");
        }
        startDb = true;
        remoteLogin();
    }
}).catch(function (err) {
    // ersten Datensatz anlegen, falls nicht vorhanden    
    dbIdPublic = dbIdPrivate;
    db.put({
        _id: dbIdPrivate + '_login',
        name: 'Server',
        type: 'db',
        dbServer: dbServer,
        dbPort: dbPort,
        //dbName: dbName,
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
}

function dbRenew(destroy = false, create = true) {
    if (window.confirm('lokale Datenbank löschen?')) {
        db.destroy().then(function () {
            // database destroyed
            dbNew();
        }).catch(function (err) {
            // error occurred
        })
    }
}

document.addEventListener("deviceready", function () {
    'use strict';
    var appTitle = 'Private Books Library';
    $('#appTitle').html(appTitle);
    infoSync = document.getElementById('info-sync');

    dbNew();
    

    db.changes({
        since: 'now',
        live: true
    }).on('change', showDocs);

    var infoDev = document.getElementById('info-dev');
    var listeningElement = infoDev.querySelector('.listening');
    var receivedElement = infoDev.querySelector('.received');

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
                    dbServer = doc.dbServer;
                    dbPort = doc.dbPort;
                    dbName = doc.dbUser;
                    dbUser = doc.dbUser;
                    dbPass = doc.dbPass;
                    dbIdPublic = doc.dbId;
                    remoteLogin();

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
        show_all();
    });
    $('#appRefresh').click(function () {
        // page1 active?
        if (appPage == 1) {
            appResult[seite] = null;
            fill_datalist(seite, true);
        } else {

        }
        //alert('refresh ' + seite);
    });
    $('#appSettings').click(function () {
        show_data(dbIdPrivate + '_login', 'login');
    });
    $('#appReturn').click(function () {
        show_page1(1);
    });
/*
    $("#myTableList").swipe({
        swipe: function (event, direction, distance, duration, fingerCount) {
            $("#message").text("You swiped " + direction + " for " + distance + "px");
        }
        //,threshold: 10
    });
    */
    var startmove = document.getElementById('mySearchAZ');
    var moves = document.getElementById('message');
    var startx = 0;
    var starty = 0;
    var dist = 0;
    startmove.addEventListener("touchstart", function (eve) {
        var touchobj = eve.changedTouches[0]; // erster Finger
        startx = parseInt(touchobj.clientX); // X/Y-Koordinaten relativ zum Viewport
        starty = parseInt(touchobj.clientY);
        moves.innerHTML = "touch bei X: " + startx + "px, Y: " + starty + "px";
        eve.preventDefault();
    });
    startmove.addEventListener("mousedown", function (eve) {
        startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
        starty = parseInt(eve.clientY);
        moves.innerHTML = "mouse bei X: " + startx + "px, Y: " + starty + "px";
        eve.preventDefault();
    });
    startmove.addEventListener("touchmove", function (eve) {
        var touchobj = eve.changedTouches[0]; // erster Finger
        var distx = parseInt(touchobj.clientX) - startx;
        var disty = parseInt(touchobj.clientY) - starty;
        moves.innerHTML = "touch bei X: " + (startx + distx) + "px, Y: " + (starty + disty) + "px";
        eve.preventDefault();
    });
    startmove.addEventListener("mousemove", function (eve) {
        startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
        starty = parseInt(eve.clientY);
        moves.innerHTML = "mouse bei X: " + startx + "px, Y: " + starty + "px";
        eve.preventDefault();
    });
    startmove.addEventListener("touchend", function (eve) {
        var touchobj = eve.changedTouches[0]; // reference first touch point for this event
        moves.innerHTML = "touch bei X: " + touchobj.clientX + "px, Y: " + touchobj.clientY + "px";
        eve.preventDefault();
    });
    startmove.addEventListener("mouseup", function (eve) {
        startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
        starty = parseInt(eve.clientY);
        moves.innerHTML = "mouse bei X: " + startx + "px, Y: " + starty + "px";
        eve.preventDefault();
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
         result += '<input type="button" value="Parameter" onclick="fill_datalist(\'parameter\')" />';
         result += '<input type="button" value="Syncronisation" onclick="fill_datalist(\'sync\')" />';
         result += '<input type="button" name="m_send" value="Send to Server" id="m_send" onclick="CouchdbStoreWrite()" />';
         result += '<input type="button" name="m_read" value="Read from Server" id="m_read" onclick="CouchdbStoreRead()" />';
         */
        result += '<input type="checkbox" id="showDeleted" onchange="fill_datalist(\'\')"> showDeleted';
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
        //if (debugOutput)
            result += '<li class="pure-menu-item" onclick="show_pageLog()"><a class="pure-menu-link" href="#">Console.Log</a></li>';

        $("#sidelist").html(result);
    }
    mainmenu();

    $('#scansearch').click(scan_search);

    if (!startOk && startDb) {
        startOk = true;
        fill_datalist("books");
    }
    $("#mypanel").trigger("updatelayout");
    startDom = true;
    if (infoSync) {

    }
});

$(window).on("load, resize", function() {
    var viewportTemp = $(window).width();
    if (viewportWidth < 600 ? viewportTemp >= 600 : viewportTemp < 600) {
        //console.log(viewportTemp);
    }
    viewportWidth = viewportTemp;
    if (viewportWidth < 568) {
        //$("#partner").html('');
        $("#singleform").removeClass(" pure-form-aligned").addClass("pure-form pure-form-stacked");
    } else {
        //$("#partner").html('<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=29&l=ur1&category=books&f=ifr&linkID=d5d77bd50e3d0c95cef3edf83dd6cc87&t=bielemeierde-21&tracking_id=bielemeierde-21" width="120" height="600" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>');
        $("#singleform").addClass("pure-form pure-form-aligned").removeClass("pure-form-stacked");
    }
});

function remoteLogin() {
    if (dbServer && dbPort) {
        if (dbSync) {
            // sync active, stopping first before connecting to another server
            dbSync.cancel();
        }
        remote = new PouchDB(dbServer + ':' + dbPort + '/' + dbName, { skip_setup: true });
        remote.login(dbUser, dbPass, function (err, response) {
            if (err) {
                console.log(err);
                if (err.name === 'unauthorized') {
                    // name or password incorrect
                    infoSync.innerHTML = 'unauthorized';//'server: name or password incorrect';
                } else {
                    // cosmic rays, a meteor, etc.
                    infoSync.innerHTML = err.name;
                }
            } else {
                infoSync.innerHTML = 'sync';
                sync();
            }
        });
    } else {
        infoSync.innerHTML = 'local';
    }
}

// Initialise a sync with the remote server
function sync() {
    infoSync.setAttribute('data-sync-state', 'syncing');
    dbSync = remote.sync(db, {
        live: true, retry: true
    }).on('change', function (info) {
        infoSync.innerHTML = 'server: change ' + info.change.ok;
    }).on('paused', function (err) {
        infoSync.innerHTML = 'server: paused ' + (err ? err : '');
    }).on('active', function () {
        infoSync.innerHTML = 'server: active ';
    }).on('denied', function (err) {
        infoSync.innerHTML = 'server: denied ' + err;
    }).on('error', function (err) {
        infoSync.setAttribute('data-sync-state', 'error');
        infoSync.innerHTML = 'server: error ' + err;
    }).on('complete', function (info) {
        infoSync.setAttribute('data-sync-state', 'insync');
        infoSync.innerHTML = 'server: complete ' + info.ok;
    });
}

// There was some form or error syncing
function syncError() {
    infoSync.setAttribute('data-sync-state', 'error');
}
function scan_search(type, search) {
    function booksearch(index) {
        var ok = false;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                //document.getElementById("result").innerHTML = xhttp.responseText;
                var erg = JSON.parse(xhttp.responseText);
                
                //console.log(erg);
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
                    $("#books_source").val(index);
                    ok = true;
                    show_page2('books');
                }
            }
        }; 
        var searchString = "https://pbl.bcss.de/api/request.php?isbn=" + $('#bc_text').val();
        console.log(searchString);
        xhttp.open("GET", searchString, true);
        xhttp.send();
    }
    // ean / isbn anpassen
    if (search.length == 13) {
        search = search.substr(3, 9);
    }
    if (mySearch(search) == 0) {
        booksearch(6);
    }
}

function scan() {
    console.log('scanning');

    var scanner = cordova.plugins.barcodeScanner;
    
    scanner.scan(function (result) {
        //alert( JSON.stringify(result) );
        if (!result.cancelled) {
            $("#bc_text").val(result.text);
            document.getElementById("bc_format").innerHTML = "Format " + result.format;
            scan_search(result.format,result.text);
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
        if (!this.noList) {
            table += '<th>' + this.title + '</th>';
        }
    });
    table += '</thead><tbody>';
    return table;
}

function set_index(mySort) {
    var myIndex = {};
    switch (mySort) {
        case 'id':
            myIndex.fields = ['_id'];
            break;
        case 'name':
            myIndex.fields = ['name', '_id', 'DBdeleted'];
            myIndex.name = 'indexNameId';
            myIndex.ddoc = 'indexNameId';
            break;
        case 'author':
            myIndex.fields = ['author', 'releasedate','_id', 'DBdeleted'];
            myIndex.name = 'indexAuthorDateId';
            myIndex.ddoc = 'indexAuthorDateId';
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
        _id: {$gte: dbId + '_' + table, $lte: dbId + '_' + table + 'a'} //alles mit table im Namen und Zahl oder '_' nach table
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
                mySelektor.name = { $gt: null };
                myFind.sort = ['name'];
                myFind.use_index = "indexNameId";
                break;
            case 'author':
                mySelektor.author = { $gt: null };
                mySelektor.releasedate = { $gt: null };
                myFind.sort = ['author','releasedate'];
                myFind.use_index = "indexAuthorDateId";
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
                mySelektor.releasedate = { $gt: null };
                myFind.sort = [{ releasedate: 'desc' }];
                myFind.use_index = "indexDateId";
                myFind.limit = 10;
        }
    }
    return myFind;
}

function sortTable(myTable, sortfunc) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(myTable);
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (sortfunc(x, y)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sort_books(a, b) {
    var up = (appSortUp ? 1 : -1);
    switch (appSort) {
        case 'id':   return (a._id > b._id ? up : (a._id < b._id ? -1 : 0));
        case 'name': return (a.doc.name > b.doc.name ? up : (a.doc.name < b.doc.name ? -up : 0));
        case 'date': return (a.doc.releasedate > b.doc.releasedate ? up : (a.doc.releasedate < b.doc.releasedate ? -up : 0));
        case 'author': return (a.doc.author > b.doc.author ? up : (a.doc.author < b.doc.author ? -up : 0));
    }
}

function show_all_docs_sorted() {
    var table = "";
    var tablerow = "";
    var dataform = '';
    var mySortPos = '';
    var mySearchlist = '<div class="searchlist"><a class="searchlink" href="#appSearchAnchor">&#x1F50D;</a></div>';
    var releasedate;
    var releaseyear;
    var title = "";
    //appResult[seite].rows.sort(sort_books);
    if (myApp[seite].head) {
        if (appResult[seite].rows.length === 0) {
            table = '<div id="datalistScroll">' + show_all_header(null);
        } else {
            table = '<div id="datalistScroll">' + show_all_header(appResult[seite].rows[0].doc);
        }
    } else {
        table = '<div id="datalistScroll"><table id ="myTableList"><tbody>';
    }

    if (!appResult[seite].tr) {
        for (var i = 0; i < appResult[seite].rows.length; i++) {
            //var s = this.doc;
            //console.log(s);
            if (myApp[seite].tr === 'books') {

                if (appResult[seite].rows[i].doc['source'] !== '11') {
                    appResult[seite].rows[i].doc['releasedate'] = (new Date(parseInt(appResult[seite].rows[i].doc['releasedate']) + (24 * 60 * 60 * 1000))).toISOString();
                    appResult[seite].rows[i].doc['source'] = '11';
                    db.put(appResult[seite].rows[i].doc).then(function () {
                    }).catch(function (err) {
                        console.log(err);
                    });
                }

                appResult[seite].rows[i].tr0 = '<tr><td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" ><div class="relative">';
                //tablerow += '<div class="books-img-tr" ';
                tablerow = '<div id="' + appResult[seite].rows[i].doc['_id'] + '"><div  class="books-img"><img class="books-image" data-src="' + appResult[seite].rows[i].doc['_id'] + '" src="data: image/png; base64, R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="/></div>';
                //tablerow += '</td><td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >';
                tablerow += '<div class="books-title">' + appResult[seite].rows[i].doc['name'] + '</div>';
                tablerow += '<div class="books-favor" >' + bookFavor(appResult[seite].rows[i].doc['favor']) + '</div>'; //onclick="set_book_favor(this, \'' + appResult[seite].rows[i].doc['_id'] + '\')"
                tablerow += '<div class="books-author">' + appResult[seite].rows[i].doc['author'] + '</div>';
                if (appResult[seite].rows[i].doc['releasedate'] > '1800')
                    tablerow += '<div class="books-date">' + appResult[seite].rows[i].doc['releasedate'].substr(0, 10) + '</div>'; //
                else
                    tablerow += '<div class="books-date">&nbsp;</div>';
                tablerow += '<div class="books-state">' + appResult[seite].rows[i].doc['ent'] + '&nbsp;' + appResult[seite].rows[i].doc['opt'] + '&nbsp;' + bookState(appResult[seite].rows[i].doc['state']) + '</div>';
                tablerow += '<div class="books-isbn">' + appResult[seite].rows[i].doc['isbn'] + '</div>';
                tablerow += '</div></div></td>';
            } else {
                appResult[seite].rows[i].tr0 = '<tr>';
                if ($('#showDeleted').is(':checked')) {
                    tablerow = '<td>' + (this.DBdeleted ? '*' : '&nbsp') + '</td>';
                } else {
                    tablerow = '<td>&nbsp;</td>';
                }
                $.each(myApp[seite].fields, function () {
                    if (!this.noList) {
                        if (this.select) {
                            tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + myApp[this.select]["data"][appResult[seite].rows[i].doc[this.name]] + '</td>';
                        } else if (this.func) {
                            tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + appResult[seite].rows[i].doc[this.name] + '</td>';
                            //	tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + myApp[this.func](appResult[seite].rows[i].doc[this.name]) + '</td>';
                        } else if (this.type === "checkbox") {
                            tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" ><input type="' + this.type + '"' + (appResult[seite].rows[i].doc[this.name] ? 'checked' : '') + ' disabled></td>';
                        } else {
                            tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + appResult[seite].rows[i].doc[this.name] + '</td>';
                        }
                    }
                });
            }
            tablerow += '</tr>';
            appResult[seite].rows[i].tr1 = tablerow;
        };
        appResult[seite].tr = true;
    }
    console.log('show_all sort ' + seite + ' ' + appResult[seite].rows.length);
    if (seite == "books") {
        appResult[seite].rows.sort(sort_books)
    }
    for (var i = 0; i < appResult[seite].rows.length; i++) {
        //15.04.2008 -> 14.4.1977 -> 978393600
        //27:10:2011 -> 25:10:1980
        //releasedate = new Date(parseInt(s['releasedate']));
        tablerow = "";
        if (seite == "books") {
            if (appSort === 'name') {
                title = appResult[seite].rows[i].doc['name'].substr(0, 1);
                if (mySortPos !== title) {
                    mySortPos = title;
                    tablerow = '<div id="myTableSort' + mySortPos + '" class="myTableAnchor"></div>';
                    mySearchlist += '<div class="searchlist"><a class="searchlink" href="#myTableSort' + mySortPos + '">' + mySortPos + '</a></div>';
                }
            } else if (appSort === 'date') {
                releaseyear = appResult[seite].rows[i].doc['releasedate'].substr(0, 4);
                if (mySortPos !== releaseyear) {
                    mySortPos = releaseyear;
                    tablerow = '<div id="myTableSort' + mySortPos + '" class="myTableAnchor"></div>';
                    mySearchlist += '<div class="searchlist"><a class="searchlink" href="#myTableSort' + mySortPos + '">' + mySortPos + '</a></div>';
                }
            }
        }
        table += appResult[seite].rows[i].tr0 + tablerow + appResult[seite].rows[i].tr1;
    }
    table += '</tbody></table></div>';
    //alert(table);
    //return table;
    $("#datalist").html(table);
    $("#mySearchAZ").html(mySearchlist);
    //sortTable("datalist", sort_books_table);

    function images() {
        var ps = [].slice.call(document.getElementById('datalist').getElementsByClassName('books-image'));
        ps.forEach(function (p, i) {
            var id = p.getAttribute('data-src');
            if (id) {
                if (appResult[seite].img[id]) {
                    p.setAttribute('src', appResult[seite].img[id]);
                } else {
                    db.get(id, { attachments: true }).then(function (doc) {
                        p.setAttribute('src', bookImage(doc));
                    });
                }
            }
        });
    }
    if (!appResult[seite].img) {
        appResult[seite].img = [];
    }
    images();
}

function show_all_docs(singleIsbn) {

    console.log('show_all result ' + seite + ' ' + appResult[seite].rows.length);
        //console.log(result.rows);
        if (appResult[seite].rows.length > 1 | seite !== 'books' | (appResult[seite].rows.length === 0 && !singleIsbn)) {
            show_all_docs_sorted();
        } else if (appResult[seite].rows.length === 1) {
            show_data(appResult[seite].rows[0]._id);
        } else {
            show_page2('books');
        }
        console.log('show_all end ' + seite + ' ' + appResult[seite].rows.length);
        loading.style.display = "none";
    
}

function show_all(table, mySort = 'name', singleIsbn = "") {
    if (table === 'books' && singleIsbn === "") {
        if (appSort == mySort) {
            appSortUp = !appSortUp;
        } else {
            appSort = mySort;
        }
        $("#sort_name").toggleClass("fa-sort-up", appSortUp && appSort == "name");
        $("#sort_name").toggleClass("fa-sort-down", !appSortUp && appSort == "name");
        $("#sort_name").toggleClass("fa-sort", appSort !== "name");
        $("#sort_id").toggleClass("fa-sort-up", appSortUp && appSort == "id");
        $("#sort_id").toggleClass("fa-sort-down", !appSortUp && appSort == "id");
        $("#sort_id").toggleClass("fa-sort", appSort !== "id");
        $("#sort_date").toggleClass("fa-sort-up", appSortUp && appSort == "date");
        $("#sort_date").toggleClass("fa-sort-down", !appSortUp && appSort == "date");
        $("#sort_date").toggleClass("fa-sort", appSort !== "date");
        $("#sort_author").toggleClass("fa-sort-up", appSortUp && appSort == "author");
        $("#sort_author").toggleClass("fa-sort-down", !appSortUp && appSort == "author");
        $("#sort_author").toggleClass("fa-sort", appSort !== "author");
    }
//    db.allDocs({
//        include_docs: true
//        , descending: true
//        , startkey: dbIdPublic + '_' + table + '3'//+ table 
//        , endkey: dbIdPublic + '_' + table  //+ table
//    PouchDB.debug.enable('pouchdb:find');
        console.log('show_all ' + table);
        var loading = document.getElementById("loading");
        loading.style.display = "block";

        if (singleIsbn) {
            loading.style.display = "none";
            //filter = [];//singleIsbn;//input.value.toUpperCase();
            table = document.getElementById("myTableList");
            tr = table.getElementsByTagName("tr");
            var count = 0
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < appResult[seite].rows.length; i++) {
                if (appResult[seite].rows[i].isbn == singleIsbn) {
                   // filter[] = i;
                }
            }
        } else {
            if (!appResult[table]) {
                db.allDocs({
                    startkey: dbIdPublic + '_' + table
                    , endkey: dbIdPublic + '_' + table + 'a'
                    , include_docs: true
                    //,attachments: true
                })
                    .then(function (result) {
                        appResult[table] = result;
                        show_all_docs(singleIsbn);
                    })
                    .catch(function (err) {
                        console.log(err);
                        console.log('show_all end');
                        loading.style.display = "none";
                    });
            } else {
                show_all_docs(singleIsbn);
            }
        }
}

function fill_datalist(aktiveSeite, refresh = false) {

    console.log(seite);
    if (aktiveSeite !== seite) {
        if (aktiveSeite !== "") {
            $('#t_' + seite).hide();
            seite = aktiveSeite;
            //$('#t_' + seite).show();
        }
        show_page1(0);
        show_all(seite);
    } else if (refresh) {
        show_page1(0);
        show_all(seite);
    }
}

function show_seite(aktiveSeite) {
    //$('#'+aktiveSeite).show();
    var result = '<div id="t_' + aktiveSeite + '" name="t_' + aktiveSeite + '" class="t_seite">';
    //result += '<div class="pure-control-group"><label for="email">Email Address</label><input id="email" type="email" placeholder="Email Address"></div>';
    //result += '<table>';
    if (aktiveSeite == "books") {
        result += '<p>erkannter Barcode <input id="bc_text"/> (<span id="bc_format"></span>) Beispiel: 9783802587849</p>';
        result += '<p><a href="#" name="scansearch" id="scansearch">Suchen</a><br /><span id="result"></span></p>';
        result += '<p><span id="result"></span></p>';
        result += '<div id="book-image"><img  class="pure-img" id="img_' + aktiveSeite + '" height="200" src="blank.jpg"/></div>';
        result += '<div id="book-favor">' + bookFavor("0") + '</div>';
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
        if (!this.noField) {
            result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">' + this.title + '</label>';
            if (this.select) {
                result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '"></select>';
            } else if (this.type) {
                result += '<input type="' + this.type + '" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
            } else {
                result += '<input type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
            }
            result += '</div>';
        }
    });
    result += '</div>';
    if (seite === "login") {
        result += '<p>Font Awesome by Dave Gandy - <a href="https://fontawesome.com/">https://fontawesome.com/</a></p>';
    }
    $('#formdata').append(result);

}

function set_book_favor(div, id) {
    //var div = $this;
    db.get(id).then(function (doc) {
        // handle doc
        if (doc) {
            doc.favor = (doc.favor === "0") ? "1" : "0";
            db.put(doc).then(function (doc1) {
                div.innerHTML = bookFavor(doc['favor']);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
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
    $('#pageLog').hide();
    if (seite === 'books')
        $('#dataformBooks').show()
    else
        $('#dataformBooks').hide();
    if (setzen)
        setScrollY(scrollY);
    appPage = 1;
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
    $('#pageLog').hide();
    setScrollY(0);
    appPage = 2;
}
function show_pageLog() {
    $('#pageLog').show();
    $('#page1').hide();
    $('#page2').hide();
    appPage = 1;
}

function show_div(div = "record_show") {
    var x = document.getElementById(div);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function select(table, id, name, field, visible, selected = null) {
    if (myApp[table].data && myApp[table].dataIsConst) {
        $("#" + id + '_' + name).empty();
        $("#" + id + '_' + name).append($('<option></option>'));
        $.each(myApp[table].data, function (k, v) {
            $("#" + id + '_' + name).append('<option ' + (parseInt(selected) === k ? 'selected="selected"' : '') + ' value="' + k + '">' + v + '</option>');
        });
    } else {
        db.find({
            selector: {
                _id: { $gte: dbIdPublic + '_' + table, $lte: dbIdPublic + '_' + table + 'a' },
                DBdeleted: { $exists: false }
            }

        }).then(function (result) {
            $("#" + id + '_' + name).empty();
            myApp[table].data = [];
            $("#" + id + '_' + name).append($('<option></option>'));
            $.each(result.docs, function () {
                $("#" + id + '_' + name).append('<option ' + (selected === this[field] ? 'selected="selected"' : '') + ' value="' + this[field] + '">' + this[visible] + '</option>');
                myApp[table].data[this[field]] = this[visible];
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
}

function show_data(id, neueSeite = seite) {
    show_page2(neueSeite);

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
                    $('#book-favor').replaceWith('<div id="book-favor" onclick="set_book_favor(this, \''+doc['_id']+'\')">'+bookFavor(doc['favor'])+'</div>');
                    doc['checkdate'] = new Date(parseInt(doc['releasedate'])).toISOString();//toLocaleDateString();

                }
                $.each(myApp[seite].header, function () {
                    $('#' + seite + '_' + this.name).val(doc[this.name]);
                });
                $.each(myApp[seite].fields, function () {
                    if (!this.noField) {
                        if (this.select) {
                            select(this.select, seite, this.name, this.field, this.visible, doc[this.name]);
                        } else if (this.type === "checkbox")
                            $('#' + seite + '_' + this.name).prop("checked", (doc[this.name] === true));//(doc[this.name]);
                        else
                            $('#' + seite + '_' + this.name).val(doc[this.name]);
                    }
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
    if (!myObj._id)
        myObj._id = dbIdPublic + '_' + table + '2' + (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function mySearch(test='') {
    // Declare variables
    var input, filter, table, tr, td, i, count=0;
    if (test) {
        filter = test
    } else {
        input = document.getElementById("appSearch");
        filter = input.value.toUpperCase();
    }
    table = document.getElementById("myTableList");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        count++;
        if (filter) {
            td = tr[i].getElementsByClassName("books-title")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    td = tr[i].getElementsByClassName("books-author")[0];
                    if (td) {
                        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        } else {
                            td = tr[i].getElementsByClassName("books-isbn")[0];
                            if (td) {
                                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = "none";
                                    count--;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            tr[i].style.display = "";
        }
    }
    return count;
}

function bookImage(doc) {
    if (!appResult[seite])
        return;
    if (!appResult[seite].img) {
        appResult[seite].img = [];
    }
    if (appResult[seite].img[doc._id]) {
        return appResult[seite].img[doc._id];
    } else {
        var test = "blank.jpg";
        if (doc["image"]) {
            test = 'data:image/jpeg;base64, ' + doc.image;
        } else if (doc['thumbnail']) {
            test = doc['thumbnail'];
        } else if (doc['_attachments'] && doc._attachments.thumbnail.data) {
            //console.log(doc);
            test = 'data:image/jpeg;base64, ' + doc._attachments.thumbnail.data;
        }
        appResult[seite].img[doc._id] = test;
        return test;
    }
}

// 1  3 0 6 -> owned/read
// 1  1 0 0 -> not owned
// 1  1 0 1 -> ordered 
// 1  1 0 2 -> owned
// 1  5 1 6 -> favorite, owned/read
// 1 36 0 6   owned/read kindle

function bookState(state) {
    switch (state) {
        case '0':
            return 'not owned';
        case '1':
            return 'ordered';
        case '2':
            return 'owned';
        case '3':
            return 'S3';
        case '4':
            return 'S4';
        case '5':
            return 'S5';
        case '6':
            return 'owned/read';
        default:
            return 'S' + state;
    }
}

function bookFavor(favor) {
    switch (favor) {
        case '0':
            return '&#9734;';
        case '1':
            return '&#9733;';
        default:
            return 'F' + favor;
    }
}

function bookEnt(ent) {
    switch (ent) {
        case '0':
            return '#9734';
        case '1':
            return '#9733';
        default:
            return 'E' + ent;
    }
}

function bookOpt(opt) {
    switch (opt) {
        case '1':
            return 'O1';
        case '43':
            return 'O43';
        default:
            return 'O'+opt;
    }
}

function isChrome() {
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        return false;// true, but in IOS webSQL;
    } else if (
        isChromium !== null &&
        typeof isChromium !== "undefined" &&
        vendorName === "Google Inc." &&
        isOpera === false &&
        isIEedge === false
    ) {
        return true;
    } else {
        return false;
    }
}
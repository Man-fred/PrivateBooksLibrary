/* global app, date */

﻿define(function () {
    var tables = {
        //CREATE TABLE ZZOSHO ( Z_PK INTEGER PRIMARY KEY, Z_ENT INTEGER, Z_OPT INTEGER, ZFAVOR INTEGER, ZSTATE INTEGER, ZCHECKDATE TIMESTAMP, ZREADDATE TIMESTAMP, ZRELEASEDATE TIMESTAMP, ZISBNCODE VARCHAR, ZAUTHOR VARCHAR, ZAUTHORKANA VARCHAR, ZCODE VARCHAR, ZMEMO VARCHAR, ZPRICE VARCHAR, ZPUBLISHER VARCHAR, ZTICDSSYNCID VARCHAR, ZTITLE VARCHAR, ZIMAGE BLOB )
        books: {
            name: "books",
            title: app.lang._get('books', 2),
            menu: true,
            action: "app.ui.datalist",
            head: false,
            tr: 'books',
            btn: { add: true, update: true },
            fields: {
                title: {
                    name: "name",
                    title: app.lang.title
                },
                author: {
                    name: "author",
                    title: app.lang.author,
                    select: "authors",
                    field: "name",
                    visible: "name"
                },
                publisher: {
                    name: "publisher",
                    title: app.lang.publisher
                },
                series: {
                    name: "series",
                    title: app.lang.series,
                    select: "series",
                    field: "name",
                    visible: "name"
                },
                seriesnr: {
                    name: "seriesnr",
                    title: app.lang.nr
                },
                isbn: {
                    name: "isbn",
                    title: app.lang.isbn
                },
                asin: {
                    name: "asin",
                    title: "asin"
                },
                price: {
                    name: "price",
                    title: app.lang.price
                },
                releasedate: {
                    name: "releasedate",
                    title: app.lang.releasedate
                },
                state: {
                    name: "state",
                    title: app.lang.state,
                    select: "state",
                    field: "name",
                    visible: "long"
                },
                favor: {
                    name: "favor",
                    title: app.lang.favorite,
                    select: "favorite",
                    field: "name",
                    visible: "long"
                    //, noField: 1
                },
                memo: {
                    name: "memo",
                    title: "Memo"
                },
                lending: {
                    name: "lending",
                    title: app.lang.lending,
                    select: "lending",
                    field: "name",
                    visible: "long"
                    //, noField: 1
                },
                location: {
                    name: "location",
                    title: app.lang.location,
                    select: "location",
                    field: "name",
                    visible: "long"
                    //, noField: 1
                },
                checkdate: {
                    name: "checkdate",
                    title: app.lang.checkdate
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
                url: {
                    name: "url",
                    title: "url"
                },
                url_amzn: {
                    name: "url_amzn",
                    title: "url_amzn",
                    noField: true
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
            title: app.lang._get('authors', 2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            btn: { add: true, update: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: app.lang.author
                },
                nr: {
                    name: "nr",
                    title: "ID"
                    , noList: 1
                },
                memo: {
                    name: "memo",
                    title: "Memo"
                    , noList: 1
                },
                wiki: {
                    name: "wiki",
                    title: "Wikipedia"
                    , noList: 1
                }
            },
            data: []
        },
        series: {
            name: "series",
            title: app.lang._get('series', 2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            btn: { add: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: app.lang.series
                },
                url: {
                    name: "url",
                    title: "Url",
                    noField: true
                },
                memo: {
                    name: "memo",
                    title: "Memo"
                    , noList: 1
}
            },
            data: []
        },
        state: {
            name: "state",
            title: app.lang._get('state', 2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            dataIsConst: true,
            idName: true,
            btn: { add: true, update: true },
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
        lending: {
            name: "lending",
            title: app.lang._get('lending', 2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            btn: { add: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: "Nr"
                },
                long: {
                    name: "long",
                    title: "Name"
                },
                memo: {
                    name: "memo",
                    title: "Memo"
                    , noList: 1
                }
            },
            data: []
        },
        location: {
            name: "location",
            title: app.lang._get('location',2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            btn: { add: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: "Nr"
                },
                long: {
                    name: "long",
                    title: "Name"
                },
                memo: {
                    name: "memo",
                    title: "Memo"
                }
            },
            data: []
        },
        favorite: {
            name: "favorite",
            title: "Favorit",
            //menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            dataIsConst: true,
            idName: true,
            btn: { add: true, update: true },
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
            title: app.lang._get('device', 2),
            menu: true,
            action: "app.ui.datalist",
            head: true,
            tr: '',
            btn: { add: false, update: true },
            header: {
                dbPassChange: {
                    name: "appPassword",
                    title: app.lang.passwordChange
                    , onclick: "app.ui.show(app.ui.pagePassword)"
                    , noList: 1
                    , type: "button"
                    //, noField: 1
                }
            },
            fields: {
                name: {
                    name: "name",
                    title: app.lang.device,
                    //selectYN: ["local", "Server", false],
                    field: "name",
                    visible: "name"
                },
                dbServer: {
                    name: "dbServer",
                    title: "Server",
                    input: "autocorrect=\"off\" autocapitalize=\"off\""
                    //, noField: 1
                },
                dbPort: {
                    name: "dbPort",
                    title: "Port"
                    , type: "tel"
                    , noList: 1
                    //, noField: 1
                },
                /*dbName: {
                    name: "dbName",
                    title: "Datenbank"
                    , noList: 1
                },*/
                dbUser: {
                    name: "dbUser",
                    title: app.lang.passwordUser
                    , input: "autocorrect=\"off\" autocapitalize=\"off\""
                    , noList: 1
                    //, noField: 1
                },
                dbPass: {
                    name: "dbPass",
                    title: app.lang.password
                    , input: "autocorrect=\"off\" autocapitalize=\"off\""
                    , noList: 1
                    , type: "password"
                    //, noField: 1
                },
                dbId: {
                    name: "dbId",
                    title: "Prefix"
                    , input: "autocorrect=\"off\" autocapitalize=\"off\""
                },
                appTitle: {
                    name: "appTitle",
                    title: "Titel"
                    , noList: 1
                    , noField: true
                },
                showInit: {
                    name: "showInit",
                    title: "showInit",
                    selectYN: [app.lang.no, app.lang.yes, true],
                    noList: 1,
                    noField: true
                },
                online: {
                    name: "online",
                    title: "online",
                    selectYN: [app.lang.no, app.lang.yes, false]
                },
                onlineCell: {
                    name: "onlineCell",
                    title: "onlineCell",
                    selectYN: [app.lang.no, app.lang.yes, false]
                    , noList: 1
                },
                onlineBackground: {
                    name: "onlineBackground",
                    title: "onlineBackground",
                    selectYN: [app.lang.no, app.lang.yes, false]
                    , noList: 1
                }
                /*,
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
            }
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
    return tables;
});
define(function (require) {
    var tables = {
        //CREATE TABLE ZZOSHO ( Z_PK INTEGER PRIMARY KEY, Z_ENT INTEGER, Z_OPT INTEGER, ZFAVOR INTEGER, ZSTATE INTEGER, ZCHECKDATE TIMESTAMP, ZREADDATE TIMESTAMP, ZRELEASEDATE TIMESTAMP, ZISBNCODE VARCHAR, ZAUTHOR VARCHAR, ZAUTHORKANA VARCHAR, ZCODE VARCHAR, ZMEMO VARCHAR, ZPRICE VARCHAR, ZPUBLISHER VARCHAR, ZTICDSSYNCID VARCHAR, ZTITLE VARCHAR, ZIMAGE BLOB )
        books: {
            name: "books",
            title: "Bücher",
            menu: true,
            action: "app.datalist.fill",
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
                    title: app.lang.author
                },
                publisher: {
                    name: "publisher",
                    title: "publisher"
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
                    title: "isbn"
                },
                asin: {
                    name: "asin",
                    title: "asin"
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
                favor: {
                    name: "favor",
                    title: "favor",
                    select: "favorite",
                    field: "name",
                    visible: "long"
                    //, noField: 1
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
            title: "authors",
            menu: true,
            action: "app.datalist.fill",
            head: true,
            tr: '',
            btn: { add: true, update: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: "name"
                },
                nr: {
                    name: "nr",
                    title: "ID"
                }
            },
            data: []
        },
        series: {
            name: "series",
            title: "series",
            menu: true,
            action: "app.datalist.fill",
            head: true,
            tr: '',
            btn: { add: true },
            idName: true,
            fields: {
                name: {
                    name: "name",
                    title: "name"
                },
            },
            data: []
        },
        state: {
            name: "state",
            title: "Status",
            menu: true,
            action: "app.datalist.fill",
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
        favorite: {
            name: "favorite",
            title: "Favorit",
            menu: true,
            action: "app.datalist.fill",
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
            title: "Params",
            //menu: true,
            action: "app.datalist.fill",
            head: true,
            tr: '',
            btn: { add: false, update: true },
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
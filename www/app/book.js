define(function (require) {

    var book = {
        initialize: function (pbl) {
            book.pbl = pbl;
        },
        show: function (doc, seite = app.seite) {
            if (seite === "books") {
                $('#img_books').attr("src", book.image(doc));
                $('#book-favor').replaceWith('<div id="book-favor" onclick="app.book.set_favor(this, \'' + doc['_id'] + '\')">' + book.favor(doc['favor']) + '</div>');
                //doc['checkdate'] = new Date(parseInt(doc['checkdate'])).toISOString();//toLocaleDateString();
                //alert(doc['name']);alert(doc.name);
            }
            $.each(app.myApp[seite].header, function () {
                $('#' + seite + '_' + this.name).val(doc[this.name]);
            });
            $.each(app.myApp[seite].fields, function () {
                if (!this.noField) {
                    if (this.select) {
                        app.data.select(this.select, seite, this.name, this.field, this.visible, doc[this.name]);
                    } else if (this.type === "checkbox")
                        $('#' + seite + '_' + this.name).prop("checked", (doc[this.name] === true));//(doc[this.name]);
                    else
                        $('#' + seite + '_' + this.name).val(doc[this.name]);
                }
            });
        },
        set_favor: function (div, id) {
            app.pouch.db.get(id).then(function (docdb) {
                // handle doc
                if (docdb) {
                    docdb.favor = docdb.favor === "0" ? "1" : "0";
                    app.pouch.db.put(docdb).then(function (docput) {
                        var i = app.pouch.appResult[app.seite].id[id];
                        var doc = app.pouch.appResult[app.seite].rows[i].doc;
                        doc.favor = doc.favor === "0" ? "1" : "0";
                        div.innerHTML = book.favor(doc.favor);
                        app.pouch.appResult[app.seite].rows[i].tr1 = app.datalist.one_book(doc, 1);
                        document.getElementById(id).innerHTML = app.datalist.one_book_div(doc);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        image: function (doc) {
            var appResult = book.pbl.pouch.appResult;
            if (!appResult["books"])
                return;
            if (!appResult["books"].img) {
                appResult["books"].img = [];
            }
            if (appResult["books"].img[doc._id]) {
                return appResult["books"].img[doc._id];
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
                appResult["books"].img[doc._id] = test;
                return test;
            }
        },

        // 1  3 0 6 -> owned/read
        // 1  1 0 0 -> not owned
        // 1  1 0 1 -> ordered 
        // 1  1 0 2 -> owned
        // 1  5 1 6 -> favorite, owned/read
        // 1 36 0 6   owned/read kindle

        state: function (w) {
            if (!book.pbl.myApp['state'].data) {
            } else {
                return book.pbl.myApp['state'].data[w];
                switch (w) {
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
                        return 'S' + w;
                }
            }
        },

        favor: function (w) {
            switch (w) {
                case '0':
                    return '&#9734;';
                case '1':
                    return '&#9733;';
                default:
                    return 'F' + w;
            }
        },

        ent: function (w) {
            switch (w) {
                case '0':
                    return '#9734';
                case '1':
                    return '#9733';
                default:
                    return 'E' + w;
            }
        },

        opt: function (w) {
            switch (w) {
                case '1':
                    return 'O1';
                case '43':
                    return 'O43';
                default:
                    return 'O' + w;
            }
        }
    };
    return book;
});

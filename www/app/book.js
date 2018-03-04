define(function (require) {

    var book = {
        initialize: function (pbl) {
            book.pbl = pbl;
        },
        set_favor: function (div, id) {
            //var div = $this;
            db.get(id).then(function (doc) {
                // handle doc
                if (doc) {
                    doc.favor = doc.favor === "0" ? "1" : "0";
                    db.put(doc).then(function (doc1) {
                        div.innerHTML = bookFavor(doc['favor']);
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

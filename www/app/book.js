define(function (require) {

    var book = {
        initialize: function (pbl) {
            book.pbl = pbl;
        },
        show: function (doc, seite = app.seite) {
            if (seite === "search_books") {
                seite = "books";
            }
            if (seite === "books") {
                book.set_checkdate(doc);
                $('#img_books').attr("src", book.image(doc));
                $('#book-favor').replaceWith('<div id="book-favor" onclick="app.book.set_favor(this, \'' + doc['_id'] + '\')">' + book.favor(doc['favor']) + '</div>');
                $('#book-amzn').attr("href", 'https://www.amazon.de/dp/' + book.amzn(doc.asin, doc.isbn) + '/ref=nosim?tag=bielemeierde-21');
                $('#book-thalia').attr("href", 'https://www.thalia.de/suche?sq=' + doc.name );
                //doc['checkdate'] = new Date(parseInt(doc['checkdate'])).toISOString();//toLocaleDateString()book.ean(doc.isbn);utf8=%E2%9C%93&filterPATHROOT=&
                //alert(doc['name']);alert(doc.name);
            }
            $.each(app.myApp[seite].header, function () {
                $('#' + seite + '_' + this.name).val(doc[this.name]);
            });
            $.each(app.myApp[seite].fields, function () {
                if (!this.noField) {
                    if (this.select) {
                        app.data.select(this.select, seite, this.name, this.field, this.visible, doc[this.name]);
                    } else if (this.selectYN) {
                        $('#' + seite + '_' + this.name + ' option[value=' + doc[this.name] + ']').attr('selected', 'selected');
                    } else if (this.type === "checkbox") {
                        $('#' + seite + '_' + this.name).prop("checked", doc[this.name] === true);//(doc[this.name]);
                    } else {
                        $('#' + seite + '_' + this.name).val(doc[this.name]);
                    }
                }
            });
        },
        set_favor: function (div, id) {
            app.pouch.db.get(id).then(function (docdb) {
                // handle doc
                if (docdb) {
                    docdb.favor = (docdb.favor === '1' || docdb.favor === 1) ? "0" : "1";
                    app.pouch.db.put(docdb).then(function (docput) {
                        var i = app.pouch.appResult[app.seite].id[id];
                        app.pouch.appResult[app.seite].rows[i].doc = docdb;
                        div.innerHTML = book.favor(docdb.favor);
                        app.pouch.appResult[app.seite].rows[i].tr1 = app.datalist.one_book(docdb, 1);
                        document.getElementById(id).innerHTML = app.datalist.one_book_div(docdb);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        set_checkdate: function (doc) {
            var timestamp = doc['checkdate'];
            if (!timestamp) {
                timestamp = (new Date()).toISOString();
            }
            if (doc['DBTimestamp']) {
                doc['checkdate'] = (new Date(doc['DBTimestamp'] * 1000)).toISOString();
            } else if (timestamp.length >= 13 && !isNaN(timestamp)) {
                //1472379876378.1
                timestamp = timestamp.substr(0, 13);
                time = new Date(Number(timestamp));
                doc['checkdate'] = time.toISOString();
            }
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
                if (app.pouch.dbA) {
                    app.pouch.dbA.get(doc._id, { attachments: true }).then(function (docdb) {
                        if (docdb['_attachments'] && docdb._attachments.thumbnail.data) {
                            //console.log(doc);
                            test = 'data:image/jpeg;base64, ' + docdb._attachments.thumbnail.data;
                        } else if (docdb['thumbnail']) {
                            test = docdb['thumbnail'];
                        } else if (docdb["image"]) {
                            test = 'data:image/jpeg;base64, ' + docdb.image;
                        } else {
                            return;
                        }
                        appResult["books"].img[docdb._id] = test;
                        $('#img_books').attr("src", test);
                    });
                }
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
            if (book.pbl.myApp['state'].data) {
                return book.pbl.myApp['state'].data[w];
            }
        },

        favor: function (w) {
            if (w === '1' || w === 1) {
                return '&#9733;';
            } else {
                return '&#9734;';
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
        },

        /* 
         * @author: Tomasz Sochacki, https://github.com/drogimex/isbn-validate
         * Checksum for validate ISBN-10 and ISBN-13.
         */
        checksum: function(isbn) {
            //isbn have to be number or string (composed only of digits or char "X"):
            isbn = isbn.toString();

            //Remove last digit (control digit):
            //let number = isbn.slice(0, -1);
            let number = isbn;
            //Convert number to array (with only digits):
            number = number.split('').map(Number);

            //Save last digit (control digit):
            const last = isbn.slice(-1);
            const lastDigit = (last !== 'X') ? parseInt(last, 10) : 'X';

            //Algorithm for checksum calculation (digit * position):
            number = number.map((digit, index) => {
                return digit * (index + 1);
            });

            //Calculate checksum from array:
            const sum = number.reduce((a, b) => a + b, 0);

            //Validate control digit:
            const controlDigit = sum % 11;
            return (controlDigit !== 10 ? controlDigit : 'X');
        },
        checksum13: function (eanCode) {
            // Check if only digits
            var ValidChars = "0123456789";
            for (i = 0; i < eanCode.length; i++) {
                digit = eanCode.charAt(i);
                if (ValidChars.indexOf(digit) == -1) {
                    return '';
                }
            }

            // Add five 0 if the code has only 8 digits
            if (eanCode.length === 8) {
                eanCode = "00000" + eanCode;
            }
            // Check for 13 digits otherwise
            else if (eanCode.length !== 13) {
                return '';
            }

            // Get the check number
            var originalCheck = eanCode.substring(eanCode.length - 1);
            eanCode = eanCode.substring(0, eanCode.length - 1);

            // Add even numbers together
            var even = Number(eanCode.charAt(1)) +
                Number(eanCode.charAt(3)) +
                Number(eanCode.charAt(5)) +
                Number(eanCode.charAt(7)) +
                Number(eanCode.charAt(9)) +
                Number(eanCode.charAt(11));
            // Multiply this result by 3
            even *= 3;

            // Add odd numbers together
            var odd = Number(eanCode.charAt(0)) +
                Number(eanCode.charAt(2)) +
                Number(eanCode.charAt(4)) +
                Number(eanCode.charAt(6)) +
                Number(eanCode.charAt(8)) +
                Number(eanCode.charAt(10));

            // Add two totals together
            var total = even + odd;

            // Calculate the checksum
            // Divide total by 10 and store the remainder
            var checksum = total % 10;
            // If result is not 0 then take away 10
            if (checksum !== 0) {
                checksum = 10 - checksum;
            }

            return checksum;
        },
        amzn: function (asin, isbn = "") {
            if (asin) {
                return asin;
            }
            isbn = isbn.toString();
            var n = isbn.length;
            if (n === 10) {
                return isbn;
            } else if (n === 13) {
                let number = isbn.slice(3, -1);
                return number + book.checksum(number);
            } else {
                return '';
            }
        },
        ean: function (isbn) {
            isbn = isbn.toString();
            var n = isbn.length;
            if (n === 13) {
                return isbn;
            } else if (n === 10) {
                let number = '978'+isbn.slice(0, 9);
                return number + book.checksum13(number+'0');
            } else {
                return '';
            }
        }
    };
    return book;
});

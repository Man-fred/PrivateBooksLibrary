define(function (require) {

    var search = {
        initialize: function () {
            $('#scansearch').click(search.scan_search);
        },
        scan: function () {
            console.log('scanning');

            var scanner = cordova.plugins.barcodeScanner;

            scanner.scan(function (result) {
                //alert( JSON.stringify(result) );
                if (!result.cancelled) {
                    $("#bc_text").val(result.text);
                    //document.getElementById("bc_format").innerHTML = "Format " + result.format;
                    search.scan_search(result.format, result.text);
                } else {
                    $("#bc_text").val(result.text);
                    //document.getElementById("bc_format").innerHTML = "Nicht erkannt " + result.format;
                    //show_all('books', 'isbn', result.text);
                    alert(JSON.stringify(result));
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
        },
        isbn9: function (w) {
            if (w.length === 10) {
                w = w.substr(0, 9);
            } else if (w.length === 13) {
                w = w.substr(3, 9);
            }
            return w;
        },
        scan_search: function (type, w) {
            // ean / isbn anpassen
            if (!w) {
                w = $('#bc_text').val();
            }
            if (app.datalist.mySearch(search.isbn9(w)) === 0) {
                search.isbn(6, w);
            } else {
                app.ui.show_page1();
            }
        },
        author_books: function (w) {
            // ean / isbn anpassen
            if (!w) {
                w = $('#as_text').val();
            }
            if (w) {
                if (isNaN(w)) {
                    //if (app.datalist.mySearch(w) === 0) {
                        search.isbn(4, w);
                    //}
                } else {
                    search.isbn(5, w);
                }
            } else {
                w = $('#authors_nr').val();
                if (w) {
                    search.isbn(5, w);
                } else {
                    w = $('#authors_name').val();
                    if (w) {
                        search.isbn(4, w);
                    }
                }
            }
        },
        author_search: function (w) {
            // ean / isbn anpassen
            if (!w) {
                w = $('#as_text').val();
            }
            if (w) {
                if (isNaN(w)) {
                    search.isbn(3,w);
                } else {
                    search.isbn(2, w);
                }
            } else {
                w = $('#authors_nr').val();
                if (w) {
                    search.isbn(2, w);
                } else {
                    w = $('#authors_name').val();
                    if (w) {
                        search.isbn(3, w);
                    }
                }
            }
        },
        isbn: function (index, w) {
            var ok = false;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Typical action to be performed when the document is ready:
                    //document.getElementById("result").innerHTML = xhttp.responseText;
                    var erg = JSON.parse(xhttp.responseText);

                    console.log(erg);
                    //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    if (erg) { 
                        if (erg.count === 1) {
                            if (erg.Items[0].name)
                                $("#books_name").val(erg.Items[0].name);
                            if (erg.Items[0].publisher)
                                $("#books_publisher").val(erg.Items[0].publisher);
                            if (erg.Items[0].releasedate)
                                $("#books_releasedate").val(erg.Items[0].releasedate);
                            if (erg.Items[0].author)
                                $("#books_author").val(erg.Items[0].author);
                            if (erg.Items[0].author_id)
                                $("#books_author_id").val(erg.Items[0].author_id);
                            if (erg.Items[0].isbn)
                                $("#books_isbn").val(erg.Items[0].isbn);
                            if (erg.Items[0].price)
                                $("#books_price").val(erg.Items[0].price);
                            if (erg.Items[0].thumbnail) {
                                $("#books_thumbnail").val(erg.Items[0].thumbnail);
                                $('#img_books').attr("src", erg.Items[0].thumbnail);
                            }
                            if (erg.Items[0].smallThumbnail)
                                $("#books_smallThumbnail").val(erg.Items[0].smallThumbnail);
                            if (erg.Items[0].url)
                                $("#books_url").val(erg.Items[0].url);
                            if (erg.Items[0].url)
                                $("#books_link").attr("href", erg.Items[0].url);
                            //$("#img_books").attr("src", erg.Items[0].thumbnail);
                            if (erg.Items[0].image) {
                                $('#img_books').attr("src", 'data:image/jpeg;base64, ' + erg.Items[0].image);
                                app.image = erg.Items[0].image;
                            }
                            //$('#book-favor').replaceWith('<div id="book-favor" onclick="pbl.book.set_favor(this, \'' + doc['_id'] + '\')">' + data.pbl.book.favor(doc['favor']) + '</div>');
                            var checkdate = new Date().toISOString();//toLocaleDateString();
                            $("#books_checkdate").val(checkdate);
                            var state = app.myApp.books.fields.state;
                            app.data.select(state.select, app.seite, state.name, state.field, state.visible, '9');
                            $("#books_source").val(index);
                            ok = true;
                            app.ui.show_page2('books');
                        } else if (erg.count > 1) {
                            // Liste zeigen
                            app.pouch.appResult['search_books'] = [];
                            app.pouch.appResult['search_books'].rows = [];
                            app.pouch.appResult['search_books'].tr = true;
                            for (var i = 0; i < erg.count; i++) {
                                app.pouch.appResult['search_books'].rows[i] = [];
                                app.pouch.appResult['search_books'].rows[i].doc = erg.Items[i];
                                
                                var j = (erg.Items[i]['isbn'] ? app.pouch.appResult['books'].isbn[app.search.isbn9(erg.Items[i]['isbn'])] : 0);
                                //if (erg.Items[i]['isbn'] && appResult[seite].isbn[erg.Items[i]['isbn']]) {
                                if (j > 0) {
                                    app.pouch.appResult['search_books'].rows[i].doc['favor'] = app.pouch.appResult['books'].rows[j].doc['favor'];
                                    app.pouch.appResult['search_books'].rows[i].doc['ent'] = app.pouch.appResult['books'].rows[j].doc['ent'];
                                    app.pouch.appResult['search_books'].rows[i].doc['opt'] = app.pouch.appResult['books'].rows[j].doc['opt'];
                                    app.pouch.appResult['search_books'].rows[i].doc['state'] = app.pouch.appResult['books'].rows[j].doc['state'];
                                    app.pouch.appResult['search_books'].rows[i].doc['memo'] = app.pouch.appResult['books'].rows[j].doc['memo'];
                                    app.pouch.appResult['search_books'].rows[i].doc['_id'] = app.pouch.appResult['books'].rows[j].doc['_id'];
                                } else {
                                    app.pouch.appResult['search_books'].rows[i].doc['favor'] = '0';
                                    app.pouch.appResult['search_books'].rows[i].doc['ent'] = '1';
                                    app.pouch.appResult['search_books'].rows[i].doc['opt'] = '1';
                                    app.pouch.appResult['search_books'].rows[i].doc['state'] = '9';
                                    app.pouch.appResult['search_books'].rows[i].doc['_id'] = 'search_books_' + i;
                                }
                                app.pouch.appResult['search_books'].rows[i].tr0 = app.datalist.one_book(erg.Items[i], 0);
                                app.pouch.appResult['search_books'].rows[i].tr1 = app.datalist.one_book(erg.Items[i], 1);
                            }
                            app.ui.show_page1('books');
                            app.seite = 'search_books';
                            app.datalist.show_all('search_books');
                        } else {
                            // kein Treffer
                        }
                    }
                }
            };
            var searchString;
            if (index === 6) searchString = "https://pbl.bcss.de/api/request.php?isbn=" + encodeURI(w);
            if (index === 5) searchString = "https://pbl.bcss.de/api/request.php?auRef=" + encodeURI(w);
            if (index === 4) searchString = "https://pbl.bcss.de/api/request.php?per=" + encodeURI(w);
            if (index === 3) searchString = "https://pbl.bcss.de/api/request.php?gndper=" + encodeURI(w);
            if (index === 2) searchString = "https://pbl.bcss.de/api/request.php?gndidn=" + encodeURI(w);
            console.log(searchString);
            xhttp.open("GET", searchString, true);
            xhttp.send();
        }
    };
    return search;
});
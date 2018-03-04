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
                    document.getElementById("bc_format").innerHTML = "Format " + result.format;
                    search.scan_search(result.format, result.text);
                } else {
                    $("#bc_text").val(result.text);
                    document.getElementById("bc_format").innerHTML = "Nicht erkannt " + result.format;
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

        scan_search: function (type, w) {
            // ean / isbn anpassen
            if (!w) {
                w = $('#bc_text').val()
            }
            if (w.length === 13) {
                w = w.substr(3, 9);
            }
            if (app.datalist.mySearch(w) === 0) {
                search.isbn(6);
            }
        },
        isbn: function (index) {
            var ok = false;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // Typical action to be performed when the document is ready:
                    //document.getElementById("result").innerHTML = xhttp.responseText;
                    var erg = JSON.parse(xhttp.responseText);

                    console.log(erg);
                    //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    if (erg && erg.count === 1) {
                        $("#books_name").val(erg.Items[0].name);
                        $("#books_publisher").val(erg.Items[0].publisher);
                        $("#books_releasedate").val(erg.Items[0].releasedate);
                        $("#books_author").val(erg.Items[0].author);
                        $("#books_isbn").val(erg.Items[0].isbn);
                        $("#books_price").val(erg.Items[0].price);
                        $("#books_thumbnail").val(erg.Items[0].thumbnail);
                        $("#books_smallThumbnail").val(erg.Items[0].smallThumbnail);
                        $("#books_url").val(erg.Items[0].url);
                        $("#books_link").attr("href", erg.Items[0].url);
                        //$("#img_books").attr("src", erg.Items[0].thumbnail);
                        $('#img_books').attr("src", 'data:image/jpeg;base64, ' + erg.Items[0].image);
                        app.image = erg.Items[0].image;
                        //$('#book-favor').replaceWith('<div id="book-favor" onclick="pbl.book.set_favor(this, \'' + doc['_id'] + '\')">' + data.pbl.book.favor(doc['favor']) + '</div>');
                        var checkdate = new Date().toISOString();//toLocaleDateString();
                        $("#books_checkdate").val(checkdate);
                        var state = app.myApp.books.fields.state;
                        app.data.select(state.select, app.seite, state.name, state.field, state.visible, '9');
                        $("#books_source").val(index);
                        ok = true;
                        app.ui.show_page2('books');
                    }
                }
            };
            var searchString = "https://pbl.bcss.de/api/request.php?isbn=" + $('#bc_text').val();
            console.log(searchString);
            xhttp.open("GET", searchString, true);
            xhttp.send();
        }
    };
    return search;
});
define(function (require) {

    var datalist = {
        dbReady: 2,
        appSort: 'name',
        appSortUp: false,
        initialize: function (pbl) {
            datalist.pbl = pbl;
        },
        fill: function (aktiveSeite, refresh = false) {
            this.dbReady--;
            if (this.dbReady <= 0) {
                console.log(datalist.pbl.seite);
                if (aktiveSeite !== datalist.pbl.seite) {
                    if (aktiveSeite !== "") {
                        $('#t_' + datalist.pbl.seite).hide();
                        datalist.pbl.seite = aktiveSeite;
                        //$('#t_' + seite).show();
                    }
                    datalist.pbl.ui.show_page1(0);
                    this.show_all(aktiveSeite);
                } else if (refresh) {
                    datalist.pbl.ui.show_page1(0);
                    this.show_all(aktiveSeite);
                }
            }
        },
        show_all_header: function (s) {
            var table = '<table>';
            $.each(app.myApp[app.seite].header, function () {
                table += '<tr>';
                table += '<th>' + this.title + '</th><td>';
                if (s) {
                    table += app.myApp[this.select]["data"][s[this.name]];
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
                table += '<th id="disabled"></th>';
            }
            $.each(app.myApp[app.seite].fields, function () {
                if (!this.noList) {
                    table += '<th>' + this.title + '</th>';
                }
            });
            table += '</thead><tbody>';
            return table;
        },
        sort_books: function (a, b) {
            var up = (datalist.appSortUp ? 1 : -1);
            switch (datalist.appSort) {
                case 'id': return (a._id > b._id ? up : (a._id < b._id ? -1 : 0));
                case 'name': return (a.doc.name > b.doc.name ? up : (a.doc.name < b.doc.name ? -up : 0));
                case 'date': return (a.doc.releasedate > b.doc.releasedate ? up : (a.doc.releasedate < b.doc.releasedate ? -up : 0));
                case 'author': return (a.doc.author > b.doc.author ? up : (a.doc.author < b.doc.author ? -up : 0));
            }
        },

        show_all_docs_sorted: function () {
            var seite = datalist.pbl.seite;
            var myApp = datalist.pbl.myApp;
            var appResult = datalist.pbl.pouch.appResult;

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
                    table = '<div id="datalistScroll">' + datalist.show_all_header(null);
                } else {
                    table = '<div id="datalistScroll">' + datalist.show_all_header(appResult[seite].rows[0].doc);
                }
            } else {
                table = '<div id="datalistScroll"><table id ="myTableList"><tbody>';
            }

            if (!appResult[seite].tr) {
                for (var i = 0; i < appResult[seite].rows.length; i++) {
                    //var s = this.doc;
                    //console.log(s);
                    if (myApp[seite].tr === 'books') {
                        /*
                        if (appResult[seite].rows[i].doc['source'] !== '11') {
                            appResult[seite].rows[i].doc['releasedate'] = (new Date(parseInt(appResult[seite].rows[i].doc['releasedate']) + (24 * 60 * 60 * 1000))).toISOString();
                            appResult[seite].rows[i].doc['source'] = '11';
                            app.pouch.db.put(appResult[seite].rows[i].doc).then(function () {
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                        */
                        if (appResult[seite].rows[i].doc['source'] === '11') {
                            try {
                                if (parseInt(appResult[seite].rows[i].doc['checkdate']) > 0) {
                                    appResult[seite].rows[i].doc['checkedate'] = (new Date(parseInt(appResult[seite].rows[i].doc['checkdate']) + (24 * 60 * 60 * 1000))).toISOString();
                                }
                                appResult[seite].rows[i].doc['source'] = '12';
                                app.pouch.db.put(appResult[seite].rows[i].doc).then(function () {
                                }).catch(function (err) {
                                    console.log(err);
                                });
                            } catch (err) { console.log(err); }
                        } 
                        appResult[seite].rows[i].tr0 = '<tr><td onclick="app.data.show(\'' + appResult[seite].rows[i].doc['_id'] + '\')" ><div class="relative">';
                        //tablerow += '<div class="books-img-tr" ';
                        tablerow = '<div id="' + appResult[seite].rows[i].doc['_id'] + '"><div  class="books-img"><img class="books-image" data-src="' + appResult[seite].rows[i].doc['_id'] + '" src="data: image/png; base64, R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="/></div>';
                        //tablerow += '</td><td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >';
                        tablerow += '<div class="books-title">' + appResult[seite].rows[i].doc['name'] + '</div>';
                        tablerow += '<div class="books-favor" >' + datalist.pbl.book.favor(appResult[seite].rows[i].doc['favor']) + '</div>'; //onclick="set_book_favor(this, \'' + appResult[seite].rows[i].doc['_id'] + '\')"
                        tablerow += '<div class="books-author">' + appResult[seite].rows[i].doc['author'] + '</div>';
                        if (appResult[seite].rows[i].doc['releasedate'] > '1800')
                            tablerow += '<div class="books-date">' + appResult[seite].rows[i].doc['releasedate'].substr(0, 10) + '</div>'; //
                        else
                            tablerow += '<div class="books-date">&nbsp;</div>';
                        tablerow += '<div class="books-state">' + appResult[seite].rows[i].doc['ent'] + '&nbsp;' + appResult[seite].rows[i].doc['opt'] + '&nbsp;' + datalist.pbl.book.state(appResult[seite].rows[i].doc['state']) + '</div>';
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
                                    tablerow += '<td onclick="app.data.show(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + myApp[this.select]["data"][appResult[seite].rows[i].doc[this.name]] + '</td>';
                                } else if (this.func) {
                                    tablerow += '<td onclick="app.data.show(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + appResult[seite].rows[i].doc[this.name] + '</td>';
                                    //	tablerow += '<td onclick="show_data(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + myApp[this.func](appResult[seite].rows[i].doc[this.name]) + '</td>';
                                } else if (this.type === "checkbox") {
                                    tablerow += '<td onclick="app.data.show(\'' + appResult[seite].rows[i].doc['_id'] + '\')" ><input type="' + this.type + '"' + (appResult[seite].rows[i].doc[this.name] ? 'checked' : '') + ' disabled></td>';
                                } else {
                                    tablerow += '<td onclick="app.data.show(\'' + appResult[seite].rows[i].doc['_id'] + '\')" >' + appResult[seite].rows[i].doc[this.name] + '</td>';
                                }
                            }
                        });
                    }
                    tablerow += '</tr>';
                    appResult[seite].rows[i].tr1 = tablerow;
                }
                appResult[seite].tr = true;
            }
            console.log('show_all sort ' + seite + ' ' + appResult[seite].rows.length);
            if (seite === "books") {
                appResult[seite].rows.sort(datalist.sort_books);
            }
            for (var i = 0; i < appResult[seite].rows.length; i++) {
                //15.04.2008 -> 14.4.1977 -> 978393600
                //27:10:2011 -> 25:10:1980
                //releasedate = new Date(parseInt(s['releasedate']));
                tablerow = "";
                if (seite === "books") {
                    if (datalist.appSort === 'name') {
                        title = appResult[seite].rows[i].doc['name'].substr(0, 1);
                        if (mySortPos !== title) {
                            mySortPos = title;
                            tablerow = '<div id="myTableSort' + mySortPos + '" class="myTableAnchor"></div>';
                            mySearchlist += '<div class="searchlist"><a class="searchlink" href="#myTableSort' + mySortPos + '">' + mySortPos + '</a></div>';
                        }
                    } else if (datalist.appSort === 'date') {
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

            function images() {
                var ps = [].slice.call(document.getElementById('datalist').getElementsByClassName('books-image'));
                ps.forEach(function (p, i) {
                    var id = p.getAttribute('data-src');
                    if (id) {
                        if (appResult[seite].img[id]) {
                            p.setAttribute('src', appResult[seite].img[id]);
                        } else {
                            datalist.pbl.pouch.db.get(id, { attachments: true }).then(function (doc) {
                                p.setAttribute('src', datalist.pbl.book.image(doc));
                            });
                        }
                    }
                });
            }
            if (!appResult[seite].img) {
                appResult[seite].img = [];
            }
            images();
        },

        show_all_docs: function (singleIsbn) {
            var seite = datalist.pbl.seite;
            console.log('show_all result ' + seite + ' ' + datalist.pbl.pouch.appResult[seite].rows.length);
            //console.log(result.rows);
            if (datalist.pbl.pouch.appResult[seite].rows.length > 1 | seite !== 'books' | (datalist.pbl.pouch.appResult[seite].rows.length === 0 && !singleIsbn)) {
                datalist.show_all_docs_sorted();
            } else if (datalist.pbl.pouch.appResult[seite].rows.length === 1) {
                datalist.pbl.data.show_data(datalist.pbl.pouch.appResult[seite].rows[0]._id);
            } else {
                datalist.pbl.ui.show_page2('books');
            }
            console.log('show_all end ' + seite + ' ' + datalist.pbl.pouch.appResult[seite].rows.length);
            datalist.pbl.ui.loading.style.display = "none";

        },

        show_all: function (seite, mySort = 'name', singleIsbn = "") {
            if (seite === 'books' && singleIsbn === "") {
                if (datalist.appSort === mySort) {
                    datalist.appSortUp = !datalist.appSortUp;
                } else {
                    datalist.appSort = mySort;
                }
                $("#sort_name").toggleClass("fa-sort-up", datalist.appSortUp && datalist.appSort === "name");
                $("#sort_name").toggleClass("fa-sort-down", !datalist.appSortUp && datalist.appSort === "name");
                $("#sort_name").toggleClass("fa-sort", datalist.appSort !== "name");
                $("#sort_id").toggleClass("fa-sort-up", datalist.appSortUp && datalist.appSort === "id");
                $("#sort_id").toggleClass("fa-sort-down", !datalist.appSortUp && datalist.appSort === "id");
                $("#sort_id").toggleClass("fa-sort", datalist.appSort !== "id");
                $("#sort_date").toggleClass("fa-sort-up", datalist.appSortUp && datalist.appSort === "date");
                $("#sort_date").toggleClass("fa-sort-down", !datalist.appSortUp && datalist.appSort === "date");
                $("#sort_date").toggleClass("fa-sort", datalist.appSort !== "date");
                $("#sort_author").toggleClass("fa-sort-up", datalist.appSortUp && datalist.appSort === "author");
                $("#sort_author").toggleClass("fa-sort-down", !datalist.appSortUp && datalist.appSort === "author");
                $("#sort_author").toggleClass("fa-sort", datalist.appSort !== "author");
            }
            //    db.allDocs({
            //        include_docs: true
            //        , descending: true
            //        , startkey: dbIdPublic + '_' + table + '3'//+ table 
            //        , endkey: dbIdPublic + '_' + table  //+ table
            //    PouchDB.debug.enable('pouchdb:find');
            console.log('show_all ' + seite);
            datalist.pbl.ui.loading.style.display = "block";

            datalist.pbl.pouch.getAll(seite, singleIsbn, datalist.show_all_docs);
            /*if (singleIsbn) {
                 loading.style.display = "none";
                 //filter = [];//singleIsbn;//input.value.toUpperCase();
                 var table = document.getElementById("myTableList");
                 tr = table.getElementsByTagName("tr");
                 var count = 0;
                 // Loop through all table rows, and hide those who don't match the search query
                 for (i = 0; i < appResult[seite].rows.length; i++) {
                     if (appResult[seite].rows[i].isbn === singleIsbn) {
                         // filter[] = i;
                     }
                 }
             } else {
                 datalist.pbl.pouch.getAll(seite, singleIsbn, datalist.show_all_docs);
             }*/
        },
        mySearchClear: function () {
            $(this).prev('input').val('').trigger('change').focus();
        },
        mySearch: function (test = '') {
            // Declare variables
            var input, filter, table, tr, td, i, count = 0;
            if (test == "~~") {
                $('#appSearch').val('').trigger('change').focus();
                filter = "";
            } else if (test) {
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
    };
    return datalist;
});

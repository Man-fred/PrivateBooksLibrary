define(function (require) {

    var data = {
        book: require('./book'),
        pbl: require('./pbl'),
        init: true,
        initialize: function (myApp) {
            if (this.init) {
                this.init = false;
                data.myApp = myApp;
                // Code for Clear text Box
                $('#clearBtn').click(this.clear);
                $("#addBtn").click(this.add);
                $("#updateBtn").click(this.update);
                $("#deleteBtn").click(this.delete);
                $.each(myApp, function () {
                    //debugger;
                    data.form(myApp, this.name);
                });
            }
        },
        form: function (myApp, aktiveSeite) {
            //$('#'+aktiveSeite).show();
            var result = '<div id="t_' + aktiveSeite + '" name="t_' + aktiveSeite + '" class="t_seite">';
            var input;
            //if (aktiveSeite !== "login") {
            //    result += '<div class="left"><button onclick="app.ui.show_page1(1); return false;" class="appReturn app-button"></button></div>';
            //}
            //result += '<div class="pure-control-group"><label for="email">Email Address</label><input id="email" type="email" placeholder="Email Address"></div>';
            /*
            */
            if (aktiveSeite === "books") {
                result += '<div id="bc" class="pure-control-group">';
                result += '<button type="button" id="appScan" class="app-button" onclick="app.search.scan()" title="Barcode scannen"></button> &nbsp;';
                result += '<div id="bc_search" class="deleteicon">';
                result += '<input id="bc_text" placeholder="ISBN, Titel oder Autor ..."/>'; //(<span id="bc_format"></span>)
                result += '<span onclick="app.data.mySearch(\'~~\')"></span></div><button onclick="app.search.scan_search()" href="#" name="scansearch" id="scansearch" class="app-button"></button>';
                //result += '<button onclick="app.search.picture()" href="#" id="books-pic" class="app-button">F</button> 
                result += '</div >';
                //result += '<p><span id="result"></span></p>';
                result += '<div id="book-image"><img  class="pure-img" id="img_' + aktiveSeite + '" height="200" src="blank.jpg"/></div>';
                result += '<div id="book-favor">' + data.book.favor("0") + '</div><div class="clear"></div>';
            } else if (aktiveSeite === "authors") {
                result += '<div id="as" class="pure-control-group">';
                result += '<div id="as_search" class="deleteicon">';
                result += '<input id="as_text" placeholder="Autor ..."/>'; 
                result += '<span onclick="app.data.mySearch(\'~~\')"></span></div>';
                result += '</div><div class="clear"></div>';
            }
            $.each(myApp[aktiveSeite].header, function () {
                if (!this.noField) {
                    input = this.input ? ' ' + this.input : '';
                    result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">' + this.title + '</label>';
                    if (this.select) {
                        result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '"></select>';
                    } else if (this.selectYN) {
                        result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '">';
                        if (this.selectYN[2])
                            result += '<option></option>';
                        result += '<option value="0" >' + this.selectYN[0] + '</option><option value="1" >' + this.selectYN[1] + '</option>' + '</select > ';
                    } else if (this.type) {
                        result += '<input'+input+' type="' + this.type + '" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
                    } else {
                        result += '<input' + input +' type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
                    }
                    result += '</div>';
                } else {
                    result += '<div class="hidden"><input id="' + aktiveSeite + '_' + this.name + '" /></div>';
                }
            });
            if (myApp[aktiveSeite].header) {
                result += '<hr />';
            }
            $.each(myApp[aktiveSeite].fields, function () {
                if (!this.noField) {
                    result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">' + this.title + '</label>';
                    if (this.select) {
                        result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '"></select>';
                    } else if (this.selectYN) {
                        result += '<select type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" class="' + aktiveSeite + '">';
                        if (this.selectYN[2])
                            result += '<option></option>';
                        result += '<option value="0" >' + this.selectYN[0] + '</option><option value="1" >' + this.selectYN[1] + '</option>' + '</select > ';
                    } else if (this.type) {
                        result += '<input type="' + this.type + '" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
                    } else {
                        result += '<input type="text" name="' + aktiveSeite + '_' + this.name + '" id="' + aktiveSeite + '_' + this.name + '" />';
                    }
                    result += '</div>';
                } else {
                    result += '<div class="hidden"><input id="' + aktiveSeite + '_' + this.name + '" /></div>';
                }
            });
            
            result += '</div>';
            $('#formdata').append(result);
            /*if (aktiveSeite == "login"){
                document.getElementById("login_name").addEventListener("change", this.change_login_name);
            }*/
        },
        show: function (id = '', neueSeite = this.pbl.seite) {
            if (id === "") {
                this.pbl.ui.show_page2(neueSeite, id);
                this.clear();
                $('#addBtn').prop("disabled", !this.myApp[this.pbl.seite].btn.add);
                $('#updateBtn').prop("disabled", true);
                $('#deleteBtn').prop("disabled", true);
                $('#clearBtn').prop("disabled", !this.myApp[this.pbl.seite].btn.add);
            } else if (id === "contact") {
                this.pbl.ui.show_pageContact(id);
                /*this.pbl.pouch.db.get(id).then(function (doc) {
                    $('#pageContact').html(doc.html);
                });*/
            } else if (id.startsWith("search_books_")) {
                this.pbl.ui.show_page2('books', id);
                var doc = app.pouch.appResult.search_books.rows[app.pouch.appResult.search_books.id[id]].doc;
                app.book.show(doc, 'books');
                $('#addBtn').prop("disabled", !doc._id.startsWith("search_"));
                $('#updateBtn').prop("disabled", doc._id.startsWith("search_"));
                $('#deleteBtn').prop("disabled", true);
                $('#clearBtn').prop("disabled", true);
            } else {
                this.pbl.ui.show_page2(neueSeite, id);
                //this.pbl.pouch.db.get(id, { attachments: true }).then(function (doc) {
                this.pbl.pouch.db.get(id).then(function (doc) {
                    // handle doc
                    if (doc) {
                        app.book.show(doc);
                        $('#DBTimestamp').html(doc.DBTimestamp);
                        $('#DBstate').html(doc.DBstate);
                        $('#DBversion').html(doc.DBversion);
                        $('#DBok').html(doc.DBok);
                        $('#DBdeleted').html(doc.DBdeleted);
                        $('#DBreason').html(doc.DBreason);
                        //$('#txtSearch').html(r._id);
                        $('#_id').html(doc._id);
                        $('#_rev').html(doc._rev);
                        $('#addBtn').prop("disabled", true);
                        $('#updateBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.update);
                        $('#deleteBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
                        $('#clearBtn').prop("disabled", true);
                    } else {
                        pbl.ClearTextBox();
                        $('#addBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
                        $('#updateBtn').prop("disabled", true);
                        $('#deleteBtn').prop("disabled", true);
                        $('#clearBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
                        alert('Record Does not exist');
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }
        },
        clear: function () {
            $('#img_books').attr("src", "");
            $.each(app.myApp[app.seite].fields, function () {
                if (this.select) {
                    data.select(this.select, app.seite, this.name, this.field, this.visible, '');
                } else if (this.selectYN) {
                    $('#' + app.seite + '_' + this.name + 'option[value="' + (this.selectYN[2]?'':'0')+'"]').attr('selected', 'selected');
                } else if (this.type === "checkbox") {
                    $('#' + app.seite + '_' + this.name).prop("checked", false);
                } else {
                    $('#' + app.seite + '_' + this.name).val('');
                }
            });
            $('#txtSearch').val('');
            $('#DBTimestamp').html('');
            $('#DBServertime').html('');
            $('#DBstate').html('');
            $('#DBok').html('');
            $('#DBdeleted').html('');
            $('#_id').html('');
            $('#_rev').html('');
            $('#DBversion').html('');
        },
        mySearch: function (test = '') {
            if (test === "~~") {
                $('#bc_text').val('').trigger('change').focus();
            }
        },
        select: function (table, id, name, field, visible, selected = null) {
            if (app.myApp[table].data && app.myApp[table].dataIsConst) {
                $("#" + id + '_' + name).empty();
                $("#" + id + '_' + name).append($('<option></option>'));
                $.each(app.myApp[table].data, function (k, v) {
                    $("#" + id + '_' + name).append('<option ' + (parseInt(selected) === k ? 'selected="selected"' : '') + ' value="' + k + '">' + v + '</option>');
                });
            } else {
                app.pouch.db.allDocs({
                    startkey: app.pouch.dbIdPublic + '_' + table
                    , endkey: app.pouch.dbIdPublic + '_' + table + 'a'
                    , include_docs: true
                    //,attachments: true
                }).then(function (result) {
                    $("#" + id + '_' + name).empty();
                    app.myApp[table].data = [];
                    $("#" + id + '_' + name).append($('<option></option>'));
                    $.each(result.rows, function () {
                        $("#" + id + '_' + name).append('<option ' + (selected === this.doc[field] ? 'selected="selected"' : '') + ' value="' + this.doc[field] + '">' + this.doc[visible] + '</option>');
                        app.myApp[table].data[this.doc[field]] = this.doc[visible];
                    });
                }).catch(function (err) {
                    console.log(err);
                });
            }
        },
        // Code for Add New Record in IndexedDB
        add: function () {
            //debugger;
            var myObj = {};
            $.each(app.myApp[app.seite].header, function () {
                if (this.type === "checkbox")
                    myObj[this.name] = $('#' + app.seite + '_' + this.name).prop("checked");
                else
                    myObj[this.name] = $('#' + app.seite + '_' + this.name).val();
            });
            $.each(app.myApp[app.seite].fields, function () {
                if (this.type === "checkbox")
                    myObj[this.name] = $('#' + app.seite + '_' + this.name).prop("checked");
                else
                    myObj[this.name] = $('#' + app.seite + '_' + this.name).val();
            });
            if (app.seite === "books" & $('#img_books').attr("src") !== "") {
                var img = $('#img_books').attr("src");
                if (img.startsWith('data:image/jpeg;base64, ')) {
                    img.substr(24);
                    img = atob(img.substr(24));
                    console.log(img.length);
                    myObj._attachments = {
                        'thumbnail': {
                            content_type: 'image/png',
                            data: app.image
                        }
                    };
                }
            }
            app.pouch.setSync(myObj, 'add');
            if (app.seite === "books" & myObj.author) {
                var myObjA = {};
                myObjA.name = myObj.author;
                myObjA.nr = myObj.author_id;
                app.pouch.setSync(myObjA, 'add', 'authors');
                app.pouch.db.put(myObjA);
            }
            //var myDoc = array2json(myObj);
            //console.log(myObj);
            app.pouch.db.put(myObj).then(function (doc) {
                //console.log(doc);
                console.info("ok: "+doc.name);
                data.clear();
                //show_all(seite);
            }).catch(function (err) {
                console.log(err);
                console.info(err);
            });

        },
        // Code for Update record on IndexedDB
        update: function () {
            var dbIdOld;
            var _id = $('#_id').html();
            app.pouch.db.get(_id).then(function (doc) {
                //console.log(doc);
                // handle doc
                if (doc) {
                    if (app.seite === "login") {
                        dbIdOld = doc['dbId'];
                    }
                    $.each(app.myApp[app.seite].header, function () {
                        if (this.type === "checkbox")
                            doc[this.name] = $('#' + app.seite + '_' + this.name).prop("checked");
                        else
                            doc[this.name] = $('#' + app.seite + '_' + this.name).val();
                    });
                    $.each(app.myApp[app.seite].fields, function () {
                        if (this.type === "checkbox")
                            doc[this.name] = $('#' + app.seite + '_' + this.name).prop("checked");
                        else
                            doc[this.name] = $('#' + app.seite + '_' + this.name).val();
                    });
                    app.pouch.setSync(doc, 'upd');
                    if (app.seite === "login") {
                        if (doc['dbId'] === '') {
                            doc['dbId'] = '0';
                        }
                        app.pouch.set(doc);
                        app.pouch.remoteLogin();
                        //app.appTitle = doc.appTitle;
                        //$('#appTitle').html(doc.appTitle);
                        //$('#m_horse').val(myApp.main.title);
                    }
                    if (app.seite === "books") {
                        var myObj = {};
                        myObj.name = doc.author;
                        app.pouch.setSync(myObj, 'add', 'authors');
                        app.pouch.db.put(myObj);
                    }
                    app.pouch.db.put(doc).then(function (doc2) {
                        if (app.seite === "login") {
                            if (dbIdOld !== doc['dbId']) {
                                // eventuell unnötig, wenn init fehlt ist es aber schlimmer
                                app.pouch.initPutConstants(doc['dbId']);
                            }
                        }
                        //console.log(doc2);

                        var i = app.pouch.appResult[app.seite].id[doc._id];
                        app.pouch.appResult[app.seite].rows[i].doc = doc;
                        if (app.seite === 'books') {
                            app.pouch.appResult[app.seite].rows[i].tr1 = app.datalist.one_book(doc, 1);
                            document.getElementById(doc._id).innerHTML = app.datalist.one_book_div(doc);
                        } else {
                            app.pouch.appResult[app.seite].rows[i].tr1 = app.datalist.one_row(doc, 1);
                            document.getElementById(doc._id).innerHTML = app.pouch.appResult[app.seite].rows[i].tr1;
                        }
                        $('#result').html('Record No. ' + _id + ' Updated Successfully');
                        //show_all(seite);
                    }).catch(function (err) {
                        $('#result').html('Record No. ' + _id + ' Update failed');
                    });
                }
            });
        },
        //Code for Deleting record from indexedDB
        delete: function () {
            var _id = $('#_id').html();
            app.pouch.db.get(_id).then(function (doc) {
                // handle doc
                if (doc) {
                    app.pouch.setSync(doc, 'del');
                    //doc._deleted = true;
                    app.pouch.db.put(doc).then(function (doc2) {
                        // handle doc
                        if (doc2) {
                            $('#result').html('Record No. ' + doc._id + ' Deleted Successfully');
                            app.ui.datalist(app.seite, true);
                        }
                    }).catch(function (err) {
                        $('#result').html('Record No. ' + _id + ' Delete failed');
                        console.log(err);
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        change_login_name: function () {
            //if (this.value == "1") {
                document.getElementById("login_dbServer").style.display = "";
                document.getElementById("login_dbPort").style.display = "";
                document.getElementById("login_dbUser").style.display = "";
                document.getElementById("login_dbPass").style.display = "";
            /*} else {
                document.getElementById("login_dbServer").style.display = "none";
                document.getElementById("login_dbPort").style.display = "none";
                document.getElementById("login_dbUser").style.display = "none";
                document.getElementById("login_dbPass").style.display = "none";
            }*/
        }
    };
    return data;
});
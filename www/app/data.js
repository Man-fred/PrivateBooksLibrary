define(function (require) {

    var data = {
        book: require('./book'),
        pbl: require('./pbl'),
        initialize: function (myApp) {
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
        },
        form: function (myApp, aktiveSeite) {
            //$('#'+aktiveSeite).show();
            var result = '<div id="t_' + aktiveSeite + '" name="t_' + aktiveSeite + '" class="t_seite">';
            //result += '<div class="pure-control-group"><label for="email">Email Address</label><input id="email" type="email" placeholder="Email Address"></div>';
            //result += '<table>';
            if (aktiveSeite === "books") {
                result += '<p>erkannter Barcode <input id="bc_text"/> (<span id="bc_format"></span>) Beispiel: 9783802587849</p>';
                result += '<p><a href="#" name="scansearch" id="scansearch">Suchen</a><br /><span id="result"></span></p>';
                result += '<p><span id="result"></span></p>';
                result += '<div id="book-image"><img  class="pure-img" id="img_' + aktiveSeite + '" height="200" src="blank.jpg"/></div>';
                result += '<div id="book-favor">' + data.book.favor("0") + '</div><div class="clear"></div>';

            }
            $.each(myApp[aktiveSeite].header, function () {
                result += '<div class="pure-control-group"><label for="' + aktiveSeite + '_' + this.name + '">' + this.title + '</label>';
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
            if (aktiveSeite === "login") {
                result += '<p>Font Awesome by Dave Gandy - <a href="https://fontawesome.com/">https://fontawesome.com/</a></p>';
            }
            $('#formdata').append(result);

        },
        show: function (id, neueSeite = this.pbl.seite) {
            this.pbl.ui.show_page2(neueSeite);

            if (id === "") {
                this.clear();
                $('#addBtn').prop("disabled", !this.myApp[this.pbl.seite].btn.add);
                $('#updateBtn').prop("disabled", true);
                $('#deleteBtn').prop("disabled", true);
                $('#clearBtn').prop("disabled", !this.myApp[this.pbl.seite].btn.add);
            } else {
                this.pbl.pouch.db.get(id, { attachments: true }).then(function (doc) {
                    // handle doc
                    if (doc) {
                        if (data.pbl.seite === "books") {
                            $('#img_books').attr("src", data.pbl.book.image(doc));
                            $('#book-favor').replaceWith('<div id="book-favor" onclick="pbl.book.set_favor(this, \'' + doc['_id'] + '\')">' + data.pbl.book.favor(doc['favor']) + '</div>');
                            //doc['checkdate'] = new Date(parseInt(doc['checkdate'])).toISOString();//toLocaleDateString();

                        }
                        $.each(app.myApp[app.seite].header, function () {
                            $('#' + seite + '_' + this.name).val(doc[this.name]);
                        });
                        $.each(app.myApp[app.seite].fields, function () {
                            if (!this.noField) {
                                if (this.select) {
                                    data.select(this.select, app.seite, this.name, this.field, this.visible, doc[this.name]);
                                } else if (this.type === "checkbox")
                                    $('#' + app.seite + '_' + this.name).prop("checked", (doc[this.name] === true));//(doc[this.name]);
                                else
                                    $('#' + app.seite + '_' + this.name).val(doc[this.name]);
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
                        $('#addBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
                        $('#updateBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.update);
                        $('#deleteBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
                        $('#clearBtn').prop("disabled", !app.myApp[data.pbl.seite].btn.add);
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
                if (!this.noField) {
                    if (this.select) {
                        data.select(this.select, app.seite, this.name, this.field, this.visible, '');
                    } else if (this.type === "checkbox")
                        $('#' + app.seite + '_' + this.name).prop("checked", false);//(doc[this.name]);
                    else
                        $('#' + app.seite + '_' + this.name).val('');
                }
            });
            $('#txtSearch').val('');
            $('#DBTimestamp').html('');
            $('#DBServertime').html('');
            $('#DBstate').html('');
            $('#_id').html('');
            $('#_rev').html('');
            $('#DBversion').html('');
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
                // 'data:image/jpeg;base64, '
                img.substr(24);
                img = atob(app.image);
                console.log(img);
                myObj._attachments = {
                    'thumbnail': {
                        content_type: 'image/png',
                        data: app.image
                    }
                };
            }
            app.pouch.setSync(myObj, 'add');
            if (app.seite === "books" & myObj.author !== "") {
                var myObjA = {};
                app.pouch.setSync(myObjA, 'add', 'authors');
                myObjA.name = myObj.author;
                app.pouch.db.put(myObjA);
            }
            //var myDoc = array2json(myObj);
            //console.log(myObj);
            app.pouch.db.put(myObj).then(function (doc) {
                //console.log(doc);

                data.clear();
                //show_all(seite);
            }).catch(function (err) {
                console.log(err);
            });

        },
        // Code for Update record on IndexedDB
        update: function () {

            var _id = $('#_id').html();
            app.pouch.db.get(_id).then(function (doc) {
                console.log(doc);
                // handle doc
                if (doc) {
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
                        app.pouch.set(doc);
                        app.pouch.remoteLogin();
                        app.appTitle = doc.appTitle;
                        $('#appTitle').html(doc.appTitle);
                        //$('#m_horse').val(myApp.main.title);
                    }
                    if (app.seite === "books") {
                        var myObj = {};
                        app.pouch.setSync(myObj, 'add', 'authors');
                        myObj.name = doc.author;
                        app.pouch.db.put(myObj);
                    }
                    app.pouch.db.put(doc).then(function (doc2) {
                        console.log(doc2);

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
                    app.pouch.db.remove(doc).then(function (doc2) {
                        // handle doc
                        if (doc2) {
                            $('#result').html('Record No. ' + doc._id + ' Deleted Successfully');
                            app.datalist.fill(app.seite, true);
                        }
                        ;
                    }).catch(function (err) {
                        $('#result').html('Record No. ' + _id + ' Delete failed');
                        console.log(err);
                        });
                    /*
                    app.pouch.setSync(doc, 'del');
                    doc._deleted = true;
                    app.pouch.db.put(doc).then(function (doc2) {
                        // handle doc
                        if (doc2) {
                            $('#result').html('Record No. ' + doc._id + ' Deleted Successfully');
                            app.datalist.fill(app.seite, true);
                        }
                        ;
                    }).catch(function (err) {
                        $('#result').html('Record No. ' + _id + ' Delete failed');
                        console.log(err);
                    });
                    */
                };
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
    return data;
});
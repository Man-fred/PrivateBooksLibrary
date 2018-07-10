define(function (require) {

    var init = {
        overlay: null,
        page: 1,
        show: function (dir = 0) {
            if (app.showInit < 1) {
                if (dir === 0) {

                    this.overlay = [document.getElementById("overlay"),
                    document.getElementById("overlay1"),
                    document.getElementById("overlay2"),
                    document.getElementById("overlay3")];
                    this.overlay[0].style.display = "flex";
                } else if (dir === -1 && this.page <= 1) {
                    return;
                } else if (dir === 1 && this.page >= this.overlay.length - 1) {
                    //this.hide();
                    return;
                }
                this.page += dir;
                for (var i = 1; i < this.overlay.length; i++) {
                    this.overlay[i].style.display = this.page === i ? "block" : "none";
                }

            }
        },
        showAll: function () {
            app.showInit = 0;
            this.show();
        },
        hide: function () {
            this.overlay[0].style.display = "none";
            //if (document.getElementById("initHide").checked === true) {
            //alert(app.seite);
            app.pouch.db.get(app.pouch.dbIdPrivate + '_login').then(function (doc) {
                if (doc !== null && doc.showInit < 1) {
                    doc.showInit = 1;
                    app.showInit++;
                    app.pouch.db.put(doc);
                }
            }).catch(function (err) {
                console.log('Konnte init nicht deaktivieren');
            });
            //}
        }
    };
    return init;
});
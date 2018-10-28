//https://purecss.io/layouts/side-menu/#
/*
menuLink.onclick = function (e) {
    toggleAll(e);
};
menu.onclick = function (e) {
    toggleAll(e);
};

main3.onclick = function (e) {
    if (menu.className.indexOf('active') !== -1) {
        toggleAll(e);
    }
};
*/
define(function (require) {

    var ui = {
        dropdowns: document.getElementsByClassName("drop-content"),
        infoMessage: document.getElementById('infoMessage'),
        menu: document.getElementById('menu'),
        menuLink: document.getElementById('menuLink'),
        main3: document.getElementById('main3'),
        layout: document.getElementById('layout'),
        loading: document.getElementById("loading"),
        dataformBooks: document.getElementById("dataformBooks"),
        appSearchAnchor: document.getElementById("appSearchAnchor"),
        myDropdown2: document.getElementById("myDropdown2"),
        mRefresh: document.getElementById("mRefresh"),
        appReturn: document.getElementById("appReturn"),
        appPrint: document.getElementById("appPrint"),
        pageLog: document.getElementById("pageLog"),
        page1: document.getElementById("page1"),
        page2: document.getElementById("page2"),
        pageHelper: {},
        pageAbout: document.getElementById("pageAbout"),
        pageAGB: document.getElementById("pageAGB"),
        pageDS: document.getElementById("pageDS"),
        pageContact: document.getElementById("pageContact"),
        page: this.page1,
        verlauf: [],
        scrollY: 0,


        init: true,
        initialize: function (pbl) {
            if (this.init) {
                this.init = false;

                this.menuLink.addEventListener('click', this.togglemenuLink);
                this.menu.addEventListener("click", this.toggleAll);
                this.main3.addEventListener("click", this.toggleMain3);
                this.infoMessage.addEventListener("click", this.messageStop);
                this.pbl = pbl;
                window.addEventListener('click', this.dropdownClose);
                this.mRefresh.addEventListener("click", this.dropdown); 
                document.getElementById("appAdd").addEventListener("click", this.dropdown); 
                // windows + android
                if (cordova.platformId === 'android' | cordova.platformId === 'windows') {
                    var ok = document.addEventListener("backbutton", this.getVerlauf, false);
                    this.appReturn.innerHTML = '';
                } else {
                    this.appReturn.addEventListener("click", this.getVerlauf, false);
                }
                // später für Einbandbilder: window.addEventListener('scroll', this.getScrollBooks);
                //ui.setVerlauf(ui.page1, 'books', '', false);
            }
        },

        /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
        dropdown: function (id) {
            if (this.attributes.state.value !== 'add')
                document.getElementById(this.attributes.state.value).classList.toggle("show");
            if (this.attributes.state.value !== 'myDropdown1' && document.getElementById('myDropdown1').classList.contains('show')) {
                document.getElementById('myDropdown1').classList.remove('show');
            }
            if (this.attributes.state.value !== 'myDropdown2' && document.getElementById('myDropdown2').classList.contains('show')) {
                document.getElementById('myDropdown2').classList.remove('show');
            }
            if (this.attributes.state.value === 'add') {
                app.data.show();
            }
        },

        // Close the dropdown if the user clicks outside of it
        //window.onclick =
        dropdownClose: function (event, immer = false) {
            if (!event.target.matches('.dropbtn') && (immer || !event.target.matches('.dropselect'))) {

                var i;
                for (i = 0; i < ui.dropdowns.length; i++) {
                    var openDropdown = ui.dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        },
        selectFilter: function (event) {
            //onchange = "app.datalist.mySearch('', this.value)"

            app.datalist.mySearch('', this.value);
            ui.dropdownClose(event, true);
        },
        show: function (neu, seite = '', id = '', setzen = false, scrollY = 0, scrollYreturn = 0, refresh = false, seite_ersatz = false) {
            this.getScrollY();
            if (neu !== ui.page) {
                if (neu === ui.pageAbout) {
                    ui.load(ui.pageAbout, 'about');
                }
                if (neu === ui.pageAGB) {
                    ui.load(ui.pageAGB, 'agb');
                }
                if (neu === ui.pageDS) {
                    ui.load(ui.pageDS, 'ds');
                }
                if (neu === ui.pageContact) {
                    ui.load(ui.pageContact, 'contact');
                }
                neu.style.display = "block";
                ui.page.style.display = "none";
                ui.page = neu;
                if (setzen) {
                    if (scrollY > 0) {
                        this.setScrollY(scrollY);
                    } else {
                        this.setScrollY(ui.scrollY);
                    }
                } else {
                    this.setScrollY(0);
                }
            }
            if (neu === ui.page1) {
                if (seite !== "" && seite !== app.seite) {
                    if (app.seite !== "") {
                        $('#t_' + app.seite).hide();
                    }
                    if (seite !== "") {
                        app.seite = seite;
                        $('#t_' + seite).show();
                    }
                    if (seite_ersatz) {
                        app.seite = seite_ersatz;
                    }
                }
                app.datalist.show_all(app.seite);//, refresh)
                ui.dataformBooks.style.display = "block";
                if (this.pbl.seite === 'books' || this.pbl.seite === 'authors') {
                    ui.appSearchAnchor.style.display = "block";
                } else {
                    ui.appSearchAnchor.style.display = "none";
                }
                this.pbl.appPage = 1;
            } else if (neu === ui.page2) {
                if (seite !== "") {
                    if (this.pbl.seite !== "" & seite !== this.pbl.seite) {
                        $('#t_' + this.pbl.seite).hide();
                    }
                    this.pbl.seite = seite;
                    $('#t_' + seite).show();
                }
                ui.dataformBooks.style.display = "none";
                this.pbl.appPage = 2;
            } else {
                ui.dataformBooks.style.display = "none";
                this.pbl.appPage = 3;
            }
            ui.setVerlauf(neu, seite, id, scrollYreturn);
        },
        setVerlauf: function (neu, seite, id, scrollYreturn) {
            ui.verlauf.push({
                "page": neu,
                "seite": seite,
                "id": id,
                "scrollY": (scrollYreturn > 0 ? scrollYreturn : ui.scrollY)
            });
            if (ui.verlauf.length > 1) {
                ui.appReturn.removeAttribute('disabled');
            } else {
                ui.appReturn.setAttribute('disabled', 'disabled');
            }
            var part = 'context_' + seite + '_' + app.appPage;
            if (app.handlebars[part]) {
                if (app.appPage === 1) {
                    ui.myDropdown2.innerHTML = app.handlebars[part]({ str: app.lang }) + app.handlebars['context_1']({ str: app.lang });
                    document.getElementById('appRefresh').addEventListener("click", this.refresh);
                } else {
                    ui.myDropdown2.innerHTML = app.handlebars[part]({ str: app.lang });
                }
                ui.mRefresh.removeAttribute('disabled');
                if (part === "context_books_1")
                    document.getElementById('select_s').addEventListener("change", app.ui.selectFilter); 
            } else if (app.appPage === 1) {
                ui.mRefresh.removeAttribute('disabled');
                ui.myDropdown2.innerHTML = app.handlebars['context_1']({ str: app.lang });
                document.getElementById('appRefresh').addEventListener("click", this.refresh);
            } else {
                ui.mRefresh.setAttribute('disabled', 'disabled');
            }
            //console.log('ui.set', ui.verlauf[ui.verlauf.length - 1]);
        },
        // app.ui.show_page1(1)
        getVerlauf: function () {
            // letzten verwerfen
            var selbst = ui.verlauf.pop();
            // Ziel holen
            var ziel = ui.verlauf.pop();
            //console.log(selbst, ziel);
            if (ziel !== undefined) {
                //var setzen = (ziel.page === ui.page1 && selbst.page === ui.page2 && ziel.seite === selbst.seite);
                ui.show(ziel.page, ziel.seite, ziel.id, true, selbst.scrollY, ziel.scrollY);
            }
        },
        show_page1: function (setzen, aktiveSeite, refresh = false, seite_ersatz = false) {
            ui.show(page1, aktiveSeite, '', setzen, null, null, refresh, seite_ersatz);
        },
        datalist: function (aktiveSeite) {
            ui.show(page1, aktiveSeite);
        },
        show_page2: function (aktiveSeite, id) {
            ui.show(page2, aktiveSeite, id);
        },
        refresh: function () {
            app.pouch.appResult[app.seite] = null;
            app.datalist.fillAllHelper(true);
            app.ui.datalist(app.seite);
        },
        show_div: function (div = "record_show") {
            var x = document.getElementById(div);
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        },
        setScrollY: function (y) {
            window.scrollTo(0, y);
        },
        getScrollY: function () {
            if (self.pageYOffset) // all except Explorer
            {
                this.scrollY = self.pageYOffset;
            } else if (document.documentElement && document.documentElement.scrollTop)
            // Explorer 6 Strict
            {
                this.scrollY = document.documentElement.scrollTop;
            } else if (document.body) // all other Explorers
            {
                this.scrollY = document.body.scrollTop;
            }
        },
        /* für später, dazu muss aber das Anhängen der Bücher im DIV einzeln passieren
           und die Position im DIV muss in einer Tabelle gespeichert sein.
           Dann können die Einbandbilder im sichtbaren Bereich angezeigt werden.
        getScrollBooks: function (e) {
            if (1 === 1 && 1 === "books") {
                this.last_known_scroll_position = window.scrollY;

                if (!ticking) {

                    window.requestAnimationFrame(function () {
                        doSomething(last_known_scroll_position);
                        ticking = false;
                    });

                    ticking = true;

                }
            }
        }, */
        toggleClass: function (element, className) {
            var classes = element.className.split(/\s+/),
                length = classes.length,
                i = 0;

            for (; i < length; i++) {
                if (classes[i] === className) {
                    classes.splice(i, 1);
                    break;
                }
            }
            // The className is not found
            if (length === classes.length) {
                classes.push(className);
            }

            element.className = classes.join(' ');
        },
        toggleMain3: function (e) {
            if (ui.menu.className.indexOf('active') !== -1) {
                ui.toggleAll(e);
            }
        },
        togglemenuLink: function (e) {
            ui.toggleAll(e);
        },
        toggleAll: function (e) {
            var active = 'active';

            e.preventDefault();
            ui.toggleClass(ui.layout, active);
            ui.toggleClass(ui.menu, active);
            ui.toggleClass(ui.menuLink, active);
        },
        print: function () {
            if (cordova.platformId === 'browser') {
                window.print();
            } else {
                var page = document.getElementById('main3');
                cordova.plugins.printer.print(page, 'Private Books Library');
            }
        },
        load: function (dom, seite) {
            if (!ui.pageHelper[seite]) {
                ui.pageHelper[seite] = true;
                dom.innerHTML = app.handlebars[seite]({ str: app.lang });
            }
        },
        loadpart: function (dom, part) {
            if (!ui.pageHelper[part]) {
                ui.pageHelper[part] = app.handlebars[part]({ str: app.lang });
            }
            dom.innerHTML = ui.pageHelper[part];
        },
        message: function (info, state) {
            ui.infoMessage.innerHTML = '<p>'+info+'</p>';
            ui.infoMessage.setAttribute('state', state);
            ui.infoMessage.style.display = "table-cell";
            setTimeout(ui.messageStop, 9900);
        },
        messageStop: function () {
            ui.infoMessage.style.display = "none";
        },
        isChrome: function () {
            var isChromium = window.chrome,
                winNav = window.navigator,
                vendorName = winNav.vendor,
                isOpera = winNav.userAgent.indexOf("OPR") > -1,
                isIEedge = winNav.userAgent.indexOf("Edge") > -1,
                isIOSChrome = winNav.userAgent.match("CriOS");

            if (isIOSChrome) {
                return false;// true, but in IOS webSQL;
            } else if (
                isChromium !== null &&
                typeof isChromium !== "undefined" &&
                vendorName === "Google Inc." &&
                isOpera === false &&
                isIEedge === false
            ) {
                return true;
            } else {
                return false;
            }
        }
    };
    return ui;
});

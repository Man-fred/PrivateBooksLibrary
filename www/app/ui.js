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
        menu: document.getElementById('menu'),
        menuLink: document.getElementById('menuLink'),
        main3: document.getElementById('main3'),
        select_s: document.getElementById('select_s'),
        layout: document.getElementById('layout'),
        loading: document.getElementById("loading"),
        dataformBooks: document.getElementById("dataformBooks"),
        appSearchAnchor: document.getElementById("appSearchAnchor"),
        pageLog: document.getElementById("pageLog"),
        page1: document.getElementById("page1"),
        page2: document.getElementById("page2"),
        pageAbout: document.getElementById("pageAbout"),
        pageAGB: document.getElementById("pageAGB"),
        pageDS: document.getElementById("pageDS"),
        pageContact: document.getElementById("pageContact"),
        page: this.page1,

        scrollY: 0,

        init: true,
        initialize: function (pbl) {
            if (this.init) {
                this.init = false;
                this.menuLink.addEventListener('click', this.togglemenuLink);
                this.menu.addEventListener("click", this.toggleAll);
                this.main3.addEventListener("click", this.toggleMain3);
                this.pbl = pbl;
                window.addEventListener('click', this.dropdownClose);
                this.select_s.addEventListener("change", this.selectFilter);
            }
        },

        /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
        dropdown: function (id) {
            document.getElementById(id).classList.toggle("show");
            if (id !== 'myDropdown1' && document.getElementById('myDropdown1').classList.contains('show')) {
                document.getElementById('myDropdown1').classList.remove('show');
            }
            if (id !== 'myDropdown2' && document.getElementById('myDropdown2').classList.contains('show')) {
                document.getElementById('myDropdown2').classList.remove('show');
            } 
        },

        // Close the dropdown if the user clicks outside of it
        //window.onclick =
        dropdownClose: function (event, immer = false) {
            if (!event.target.matches('.dropbtn') && (immer || !event.target.matches('.dropselect'))) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
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
        show: function (neu) {
            if (neu !== ui.page) {
                neu.style.display = "block";
                ui.page.style.display = "none";
                ui.page = neu;
            }
            if (neu === page1) {
                ui.dataformBooks.style.display = "block";
                if (this.pbl.seite === 'books' || this.pbl.seite === 'authors') {
                    ui.appSearchAnchor.style.display = "block";
                } else {
                    ui.appSearchAnchor.style.display = "none";
                }
                this.pbl.appPage = 1;
            } else if (neu === page2) {
                ui.dataformBooks.style.display = "none";
                this.pbl.appPage = 2;
            } else {
                ui.dataformBooks.style.display = "none";
                this.pbl.appPage = 3;
            }
        },
        show_page1: function (setzen) {
            ui.show(page1);
            if (setzen)
                this.setScrollY(this.scrollY);
        },
        show_page2: function (aktiveSeite) {
            this.getScrollY();
            if (aktiveSeite !== "") {
                if (this.pbl.seite !== "" & aktiveSeite !== this.pbl.seite) {
                    $('#t_' + this.pbl.seite).hide();
                }
                this.pbl.seite = aktiveSeite;
                $('#t_' + aktiveSeite).show();
            }
            ui.show(page2);
            this.setScrollY(0);
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
            toggleAll(e);
        },
        toggleAll: function (e) {
            var active = 'active';

            e.preventDefault();
            ui.toggleClass(ui.layout, active);
            ui.toggleClass(ui.menu, active);
            ui.toggleClass(ui.menuLink, active);
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
        },
        lang: function (s) {
            return (app.lang[s] ?  app.lang[s] : s);
        }

    };
    return ui;
});

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
        layout: document.getElementById('layout'),
        loading: document.getElementById("loading"),
        scrollY: 0,

        initialize: function (pbl) {
            this.menuLink.addEventListener('click', this.toggleAll);
            this.menu.addEventListener("click", this.toggleAll);
            this.main3.addEventListener("click", this.toggleMain3);
            this.pbl = pbl;
            window.addEventListener('click', this.dropdownClose);
        },

        /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
        dropdown: function (id) {
            document.getElementById(id).classList.toggle("show");
    if (id != 'myDropdown1' && document.getElementById('myDropdown1').classList.contains('show')) {
        document.getElementById('myDropdown1').classList.remove('show')
    }
    if (id != 'myDropdown2' && document.getElementById('myDropdown2').classList.contains('show')) {
        document.getElementById('myDropdown2').classList.remove('show')
    } 
},

// Close the dropdown if the user clicks outside of it
        //window.onclick =
        dropdownClose: function (event) {
        if (!event.target.matches('.dropbtn')) {

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

        show_page1: function (setzen) {
            $('#page1').show();
            $('#page2').hide();
            $('#pageLog').hide();
            $('#pageAbout').hide();
            $('#pageContact').hide();
            if (this.pbl.seite === 'books') {
                $('#dataformBooks').show();
            } else {
                $('#dataformBooks').hide();
            }
            if (setzen)
                this.setScrollY(this.scrollY);
            this.pbl.appPage = 1;
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

            $('#dataformBooks').hide();
            $('#page2').show();
            $('#page1').hide();
            $('#pageLog').hide();
            $('#pageAbout').hide();
            $('#pageContact').hide();
            this.setScrollY(0);
            this.pbl.appPage = 2;
        },
        show_pageLog: function () {
            $('#dataformBooks').hide();
            $('#pageLog').show();
            $('#page1').hide();
            $('#page2').hide();
            $('#pageAbout').hide();
            $('#pageContact').hide();
            this.pbl.appPage = 2;
        },
        show_pageAbout: function () {
            $('#dataformBooks').hide();
            $('#pageLog').hide();
            $('#page1').hide();
            $('#page2').hide();
            $('#pageAbout').show();
            $('#pageContact').hide();
            this.pbl.appPage = 2;
        },
        show_pageContact: function () {
            $('#dataformBooks').hide();
            $('#pageLog').hide();
            $('#page1').hide();
            $('#page2').hide();
            $('#pageAbout').hide();
            $('#pageContact').show();
            this.pbl.appPage = 2;
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

define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<html>\r\n<body>\r\n    <h2>Version</h2>\r\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.version : stack1), depth0))
    + "</h3>\r\n    <p>Suche nach Büchern wurde verbessert, Übersetzung vervollständigt, Store-Anbindung verbessert.</p>\r\n    <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.help : stack1), depth0))
    + "</h2>\r\n    <h3><a onclick=\"app.init.showAll()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.Rundgang_anzeigen : stack1), depth0))
    + "</a></h3>\r\n    <h3><a href=\"https://www.bcss.de/produkte/apps/pbl\" target=\"_blank\">Hilfe im Internet (öffnet neue Seite)</a></h3>\r\n    <h2>Benutzte Projekte</h2>\r\n    <h3>Datenquellen</h3>\r\n    <h4>Deutsche Nationalbibliothek</h4>\r\n    <h4>Amazon</h4>\r\n    <h3>Phonegap</h3>\r\n    <p><a href=\"https://github.com/katzer/cordova-plugin-badge\" target=\"_blank\">Cordova Badge Plugin</a></p>\r\n    <p><a href=\"https://github.com/j3k0/cordova-plugin-purchase\" target=\"_blank\">cordova-plugin-purchase</a></p>\r\n    <p><a href=\"https://github.com/admob-google/admob-phonegap\" target=\"_blank\">admob-phonegap</a></p>\r\n    <h3>Symbole</h3>\r\n    <p><a href=\"https://fontawesome.com/\">Font Awesome Free by Dave Gandy</a> (CC BY 4.0 License)</p>\r\n    <h3>sonstige Codeschnipsel</h3>\r\n    <p><a href=\"https://github.com/drogimex/isbn-validate\" target=\"_blank\">Simple ISBN validator</a> (MIT-License)</p>\r\n    <p><a href=\"https://github.com/chrisbliss18/php-ico\" target=\"_blank\">PHP ICO Generator</a> (GPL 2 or above)</p>\r\n</body>\r\n</html>";
},"useData":true});
templates['agb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <h2>Allgemeine Geschäftsbedingungen für die Nutzung der Internetseiten und Mobiltelefon-Dienste von BCSS GmbH</h2>\r\n    <h3>Allgemeines</h3>\r\n    <p>Die BCSS GmbH (nachfolgend BCSS) stellt Software für mobile Endgeräte (nachfolgend App) zur Verfügung, die es dem Nutzer ermöglicht Bücherlisten anzulegen und zu verwalten.</p>\r\n    <h3>Registrierung</h3>\r\n</body>\r\n</html>";
},"useData":true});
templates['body'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <div id=\"iosStatusbar\"></div>\r\n    <div id=\"top\">\r\n        <div class=\"dropdown\">\r\n            <button id=\"mRefresh\" state='myDropdown2' class=\"dropbtn title-button\">&nbsp;</button>\r\n            <div id=\"myDropdown2\" class=\"drop-down drop-content\"></div>\r\n        </div>\r\n        <div class=\"dropdown\">\r\n            <button id=\"appAdd\" class=\"dropbtn title-button\" state=\"add\" title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.newEntry : stack1), depth0))
    + "\">&nbsp;</button>\r\n        </div>\r\n        <div id=\"appTitle\"></div>\r\n        <div class=\"dropdown\">\r\n            <button id=\"appReturn\" class=\"dropbtn title-button\" disabled=\"disabled\"></button>\r\n        </div>\r\n    </div>\r\n    <div id=\"dataformBooks\" class=\"header\">\r\n        <div id=\"topMessage\">&nbsp;</div>\r\n        <div id=\"appSearchAnchor\" class=\"deleteicon\">\r\n            <input type=\"text\" id=\"appSearch\" onkeyup=\"app.datalist.mySearch()\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.titleOrAuthor : stack1), depth0))
    + " ...\">\r\n            <span onclick=\"app.datalist.mySearch('~~')\"></span>\r\n        </div>\r\n    </div>\r\n    <div id='layout'>\r\n        <!-- Menu toggle -->\r\n        <a href=\"#menu\" id=\"menuLink\" class=\"menu-link\">\r\n            <!-- Hamburger icon -->\r\n            <span></span>\r\n        </a>\r\n        <div id=\"menu\">\r\n            <div id=\"menuPos\" class=\"pure-menu\">\r\n                <a class=\"pure-menu-heading\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.selection : stack1), depth0))
    + "</a>\r\n\r\n                <ul id='sidelist' class=\"pure-menu-list\"></ul>\r\n            </div>\r\n        </div>\r\n        <div id=\"partner\"></div>\r\n        <div id=\"main3\">\r\n            <div class=\"content\">\r\n                <div id=\"page1\">\r\n                    <div id=\"datalist\"></div>\r\n                    <div id=\"mySearchAZ\"></div>\r\n                </div>\r\n\r\n                <div id=\"page2\">\r\n                    <div id=\"singledata\">\r\n                        <form id=\"singleform\" class=\"pure-form\" action=\"javascript:void(0);\">\r\n                            <fieldset>\r\n                                <div id=\"formdata\"></div>\r\n                                <hr />\r\n                                <div id=\"action\">\r\n                                    <button type=\"button\" class=\"pure-button\" name=\"addBtn\" id=\"addBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.add : stack1), depth0))
    + "</button>\r\n                                    <button type=\"button\" class=\"pure-button\" name=\"updateBtn\" id=\"updateBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.update : stack1), depth0))
    + "</button>\r\n                                    <button type=\"button\" class=\"pure-button\" name=\"deleteBtn\" id=\"deleteBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1["delete"] : stack1), depth0))
    + "</button>\r\n                                    <button type=\"button\" class=\"pure-button\" name=\"clearBtn\" id=\"clearBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.clear : stack1), depth0))
    + "</button>\r\n                                    <button type=\"button\" class=\"pure-button\" id=\"dbinfoBtn\" onclick=\"app.ui.show_div()\">?</button>\r\n                                </div>\r\n                            </fieldset>\r\n                        </form>\r\n                        <div id=\"record_info\">\r\n                            <div id=\"record_show\" style=\"display: none;\">\r\n                                <div>DBTimestamp <span id=\"DBTimestamp\"></span></div>\r\n                                <div>DBversion  <span id=\"DBversion\"></span></div>\r\n                                <div>DBdeleted <span id=\"DBdeleted\"></span></div>\r\n                                <div>DBstate <span id=\"DBstate\"></span></div>\r\n                                <div>DBok <span id=\"DBok\"></span></div>\r\n                                <div>DBreason <span id=\"DBreason\"></span></div>\r\n                                <div>_id <span id=\"_id\"></span></div>\r\n                                <div>_rev <span id=\"_rev\"></span></div>\r\n                                <div id=\"result\"></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div id=\"pageLog\" style=\"display: none;\">\r\n                    <!-- I will hold up to 50 log messages -->\r\n                    <div id=\"info-log\"></div>\r\n                </div>\r\n                <div id=\"pageAbout\" class=\"pageFix\"></div>\r\n                <div id=\"pageDS\" class=\"pageFix\" style=\"display: none;\"></div>\r\n                <div id=\"pageAGB\" class=\"pageFix\" style=\"display: none;\"></div>\r\n                <div id=\"pageContact\" class=\"pageFix\" style=\"display: none;\"></div>\r\n                <div id=\"pagePurchase\" class=\"pageFix\" style=\"display: none;\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <footer id=\"footer\">\r\n        <div class=\"dropdown\">\r\n            <button id=\"mSettings\" state='myDropdown1' class=\"dropbtn title-button\">&nbsp;</button>\r\n            <div id=\"myDropdown1\" class=\"drop-up drop-content\">\r\n                <a class=\"inactive\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.legal : stack1), depth0))
    + "</a>\r\n                <a id=\"appAgb\" onclick=\"app.ui.show(app.ui.pageAGB)\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.termsOfUse : stack1), depth0))
    + "</a>\r\n                <a id=\"appDS\" onclick=\"app.ui.show(app.ui.pageDS)\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.privacyStatement : stack1), depth0))
    + "</a>\r\n                <a id=\"appContact\" onclick=\"app.ui.show(app.ui.pageContact)\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.contact : stack1), depth0))
    + "</a>\r\n                <a id=\"appAbout\" onclick=\"app.ui.show(app.ui.pageAbout)\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.about : stack1), depth0))
    + " PBL</a>\r\n                <a id=\"appSync\" class=\"inactive\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.settings : stack1), depth0))
    + "</a>\r\n                <a id=\"appPurchase\" onclick=\"app.ui.show(app.ui.pagePurchase)\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.inAppPurchases : stack1), depth0))
    + "</a>\r\n                <a id=\"appSettings\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.configuration : stack1), depth0))
    + "</a>\r\n                <a class=\"inactive\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.miscellaneous : stack1), depth0))
    + "</a>\r\n                <!-- <button type=\"button\" class=\"pure-button\" onclick=\"dbRenew()\">DB Renew</button>&nbsp; -->\r\n                <a id=\"appLog\" onclick=\"app.ui.show(app.ui.pageLog)\" href=\"#\">Log</a>\r\n                <a id=\"appBackup\" href=\"#\">Backup</a>\r\n                <a id=\"appRestore\" href=\"#\">Restore</a>\r\n                <a id=\"appLogin\" href=\"#\">Login</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"dropdown\">\r\n            <button id=\"appPrint\" class=\"dropbtn title-button\"></button>\r\n        </div>\r\n        <div id=\"info-dev\" class=\"blink\">Connecting to Device</div>\r\n        <div id=\"info-sync\">no Server</div>\r\n    </footer>\r\n    <div id=\"infoMessage\"></div>\r\n    <div id=\"loading\"></div>\r\n    <div id=\"overlay\"></div>\r\n    <div id=\"overlayRestore\"></div>\r\n</body>\r\n</html>\r\n";
},"useData":true});
templates['contact'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.contact : stack1), depth0))
    + "</h2>\r\n<p>\r\n    BCSS GmbH<br />\r\n    Waldstraße 27a<br />\r\n    22955 Hoisdorf<br />\r\n    Deutschland\r\n</p>\r\n<p>\r\n    Manfred Bielemeier<br />\r\n    E-Mail: <a href=\"mailto:dev@bcss.de?subject=Private%20Books%20Library\">dev@bcss.de</a><br />\r\n    <a href=\"https://www.bcss.de\" target=\"_blank\">www.bcss.de</a>\r\n</p>\r\n";
},"useData":true});
templates['context_1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<a id=\"showDeleted\" onclick=\"app.datalist.showDeleted()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.showDeleted : stack1), depth0))
    + "</a>\r\n<a id=\"appRefresh\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.refresh : stack1), depth0))
    + "</a>\r\n";
},"useData":true});
templates['context_authors_2'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<a class=\"inactive\" href=\"#\">Suche zu Autor/-in</a>\r\n<a onclick=\"app.search.author_books()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.books2 : stack1), depth0))
    + "</a>\r\n<a onclick=\"app.search.author_search()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.author : stack1), depth0))
    + "</a>\r\n<a class=\"inactive\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.selection : stack1), depth0))
    + "</a>\r\n<select id=\"select_s\" class=\"dropselect droprow\">\r\n    <option value=\"all\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.selAll : stack1), depth0))
    + "</option>\r\n    <option value=\"favor\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.favorite2 : stack1), depth0))
    + "</option>\r\n</select>\r\n";
},"useData":true});
templates['context_books_1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<a class=\"inactive\" href=\"#\">Sortierung</a>\r\n<a onclick=\"app.datalist.show_all('books','name')\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.name : stack1), depth0))
    + "&nbsp;<i id=\"sort_name\" class=\"fas fa-sort-up\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','date')\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.date : stack1), depth0))
    + "&nbsp;<i id=\"sort_date\" class=\"fas fa-sort\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','author')\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.author : stack1), depth0))
    + "&nbsp;<i id=\"sort_author\" class=\"fas fa-sort\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','check')\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.checkdate : stack1), depth0))
    + "&nbsp;<i id=\"sort_check\" class=\"fas fa-sort\"></i></a>\r\n<a class=\"inactive\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.selection : stack1), depth0))
    + "</a>\r\n<select id=\"select_s\" class=\"dropselect droprow\">\r\n    <option value=\"all\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.selAll : stack1), depth0))
    + "</option>\r\n    <option value=\"favor\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.favorite2 : stack1), depth0))
    + "</option>\r\n    <option value=\"s0\">not owned</option>\r\n    <option value=\"s1\">ordered</option>\r\n    <option value=\"s2\">owned</option>\r\n    <option value=\"s6\">owned/read</option>\r\n    <option value=\"s9\">new</option>\r\n    <option value=\"e1\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.lent : stack1), depth0))
    + "</option>\r\n</select>\r\n";
},"useData":true});
templates['data_action'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <button type=\"button\" class=\"pure-button\" name=\"addBtn\" id=\"addBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.add : stack1), depth0))
    + "</button>\r\n    <button type=\"button\" class=\"pure-button\" name=\"updateBtn\" id=\"updateBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.update : stack1), depth0))
    + "</button>\r\n    <button type=\"button\" class=\"pure-button\" name=\"deleteBtn\" id=\"deleteBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1["delete"] : stack1), depth0))
    + "</button>\r\n    <button type=\"button\" class=\"pure-button\" name=\"clearBtn\" id=\"clearBtn\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.clear : stack1), depth0))
    + "</button>\r\n    <button type=\"button\" class=\"pure-button\" id=\"dbinfoBtn\" onclick=\"app.ui.show_div()\">?</button>\r\n</body>\r\n</html>";
},"useData":true});
templates['footer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n<div class=\"dropdown\">\r\n    <button id=\"mSettings\" state='myDropdown1' class=\"dropbtn title-button\">&nbsp;</button>\r\n    <div id=\"myDropdown1\" class=\"drop-up drop-content\">\r\n        <a class=\"inactive\" href=\"#\">Rechtliches</a>\r\n        <a id=\"appAgb\" onclick=\"app.ui.show(app.ui.pageAGB)\" href=\"#\">Nutzungbedingungen</a>\r\n        <a id=\"appDS\" onclick=\"app.ui.show(app.ui.pageDS)\" href=\"#\">Datenschutzerklärung</a>\r\n        <a id=\"appContact\" onclick=\"app.ui.show(app.ui.pageContact)\" href=\"#\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.contact : stack1), depth0))
    + "</a>\r\n        <a id=\"appAbout\" onclick=\"app.ui.show(app.ui.pageAbout)\" href=\"#\">Über PBL</a>\r\n        <a id=\"appSync\" class=\"inactive\" href=\"#\">Einstellungen</a>\r\n        <a id=\"appPurchase\" onclick=\"app.ui.show(app.ui.pagePurchase)\" href=\"#\">In-App-Käufe</a>\r\n        <a id=\"appSettings\" href=\"#\">Konfiguration</a>\r\n        <a class=\"inactive\" href=\"#\">Sontiges</a>\r\n        <!-- <button type=\"button\" class=\"pure-button\" onclick=\"dbRenew()\">DB Renew</button>&nbsp; -->\r\n        <a id=\"appLog\" onclick=\"app.ui.show(app.ui.pageLog)\" href=\"#\">Log</a>\r\n        <a id=\"appBackup\" href=\"#\">Backup</a>\r\n        <a id=\"appRestore\" href=\"#\">Restore</a>\r\n        <a id=\"appLogin\" href=\"#\">Login</a>\r\n    </div>\r\n</div>\r\n<div class=\"dropdown\">\r\n    <button id=\"appPrint\" class=\"dropbtn title-button\"></button>\r\n</div>\r\n<div id=\"info-dev\" class=\"blink\">Connecting to Device</div>\r\n<div id=\"info-sync\">no Server</div>\r\n<!--div id=\"matomo\">\r\n    < !-- Matomo -- >\r\n<script type=\"text/javascript\">\r\n    var _paq = _paq || [];\r\n    /* tracker methods like \"setCustomDimension\" should be called before \"trackPageView\" */\r\n    _paq.push([\"setDocumentTitle\", document.domain + \"/\" + document.title]);\r\n    _paq.push([\"setCookieDomain\", \"*.bcss.de\"]);\r\n    _paq.push(['trackPageView']);\r\n    _paq.push(['enableLinkTracking']);\r\n    (function () {\r\n        var u = \"https://matomo.bcss.de/\";\r\n        _paq.push(['setTrackerUrl', u + 'piwik.php']);\r\n        _paq.push(['setSiteId', '1']);\r\n        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];\r\n        g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'piwik.js'; s.parentNode.insertBefore(g, s);\r\n    })();\r\n</script>\r\n<noscript><p><img src=\"//matomo.bcss.de/piwik.php?idsite=1&amp;rec=1\" style=\"border:0;\" alt=\"\" /></p></noscript>\r\n< !-- End Matomo Code -- >\r\n<div -->\r\n";
},"useData":true});
templates['overlayRestore'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"overlay_content\">\r\n    <div id=\"overlay4\" class=\"overlay\">\r\n        <div><button id=\"restoreSchliessen\" class=\"title-button right title-close\">&nbsp;</button></div>\r\n        <h2>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.restoreH2 : stack1), depth0))
    + "</h2>\r\n        <p id=\"restoreLogoutDiv\">\r\n            <input type=\"checkbox\" id=\"restoreLogout\" value=\"true\"> Vom Server ausloggen\r\n        </p>\r\n        <p>\r\n            <input type=\"checkbox\" id=\"restoreDelete\" value=\"true\"> Bestehende Daten löschen\r\n        </p>\r\n        <p>\r\n            Bitte Backup auswählen\r\n            <input type=\"file\" id=\"fileToLoad\" onchange=\"app.pouch.restoreLoad(this.files)\">\r\n        </p>\r\n        <p id=\"restoreErg\"></p>\r\n        <p><button id=\"restoreStart\" class=\"hide\">Jetzt Daten laden</button></p>\r\n        <p id=\"restoreFinish\"></p>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
return templates;
});
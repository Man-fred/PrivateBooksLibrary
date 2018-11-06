define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<html>\r\n<body>\r\n        <h2>Version</h2>\r\n        <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.version : stack1), depth0))
    + " Interner Test/Testflight</p>\r\n        <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.help : stack1), depth0))
    + "</h2>\r\n        <h3><a onclick=\"app.init.showAll()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.Rundgang_anzeigen : stack1), depth0))
    + "</a></h3>\r\n        <h3><a href=\"https://www.bcss.de/produkte/apps/pbl\" target=\"_blank\">Hilfe im Internet (öffnet neue Seite)</a></h3>\r\n        <h2>Benutzte Projekte</h2>\r\n        <h3>Datenquellen</h3>\r\n        <h4>Deutsche Nationalbibliothek</h4>\r\n        <p></p>\r\n        <h4>Amazon</h4>\r\n        <p></p>\r\n        <h3>Phonegap</h3>\r\n        <h4><a href=\"https://github.com/katzer/cordova-plugin-badge\" target=\"_blank\">Cordova Badge Plugin</a></h4>\r\n        <h3>Symbole</h3>\r\n        <h4>Font Awesome Free</h4>\r\n        <p>Font Awesome by Dave Gandy - <a href=\"https://fontawesome.com/\">https://fontawesome.com/</a></p>\r\n        <p>Font Awesome Free is free, open source, and GPL friendly. You can use it for commercial projects, open source projects, or really almost whatever you want.</p>\r\n        <h5>Icons — CC BY 4.0 License</h5>\r\n        <p>In the Font Awesome Free download, the CC BY 4.0 license applies to all icons packaged as .svg and .js files types.</p>\r\n</body>\r\n</html>";
},"useData":true});
templates['agb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <h2>Allgemeine Geschäftsbedingungen für die Nutzung der Internetseiten und Mobiltelefon-Dienste von BCSS GmbH</h2>\r\n    <h3>Allgemeines</h3>\r\n    <p>Die BCSS GmbH (nachfolgend BCSS) stellt Software für mobile Endgeräte (nachfolgend App) zur Verfügung, die es dem Nutzer ermöglicht Bücherlisten anzulegen und zu verwalten.</p>\r\n    <h3>Registrierung</h3>\r\n</body>\r\n</html>";
},"useData":true});
templates['contact'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.contact : stack1), depth0))
    + "</h2>\r\n<p>\r\n    BCSS GmbH<br />\r\n    Waldstraße 27a<br />\r\n    22955 Hoisdorf<br />\r\n    Deutschland\r\n</p>\r\n<p>\r\n    Manfred Bielemeier<br />\r\n    E-Mail: <a href=\"mailto:dev@bcss.de?subject=Private%20Books%20Library\">dev@bcss.de</a><br />\r\n    <a href=\"https://www.bcss.de\" target=\"_blank\">www.bcss.de</a>\r\n</p>\r\n";
},"useData":true});
templates['context_1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a id=\"showDeleted\" onclick=\"app.datalist.showDeleted()\" href=\"#\">Gelöschtes&nbsp;anzeigen</a>\r\n<a id=\"appRefresh\" href=\"#\">Refresh</a>\r\n";
},"useData":true});
templates['context_authors_2'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a class=\"inactive\" href=\"#\">Suche zu Autor/-in</a>\r\n<a onclick=\"app.search.author_books()\" href=\"#\">Bücher</a>\r\n<a onclick=\"app.search.author_search()\" href=\"#\">Autor</a>\r\n<a class=\"inactive\" href=\"#\">Auswahl</a>\r\n<select id=\"select_s\" class=\"dropselect droprow\">\r\n    <option value=\"all\">Alle anzeigen</option>\r\n    <option value=\"favor\">Favoriten</option>\r\n</select>\r\n";
},"useData":true});
templates['context_books_1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a class=\"inactive\" href=\"#\">Sortierung</a>\r\n<a onclick=\"app.datalist.show_all('books','name')\" href=\"#\">Name&nbsp;<i id=\"sort_name\" class=\"fas fa-sort-up\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','date')\" href=\"#\">Datum&nbsp;<i id=\"sort_date\" class=\"fas fa-sort\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','author')\" href=\"#\">Autor&nbsp;<i id=\"sort_author\" class=\"fas fa-sort\"></i></a>\r\n<a onclick=\"app.datalist.show_all('books','check')\" href=\"#\">Check&nbsp;<i id=\"sort_check\" class=\"fas fa-sort\"></i></a>\r\n<a class=\"inactive\" href=\"#\">Auswahl</a>\r\n<select id=\"select_s\" class=\"dropselect droprow\">\r\n    <option value=\"all\">Alle anzeigen</option>\r\n    <option value=\"favor\">Favoriten</option>\r\n    <option value=\"s0\">not owned</option>\r\n    <option value=\"s1\">ordered</option>\r\n    <option value=\"s2\">owned</option>\r\n    <option value=\"s6\">owned/read</option>\r\n    <option value=\"s9\">new</option>\r\n    <option value=\"e1\">ausgeliehen</option>\r\n</select>\r\n";
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
    + "</a>\r\n        <a id=\"appAbout\" onclick=\"app.ui.show(app.ui.pageAbout)\" href=\"#\">Über PBL</a>\r\n        <a id=\"appSync\" class=\"inactive\" href=\"#\">Einstellungen</a>\r\n        <a id=\"appPurchase\" onclick=\"app.ui.show(app.ui.pagePurchase)\" href=\"#\">In-App-Käufe</a>\r\n        <a id=\"appSettings\" href=\"#\">Konfiguration</a>\r\n        <a class=\"inactive\" href=\"#\">Sontiges</a>\r\n        <!-- <button type=\"button\" class=\"pure-button\" onclick=\"dbRenew()\">DB Renew</button>&nbsp; -->\r\n        <a id=\"appLog\" onclick=\"app.ui.show(app.ui.pageLog)\" href=\"#\">Log</a>\r\n        <a id=\"appBackup\" href=\"#\">Backup</a>\r\n        <a id=\"appRestore\" href=\"#\">Restore</a>\r\n        <a id=\"appLogin\" href=\"#\">Login</a>\r\n    </div>\r\n</div>\r\n<div class=\"dropdown\">\r\n    <button id=\"appPrint\" class=\"dropbtn title-button\"></button>\r\n</div>\r\n<div id=\"info-dev\" class=\"blink\">Connecting to Device</div>\r\n<div id=\"info-sync\">no Server</div>\r\n";
},"useData":true});
templates['overlayRestore'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"overlay_content\">\r\n    <div id=\"overlay4\" class=\"overlay\">\r\n        <div><button id=\"restoreSchliessen\" class=\"title-button right title-close\">&nbsp;</button></div>\r\n        <h2>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.restoreH2 : stack1), depth0))
    + "</h2>\r\n        <p id=\"restoreLogoutDiv\">\r\n            <input type=\"checkbox\" id=\"restoreLogout\" value=\"true\"> Vom Server ausloggen\r\n        </p>\r\n        <p>\r\n            <input type=\"checkbox\" id=\"restoreDelete\" value=\"true\"> Bestehende Daten löschen\r\n        </p>\r\n        <p>\r\n            Bitte Backup auswählen\r\n            <input type=\"file\" id=\"fileToLoad\" onchange=\"app.pouch.restoreLoad(this.files)\">\r\n        </p>\r\n        <p id=\"restoreErg\"></p>\r\n        <p><button id=\"restoreStart\" class=\"hide\">Jetzt Daten laden</button></p>\r\n        <p id=\"restoreFinish\"></p>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
return templates;
});
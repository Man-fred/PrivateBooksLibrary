define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "﻿<html>\r\n<body>\r\n        <h2>Version</h2>\r\n        <p>V 0.7.0 Interner Test/Testflight</p>\r\n        <h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.help : stack1), depth0))
    + "</h2>\r\n        <h3><a onclick=\"app.init.showAll()\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.str : depth0)) != null ? stack1.Rundgang_anzeigen : stack1), depth0))
    + "</a></h3>\r\n        <h3><a href=\"https://www.bcss.de/produkte/apps/pbl\" target=\"_blank\">Hilfe im Internet (öffnet neue Seite)</a></h3>\r\n        <h2>Benutzte Projekte</h2>\r\n        <h3>Datenquellen</h3>\r\n        <h4>Deutsche Nationalbibliothek</h4>\r\n        <p></p>\r\n        <h4>Amazon</h4>\r\n        <p></p>\r\n        <h3>Phonegap</h3>\r\n        <h3>Phonegap</h3>\r\n        <h4><a href=\"https://github.com/katzer/cordova-plugin-badge\" target=\"_blank\">Cordova Badge Plugin</a></h4>\r\n        <h3>Symbole</h3>\r\n        <h4>Font Awesome Free</h4>\r\n        <p>Font Awesome by Dave Gandy - <a href=\"https://fontawesome.com/\">https://fontawesome.com/</a></p>\r\n        <p>Font Awesome Free is free, open source, and GPL friendly. You can use it for commercial projects, open source projects, or really almost whatever you want.</p>\r\n        <h5>Icons — CC BY 4.0 License</h5>\r\n        <p>In the Font Awesome Free download, the CC BY 4.0 license applies to all icons packaged as .svg and .js files types.</p>\r\n</body>\r\n</html>";
},"useData":true});
templates['agb'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "﻿<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <h2>Allgemeine Geschäftsbedingungen für die Nutzung der Internetseiten und Mobiltelefon-Dienste von BCSS GmbH</h2>\r\n    <h3>Allgemeines</h3>\r\n    <p>Die BCSS GmbH (nachfolgend BCSS) stellt Software für mobile Endgeräte (nachfolgend App) zur Verfügung, die es dem Nutzer ermöglicht Bücherlisten anzulegen und zu verwalten.</p>\r\n    <h3>Registrierung</h3>\r\n</body>\r\n</html>";
},"useData":true});
templates['contact'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "﻿<h2>Kontakt</h2>\r\n<p>\r\n    BCSS GmbH<br />\r\n    Waldstraße 27a<br />\r\n    22955 Hoisdorf<br />\r\n    Deutschland\r\n</p>\r\n<p>\r\n    Manfred Bielemeier<br />\r\n    <a href=\"https://www.bcss.de\" target=\"_blank\">www.bcss.de</a>\r\n</p>\r\n";
},"useData":true});
return templates;
});
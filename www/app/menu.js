define(function (require) {

    var menu = {
        main: function (myApp) {
            /*var result = "";
            $.each(myApp, function () {
                //debugger;
                //show_seite(this.name);
                if (this.menu) {
                    result += '<input type="button" name="m_' + this.name + '" value="' + this.title + '" id="m_' + this.name +
                        '" onclick="' + this.action + '(\'' + this.name + '\')" />';
                }
            });

            result += '<br /><br />';
            *
             result += '<input type="button" value="Parameter" onclick="app.datalist.fill(\'parameter\')" />';
             result += '<input type="button" value="Syncronisation" onclick="app.datalist.fill(\'sync\')" />';
             result += '<input type="button" name="m_send" value="Send to Server" id="m_send" onclick="CouchdbStoreWrite()" />';
             result += '<input type="button" name="m_read" value="Read from Server" id="m_read" onclick="CouchdbStoreRead()" />';
             *
            result += '<input type="checkbox" id="showDeleted" onchange="fill_datalist(\'\')"> showDeleted';
            $("#mainmenu").html(result);
            */
            result = "";
            $.each(myApp, function () {
                if (this.menu) {
                    //result += '<ons-list-item  onclick="' + this.action + '(\'' + this.name + '\')"  tappable>' + this.title + '</ons-list-item>';
                    result += '<li class="pure-menu-item" onclick="' + this.action + '(\'' + this.name + '\')"><a class="pure-menu-link" href="#">' + app.ui.lang(this.title) + '</a></li>';
                }
            });
            $("#sidelist").html(result);
        }
    };
    return menu;
});
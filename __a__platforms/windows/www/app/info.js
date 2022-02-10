/* global app, Connection */

﻿define(function (require) {

    var info = {
        network: {},
        syncErr: '',
        syncMsg: '',

        initialize: function () {
            this.infoDev = document.getElementById('info-dev');
            this.setDev("Start", 'start');
            this.checkConnection();

            this.infoSync = document.getElementById('info-sync');
            this.infoSync.addEventListener('click', this.getSync);
        },
        checkConnection: function () {
            info.networkState = navigator.connection.type;
            if (info.network[Connection.NONE] === undefined) {
                info.network[Connection.UNKNOWN] = 'online';
                info.network[Connection.ETHERNET] = 'Ethernet';
                info.network[Connection.WIFI] = 'WiFi';
                info.network[Connection.CELL_2G] = '2G Cell';
                info.network[Connection.CELL_3G] = '3G Cell';
                info.network[Connection.CELL_4G] = '4G Cell';
                info.network[Connection.CELL] = 'Cell generic';
                info.network[Connection.NONE] = 'offline';
            }
        },
        setDev: function (inner, state = false) {
            this.infoDev.innerHTML = inner;
            if (state)
                 this.infoDev.setAttribute('state', state);
        },
        setSync: function (err, msg, state = false) {
            this.infoSync.innerHTML = err;
            this.syncErr = err;
            this.syncMsg = msg;
            if (state) 
                this.infoSync.setAttribute('state', state);
        },
        getSync: function () {
            alert(app.info.syncErr + '\r\n' + app.info.syncMsg);
        }
    };
    return info;
});
/* global Capacitor */

﻿define(function (require) {

    var htmlConsole = {
        active: true,
        loglevel: 0,
        countLog: 0,
        methods: ['log', 'error', 'warn', 'info', 'debug' ],
        original: [],
        initialize: function (level = 5) {
            if (this.active && Capacitor.getPlatform() !== 'brows_er') {
                this.loglevel = level;
                this.console = window.console;
                if (!this.console) return;
                for (var i = 0; i < 5; i++)
                    this.original[this.methods[i]] = this.console[this.methods[i]];
                this.apply = this.original.log.apply;
                this.infoLog = document.getElementById('info-log');
                // temporaer sperren: 
                this.takeOverConsole();
            }
        },
        takeOverConsole: function () {
            function intercept(method) {
                htmlConsole.console[method] = function () {
                    // do sneaky stuff
                    var ng = new Date().toLocaleString();
                    var message = Array.prototype.slice.apply(arguments).join(' ');
                    var trace = Error().stack.split("\n");
                    if (trace.length > 1) {
                        if (trace[0] === "Error") {
                            trace = trace[2];
                        } else {
                            trace = trace[1];
                        }
                    } else {
                        trace = trace[0];
                    }
                    // Windows UWP: at log (ms-appx-web://35337manfredbielemeierbcs.privatebookslibrary/www
                    trace = trace.replace(/(\(http|at html|at console| \(ms-appx|@|file:).*(\.de|\/www)\//, "@");
                    //trace = trace.replace(/(\(at )/, "");

                    htmlConsole.insert(method, message, trace);
                    if (htmlConsole.apply) {
                        // Do this for normal browsers
                        htmlConsole.original['debug'].apply(htmlConsole.console, [trace]);
                        htmlConsole.original[method].apply(htmlConsole.console, arguments);
                    } else {
                        // Do this for IE
                        htmlConsole.original['debug'](trace);
                        htmlConsole.original[method](message);
                    }
                };
            }
            function intercept_trace() {
                var original = htmlConsole.console['trace'];
                htmlConsole.console['trace'] = function () {
                    var obj = Error().stack;
                    var res = obj.split("\n");
                    if (res.length > 3) {
                        return res[2];
                    } else {
                        return res;
                    }
                };
            }
            for (var i = 0; i < htmlConsole.loglevel; i++)
                intercept(htmlConsole.methods[i]);
            //intercept_trace();
        },
        log: function () {
            var message = Array.prototype.slice.apply(arguments).join(' ');
            htmlConsole.insert('log', message, '&nbsp;');
        },
        insert: function (method, message, trace) {
            var ng = new Date().toLocaleString();
            htmlConsole.infoLog.insertAdjacentHTML('afterbegin', '<div class="console" id="info-log' + htmlConsole.countLog + '"><div class="console-time">' + ng + ': </div><div class="console-'+method+'">' + message + '</div><div class="console-trace">'+trace+'</div></div>');
            if (htmlConsole.countLog > 200) {
                document.getElementById("info-log" + (htmlConsole.countLog - 200)).remove();
            }
            htmlConsole.countLog++;
        }
    };
    return htmlConsole;
});
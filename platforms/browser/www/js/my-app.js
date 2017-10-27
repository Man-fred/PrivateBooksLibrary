// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
});

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
});

$$('.scan').on('click', function () {
    console.log('scanning');

    var scanner = cordova.plugins.barcodeScanner;

    scanner.scan(function (result) {

        alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);

        console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
        document.getElementById("info").innerHTML = result.text;
        console.log(result);
        /*
         if (args.format == "QR_CODE") {
         window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
         }
         */

    }, function (error) {
        console.log("Scanning failed: ", error);
    });
});
$$('.encode').on('click', function () {
    var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function (success) {
        alert("encode success: " + success);
    }, function (fail) {
        alert("encoding failed: " + fail);
    }
    );

});

$$('.ac-1').on('click', function () {
    var buttons = [
        {
            text: 'Button1',
            bold: true
        },
        {
            text: 'Button2'
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});
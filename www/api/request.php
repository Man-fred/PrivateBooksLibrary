<?php
define('PBL',1);
include("config.php");
header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);

//print_r('{"OperationRequest":{"RequestId":"5d24ed34-b370-4d8b-af35-6d2a3bcbfd64","Arguments":{"Argument":[{"@attributes":{"Name":"AWSAccessKeyId","Value":"AKIAIXS3GMXKUYUOWD5Q"}},{"@attributes":{"Name":"AssociateTag","Value":"bielemeierde-21"}},{"@attributes":{"Name":"IdType","Value":"EAN"}},{"@attributes":{"Name":"ItemId","Value":"9783942922500"}},{"@attributes":{"Name":"Operation","Value":"ItemLookup"}},{"@attributes":{"Name":"ResponseGroup","Value":"Large"}},{"@attributes":{"Name":"SearchIndex","Value":"Books"}},{"@attributes":{"Name":"Service","Value":"AWSECommerceService"}},{"@attributes":{"Name":"Timestamp","Value":"2017-12-03T08:16:45Z"}},{"@attributes":{"Name":"Version","Value":"2013-08-01"}},{"@attributes":{"Name":"Signature","Value":"jmel6W5lUoHqvYllRNTJSycvH2HPSR4gj5cPdeSbbJg="}}]},"RequestProcessingTime":"0.0346588350000000"},"Items":{"Request":{"IsValid":"True","ItemLookupRequest":{"IdType":"EAN","ItemId":"9783942922500","ResponseGroup":"Large","SearchIndex":"Books","VariationPage":"All"}},"Item":{"ASIN":"3942922509","DetailPageURL":"https:\/\/www.amazon.de\/CIO-Jahrbuch-2015-Fakten-Anbieter\/dp\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=3942922509","ItemLinks":{"ItemLink":[{"Description":"Add To Wishlist","URL":"https:\/\/www.amazon.de\/gp\/registry\/wishlist\/add-item.html?asin.0=3942922509&SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"Tell A Friend","URL":"https:\/\/www.amazon.de\/gp\/pdp\/taf\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Customer Reviews","URL":"https:\/\/www.amazon.de\/review\/product\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Offers","URL":"https:\/\/www.amazon.de\/gp\/offer-listing\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"}]},"SalesRank":"875251","SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"},"ImageSets":{"ImageSet":{"@attributes":{"Category":"primary"},"SwatchImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL30_.jpg","Height":"30","Width":"21"},"SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"ThumbnailImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"TinyImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL110_.jpg","Height":"110","Width":"78"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"}}},"ItemAttributes":{"Binding":"Taschenbuch","Creator":["Horst Ellermann","Horst Ellermann","Michael Kallus","Saskia Winkler"],"EAN":"9783942922500","EANList":{"EANListElement":"9783942922500"},"Edition":"1","ISBN":"3942922509","Label":"IDG Business Media","Languages":{"Language":[{"Name":"Deutsch","Type":"Published"},{"Name":"Deutsch","Type":"Original"},{"Name":"Deutsch","Type":"Unbekannt"}]},"Manufacturer":"IDG Business Media","NumberOfPages":"280","PackageDimensions":{"Height":"73","Length":"843","Weight":"79","Width":"585"},"ProductGroup":"Book","ProductTypeName":"ABIS_BOOK","PublicationDate":"2014-09-26","Publisher":"IDG Business Media","Studio":"IDG Business Media","Title":"CIO Jahrbuch 2015: Neue Prognosen zur Zukunft der IT. Die IT-Fakten der 130 gr\u00f6ssten deutschen Konzerne. Die wichtigsten IT-Anbieter und Berater"},"OfferSummary":{"LowestUsedPrice":{"Amount":"326","CurrencyCode":"EUR","FormattedPrice":"EUR 3,26"},"TotalNew":"0","TotalUsed":"4","TotalCollectible":"0","TotalRefurbished":"0"},"Offers":{"TotalOffers":"0","TotalOfferPages":"0","MoreOffersUrl":"0"},"CustomerReviews":{"IFrameURL":"https:\/\/www.amazon.de\/reviews\/iframe?akid=AKIAIXS3GMXKUYUOWD5Q&alinkCode=xm2&asin=3942922509&atag=bielemeierde-21&exp=2017-12-04T08%3A16%3A45Z&v=2&sig=QKPB1RJ1bK57GoUlwQT%252B2fEQxZPahG%252BPv%252BBxj4DnKks%253D","HasReviews":"false"},"EditorialReviews":{"EditorialReview":{"Source":"Product Description","Content":"Die IT-Fakten der gr\u00f6\u00dften deutschen Konzerne Zum vierten Mal wagen es IT-Manager im CIO-Jahrbuch 2015, die Zukunft vorherzusagen. So wettet Michael Nilles von Schindler, dass im Jahr 2025 drei Viertel aller Industrieprodukte im \"Internet of things\" kommunizieren. Neun von zehn Kunden, die 2025 einen Laden betreten, werden beim Kauf IT zu Rate ziehen, bzw. den Kauf damit abwickeln, wettet Mark Michaelis von Kaiser\'s Tengelmann. Wer ist \u00fcberhaupt noch Kunde - und wer schon Mitarbeiter? Michael Voegele von Adidas wettet, dass die Grenzen zwischen Kunden und Mitarbeitern bis 2025 verschwinden. Insgesamt neun Wetten auf die Zukunft zeigt das Jahrbuch 2015. Au\u00dferdem stellt die CIO-Redaktion die IT-Fakten der 130 gr\u00f6\u00dften Unternehmen Deutschlands vor - sowie deren IT-Anbieter und Berater.","IsLinkSuppressed":"0"}},"BrowseNodes":{"BrowseNode":{"BrowseNodeId":"572682","Name":"Recht","Children":{"BrowseNode":[{"BrowseNodeId":"572958","Name":"Arbeits- & Sozialrecht"},{"BrowseNodeId":"573036","Name":"DDR-Recht"},{"BrowseNodeId":"573032","Name":"Europarecht"},{"BrowseNodeId":"573042","Name":"Gesetzessammlungen & Entscheidungen"},{"BrowseNodeId":"573034","Name":"Internationales Privatrecht"},{"BrowseNodeId":"573040","Name":"Juristenausbildung"},{"BrowseNodeId":"573038","Name":"Rechtsgeschichte & Philosophie"},{"BrowseNodeId":"573020","Name":"Steuerrecht"},{"BrowseNodeId":"572966","Name":"Strafrecht"},{"BrowseNodeId":"573030","Name":"V\u00f6lkerrecht"},{"BrowseNodeId":"572684","Name":"Zivilrecht"},{"BrowseNodeId":"572992","Name":"\u00d6ffentliches Recht"}]},"Ancestors":{"BrowseNode":{"BrowseNodeId":"288100","Name":"Fachb\u00fccher","Ancestors":{"BrowseNode":{"BrowseNodeId":"541686","Name":"Kategorien","IsCategoryRoot":"1","Ancestors":{"BrowseNode":{"BrowseNodeId":"186606","Name":"B\u00fccher"}}}}}}}}}}}');
//return;

ItemSearch('Books', $_GET['isbn']);

//Set up the operation in the request
function ItemSearch($SearchIndex, $Keywords) {

//Set the values for some of the parameters
    $Operation = "ItemLookup"; //"ItemSearch";
    $Version = "2013-08-01";
    $ResponseGroup = 'Large'; //"ItemAttributes";//,Offers"; //'Small,Images'
//            . "&ResponseGroup=" . $ResponseGroup;

    $query = array(
        'Operation' => $Operation
        , 'ResponseGroup' => $ResponseGroup
        , 'SearchIndex' => $SearchIndex
        , 'IdType' => 'EAN'
        , 'ItemId' => $Keywords
//        , 'EAN' => $Keywords
    );
    $signed_url = sign_query($query);
//    print_r($signed_url);
//Catch the response in the $response object
    $response = file_get_contents($signed_url);
    $parsed_xml = simplexml_load_string($response);
    $json = json_encode($parsed_xml);
    print_r($json);

//    printSearchResults($parsed_xml, $SearchIndex);
}

function sign_query($parameters) {
    //sanity check
    if (!$parameters) {
        return '';
    }
    /* create an array that contains url encoded values
      like "parameter=encoded%20value"
      USE rawurlencode !!! */
    $encoded_values = array();
    foreach ($parameters as $key => $val) {
        $encoded_values[$key] = rawurlencode($key) . '=' . rawurlencode($val);
    }

    /* add the parameters that are needed for every query
      if they do not already exist */
    if (!$encoded_values['AssociateTag'])
        $encoded_values['AssociateTag'] = 'AssociateTag=' . rawurlencode(MY_ASSOCIATE_ID);
    if (!$encoded_values['AWSAccessKeyId'])
        $encoded_values['AWSAccessKeyId'] = 'AWSAccessKeyId=' . rawurlencode(MY_PUBLIC_KEY);
    if (!$encoded_values['Service'])
        $encoded_values['Service'] = 'Service=AWSECommerceService';
    if (!$encoded_values['Timestamp'])
        $encoded_values['Timestamp'] = 'Timestamp=' . rawurlencode(gmdate('Y-m-d\TH:i:s\Z'));
    if (!$encoded_values['Version'])
        $encoded_values['Version'] = 'Version=2013-08-01';

    /* sort the array by key before generating the signature */
    ksort($encoded_values);


    /* set the server, uri, and method in variables to ensure that the 
      same strings are used to create the URL and to generate the signature */
    global $amz_locale;
    $server = 'webservices.amazon' . $amz_locale;
    $uri = '/onca/xml'; //used in $sig and $url
    $method = 'GET'; //used in $sig


    /* implode the encoded values and generate signature
      depending on PHP version, tildes need to be decoded
      note the method, server, uri, and query string are separated by a newline */
    $query_string = str_replace("%7E", "~", implode('&', $encoded_values));
    $sig = base64_encode(hash_hmac('sha256', "{$method}\n{$server}\n{$uri}\n{$query_string}", MY_PRIVATE_KEY, true));

    /* build the URL string with the pieces defined above
      and add the signature as the last parameter */
    $url = "http://{$server}{$uri}?{$query_string}&Signature=" . str_replace("%7E", "~", rawurlencode($sig));
    return $url;
}

/* vom Javascript hierhin kopiert, muss aufgeräumt werden                 
if (index === 5 || index === 7) {
                    var xml = xhttp.responseXML;
                    try {
                        erg = JSON.parse(xml2json(xml, "  "));
                    } catch (e) {
                        console.log(e);
                    }
                } else {
 

                switch (index) {
                    case 0: // google
                        if (erg.totalItems > 0) {
                            $("#books_name").val(erg.items[0].volumeInfo.title);
                            $("#books_publisher").val(erg.items[0].volumeInfo.publisher);
                            $("#books_releasedate").val(erg.items[0].volumeInfo.publishedDate);
                            $("#books_author").val(erg.items[0].volumeInfo.authors[0]);
                            if (erg.items[0].volumeInfo.industryIdentifiers.length > 0) {
                                if (erg.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_13")
                                    $("#books_isbn").val(erg.items[0].volumeInfo.industryIdentifiers[0].identifier);
                                if (erg.items[0].volumeInfo.industryIdentifiers[1].type === "ISBN_13")
                                    $("#books_isbn").val(erg.items[0].volumeInfo.industryIdentifiers[1].identifier);
                            }
                            $("#books_thumbnail").val(erg.items[0].volumeInfo.imageLinks.thumbnail);
                            $("#books_smallThumbnail").val(erg.items[0].volumeInfo.imageLinks.smallThumbnail);
                            $("#books_url").val(erg.items[0].volumeInfo.infoLink);
                            $("#books_link").attr("href", erg.items[0].volumeInfo.infoLink);
                            $("#img_books").attr("src", erg.items[0].volumeInfo.imageLinks.thumbnail);
                            ok = true;
                        }
                        break;
                    case 1:
                        if (erg.data[0]) {
                            $("#books_name").val(erg.data[0].title);
                            $("#books_publisher").val(erg.data[0].publisher_text);
                            $("#books_author").val(erg.data[0].author_data[0].name);
                            $("#books_isbn").val(erg.data[0].isbn13);
                            ok = true;
                        }
                        break;
                    case 2:
                        if (erg.stat === "ok") {
                            $("#books_name").val(erg.list[0].title);
                            $("#books_publisher").val(erg.list[0].publisher);
                            $("#books_releasedate").val(erg.list[0].year);
                            $("#books_author").val(erg.list[0].author);
                            if (erg.list[0].isbn.length > 0)
                                $("#books_isbn").val(erg.list[0].isbn[0]);
                            if (erg.list[0].url.length > 0)
                                $("#books_url").val(erg.list[0].url[0]);
                            ok = true;
                        }
                        break;
                    case 3: //noch kein Treffer
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 4: //noch kein Treffer
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 5: //noch kein Treffer
                        //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        if (erg) {
                            ok = true;
                        }
                        break;
                    case 6: //noch kein Treffer
                        break;
                    case 7: //noch kein Treffer
                        //    erg.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        if (erg) {
                            $("#books_name").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Title);
                            $("#books_publisher").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Publisher);
                            $("#books_releasedate").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.PublicationDate); //ReleaseDate
                            $("#books_author").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.Author);
                            $("#books_isbn").val(erg.ItemLookupResponse.Items[1].Item.ItemAttributes.EAN);
                            $("#books_price").val(erg.ItemLookupResponse.Items[1].Item.OfferSummary.LowestNewPrice.FormattedPrice);
                            $("#books_thumbnail").val(erg.ItemLookupResponse.Items[1].Item.MediumImage.URL);
                            $("#books_smallThumbnail").val(erg.ItemLookupResponse.Items[1].Item.SmallImage.URL);
                            $("#books_url").val(erg.ItemLookupResponse.Items[1].Item.DetailPageURL);
                            $("#books_link").attr("href", erg.ItemLookupResponse.Items[1].Item.DetailPageURL);
                            $("#books_img").attr("src", erg.ItemLookupResponse.Items[1].Item.MediumImage.URL);
                            ok = true;
                        }
                }
        switch (index) {
            case 0:
                searchString = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + $('#bc_text').val();
                break;
            case 1:
                searchString = "http://isbndb.com/api/v2/json/" + apiIsbndb + "/book/" + $('#bc_text').val();
                break;
            case 2:
                searchString = "http://xisbn.worldcat.org/webservices/xid/isbn/" + $('#bc_text').val() + "?method=getMetadata&format=json&fl=*";
                break;
            case 3:
                searchString = "https://openlibrary.org/api/books?bibkeys=ISBN:" + $('#bc_text').val() + "&jscmd=data&format=json";
                break;
            case 4:
                searchString = "https://www.galeritus.com/api/search.aspx?isbn=" + $('#bc_text').val();
                break;
            case 5:
                searchString = "http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&isbn=" + $('#bc_text').val() + "&apikey=" + apiLibrarything;
                break;
            case 6:
                break;
            case 7:
                searchString = "http://" + opHelper.getHost() + opHelper.getUri('ItemSearch', {
                    'SearchIndex': 'Books',
                    'IdType': 'ISBN',
                    'ItemId': $('#bc_text').val(),
                    'ResponseGroup': 'ItemAttributes'
                })
        }
// http://coverart.oclc.org/ImageWebSvc/oclc/+-+126411226_140.jpg?SearchOrder=+-+OT,OS,TN,GO,FA
*/
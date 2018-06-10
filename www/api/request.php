<?php
define('PBL',1);
include("config.php");
header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
  //error_reporting(E_ALL);
  //ini_set('display_errors', 'On');

//*
if ($_GET['isbn']) {
    $json = json_encode(itemDNB("isbn%3D".$_GET['isbn']));
    print_r($json);
} else if ($_GET['idn']) {
    $json = json_encode(itemGND("idn%3D".$_GET['idn']));
    print_r($json);
} else if ($_GET['auRef']) {
    $json = json_encode(itemDNB("auRef%3D".$_GET['auRef']));
    print_r($json);
}
//itemDNB('3933557623');
// https://pbl.bcss.de/api/request.php?idn=1160089124
// https://pbl.bcss.de/api/request.php?idn=137694741
return;

itemDNB('http://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=PER%3D%22Waldvogel%2CFelix%22&recordSchema=MARC21-xml');
//$input = json_decode('{"OperationRequest":{"RequestId":"5d24ed34-b370-4d8b-af35-6d2a3bcbfd64","Arguments":{"Argument":[{"@attributes":{"Name":"AWSAccessKeyId","Value":"AKIAIXS3GMXKUYUOWD5Q"}},{"@attributes":{"Name":"AssociateTag","Value":"bielemeierde-21"}},{"@attributes":{"Name":"IdType","Value":"EAN"}},{"@attributes":{"Name":"ItemId","Value":"9783942922500"}},{"@attributes":{"Name":"Operation","Value":"ItemLookup"}},{"@attributes":{"Name":"ResponseGroup","Value":"Large"}},{"@attributes":{"Name":"SearchIndex","Value":"Books"}},{"@attributes":{"Name":"Service","Value":"AWSECommerceService"}},{"@attributes":{"Name":"Timestamp","Value":"2017-12-03T08:16:45Z"}},{"@attributes":{"Name":"Version","Value":"2013-08-01"}},{"@attributes":{"Name":"Signature","Value":"jmel6W5lUoHqvYllRNTJSycvH2HPSR4gj5cPdeSbbJg="}}]},"RequestProcessingTime":"0.0346588350000000"},"Items":{"Request":{"IsValid":"True","ItemLookupRequest":{"IdType":"EAN","ItemId":"9783942922500","ResponseGroup":"Large","SearchIndex":"Books","VariationPage":"All"}},"Item":{"ASIN":"3942922509","DetailPageURL":"https:\/\/www.amazon.de\/CIO-Jahrbuch-2015-Fakten-Anbieter\/dp\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=3942922509","ItemLinks":{"ItemLink":[{"Description":"Add To Wishlist","URL":"https:\/\/www.amazon.de\/gp\/registry\/wishlist\/add-item.html?asin.0=3942922509&SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"Tell A Friend","URL":"https:\/\/www.amazon.de\/gp\/pdp\/taf\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Customer Reviews","URL":"https:\/\/www.amazon.de\/review\/product\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Offers","URL":"https:\/\/www.amazon.de\/gp\/offer-listing\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"}]},"SalesRank":"875251","SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"},"ImageSets":{"ImageSet":{"@attributes":{"Category":"primary"},"SwatchImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL30_.jpg","Height":"30","Width":"21"},"SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"ThumbnailImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"TinyImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL110_.jpg","Height":"110","Width":"78"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"}}},"ItemAttributes":{"Binding":"Taschenbuch","Creator":["Horst Ellermann","Horst Ellermann","Michael Kallus","Saskia Winkler"],"EAN":"9783942922500","EANList":{"EANListElement":"9783942922500"},"Edition":"1","ISBN":"3942922509","Label":"IDG Business Media","Languages":{"Language":[{"Name":"Deutsch","Type":"Published"},{"Name":"Deutsch","Type":"Original"},{"Name":"Deutsch","Type":"Unbekannt"}]},"Manufacturer":"IDG Business Media","NumberOfPages":"280","PackageDimensions":{"Height":"73","Length":"843","Weight":"79","Width":"585"},"ProductGroup":"Book","ProductTypeName":"ABIS_BOOK","PublicationDate":"2014-09-26","Publisher":"IDG Business Media","Studio":"IDG Business Media","Title":"CIO Jahrbuch 2015: Neue Prognosen zur Zukunft der IT. Die IT-Fakten der 130 gr\u00f6ssten deutschen Konzerne. Die wichtigsten IT-Anbieter und Berater"},"OfferSummary":{"LowestUsedPrice":{"Amount":"326","CurrencyCode":"EUR","FormattedPrice":"EUR 3,26"},"TotalNew":"0","TotalUsed":"4","TotalCollectible":"0","TotalRefurbished":"0"},"Offers":{"TotalOffers":"0","TotalOfferPages":"0","MoreOffersUrl":"0"},"CustomerReviews":{"IFrameURL":"https:\/\/www.amazon.de\/reviews\/iframe?akid=AKIAIXS3GMXKUYUOWD5Q&alinkCode=xm2&asin=3942922509&atag=bielemeierde-21&exp=2017-12-04T08%3A16%3A45Z&v=2&sig=QKPB1RJ1bK57GoUlwQT%252B2fEQxZPahG%252BPv%252BBxj4DnKks%253D","HasReviews":"false"},"EditorialReviews":{"EditorialReview":{"Source":"Product Description","Content":"Die IT-Fakten der gr\u00f6\u00dften deutschen Konzerne Zum vierten Mal wagen es IT-Manager im CIO-Jahrbuch 2015, die Zukunft vorherzusagen. So wettet Michael Nilles von Schindler, dass im Jahr 2025 drei Viertel aller Industrieprodukte im \"Internet of things\" kommunizieren. Neun von zehn Kunden, die 2025 einen Laden betreten, werden beim Kauf IT zu Rate ziehen, bzw. den Kauf damit abwickeln, wettet Mark Michaelis von Kaiser\'s Tengelmann. Wer ist \u00fcberhaupt noch Kunde - und wer schon Mitarbeiter? Michael Voegele von Adidas wettet, dass die Grenzen zwischen Kunden und Mitarbeitern bis 2025 verschwinden. Insgesamt neun Wetten auf die Zukunft zeigt das Jahrbuch 2015. Au\u00dferdem stellt die CIO-Redaktion die IT-Fakten der 130 gr\u00f6\u00dften Unternehmen Deutschlands vor - sowie deren IT-Anbieter und Berater.","IsLinkSuppressed":"0"}},"BrowseNodes":{"BrowseNode":{"BrowseNodeId":"572682","Name":"Recht","Children":{"BrowseNode":[{"BrowseNodeId":"572958","Name":"Arbeits- & Sozialrecht"},{"BrowseNodeId":"573036","Name":"DDR-Recht"},{"BrowseNodeId":"573032","Name":"Europarecht"},{"BrowseNodeId":"573042","Name":"Gesetzessammlungen & Entscheidungen"},{"BrowseNodeId":"573034","Name":"Internationales Privatrecht"},{"BrowseNodeId":"573040","Name":"Juristenausbildung"},{"BrowseNodeId":"573038","Name":"Rechtsgeschichte & Philosophie"},{"BrowseNodeId":"573020","Name":"Steuerrecht"},{"BrowseNodeId":"572966","Name":"Strafrecht"},{"BrowseNodeId":"573030","Name":"V\u00f6lkerrecht"},{"BrowseNodeId":"572684","Name":"Zivilrecht"},{"BrowseNodeId":"572992","Name":"\u00d6ffentliches Recht"}]},"Ancestors":{"BrowseNode":{"BrowseNodeId":"288100","Name":"Fachb\u00fccher","Ancestors":{"BrowseNode":{"BrowseNodeId":"541686","Name":"Kategorien","IsCategoryRoot":"1","Ancestors":{"BrowseNode":{"BrowseNodeId":"186606","Name":"B\u00fccher"}}}}}}}}}}}');
$response = '<?xml version="1.0" ?><ItemLookupResponse xmlns="http://webservices.amazon.com/AWSECommerceService/2013-08-01"><OperationRequest><RequestId>4614b35a-b6c0-4a59-b94f-afd2a6392187</RequestId><Arguments><Argument Name="AWSAccessKeyId" Value="AKIAIXS3GMXKUYUOWD5Q"></Argument><Argument Name="AssociateTag" Value="bielemeierde-21"></Argument><Argument Name="IdType" Value="EAN"></Argument><Argument Name="ItemId" Value="9783802581519"></Argument><Argument Name="Operation" Value="ItemLookup"></Argument><Argument Name="ResponseGroup" Value="Large"></Argument><Argument Name="SearchIndex" Value="Books"></Argument><Argument Name="Service" Value="AWSECommerceService"></Argument><Argument Name="Timestamp" Value="2018-02-18T10:42:12Z"></Argument><Argument Name="Version" Value="2013-08-01"></Argument><Argument Name="Signature" Value="wp9noO50WXs7bCJLjpgnMDz7tMtGe0HNIPyrOROaQx0="></Argument></Arguments><RequestProcessingTime>0.0485173850000000</RequestProcessingTime></OperationRequest><Items><Request><IsValid>True</IsValid><ItemLookupRequest><IdType>EAN</IdType><ItemId>9783802581519</ItemId><ResponseGroup>Large</ResponseGroup><SearchIndex>Books</SearchIndex><VariationPage>All</VariationPage></ItemLookupRequest></Request><Item><ASIN>3802581512</ASIN><DetailPageURL>https://www.amazon.de/Dragon-Love-Rendezvous-am-H%C3%B6llentor/dp/3802581512?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=165953&amp;creativeASIN=3802581512</DetailPageURL><ItemLinks><ItemLink><Description>Add To Wishlist</Description><URL>https://www.amazon.de/gp/registry/wishlist/add-item.html?asin.0=3802581512&amp;SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12738&amp;creativeASIN=3802581512</URL></ItemLink><ItemLink><Description>Tell A Friend</Description><URL>https://www.amazon.de/gp/pdp/taf/3802581512?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12738&amp;creativeASIN=3802581512</URL></ItemLink><ItemLink><Description>All Customer Reviews</Description><URL>https://www.amazon.de/review/product/3802581512?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12738&amp;creativeASIN=3802581512</URL></ItemLink><ItemLink><Description>All Offers</Description><URL>https://www.amazon.de/gp/offer-listing/3802581512?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12738&amp;creativeASIN=3802581512</URL></ItemLink></ItemLinks><SalesRank>35006</SalesRank><SmallImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL75_.jpg</URL><Height Units="pixels">75</Height><Width Units="pixels">55</Width></SmallImage><MediumImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL160_.jpg</URL><Height Units="pixels">160</Height><Width Units="pixels">116</Width></MediumImage><LargeImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL.jpg</URL><Height Units="pixels">500</Height><Width Units="pixels">364</Width></LargeImage><ImageSets><ImageSet Category="primary"><SwatchImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL30_.jpg</URL><Height Units="pixels">30</Height><Width Units="pixels">22</Width></SwatchImage><SmallImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL75_.jpg</URL><Height Units="pixels">75</Height><Width Units="pixels">55</Width></SmallImage><ThumbnailImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL75_.jpg</URL><Height Units="pixels">75</Height><Width Units="pixels">55</Width></ThumbnailImage><TinyImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL110_.jpg</URL><Height Units="pixels">110</Height><Width Units="pixels">80</Width></TinyImage><MediumImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL._SL160_.jpg</URL><Height Units="pixels">160</Height><Width Units="pixels">116</Width></MediumImage><LargeImage><URL>https://images-eu.ssl-images-amazon.com/images/I/51Pc6ie3uRL.jpg</URL><Height Units="pixels">500</Height><Width Units="pixels">364</Width></LargeImage></ImageSet></ImageSets><ItemAttributes><Author>Katie MacAlister</Author><Binding>Taschenbuch</Binding><Creator Role="�bersetzer">Margarete van P�e</Creator><EAN>9783802581519</EAN><EANList><EANListElement>9783802581519</EANListElement></EANList><Edition>1</Edition><ISBN>3802581512</ISBN><ItemDimensions><Height Units="hundredths-inches">709</Height><Length Units="hundredths-inches">488</Length><Width Units="hundredths-inches">94</Width></ItemDimensions><Label>LYX</Label><Languages><Language><Name>Deutsch</Name><Type>Ver�ffentlicht</Type></Language><Language><Name>Deutsch</Name><Type>Originalsprache</Type></Language><Language><Name>Deutsch</Name><Type>Unbekannt</Type></Language></Languages><Manufacturer>LYX</Manufacturer><ManufacturerMaximumAge Units="months">1188</ManufacturerMaximumAge><ManufacturerMinimumAge Units="months">192</ManufacturerMinimumAge><NumberOfPages>304</NumberOfPages><PackageDimensions><Height Units="hundredths-inches">102</Height><Length Units="hundredths-inches">709</Length><Weight Units="Hundertstel Pfund">26</Weight><Width Units="hundredths-inches">488</Width></PackageDimensions><ProductGroup>Book</ProductGroup><ProductTypeName>ABIS_BOOK</ProductTypeName><PublicationDate>2009-12-07</PublicationDate><Publisher>LYX</Publisher><Studio>LYX</Studio><Title>Dragon Love - Rendezvous am H�llentor</Title></ItemAttributes><OfferSummary><LowestNewPrice><Amount>995</Amount><CurrencyCode>EUR</CurrencyCode><FormattedPrice>EUR 9,95</FormattedPrice></LowestNewPrice><LowestUsedPrice><Amount>63</Amount><CurrencyCode>EUR</CurrencyCode><FormattedPrice>EUR 0,63</FormattedPrice></LowestUsedPrice><LowestCollectiblePrice><Amount>798</Amount><CurrencyCode>EUR</CurrencyCode><FormattedPrice>EUR 7,98</FormattedPrice></LowestCollectiblePrice><TotalNew>36</TotalNew><TotalUsed>19</TotalUsed><TotalCollectible>1</TotalCollectible><TotalRefurbished>0</TotalRefurbished></OfferSummary><Offers><TotalOffers>1</TotalOffers><TotalOfferPages>1</TotalOfferPages><MoreOffersUrl>https://www.amazon.de/gp/offer-listing/3802581512?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&amp;tag=bielemeierde-21&amp;linkCode=xm2&amp;camp=2025&amp;creative=12738&amp;creativeASIN=3802581512</MoreOffersUrl><Offer><OfferAttributes><Condition>New</Condition></OfferAttributes><OfferListing><OfferListingId>P9KmbKM1BRhmbiLnzlPLFfeI090K4W02xJpuT%2BFFbVBwhcoa1%2B3UE2HFH%2F7AUlgGxalcr5J6kzp08hU5Z5gPgWC2iuTWvXqkREhjltkAB3Q%3D</OfferListingId><Price><Amount>995</Amount><CurrencyCode>EUR</CurrencyCode><FormattedPrice>EUR 9,95</FormattedPrice></Price><Availability>Gew�hnlich versandfertig in 24 Stunden</Availability><AvailabilityAttributes><AvailabilityType>now</AvailabilityType><MinimumHours>0</MinimumHours><MaximumHours>0</MaximumHours></AvailabilityAttributes><IsEligibleForSuperSaverShipping>1</IsEligibleForSuperSaverShipping><IsEligibleForPrime>1</IsEligibleForPrime></OfferListing></Offer></Offers><CustomerReviews><IFrameURL>https://www.amazon.de/reviews/iframe?akid=AKIAIXS3GMXKUYUOWD5Q&amp;alinkCode=xm2&amp;asin=3802581512&amp;atag=bielemeierde-21&amp;exp=2018-02-19T10%3A42%3A12Z&amp;v=2&amp;sig=duG6cu%252BiE9vcKh2mpo9vPT2j1CWDYSnv3w%252Bu%252FvaxoJM%253D</IFrameURL><HasReviews>true</HasReviews></CustomerReviews><SimilarProducts><SimilarProduct><ASIN>3802581504</ASIN><Title>Dragon Love - Manche liebens hei�</Title></SimilarProduct><SimilarProduct><ASIN>3802583213</ASIN><Title>Dragon Love - H�llische Hochzeitsglocken (Dragon-Love-Reihe, Band 4)</Title></SimilarProduct><SimilarProduct><ASIN>3802581490</ASIN><Title>Dragon Love - Feuer und Flamme f�r diesen Mann (Dragon-Love-Reihe, Band 1)</Title></SimilarProduct><SimilarProduct><ASIN>3802583914</ASIN><Title>Silver Dragons - Viel Rauch um Nichts (Silver-Dragons-Reihe, Band 2)</Title></SimilarProduct><SimilarProduct><ASIN>3802583906</ASIN><Title>Silver Dragons - Ein brandhei�es Date (Silver-Dragons-Reihe, Band 1)</Title></SimilarProduct><SimilarProduct><ASIN>3802583922</ASIN><Title>Drachen lieben hei�er (Silver Dragons, Band 3)</Title></SimilarProduct><SimilarProduct><ASIN>3802586638</ASIN><Title>Light Dragons - Drache wider Willen (Light-Dragons-Reihe, Band 1)</Title></SimilarProduct><SimilarProduct><ASIN>3802586646</ASIN><Title>Light Dragons - Eine feurige Angelegenheit (Light-Dragons-Reihe, Band 2)</Title></SimilarProduct><SimilarProduct><ASIN>3802592492</ASIN><Title>Light Dragons: Hei� gek�sst (Light-Dragons-Reihe, Band 3)</Title></SimilarProduct><SimilarProduct><ASIN>373630188X</ASIN><Title>Black Dragons - Ein Flirt mit dem Feuer (Black-Dragons-Reihe, Band 1)</Title></SimilarProduct></SimilarProducts><BrowseNodes><BrowseNode><BrowseNodeId>420050031</BrowseNodeId><Name>Fantasy</Name><Ancestors><BrowseNode><BrowseNodeId>142</BrowseNodeId><Name>Fantasy &amp; Science Fiction</Name><Ancestors><BrowseNode><BrowseNodeId>541686</BrowseNodeId><Name>Kategorien</Name><IsCategoryRoot>1</IsCategoryRoot><Ancestors><BrowseNode><BrowseNodeId>186606</BrowseNodeId><Name>B�cher</Name></BrowseNode></Ancestors></BrowseNode></Ancestors></BrowseNode></Ancestors></BrowseNode><BrowseNode><BrowseNodeId>420066031</BrowseNodeId><Name>Vampirromane</Name><Ancestors><BrowseNode><BrowseNodeId>142</BrowseNodeId><Name>Fantasy &amp; Science Fiction</Name><Ancestors><BrowseNode><BrowseNodeId>541686</BrowseNodeId><Name>Kategorien</Name><IsCategoryRoot>1</IsCategoryRoot><Ancestors><BrowseNode><BrowseNodeId>186606</BrowseNodeId><Name>B�cher</Name></BrowseNode></Ancestors></BrowseNode></Ancestors></BrowseNode></Ancestors></BrowseNode><BrowseNode><BrowseNodeId>420222031</BrowseNodeId><Name>Liebesromane</Name><Children><BrowseNode><BrowseNodeId>14166824031</BrowseNodeId><Name>Action�&amp; Abenteuer</Name></BrowseNode><BrowseNode><BrowseNodeId>14166919031</BrowseNodeId><Name>Christentum</Name></BrowseNode><BrowseNode><BrowseNodeId>287980</BrowseNodeId><Name>Erotische Liebesromane</Name></BrowseNode><BrowseNode><BrowseNodeId>10851580031</BrowseNodeId><Name>Lesben und Schwule</Name></BrowseNode><BrowseNode><BrowseNodeId>10851579031</BrowseNodeId><Name>New Adult</Name></BrowseNode><BrowseNode><BrowseNodeId>10851578031</BrowseNodeId><Name>Romantische Thriller</Name></BrowseNode></Children><Ancestors><BrowseNode><BrowseNodeId>541686</BrowseNodeId><Name>Kategorien</Name><IsCategoryRoot>1</IsCategoryRoot><Ancestors><BrowseNode><BrowseNodeId>186606</BrowseNodeId><Name>B�cher</Name></BrowseNode></Ancestors></BrowseNode></Ancestors></BrowseNode></BrowseNodes></Item></Items></ItemLookupResponse>';
$utf8 = utf8_encode($response);
//print_r($utf8);
$parsed_xml = simplexml_load_string($utf8);
   // print_r($parsed_xml);
    $return =  copyAmazon($parsed_xml);
  //  print_r($return);
    $json = json_encode($return);
    print_r($json);
    //print_r('<br/><br/>');
    //print_r($response);
//print_r(json_encode(copyAmazon(json_decode(simplexml_load_string($response)))));
//echo $response;
return;
// */

/*
//print_r($input);
return;
$output->OperationRequest = $input->OperationRequest;

//9783942922500
print_r('{"OperationRequest":{"RequestId":"5d24ed34-b370-4d8b-af35-6d2a3bcbfd64","Arguments":{"Argument":[{"@attributes":{"Name":"AWSAccessKeyId","Value":"AKIAIXS3GMXKUYUOWD5Q"}},{"@attributes":{"Name":"AssociateTag","Value":"bielemeierde-21"}},{"@attributes":{"Name":"IdType","Value":"EAN"}},{"@attributes":{"Name":"ItemId","Value":"9783942922500"}},{"@attributes":{"Name":"Operation","Value":"ItemLookup"}},{"@attributes":{"Name":"ResponseGroup","Value":"Large"}},{"@attributes":{"Name":"SearchIndex","Value":"Books"}},{"@attributes":{"Name":"Service","Value":"AWSECommerceService"}},{"@attributes":{"Name":"Timestamp","Value":"2017-12-03T08:16:45Z"}},{"@attributes":{"Name":"Version","Value":"2013-08-01"}},{"@attributes":{"Name":"Signature","Value":"jmel6W5lUoHqvYllRNTJSycvH2HPSR4gj5cPdeSbbJg="}}]},"RequestProcessingTime":"0.0346588350000000"},"Items":{"Request":{"IsValid":"True","ItemLookupRequest":{"IdType":"EAN","ItemId":"9783942922500","ResponseGroup":"Large","SearchIndex":"Books","VariationPage":"All"}},"Item":{"ASIN":"3942922509","DetailPageURL":"https:\/\/www.amazon.de\/CIO-Jahrbuch-2015-Fakten-Anbieter\/dp\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=3942922509","ItemLinks":{"ItemLink":[{"Description":"Add To Wishlist","URL":"https:\/\/www.amazon.de\/gp\/registry\/wishlist\/add-item.html?asin.0=3942922509&SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"Tell A Friend","URL":"https:\/\/www.amazon.de\/gp\/pdp\/taf\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Customer Reviews","URL":"https:\/\/www.amazon.de\/review\/product\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"},{"Description":"All Offers","URL":"https:\/\/www.amazon.de\/gp\/offer-listing\/3942922509?SubscriptionId=AKIAIXS3GMXKUYUOWD5Q&tag=bielemeierde-21&linkCode=xm2&camp=2025&creative=12738&creativeASIN=3942922509"}]},"SalesRank":"875251","SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"},"ImageSets":{"ImageSet":{"@attributes":{"Category":"primary"},"SwatchImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL30_.jpg","Height":"30","Width":"21"},"SmallImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"ThumbnailImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL75_.jpg","Height":"75","Width":"53"},"TinyImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL110_.jpg","Height":"110","Width":"78"},"MediumImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL._SL160_.jpg","Height":"160","Width":"113"},"LargeImage":{"URL":"https:\/\/images-eu.ssl-images-amazon.com\/images\/I\/51KXDDWBrqL.jpg","Height":"500","Width":"354"}}},"ItemAttributes":{"Binding":"Taschenbuch","Creator":["Horst Ellermann","Horst Ellermann","Michael Kallus","Saskia Winkler"],"EAN":"9783942922500","EANList":{"EANListElement":"9783942922500"},"Edition":"1","ISBN":"3942922509","Label":"IDG Business Media","Languages":{"Language":[{"Name":"Deutsch","Type":"Published"},{"Name":"Deutsch","Type":"Original"},{"Name":"Deutsch","Type":"Unbekannt"}]},"Manufacturer":"IDG Business Media","NumberOfPages":"280","PackageDimensions":{"Height":"73","Length":"843","Weight":"79","Width":"585"},"ProductGroup":"Book","ProductTypeName":"ABIS_BOOK","PublicationDate":"2014-09-26","Publisher":"IDG Business Media","Studio":"IDG Business Media","Title":"CIO Jahrbuch 2015: Neue Prognosen zur Zukunft der IT. Die IT-Fakten der 130 gr\u00f6ssten deutschen Konzerne. Die wichtigsten IT-Anbieter und Berater"},"OfferSummary":{"LowestUsedPrice":{"Amount":"326","CurrencyCode":"EUR","FormattedPrice":"EUR 3,26"},"TotalNew":"0","TotalUsed":"4","TotalCollectible":"0","TotalRefurbished":"0"},"Offers":{"TotalOffers":"0","TotalOfferPages":"0","MoreOffersUrl":"0"},"CustomerReviews":{"IFrameURL":"https:\/\/www.amazon.de\/reviews\/iframe?akid=AKIAIXS3GMXKUYUOWD5Q&alinkCode=xm2&asin=3942922509&atag=bielemeierde-21&exp=2017-12-04T08%3A16%3A45Z&v=2&sig=QKPB1RJ1bK57GoUlwQT%252B2fEQxZPahG%252BPv%252BBxj4DnKks%253D","HasReviews":"false"},"EditorialReviews":{"EditorialReview":{"Source":"Product Description","Content":"Die IT-Fakten der gr\u00f6\u00dften deutschen Konzerne Zum vierten Mal wagen es IT-Manager im CIO-Jahrbuch 2015, die Zukunft vorherzusagen. So wettet Michael Nilles von Schindler, dass im Jahr 2025 drei Viertel aller Industrieprodukte im \"Internet of things\" kommunizieren. Neun von zehn Kunden, die 2025 einen Laden betreten, werden beim Kauf IT zu Rate ziehen, bzw. den Kauf damit abwickeln, wettet Mark Michaelis von Kaiser\'s Tengelmann. Wer ist \u00fcberhaupt noch Kunde - und wer schon Mitarbeiter? Michael Voegele von Adidas wettet, dass die Grenzen zwischen Kunden und Mitarbeitern bis 2025 verschwinden. Insgesamt neun Wetten auf die Zukunft zeigt das Jahrbuch 2015. Au\u00dferdem stellt die CIO-Redaktion die IT-Fakten der 130 gr\u00f6\u00dften Unternehmen Deutschlands vor - sowie deren IT-Anbieter und Berater.","IsLinkSuppressed":"0"}},"BrowseNodes":{"BrowseNode":{"BrowseNodeId":"572682","Name":"Recht","Children":{"BrowseNode":[{"BrowseNodeId":"572958","Name":"Arbeits- & Sozialrecht"},{"BrowseNodeId":"573036","Name":"DDR-Recht"},{"BrowseNodeId":"573032","Name":"Europarecht"},{"BrowseNodeId":"573042","Name":"Gesetzessammlungen & Entscheidungen"},{"BrowseNodeId":"573034","Name":"Internationales Privatrecht"},{"BrowseNodeId":"573040","Name":"Juristenausbildung"},{"BrowseNodeId":"573038","Name":"Rechtsgeschichte & Philosophie"},{"BrowseNodeId":"573020","Name":"Steuerrecht"},{"BrowseNodeId":"572966","Name":"Strafrecht"},{"BrowseNodeId":"573030","Name":"V\u00f6lkerrecht"},{"BrowseNodeId":"572684","Name":"Zivilrecht"},{"BrowseNodeId":"572992","Name":"\u00d6ffentliches Recht"}]},"Ancestors":{"BrowseNode":{"BrowseNodeId":"288100","Name":"Fachb\u00fccher","Ancestors":{"BrowseNode":{"BrowseNodeId":"541686","Name":"Kategorien","IsCategoryRoot":"1","Ancestors":{"BrowseNode":{"BrowseNodeId":"186606","Name":"B\u00fccher"}}}}}}}}}}}');
return;
*/
ItemSearch('Books', $_GET['isbn']);

function  copyAmazon($input) {
    $output = new \stdClass;
    $temp = $input->Items->Request->IsValid;
    //print_r($temp);
    $output->IsValid = (string) $input->Items->Request->IsValid;
    $output->Error = (string) $input->Items->Request->Errors->Error->Message;
    $output->ItemLookupRequest = (string) $input->Items->Request->ItemLookupRequest->ItemId;
    if (!$output->Error) {
        $output->count = 1;
        $output->Items = [];
        $output->Items[0]->name = (string) $input->Items->Item->ItemAttributes->Title;
        $output->Items[0]->publisher =(string)  $input->Items->Item->ItemAttributes->Publisher;
        $output->Items[0]->releasedate = (string) $input->Items->Item->ItemAttributes->PublicationDate; //ReleaseDate
        $output->Items[0]->author = (string) $input->Items->Item->ItemAttributes->Author;
        if (!$output->Items[0]->author) {
            $output->Items[0]->author = (string) $input->Items->Item->ItemAttributes->Creator[0];
        }
        $output->Items[0]->isbn = (string) $input->Items->Item->ItemAttributes->EAN;
        $output->Items[0]->price = (string) $input->Items->Item->OfferSummary->LowestNewPrice->FormattedPrice;
        $output->Items[0]->thumbnail = (string) $input->Items->Item->MediumImage->URL;
        $output->Items[0]->smallThumbnail = (string) $input->Items->Item->SmallImage->URL;
        $output->Items[0]->url = (string) $input->Items->Item->DetailPageURL;
        $output->Items[0]->type = (string) $input->Items->Item->ItemAttributes->ProductGroup;
                            //try { $("#books_link").attr("href", erg.Items.Item.DetailPageURL); } catch (err) { };
                            //try { $("#img_books").attr("src", erg.Items.Item.MediumImage.URL); } catch (err) { };
        if ($output->Items[0]->thumbnail) {
            $response = file_get_contents($output->Items[0]->thumbnail);
            //$im = imagecreatefromstring($response);
            //$png = imagepng($im);
            $output->Items[0]->image = base64_encode($response);
            //imagedestroy($im);
        }
    } else {
        $output->count = 0;
    }
    return $output;
}

function itemGND($input){
	$response = file_get_contents("http://services.dnb.de/sru/authorities?version=1.1&operation=searchRetrieve&query=".$input."&recordSchema=MARC21-xml");
	//$response = file_get_contents("http://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=per%3D133457931&recordSchema=MARC21-xml");
    $utf8 = utf8_encode($response);
    $parsed_xml = simplexml_load_string($utf8);
	
    //print_r($parsed_xml);
}

function itemDNB($input){
    $response = file_get_contents("http://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=".$input."&recordSchema=MARC21-xml");
    //$utf8 = utf8_encode($response);
	
	//include('auRef.php');
	
    $parsed_xml = simplexml_load_string($response);
    //print_r($parsed_xml);
	
	$result = [];
	$output = [];
    $output['count'] = 0;
	$output['Items'] = [];
	$i = 0;
	$output['Items'][$i] = [];
	$output['Items'][$i]['type'] = 'DNB';
	$j = 0;
	foreach ($parsed_xml->children() as $value) {
		if (!isset($result[$i]))
			$result[$i] = [];
		inhalt($result, $output, $i, $j, '', $value);
	}
    //print_r($result);
	
    return $output;
	//print_r($result);
}

function dnbErgebnis(&$output, $i, $key, $value) {
    switch ($key) {
        case 'numberOfRecords.' :
			$output['max'] = $value; 
			break;
        case 'records.record.recordPosition.' :
			$output['count'] = $value; 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.245.ind1.0.ind2.0.subfield.code.a.' :
			$output['Items'][$i]['name'] = $value; 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.264.ind1. .ind2.1.subfield.code.b.' :
			$output['Items'][$i]['publisher'] = $value; 
			break;
        //case 'records.record.recordData.record.type.Bibliographic.datafield.tag.264.ind1. .ind2.1.subfield.code.c.' :
		case 'records.record.recordData.record.type.Bibliographic.controlfield.tag.008.' :
			if ($value < '30')  
				$output['Items'][$i]['releasedate'] = '20';
			else
				$output['Items'][$i]['releasedate'] = '19';
			$output['Items'][$i]['releasedate'] .= substr($value, 0, 2).'-'.substr($value, 2, 2).'-'.substr($value, 4, 2); 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.100.ind1.1.ind2. .subfield.code.a.' :
			$output['Items'][$i]['author'] = $value; 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.100.ind1.1.ind2. .subfield.code.0.' :
			$output['Items'][$i]['author_id'] = substr($value, 8); 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.020.ind1. .ind2. .subfield.code.a.' :
			$output['Items'][$i]['isbn'] = $value; 
			$output['Items'][$i]['thumbnail'] = 'https://portal.dnb.de/opac/mvb/cover.htm?isbn='.$value.'&size=m';// 978-3-8025-9941-5
			$output['Items'][$i]['smallThumbnail'] = 'https://portal.dnb.de/opac/mvb/cover.htm?isbn='.$value.'&size=s'; 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.020.ind1. .ind2. .subfield.code.c.' :
			$output['Items'][$i]['price'] = $value; 
			break;
        case 'records.record.recordData.record.type.Bibliographic.datafield.tag.016.ind1.7.ind2. .subfield.code.a.' :
			$output['Items'][$i]['url'] = 'https://d-nb.info/'.$value; 
			break;
        /*
		if ($output->Items[0]->thumbnail) {
            $response = file_get_contents($output->Items[0]->thumbnail);
            //$im = imagecreatefromstring($response);
            //$png = imagepng($im);
            $output->Items[0]->image = base64_encode($response);
            //imagedestroy($im);
        }
		*/
	}
}

function inhalt(&$array, &$output, &$i, &$j, $pre, $value){
	$knoten = $value->getName();
	$knoten .= '.';
	foreach($value->attributes() as $a => $b) {
		$knoten .= $a.'.'.$b.".";
	}
	if ($value->count() == 0){
		//echo $pre,$knoten,":\"",(string)$value,"\"\n";
		$array[$i][$pre.$knoten.$j] = (string)$value;
		dnbErgebnis($output, $i, $pre.$knoten, (string)$value);
		if ($pre.$knoten == 'records.record.recordPosition.'){
			$i++;
			$output['Items'][$i] = [];
			$output['Items'][$i]['type'] = 'DNB';
			$j = 0;
		} else {
			$j++;
		}
	} else {
		foreach($value->children() as $c) {
			inhalt($array, $output, $i, $j, $pre.$knoten, $c);
		}
	}
}

function copyDNB(){
// http://services.dnb.de/sru/dnb?version=1.1&operation=searchRetrieve&query=ISBN%3D9783736302761&recordSchema=MARC21-xml
}
function copyBuchhandel(){
// https://www.buchhandel.de/jsonapi/products?filter%5Bproducts%5D%5Bquery%5D=(is%3D9783736302761)&filter%5BkeepPage%5D=true&page%5Bnumber%5D=1&page%5Bsize%5D=25&sort%5Bscore%5D=desc
}

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
    $return =  copyAmazon($parsed_xml);
    $json = json_encode($return);
    print_r($json);
    print_r('<br/><br/>');
    print_r($response);

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

/* vom Javascript hierhin kopiert, muss aufger�umt werden                 
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
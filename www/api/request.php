<?php

include("config.php");


ItemSearch('Books', '9783802582271');

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

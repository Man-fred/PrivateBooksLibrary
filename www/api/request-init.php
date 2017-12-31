<?php
define('PBL',1);
error_reporting (E_ALL);

ini_set ('display_errors', 'On');
echo 'Weitere Debugging Informationen:';

include("config.php");
include("classes/cdb.php");
include("classes/cdbExeption.php");

$test_db = 'pbl-5837-5880-3408-4238';
$test_pass = 'v54wjtzjtzju';
$prefix = "0.3";

$couchdb = new CouchDB($test_db, CDB_HOST, CDB_PORT, CDB_USER, CDB_PASS);

	$view_result = $couchdb->send('/'.$prefix.'_state_0', 'PUT', '{"name": "0","long": "not owned"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_1', 'PUT', '{"name": "1","long": "ordered"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_2', 'PUT', '{"name": "2","long": "owned"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_3', 'PUT', '{"name": "3","long": "3?owned"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_4', 'PUT', '{"name": "4","long": "4?owned"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_5', 'PUT', '{"name": "5","long": "5?owned"}');
	$view_result = $couchdb->send('/'.$prefix.'_state_6', 'PUT', '{"name": "6","long": "owned/read"}');
	$doc = $view_result->getBody(true);
	//$doc->rev = "1-5fe51ba7949d1cf13fdae01c90887598";
    //print_r($doc);

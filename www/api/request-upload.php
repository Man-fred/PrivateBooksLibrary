<?php
define('PBL',1);
error_reporting (E_ALL);

ini_set ('display_errors', 'On');
echo 'Weitere Debugging Informationen:';
print_r($_FILES);

$uploaddir = '/var/www/vhosts/bcss.de/pbl.bcss.de/data/';
$uploadfile = $uploaddir . 'test.sqlite';
/*
echo '<pre>';
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "Datei ist valide und wurde erfolgreich hochgeladen.\n";
} else {
    echo "Möglicherweise eine Dateiupload-Attacke!\n";
}
*/

print "<br/>";

include("config.php");
include("classes/cdb.php");
include("classes/cdbExeption.php");

$test_db = 'pbl-5837-5880-3408-4238';
$test_pass = 'v54wjtzjtzju';
$prefix = "0.3";

$couchdb = new CouchDB($test_db, CDB_HOST, CDB_PORT, CDB_USER, CDB_PASS);

//// erledigt
//$doc = $couchdb->db_create($test_db, $test_pass);

$db = new SQLite3($uploadfile);
$query = "SELECT Z_PK, Z_ENT, Z_OPT, ZFAVOR, ZSTATE, ZCHECKDATE, ZREADDATE, ZRELEASEDATE, ZISBNCODE, ZAUTHOR, ZAUTHORKANA,".
	     "ZCODE, ZMEMO, ZPRICE, ZPUBLISHER, ZTICDSSYNCID, ZTITLE, ZIMAGE FROM ZZOSHO";// LIMIT 100 OFFSET 7";// , ZIMAGE ORDER BY Z_PK LIMIT 20
$results = $db->query($query);
//$view_result = $couchdb->send_raw('/_uuids?count=2');
//$uuids = $view_result->getBody(true);
//print_r($uuids);
$i = 0 ;
while ($row = $results->fetchArray()) {
	$view = '{"name": "'.$row["ZTITLE"].'","author": "'.$row["ZAUTHOR"].'","publisher": "'.$row["ZPUBLISHER"].'","isbn": "'.$row["ZCODE"].'",'.
             '"price": "'.$row["ZPRICE"].'","releasedate": "'.$row["ZRELEASEDATE"].'","state": "'.$row["ZSTATE"].'","memo": "'.$row["ZMEMO"].'",'.
             '"checkdate": "'.$row["ZCHECKDATE"].'","source": "10","ent": "'.$row["Z_ENT"].'","opt": "'.$row["Z_OPT"].'",'.
             '"favor": "'.$row["ZFAVOR"].'"'.//,"url": "'.$row["ZAUTHOR"].'","thumbnail": "'.$row["ZAUTHOR"].'","smallThumbnail": "'.$row["ZAUTHOR"].'",'.
            '}';
	//echo $view.'<br />';
	$view_result = $couchdb->send('/'.$prefix.'_books20000'.$row["Z_PK"], 'PUT', $view);//$uuids[$i++]
	$doc = $view_result->getBody(true);
	//$doc->rev = "1-5fe51ba7949d1cf13fdae01c90887598";
    //print_r($doc);

	//$view =  base64_encode( $row["ZIMAGE"] ) ;
	$view =   $row["ZIMAGE"]  ;
	//echo $view.'<br />';
	$view_result = $couchdb->send_attachment('/'.$prefix.'_books20000'.$row["Z_PK"].'/thumbnail?rev='.$doc->rev, 'PUT', $view, "image/jpeg");//$uuids[$i++]
	$doc = $view_result->getBody(true);
    print_r($doc);
	echo '<br />';
}

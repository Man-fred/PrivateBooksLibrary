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

$couchdb = new CouchDB($test_db, CDB_HOST, CDB_PORT, CDB_USER, CDB_PASS);

//// erledigt
//$doc = $couchdb->db_create($test_db, $test_pass);

//$doc = db_delete($test_db);
//print_r($doc);

$view_result = $couchdb->send('/'.$prefix.'_state_0', 'PUT', '{"name": "0","long": "not owned"}');
$view_result = $couchdb->send('/'.$prefix.'_state_1', 'PUT', '{"name": "1","long": "ordered"}');
$view_result = $couchdb->send('/'.$prefix.'_state_2', 'PUT', '{"name": "2","long": "owned"}');
$view_result = $couchdb->send('/'.$prefix.'_state_3', 'PUT', '{"name": "3","long": "3?owned"}');
$view_result = $couchdb->send('/'.$prefix.'_state_4', 'PUT', '{"name": "4","long": "4?owned"}');
$view_result = $couchdb->send('/'.$prefix.'_state_5', 'PUT', '{"name": "5","long": "5?owned"}');
$view_result = $couchdb->send('/'.$prefix.'_state_6', 'PUT', '{"name": "6","long": "owned/read"}');
$doc = $view_result->getBody(true);

$db = new SQLite3($uploadfile);
$query = "SELECT Z_PK, Z_ENT, Z_OPT, ZFAVOR, ZSTATE, ZCHECKDATE, ZREADDATE, ZRELEASEDATE, ZISBNCODE, ZAUTHOR, ZAUTHORKANA,".
	     "ZCODE, ZMEMO, ZPRICE, ZPUBLISHER, ZTICDSSYNCID, ZTITLE, ZIMAGE FROM ZZOSHO";// LIMIT 100 OFFSET 7";// , ZIMAGE ORDER BY Z_PK LIMIT 20
$results = $db->query($query);
//$view_result = $couchdb->send_raw('/_uuids?count=2');
//$uuids = $view_result->getBody(true);
//print_r($uuids);
$i = 0 ;
while ($row = $results->fetchArray()) {
	//if ($row["Z_PK"] <= 130){
    $row["ZRELEASEDATE"] = ($row["ZRELEASEDATE"] + 978307200) * 1000;
    $row["ZCHECKDATE"] = ($row["ZCHECKDATE"] + 978307200) * 1000;
	$row["ZTITLE"] = str_replace('"',"'",$row["ZTITLE"]);
	$row["ZAUTHOR"] = str_replace('"',"'",$row["ZAUTHOR"]);
	$row["ZMEMO"] = str_replace('"',"'",$row["ZMEMO"]);
	//$text = $row["ZTITLE"];
	//$text = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $text);
	//$row["ZMEMO"] = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $row["ZMEMO"]);
	$view = '{"name": "'.$row["ZTITLE"].'","author": "'.$row["ZAUTHOR"].'","publisher": "'.$row["ZPUBLISHER"].'","isbn": "'.$row["ZCODE"].'",'.
             '"price": "'.$row["ZPRICE"].'","releasedate": "'.$row["ZRELEASEDATE"].'","state": "'.$row["ZSTATE"].'","memo": "'.$row["ZMEMO"].'",'.
             '"checkdate": "'.$row["ZCHECKDATE"].'","source": "10","ent": "'.$row["Z_ENT"].'","opt": "'.$row["Z_OPT"].'",'.
             '"favor": "'.$row["ZFAVOR"].'"'.//,"url": "'.$row["ZAUTHOR"].'","thumbnail": "'.$row["ZAUTHOR"].'","smallThumbnail": "'.$row["ZAUTHOR"].'",'.
            '}';
	$view = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $view);

	//echo $view.'<br />';
	$view_result = $couchdb->send('/'.$prefix.'_books20000'.$row["Z_PK"], 'PUT', $view);//$uuids[$i++]
	$doc = $view_result->getBody(true);
    if (isset($doc->error)) {
//	if ($row["Z_PK"] == 130){
		if ($doc->error == "bad_request") {
			echo "\n\r".$row["Z_PK"]." error\n\r";
			print_r($doc);
			print_r($view);
			$json = json_decode($view);
			if (json_last_error() == JSON_ERROR_NONE) {
				print_r($json);
			} else {
				print_r(json_last_error_msg());
			}
			echo '<br />';
		}
    } else if (true){
	    //echo "\n\r doc \n\r";
		//print_r($doc);
		//$doc->rev = "1-5fe51ba7949d1cf13fdae01c90887598";

		//$view =  base64_encode( $row["ZIMAGE"] ) ;
		$view =   $row["ZIMAGE"]  ;
		//echo $view.'<br />';
		$view_result = $couchdb->send_attachment('/'.$prefix.'_books20000'.$row["Z_PK"].'/thumbnail?rev='.$doc->rev, 'PUT', $view, "image/jpeg");//$uuids[$i++]
		$doc = $view_result->getBody(true);
		if (isset($doc->error)) {
			print_r($doc);
		}
	}
	//}
}

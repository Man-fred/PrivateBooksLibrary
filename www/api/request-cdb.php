<?php
error_reporting (E_ALL | E_STRICT);
ini_set ('display_errors', 1);

define('PBL',1);
include("config.php");
include("classes/cdb.php");
include("classes/cdbExeption.php");

$test_db = 'pbl-3837-5880-3408-4238';
$test_pass = 'v54wjtzjtzju';

$couchdb = new CouchDB($db, CDB_HOST, CDB_PORT, CDB_USER, CDB_PASS);

$doc = $couchdb->db_create($test_db, $test_pass);

//$doc = db_delete($test_db);
print_r($doc);

/* curl -X PUT --user Verwalter:xQeZCv1kHe1zJ32wXzYN localhost:5984/_users/org.couchdb.user:fernando \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{"name": "fernando", "password": "apple", "roles": [], "type": "user"}' */


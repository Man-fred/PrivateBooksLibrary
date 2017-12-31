<?php
defined('PBL') or die('nur in der PBL-API verwendbar');

/* Define the constants needed to access the PA API */
// https://partnernet.amazon.de/home/account/tag/manage
define('MY_ASSOCIATE_ID', 'Partner-ID');
define('MY_PUBLIC_KEY', 'Access Key ID');
define('MY_PRIVATE_KEY', 'Private key');

/* Set the Amazon locale, which is the top-level domain of the server */
$amz_locale = '.de';

/* CouchDB-credentials */
define('CDB_USER', 'CouchDB-User');
define('CDB_PASS', 'CouchDB-Password');
define('CDB_HOST', 'localhost');
define('CDB_PORT', '5984');

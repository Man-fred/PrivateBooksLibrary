<?php
defined('PBL') or die('nur in der PBL-API verwendbar');
if (!defined('CouchDB')) {
    // https://wiki.apache.org/couchdb/Getting_started_with_PHP

    /* A CouchDB Response Class

    We'll use the following class as a structure for storing and handling responses to our HTTP requests to the DB.
    Instances of this will store response components, namely the headers and body, in appropriately named properties.
    Eventually we might want to do more error checking based on the headers, etc. For this example, we'll be most
    interested in CouchDBResponse::getBody(). It returns either the text of the response or the data structure derived
    from decoding the JSON response based on the method's only parameter, $decode_json. Inside the getBody method,
    we call a static method decode_json that lives in our as-yet-unwritten CouchDB class. We'll get to that soon enough,
    but all it really does in this example is wrap a call to the PHP json extension's json_decode function.
     */

    define('CouchDB', 1);
    class CouchDBResponse {

        private $raw_response = '';
        private $headers = '';
        private $body = '';

        function __construct($response = '') {
            $this->raw_response = $response;
            list($this->headers, $this->body) = explode("\r\n\r\n", $response);
        }

        function getRawResponse() {
            return $this->raw_response;
        }

        function getHeaders() {
            return $this->headers;
        }

        function getBody($decode_json = false) {
            return $decode_json ? CouchDB::decode_json($this->body) : $this->body;
        }
    }

    /* A CouchDB Request Class

    This class will 1) build request headers and assemble the request, 2) send the request and 3) give us the interesting part of the result.
    Following Noah Slater's lead (https://github.com/nslater), we make our requests using fsockopen, which allows us to treat our connection to the CouchDB server as a
    file pointer. When we execute the request, we pass the response on to a new CouchDBRequest object.
     */
    class CouchDBRequest {

        static $VALID_HTTP_METHODS = array('DELETE', 'GET', 'POST', 'PUT');

        private $method = 'GET';
        private $url = '';
        private $data = NULL;
        private $sock = NULL;
        private $username;
        private $password;
        private $type = 'application/json';
        private $attachment = false;
        private $length = 0;

        function __construct($host, $port = 5984, $url, $method = 'GET', $data = NULL, $username = null, $password = null) {
            $method = strtoupper($method);
            $this->host = $host;
            $this->port = $port;
            $this->url = $url;
            $this->method = $method;
            $this->data = $data;
            $this->username = $username;
            $this->password = $password;

            if(!in_array($this->method, self::$VALID_HTTP_METHODS)) {
                throw new CouchDBException('Invalid HTTP method: '.$this->method);
            }
        }

        function getRequest() {
            $req = "{$this->method} {$this->url} HTTP/1.0\r\nHost: {$this->host}\r\n";

            if($this->username || $this->password)
                $req .= 'Authorization: Basic '.base64_encode($this->username.':'.$this->password)."\r\n";

            if($this->data) {
                $req .= 'Content-Type: '.$this->type."\r\n";
                $req .= 'Content-Length: '.(strlen($this->data))."\r\n\r\n";
                $req .= $this->data;//"'".."'\r\n"
            } else {
                $req .= "\r\n";
            }
            //echo '<br />Request:'.$req.'<br />';
            $this->length = strlen($req);
            return $req;
        }

        function setAttachment($data, $type = 'application/json') {
            $this->data = $data;
            $this->type = $type;
            $this->attachment = true;
        }

        private function connect() {
            $this->sock = @fsockopen($this->host, $this->port, $err_num, $err_string);
            if(!$this->sock) {
                throw new CouchDBException('Could not open connection to '.$this->host.':'.$this->port.' ('.$err_string.')');
            }
        }

        private function disconnect() {
            fclose($this->sock);
            $this->sock = NULL;
        }

        private function execute() {
            fwrite($this->sock, $this->getRequest(), $this->length);
            $response = '';
            while(!feof($this->sock)) {
                $response .= fgets($this->sock);
            }
            $this->response = new CouchDBResponse($response);
            return $this->response;
        }

        function send() {
            $this->connect();
            $this->execute();
            $this->disconnect();
            return $this->response;
        }

        function getResponse() {
            return $this->response;
        }
    }

    /* The CouchDB Class

    The CouchDB class provides a send method for sending requests to the CouchDB server. It uses the CouchDBRequest class
    above and returns a CouchDBResponse object. This class also provides a method for fetching all documents in a database,
    using the _all_docs built-in view. I've also included a get_item method for fetching a document with its id. Clearly,
    further abstraction for different types of queries, etc. should follow, but this is enough for us to get at the data in our database.

    Supports HTTP Basic Authentication for the whole session - just provide either the username, password, or both when creating this class.
    The pair is then sent to the CouchDBRequest to be included in the header.
     */

    class CouchDB {

        private $username;
        private $password;

        function __construct($db, $host = 'localhost', $port = 5984, $username = null, $password = null) {
            $this->db = $db;
            $this->host = $host;
            $this->port = $port;
            $this->username = $username;
            $this->password = $password;
        }

        static function decode_json($str) {
            return json_decode($str);
        }

        static function encode_json($str) {
            return json_encode($str);
        }

        function send_raw($url, $method = 'GET', $data = NULL) {
            $url = (substr($url, 0, 1) == '/' ? $url : '/'.$url);
            $request = new CouchDBRequest($this->host, $this->port, $url, $method, $data, $this->username, $this->password);
            return $request->send();
        }

        function send($url, $method = 'GET', $data = NULL) {
            $url = '/'.$this->db.(substr($url, 0, 1) == '/' ? $url : '/'.$url);
            $request = new CouchDBRequest($this->host, $this->port, $url, $method, $data, $this->username, $this->password);
            return $request->send();
        }

        function send_attachment($url, $method = 'GET', $data = NULL, $type = NULL) {
            $url = '/'.$this->db.(substr($url, 0, 1) == '/' ? $url : '/'.$url);
            $request = new CouchDBRequest($this->host, $this->port, $url, $method, NULL, $this->username, $this->password);
            $request->setAttachment($data, $type);
            return $request->send();
        }

        function get_all_docs() {
            return $this->send('/_all_docs');
        }

        function get_item($id) {
            return $this->send('/'.$id);
        }
        function db_create($db, $pass) {
            $view = '{"name": "'.$db.'", "password": "'.$pass.'", "roles": [], "type": "user"}';
            $view_result = $this->send_raw('/_users/org.couchdb.user:'.$db, 'PUT', $view);
            print $view_result->getBody();

            $view_result = $this->send_raw($db, 'PUT');
            print $view_result->getBody();

            $view = '{"admins": {"names": [],"roles": []},"members": {"names": ["xx","'.$db.'"],"roles": []}}';
            $view_result = $this->send('/_security', 'PUT', $view);
            print $view_result->getBody();
        }

        function db_delete($db) {
            $view_result = $this->send_raw($db, 'DELETE');
            $doc = $view_result->getBody(true);
            if (isset($doc->error) && $doc->error != 'not_found') {
                return $doc;
            }
            $view_result = $this->send_raw('/_users/org.couchdb.user:'.$db, 'GET');
            $doc = $view_result->getBody(true);
            if (isset($doc->error)) {
                return $doc;
            }

            $view = '/_users/org.couchdb.user:'.$db. '?rev=' . $doc->_rev;
            //print_r($doc);
            //print_r($view);
            $view_result = $this->send_raw($view, 'DELETE');
            $doc = $view_result->getBody(true);
            return $doc;

        }
    }
}

<!-- Die Encoding-Art enctype MUSS wie dargestellt angegeben werden -->
<form enctype="multipart/form-data" action="/api/request-upload.php" method="POST">
    <!-- MAX_FILE_SIZE muss vor dem Dateiupload Input Feld stehen -->
    <input type="hidden" name="MAX_FILE_SIZE" value="100000000" />
    <!-- Der Name des Input Felds bestimmt den Namen im $_FILES Array -->
    Diese Datei hochladen: <input name="userfile" type="file" />
    <input type="submit" value="Send File" />
</form>

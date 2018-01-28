<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="icon.css">
    <title></title>
</head>
<body style="background-image: linear-gradient(to right, white 0%, black 50%)">
<?php
error_reporting (E_ALL | E_STRICT);  
ini_set ('display_errors', 'On');  

$src_x = 469;
$src_y = 547;
$src_w = 220;
$src_h = 220;
$src_image = imagecreatefrompng('res/vorlage.png');

$im2 = imagecrop($src_image, ['x' => 500, 'y' => 500, 'width' => 220, 'height' => 220]);
if ($im2 !== FALSE) {
    imagepng($im2, 'img/vorlage220.png');
}

function icon($name, $dst_w, $dst_res = 1, $dst_h = 0, $dst_x=0 ,$dst_y=0 ){
	global $src_x, $src_y, $src_w, $src_h, $src_image, $dst_type;
	
	if ($dst_h == 0) $dst_h = $dst_w;
    if ($dst_x == 0) $dst_x = $dst_w;
    if ($dst_y == 0) $dst_y = $dst_h;
	$dst_x1 = ($dst_x - $dst_w) / 2;
	$dst_y1 = ($dst_y - $dst_h) / 2;
	
	echo '<div>'.$dst_x.' x '.$dst_y.' <span>'.$name.'.png</span><br />';
	$dst_image = imagecreatetruecolor($dst_x, $dst_y); //
	imageresolution($dst_image, 72 * $dst_res);// 72 oder 96 richtig??
	$back = imagecolorallocatealpha($dst_image, 0,0,0,127);
	//imagefilledrectangle($dst_image, 0, 0, $dst_x-1, $dst_y-1, $back);
    imagefill($dst_image, 0, 0, $back);
    imagesavealpha($dst_image, TRUE); // it took me a good 10 minutes to figure this part out

	if (imagecopyresampled ($dst_image ,$src_image ,$dst_x1 ,$dst_y1 ,$src_x ,$src_y ,$dst_w ,$dst_h ,$src_w ,$src_h )) {
		imagepng($dst_image, $dst_type.$name.'.png');
	}
	print_r(imageresolution($dst_image)); 
	echo '<img src="'.$dst_type.$name.'.png" /></div>';
}

$dst_type = 'res/screens/ios/';
icon('screen-ipad-landscape', 220, 1, 0, 1024, 768);
icon('screen-ipad-landscape-2x', 440, 2, 0, 2048, 1536);
icon('screen-ipad-portrait', 220, 1, 0, 768, 1024);
icon('screen-ipad-portrait-2x', 440, 2, 0, 1536, 2048);
icon('screen-iphone-568h-2x', 440, 2, 0, 640, 1136);
icon('screen-iphone-landscape-736h', 440, 3, 0, 2208, 1242);
icon('screen-iphone-portrait', 110, 1, 0, 320, 480);
icon('screen-iphone-portrait-2x', 220, 2, 0, 640, 960);
icon('screen-iphone-portrait-667h', 220, 2, 0, 750, 1334);
icon('screen-iphone-portrait-736h', 220, 3, 0, 1242, 2208);

$dst_type = 'res/icons/ios/';
icon('icon-60-3x', 180, 3);
icon('icon-60-2x', 120, 2);
icon('icon-60', 60);
icon('icon-76', 76);
icon('icon-76-2x', 152, 2);
icon('icon-40', 40);
icon('icon-40-2x', 80, 2);
icon('icon', 57);
icon('icon-2x', 114, 2);
icon('icon-57', 57);
icon('icon-57-2x', 114, 2);
icon('icon-72', 72);
icon('icon-72-2x', 144, 2);
icon('icon-167', 167);
icon('icon-small', 29);
icon('icon-small-2x', 58, 2);
icon('icon-50', 50);
icon('icon-50-2x', 100, 2);
icon('icon-83.5-2x', 167, 2);
?>
</body>
</html>

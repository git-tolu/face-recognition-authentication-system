<?php
include "config.php";

if (isset($_POST['database'])) {
    $baseimg = $_POST['database'];
    $sql = "INSERT INTO detected_faces (image) VALUES ('$baseimg')";
    $result = mysqli_query($conn, $sql);
    $imgsrc = "../upload/";
    $image_parts = explode(";base64,", $baseimg);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);
    $fileName = uniqid() . '.jpg';

    $file = $imgsrc . $fileName;
    file_put_contents($file, $image_base64);

    print_r($fileName);
}
<?php
    header("Cache-Control: no-cache, must-revalidate");
    $json = file_get_contents("http://localhost:8888/?base=" . $_GET['base']);
    echo $json;
?>

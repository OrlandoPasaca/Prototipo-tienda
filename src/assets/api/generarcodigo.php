<?php
header("Access-Control-Allow-Origin: *");

$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$sql="select count(codigo_producto) as conteo from productos";   
$respuesta=$conexion->prepare($sql);
$respuesta->execute();
$fila=$respuesta->fetch(PDO::FETCH_ASSOC);
$random=rand(0,1000000);
$codigo_generado=str_pad($fila["conteo"]+1,6,$random,STR_PAD_LEFT);
echo json_encode($codigo_generado);
?>
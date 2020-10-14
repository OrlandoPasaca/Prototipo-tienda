<?php
header("Access-Control-Allow-Origin: *");
if(isset($_GET["codigo_producto"]) AND isset($_GET["codigo_producto"]))
{
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$consulta="SELECT codigo_producto,codigo_barras,nombre_producto,precio_venta_actual,precio_compra_actual,stock_actual from productos 
           where codigo_producto=:codigo_producto OR
           codigo_barras=:codigo_barras";
$respuesta=$conexion->prepare($consulta);
$respuesta->bindValue(":codigo_producto",$_GET["codigo_producto"]);
$respuesta->bindValue(":codigo_barras",$_GET["codigo_barras"]);
$respuesta->execute();

$fila=$respuesta->fetch(PDO::FETCH_ASSOC);

$miobject=new stdClass;
$miobject->codigo_producto=$fila["codigo_producto"];
$miobject->codigo_barras=$fila["codigo_barras"];
$miobject->nombre_producto=$fila["nombre_producto"];
$miobject->precio_venta=$fila["precio_venta_actual"];
$miobject->precio_compra=$fila["precio_compra_actual"];
$miobject->stock_actual=$fila["stock_actual"];

echo json_encode($miobject);
}

?>
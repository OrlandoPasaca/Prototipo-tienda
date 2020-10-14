<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Content-Type");
header("Access-Control-Allow-Methods:PUT");
$method=$_SERVER["REQUEST_METHOD"];
if('PUT'===$method);
{
    try
    {
    $data=file_get_contents('php://input');
    $data=json_decode($data);
    $producto=$data->producto;
    $conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $conexion->exec("SET CHARACTER SET UTF8");
    $consulta="UPDATE productos SET stock_actual=stock_actual + :cantidad,precio_venta_actual=:precio_venta,precio_compra_actual=:precio_compra
    WHERE codigo_barras=:codigo_barras";
    $respuesta=$conexion->prepare($consulta);
    $respuesta->bindValue(":cantidad",$producto->cantidad);
    $respuesta->bindValue(":precio_compra",$producto->precio_compra);
    $respuesta->bindValue(":precio_venta",$producto->precio_unitario);
    $respuesta->bindValue(":codigo_barras",$producto->codigo_barras);
    $respuesta->execute();
    $msj->mensaje="Se ingreso correctamente";
    echo json_encode($msj);
    }
    catch(Exception $e)
    {
        echo json_encode($e);
    }

}
?>
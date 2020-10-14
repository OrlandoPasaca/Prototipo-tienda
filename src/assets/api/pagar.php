<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers:  Content-Type");
header("Access-Control-Allow-Methods:  PUT");


$nombre_producto=[];
$codigo_producto=[];
$cantidad=[];
$method = $_SERVER['REQUEST_METHOD'];
if ('PUT' === $method) {
    $data=file_get_contents('php://input');
    $data=json_decode($data);
    for($x=0;$x<count($data->carrito)-1;$x++)
    {
    $nombre_producto[$x]=$data->carrito[$x]->nombre_producto;
    $codigo_producto[$x]=$data->carrito[$x]->codigo_producto;
    $cantidad[$x]=$data->carrito[$x]->cantidad;
    }

    
try
{
    $conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");

    $conexion->exec("SET CHARACTER SET UTF8");
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $conexion->beginTransaction();
for($y=0;$y<count($nombre_producto);$y++)
{
    $consulta="SELECT stock_actual FROM productos where codigo_producto=:codigo_producto AND nombre_producto=:nombre_producto";
    $respuesta=$conexion->prepare($consulta);
    $respuesta->bindValue(":codigo_producto",$codigo_producto[$y]);
    $respuesta->bindValue(":nombre_producto",$nombre_producto[$y]); 
    $respuesta->execute();
    $fila=$respuesta->fetch(PDO::FETCH_ASSOC);
    $cont_fila=$respuesta->rowCount();
    $stock_actual=$fila["stock_actual"];
    if($cont_fila==1)
    {
    $nuevo_stock=$stock_actual-$cantidad[$y];
    $consulta2="UPDATE productos SET stock_actual=:nuevo_stock WHERE codigo_producto=:codigo_producto";
    $respuesta2=$conexion->prepare($consulta2);
    $respuesta2->bindValue(":codigo_producto",$codigo_producto[$y]);
    $respuesta2->bindValue(":nuevo_stock",$nuevo_stock); 
    $respuesta2->execute();
    }
    else
    {
        $err->$errorInfo="No se encontro un producto ".$nombre_producto[$y]." ".$codigo_producto[$y]." ".$cont_fila;
        echo json_encode($err);
        exit();
    }
}
    $msj->mensaje="Se realizo el pago correctamente";
    echo json_encode($msj);
    $conexion->commit();
}
catch(Exception $e)
{
    $conexion->rollBack();
    echo json_encode($e);
    
}
}


?>
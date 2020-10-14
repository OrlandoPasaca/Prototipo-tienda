<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:  Content-Type");
header("Access-Control-Allow-Methods:  POST");
$method = $_SERVER['REQUEST_METHOD'];
if ('POST' === $method) 
{
    $data=file_get_contents('php://input');
    $data=json_decode($data);
    $carrito=$data->carrito;
    $comentario=$data->comentario;
    $nmovimiento=$data->n_factura;
    $tipo=$data->tipo;
    $costo=$data->costo;
    $conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
    
    $conexion->exec("SET CHARACTER SET UTF8");
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    try{

    $conexion->beginTransaction();
    $sql="INSERT INTO movimientos (nmovimiento,costo,comentario,tipo,fecha,hora) values (:nmovimiento,:costo,:comentario,:tipo,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())";
    $respuesta=$conexion->prepare($sql);
    $respuesta->bindValue(":nmovimiento",$nmovimiento);
    $respuesta->bindValue(":costo",$costo);
    $respuesta->bindValue(":comentario",$comentario);
    $respuesta->bindValue(":tipo",$tipo);
    $respuesta->execute();
    $contador=0;
    for($x=0;$x<count($carrito);$x++)
    {
        $sql2="INSERT INTO detalles_movimientos(nmovimiento,codigo_producto,nombre_producto,cantidad,precio_unitario,total) 
               values (:nmovimiento,:codigo_producto,:nombre_producto,:cantidad,:precio_unitario,:total)";
        $respuesta2=$conexion->prepare($sql2);
        $respuesta2->bindValue(":nmovimiento",$nmovimiento);
        $respuesta2->bindValue(":codigo_producto",$carrito[$x]->codigo_producto);
        $respuesta2->bindValue(":nombre_producto",$carrito[$x]->nombre_producto);
        $respuesta2->bindValue(":cantidad",$carrito[$x]->cantidad);
        $respuesta2->bindValue(":precio_unitario",$carrito[$x]->precio_unitario);
        $respuesta2->bindValue(":total",$carrito[$x]->total);
        $respuesta2->execute();
        if($respuesta2->rowCount()==1)
        {
            $contador++;
        }

    }
    if($contador==count($carrito))
    {
        $msj->mensajemov="Se agrego".$contador;
        echo json_encode($msj);
    }
    $conexion->commit();
}
catch(Exception $e)
{
    $conexion->rollBack();
}
    
    
      
}
?>
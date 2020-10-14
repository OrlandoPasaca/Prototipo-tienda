<?php
header("Access-Control-Allow-Origin: *");
if(isset($_GET["codigo_producto"]) AND isset($_GET["codigo_barras"])  AND isset($_GET["nombre_prod"]))
{
$codigo_producto=$_GET["codigo_producto"];
$codigo_barras=$_GET["codigo_barras"];
$nombre_prod=$_GET["nombre_prod"];
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$conexion->exec("SET CHARACTER SET UTF8");
$consulta="SELECT * from productos 
           WHERE codigo_producto like :codigo_producto
           AND codigo_barras like :codigo_barras
           AND nombre_producto like :nombre_prod";
$respuesta=$conexion->prepare($consulta);
$respuesta->bindValue(":codigo_producto","%".$codigo_producto."%");
$respuesta->bindValue(":codigo_barras","%".$codigo_barras."%");
$respuesta->bindValue(":nombre_prod","%".$nombre_prod."%");
$respuesta->execute();
$miobjct=new ArrayObject(array());
 $cont=$respuesta->rowCount();
if($cont>=1)
{
    while($fila=$respuesta->fetch(PDO::FETCH_ASSOC))
    {
        $producto=new stdClass();
        $producto->codigo_producto=$fila["codigo_producto"];
        $producto->codigo_barras=$fila["codigo_barras"];
        $producto->nombre_producto=$fila["nombre_producto"];
        $producto->precio_compra_actual=$fila["precio_compra_actual"];
        $producto->precio_venta_actual=$fila["precio_venta_actual"];
        $producto->stock_actual=$fila["stock_actual"];
        $producto->estado=$fila["estado"];
        $miobjct->append($producto);
    }
    echo json_encode($miobjct);
}
else
{
      $producto->no_prod="No se encontraron resultados";
      $miobjct->append($producto);
      echo json_encode($miobjct);
}


}


?>

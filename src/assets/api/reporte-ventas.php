<?php
header("Access-Control-Allow-Origin: *");
if(isset($_GET["codigo"]) AND isset($_GET["desde"]) AND isset($_GET["hasta"]))
{
    $conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
    $conexion->exec("SET CHARACTER SET UTF8");
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    if($_GET["codigo"]=="todo")
    {
        $sql2="SELECT * from movimientos INNER JOIN detalles_movimientos 
        on movimientos.nmovimiento=detalles_movimientos.nmovimiento
        WHERE movimientos.fecha BETWEEN :desde AND :hasta";
        $respuesta=$conexion->prepare($sql2);
    }
    else
    {
        $sql2="SELECT * from movimientos INNER JOIN detalles_movimientos 
        on movimientos.nmovimiento=detalles_movimientos.nmovimiento
        WHERE movimientos.fecha BETWEEN :desde AND :hasta
        AND detalles_movimientos.codigo_producto=:codigo_producto";
        $respuesta=$conexion->prepare($sql2);
        $respuesta->bindValue(":codigo_producto",$_GET["codigo"]);
    }
    $respuesta->bindValue(":desde",$_GET["desde"]);
    $respuesta->bindValue(":hasta",$_GET["hasta"]);
    $respuesta->execute();
    $myobj=new ArrayObject(array());
    while($fila=$respuesta->fetch(PDO::FETCH_ASSOC))
    {
        $reporte=new stdClass();
        $reporte->nmovimiento=$fila["nmovimiento"];
        $reporte->codigo_producto=$fila["codigo_producto"];
        $reporte->nombre_producto=$fila["nombre_producto"];
        $reporte->precio_unitario=$fila["precio_unitario"];
        $reporte->cantidad=$fila["cantidad"];
        $reporte->total=$fila["total"];
        $reporte->costo=$fila["costo"];
        $reporte->tipo=$fila["tipo"];
        $reporte->comentario=$fila["comentario"];
        $reporte->fecha=$fila["fecha"];
        $reporte->hora=$fila["hora"];

        $myobj->append($reporte);
    }
    echo json_encode($myobj);

}
?>
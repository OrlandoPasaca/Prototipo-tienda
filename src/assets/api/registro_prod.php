<?php
header("Access-Control-Allow-Origin: *");
$codigo_generado;
if(isset($_POST["cod_barras"]) AND isset($_POST["cod_producto"]) AND isset($_POST["nombre_prod"]) AND isset($_POST["precio_compra"]) AND isset($_POST["precio_venta"]) AND isset($_POST["ganancia"]) AND isset($_POST["stock"]) AND isset($_POST["estado"]))
{
$myobject->cod_barras=$_POST["cod_barras"];
$myobject->cod_producto=$_POST["cod_producto"];
$myobject->nombre_prod=$_POST["nombre_prod"];
$myobject->precio_compra=$_POST["precio_compra"];
$myobject->precio_venta=$_POST["precio_venta"];
$myobject->ganancia=$_POST["ganancia"];
$myobject->stock=$_POST["stock"];
$myobject->estado=$_POST["estado"];
try
{
    
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$sql2="select codigo_producto from productos WHERE codigo_producto=:codigo_producto";
$respuesta=$conexion->prepare($sql2);
$respuesta->bindValue("codigo_producto",$_POST["cod_producto"]);
$respuesta->execute();
if($respuesta->fetchColumn()>=1)
{
    $codigo_generado=rand(0,100000);
    $codigo_generado=str_pad(1,6,$codigo_generado,STR_PAD_LEFT);
}
else
{
    $codigo_generado=$_POST["cod_producto"];
}

$myobject->cod_producto=$codigo_generado;


$sql="INSERT INTO productos (codigo_producto,codigo_barras,nombre_producto,precio_compra_actual,precio_venta_actual,ganancia_actual,stock_actual,estado) 
values (:codigo_producto,:codigo_barras,:nombre_producto,:precio_compra_actual,:precio_venta_actual,:ganancia_actual,:stock_actual,:estado)";
$request=$conexion->prepare($sql);
$request->bindValue("codigo_producto",$_POST["cod_producto"]);
$request->bindValue("codigo_barras",$_POST["cod_barras"]);
$request->bindValue("nombre_producto",$_POST["nombre_prod"]);
$request->bindValue("precio_compra_actual",$_POST["precio_compra"]);
$request->bindValue("precio_venta_actual",$_POST["precio_venta"]);
$request->bindValue("ganancia_actual",$_POST["ganancia"]);
$request->bindValue("stock_actual",$_POST["stock"]);
$request->bindValue("estado",$_POST["estado"]);
$request->execute();
echo json_encode($myobject);
}
catch(Exception $e)
{
    echo json_encode($e);
}

}
?>
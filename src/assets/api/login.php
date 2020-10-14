<?php
header("Access-Control-Allow-Origin: *");
if(isset($_POST["usuario"]) and isset($_POST["contrasena"]));
{
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_tienda","hiddenso_opr97","949336111Or");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$conexion->exec("SET CHARACTER SET UTF8");
$consulta="select id,usuario from users where usuario=:usuario and contrasena=:contrasena";
$respuesta=$conexion->prepare($consulta);
$respuesta->bindValue(":usuario",$_POST["usuario"]);
$respuesta->bindValue(":contrasena",$_POST["contrasena"]);
$respuesta->execute();
$miarray=new stdClass();
while($fila=$respuesta->fetch(PDO::FETCH_ASSOC))
{
    $miarray->id=$fila["id"];
    $miarray->usuario=$fila["usuario"];
}
echo $miarray;
}

?>

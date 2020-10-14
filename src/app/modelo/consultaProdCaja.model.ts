export class ConsultaProdCajaModel
{
    codigo_barras:number;
    codigo_producto:number;
    nombre_producto:string;
    cantidad:number;
    precio_unitario:number;
    total:number;
    constructor(){}
    get getCodigoBarras()
    {
        return this.codigo_barras;
    }
    set setCodigoBarras(codigo_barras:number)
    {
        this.codigo_barras=codigo_barras;
    }
    get getCodigoProducto()
    {
        return this.codigo_producto;
    }
    set setCodigoProducto(codigo_producto:number)
    {
        this.codigo_producto=codigo_producto;
    }
    get getNombreProducto()
    {
        return this.nombre_producto;
    }
    set setNombreProducto(nombre_producto:string)
    {
        this.nombre_producto=nombre_producto;
    }
    get getCantidad()
    {
        return this.cantidad;
    }
    set setCantidad(cantidad:number)
    {
        this.cantidad=cantidad;
    }
    get getPrecioUnitario()
    {
        return this.precio_unitario;
    }
    set setPrecioUnitario(precio_unitario:number)
    {
        this.precio_unitario=precio_unitario;
    }
    get getTotal()
    {
        return this.total;
    }
    set setTotal(total:number)
    {
        this.total=total;
    }
}
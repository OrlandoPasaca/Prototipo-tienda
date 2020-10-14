export class IngresoProductoModel
{
    private codigo_barras:number;
    private codigo_producto:number;
    private nombre_producto:string;
    private precio_compra:number;
    private precio_unitario:number;
    private ganancia:number;
    private cantidad:number;
    private total:number;
    public static readonly estado:number=3;
    constructor()
    {
     this.nombre_producto="";
     this.precio_compra=0;
     this.precio_unitario=0;
     this.ganancia=this.precio_unitario-this.precio_compra;
     this.cantidad=0;
    }
    get getcodigo_barras()
    {
        return this.codigo_barras;
    }
    set setcodigo_barras(codigo_barras:number)
    {
        this.codigo_barras=codigo_barras;
    }
    get getcodigo_producto()
    {
        return this.codigo_producto;
    }
    set setcodigo_producto(codigo_producto:number)
    {
        this.codigo_producto=codigo_producto;
    }
    get getnombre_producto()
    {
        return this.nombre_producto;
    }
    set setnombre_producto(nombre_producto:string)
    {
        this.nombre_producto=nombre_producto;
    }
    get getPrecio_Compra()
    {
        return this.precio_compra;
    }
    set setPrecio_Compra(precio_compra:number)
    {
        this.precio_compra=precio_compra;
    }
    get getprecio_unitario()
    {
        return this.precio_unitario;
    }
    set setprecio_unitario(precio_unitario:number)
    {
        this.precio_unitario=precio_unitario;
        this.total=this.precio_unitario*this.cantidad;
    }
    get getGanancia()
    {
        this.ganancia=this.precio_unitario-this.precio_compra
        return this.ganancia;
    }
    set setcantidad(cantidad:number)
    {
        this.cantidad=cantidad;
        this.total=this.precio_unitario*this.cantidad;
    }
    get getcantidad()
    {
        return this.cantidad;
    }
    get getTotal()
    {
        return this.total;
    }
}
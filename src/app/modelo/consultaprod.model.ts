export class ConsultaProdModel
{
    private codigo_barras:number;
    private codigo_producto:number;
    private nombre_prod:string;
    constructor(){}

    get getCodigoBarras():number
    {
        return this.codigo_barras;
    }
    set setCodigoBarras(codigo_barras:number)
    {
        this.codigo_barras=codigo_barras;
    }
    get getCodigoProducto():number
    {
        return this.codigo_producto;
    }
    set setCodigoProducto(codigo_producto:number)
    {
        this.codigo_producto=codigo_producto;
    }
    get getNombreProd():string
    {
        return this.nombre_prod;
    }
    set setNombreProd(nombre_prod:string)
    {
        this.nombre_prod=nombre_prod;
    }
}
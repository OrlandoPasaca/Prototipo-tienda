export class ReporteVentasModel
{
    private codigo:number;
    private desde:Date;
    private hasta:Date;
    constructor()
    {
        this.codigo=null;
        this.desde=new Date();
        this.hasta=new Date();
    }
    get getcodigo():number
    {
        return this.codigo;
    }
    set setcodigo(codigo:number)
    {
        this.codigo=codigo;
    }
    get getdesde():Date
    {
        return this.desde;
    }
    set setdesde(desde:Date)
    {
        this.desde=desde;
    }
    get gethasta():Date
    {
        return this.hasta;
    }
    set sethasta(hasta:Date)
    {
        this.hasta=hasta;
    }
}
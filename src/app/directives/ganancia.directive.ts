import { Directive, Output, EventEmitter, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appGanancia]'
})
export class GananciaDirective {

  constructor() { }
  @Input () ganancia;
  @Output () cambio:EventEmitter<any>=new EventEmitter();
  @HostListener("change",["$event"])
  public onChange(event:any)
  {
    this.cambio.emit(this.ganancia);
  }

}

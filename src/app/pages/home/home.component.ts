import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { EstadosFinancierosComponent } from '../../components/estados-financieros/estados-financieros.component';
import { InversionCapitalComponent } from '../../components/inversion-capital/inversion-capital.component';
import { PagosComponent } from '../../components/pagos/pagos.component';
import { ComprasComponent } from '../../components/compras/compras.component';
import { VentasComponent } from 'src/app/components/ventas/ventas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public mensajeBienvenida = true;
  public fecha = new Date();
  // obtenemos referencias del componente a añadir
  @ViewChild('content', { static: true, read: ViewContainerRef}) containerHome;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

      const primerDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), 1);
      const ultimoDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);

      console.log('El primer día es: ' + this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + primerDia.getDate());
      console.log('El ultimo día es: ' + this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + ultimoDia.getDate());
  }

  obtenerEstadosFinancieros() {
    this.mensajeBienvenida = false;
    // insertar componente dinamicamente a la plantilaa
    const factory = this.componentFactoryResolver.resolveComponentFactory(EstadosFinancierosComponent);
    this.containerHome.clear();
    const dyynamicComponent = this.containerHome.createComponent(factory).instance as EstadosFinancierosComponent;
  }

  obtenerInversionCapital() {
    this.mensajeBienvenida = false;
    // insertar componente dinamicamente a la plantilaa
    const factory = this.componentFactoryResolver.resolveComponentFactory(InversionCapitalComponent);
    this.containerHome.clear();
    const dyynamicComponent = this.containerHome.createComponent(factory).instance as InversionCapitalComponent;
  }

  obtenerModuloPagos() {
    this.mensajeBienvenida = false;
    // insertar componente dinamicamente a la plantilaa
    const factory = this.componentFactoryResolver.resolveComponentFactory(PagosComponent);
    this.containerHome.clear();
    const dyynamicComponent = this.containerHome.createComponent(factory).instance as PagosComponent;
  }

  obtenerModuloCompras() {
    this.mensajeBienvenida = false;
    // insertar componente dinamicamente a la plantilaa
    const factory = this.componentFactoryResolver.resolveComponentFactory(ComprasComponent);
    this.containerHome.clear();
    const dyynamicComponent = this.containerHome.createComponent(factory).instance as ComprasComponent;
  }

  obtenerModuloVentas() {
    this.mensajeBienvenida = false;
    // insertar componente dinamicamente a la plantilaa
    const factory = this.componentFactoryResolver.resolveComponentFactory(VentasComponent);
    this.containerHome.clear();
    const dyynamicComponent = this.containerHome.createComponent(factory).instance as VentasComponent;
  }

}

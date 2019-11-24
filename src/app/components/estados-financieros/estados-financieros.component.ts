import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-estados-financieros',
  templateUrl: './estados-financieros.component.html',
  styleUrls: ['./estados-financieros.component.css']
})
export class EstadosFinancierosComponent implements OnInit {

  // ---------------------------------------
  public catalogos: any = [];
  public balanceComprobacion: any = [];
  public tCDebe = 0;
  public tCHaber = 0;
  // ---------------------------------------
  public fecha = new Date();
  public fInicial = '';
  public fFinal = '';


  constructor(private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
    const primerDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), 1);
    const ultimoDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);

    console.log('El primer día es: ' + this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + primerDia.getDate());
    console.log('El ultimo día es: ' + this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + ultimoDia.getDate());
    this.fInicial = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + primerDia.getDate();
    this.fFinal = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + ultimoDia.getDate();

    this.getEfectivo();
  }


  getEfectivo() {
    const data = {
      cuenta: 'efectivo',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getInventario();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getInventario() {
    const data = {
      cuenta: 'inventario',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // .log(this.catalogos);
      // this.calcularCuentasBalanceComprobacio();
      this.getCompras();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getCompras() {

    const data = {
      cuenta: 'mercaderia',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getInsumos();
    }, (error) => {
      console.log('error is ', error);
    });

  }

  getInsumos() {

    const data = {
      cuenta: 'insumo',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // .log(this.catalogos);
      this.getLocal();
    }, (error) => {
      console.log('error is ', error);
    });

  }

  getLocal() {
    const data = {
      cuenta: 'local',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getIvaCredito();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getIvaCredito() {
    const data = {
      cuenta: 'iva_credito_fiscal',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getIvaDebito();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getIvaDebito() {
    const data = {
      cuenta: 'iva_debito_fiscal',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getcuentaPorPagar();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getcuentaPorPagar() {
    const data = {
      cuenta: 'por_pagar',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getCapital()
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getCapital() {
    const data = {
      cuenta: 'capital',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getIngresoPorVenta();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getIngresoPorVenta() {
    const data = {
      cuenta: 'ingreso_venta',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getGastosPorSalario();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getGastosPorSalario() {
    const data = {
      cuenta: 'gasto_salario',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.getGastosPorfletes();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  getGastosPorfletes() {
    const data = {
      cuenta: 'gasto_transporte',
      fechaInicial: this.fInicial,
      fechaFinal: this.fFinal,

    };
    this.http.post('http://157.230.134.78:5000/get-cuenta', data).subscribe((response: any) => {

      this.catalogos.push(response);
      // console.log(this.catalogos);
      this.calcularCuentasBalanceComprobacio();
    }, (error) => {
      console.log('error is ', error);
    });
  }

  // tslint:disable-next-line: comment-format
  //**************************************************************************************************************** */

  calcularCuentasBalanceComprobacio() {

    // tslint:disable-next-line: forin
    for (let i in this.catalogos) {
      // tslint:disable-next-line: prefer-const
      let cuenta = {
        debe: 0,
        haber: 0,
        deudor: 0,
        acreedor: 0,
        nombre: ''
      };

      // sumar los valores
      // tslint:disable-next-line: forin
      for (let j in this.catalogos[i]) {
        // tslint:disable-next-line: no-string-literal
        cuenta.nombre = this.catalogos[i][j]['nombre'];
        // tslint:disable-next-line: no-string-literal
        cuenta.debe += this.catalogos[i][j]['debe'];
        // tslint:disable-next-line: no-string-literal
        cuenta.haber += this.catalogos[i][j]['haber'];
      }

      if (cuenta.debe > cuenta.haber) {
        cuenta.deudor = cuenta.debe - cuenta.haber;
      }  else {
        cuenta.acreedor = cuenta.haber - cuenta.debe;
      }

      this.balanceComprobacion.push(cuenta);
    }

    // console.log('total cuenta', this.balanceComprobacion);

    // tslint:disable-next-line: forin
    for (let i in this.balanceComprobacion) {
      this.tCDebe += this.balanceComprobacion[i].debe;
      this.tCHaber += this.balanceComprobacion[i].haber;
    }
  }



  openDialog(title: string, body: string) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title,
        body
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
    });
  }

}

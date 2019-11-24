import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  public fecha = new Date();
  public fe = '';
  public selected = '';
  public selectedTrans = '';
  public dinPago = '';
  public transPorPagar: any;
  public ver = false;
  public code = '';

  constructor(private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://157.230.134.78:5000/get-cuenta-pagar').subscribe((response: any) => {
      console.log(response);
      this.transPorPagar = response;
    }, (error) => {
      console.log('error is ', error);
    });
  }

  ingresarPago() {
    if (this.fecha !== undefined) {

      switch (this.selected) {
        case '1':
          console.log("opcion 1");
          this.pagoLocal();
          break;
        case '2':
            console.log("opcion 2");
            this.cuentaPorPagar();
            break;
        case '3':
          // this.generadorId();
          console.log("opcion 3");
          // tslint:disable-next-line: max-line-length
          this.pagos('catalogo_gasto_salario', 'catalogo_iva_credito_fiscal', 'catalogo_efectivo', 'pago de fletes', this.generadorId() , this.dinPago);
          break;
        case '4':
          // this.generadorId();
          console.log("opcion 4");
          // tslint:disable-next-line: max-line-length
          this.pagosSinIva('catalogo_gasto_salario', 'catalogo_efectivo', 'Desarrolladores', this.generadorId() , this.dinPago);
          break;
        case '5':
          // this.generadorId();
          console.log("opcion 5");
          // tslint:disable-next-line: max-line-length
          this.pagosSinIva('catalogo_gasto_salario', 'catalogo_efectivo', 'Administración', this.generadorId() , this.dinPago);
          break;
      }
    } else {
      this.openDialog('Advertencia', 'Seleccione una fecha válida');
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

  pagoLocal() {

    const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();
    // console.log(fConcat);
    console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      dinero: this.dinPago,
      fecha: fConcat,
    };
    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:5000/pago-local', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {
      this.dinPago = '';
      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });
  }

  cuentaPorPagar() {

    const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();
    // console.log(fConcat);
    console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      dinero: this.dinPago,
      fecha: fConcat,
      codigo: this.selectedTrans
    };
    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:5000/cuentas-pagar', data).subscribe((response) => {
     console.log(response);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {
      this.dinPago = '';
      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });
  }

  onChange(deviceValue) {
    console.log(deviceValue.value);
    this.selected = deviceValue.value;
    if (deviceValue.value === '2') {
      console.log('si es 2');
      this.ver = true;
    } else {
      this.ver = false;
    }
  }

  pagos(cGasto: string, cIva: string, cSalida, cDetalle: string, cCodigo: string, din: string) {

    const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();

    // console.log(fConcat);
    // console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      cuentaGasto: cGasto,
      cuentaIVaFiscal: cIva,
      cuentaSalida: cSalida,
      dinero: din,
      fecha: fConcat,
      detalle: cDetalle,
      codigo: cCodigo
    };

    this.http.post('http://157.230.134.78:5000/pagos', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {

      this.dinPago = '';

      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });
  }

  pagosSinIva(cGasto: string, cSalida, cDetalle: string, cCodigo: string, din: string) {
    const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();

    // console.log(fConcat);
    // console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      cuentaGasto: cGasto,
      cuentaSalida: cSalida,
      dinero: din,
      fecha: fConcat,
      detalle: cDetalle,
      codigo: cCodigo
    };

    this.http.post('http://157.230.134.78:5000/pagos-sin-iva', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {

      this.dinPago = '';

      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });
  }

  generadorId() {
    const tam = 8;
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < tam; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.code = result;
    this.fe = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();

    return result;
  }


}

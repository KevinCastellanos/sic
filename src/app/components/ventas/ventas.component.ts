import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public code = '';
  public num = '';
  public nombre = '';
  public concepto = '';
  public cantidad = '';
  public iva = '';
  public total = '';
  public fecha = new Date();
  public fe = '';
  constructor(private dialog: MatDialog,
              private http: HttpClient) {

  }

  ngOnInit() {
    this.generadorId();

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
  }

  ingresarVenta( ) {
    // tslint:disable-next-line: max-line-length
    this.venta('catalogo_ingreso_venta', 'catalogo_iva_debito_fiscal', 'catalogo_efectivo', 'nombre: ' + this.nombre + ', descripcion: ' + this.concepto, this.code, this.cantidad);
  }

  OnInput(event: any) {
    console.log('evento');
    console.log( event);
  }
  onKeydownEvent(event: KeyboardEvent): void {
    // console.log(event.key);

    // tslint:disable-next-line: no-unused-expression
    if (event.key !== 'Backspace' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Enter') {
      this.cantidad += event.key;
      // console.log(this.cantidad.length);
    } else {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        this.cantidad = this.cantidad.slice(0, -1);
      } else {

      }
    }
    console.log(this.cantidad);

    this.iva = String(Number(this.cantidad) * 0.13).substr(0, 6);
    this.total = String(Number(this.cantidad) + Number(this.iva));
 }

 venta(vVenta: string, vIva: string, vEfectivo, cDetalle: string, cCodigo: string, din: string) {

  const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();

  // console.log(fConcat);
  // console.log('selected' + this.selected);
  // console.log(this.dinPago);

  const data = {
    cuentaVenta: vVenta,
    cuentaIVaDevito: vIva,
    cuentaEfectivo: vEfectivo,
    dinero: din,
    fecha: fConcat,
    detalle: cDetalle,
    codigo: cCodigo
  };

  this.http.post('http://157.230.134.78:5000/venta', data).subscribe((response) => {
   // console.log(response['affectedRows']);

   // tslint:disable-next-line: no-string-literal
   if (response['affectedRows'] === 1) {

      this.openDialog('OK', 'Transaccion guardado correctamente');
    } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
    }
    }, (error) => {
      console.log('error is ', error);
    });

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

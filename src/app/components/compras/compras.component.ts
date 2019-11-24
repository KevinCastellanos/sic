import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public fechaCredito: Date;
  public dinCompraCredito = '';
  public descripcionCredito = '';
  public selectedCredito = '';
  public codigoCredito = '';

  public fechaContado: Date;
  public dinCompraContado = '';
  public descripcionContado = '';
  public selectedContado = '';
  public codigoContado = '';

  constructor(private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
  }

  ingresarCompraCredito() {

    if (this.fechaCredito !== undefined) {

      switch (this.selectedCredito) {
        case '1':
          // tslint:disable-next-line: max-line-length
          this.compraC('catalogo_insumo', 'catalogo_iva_credito_fiscal', 'catalogo_por_pagar', this.descripcionCredito, this.codigoCredito, this.dinCompraCredito);
          break;
        case '2':
          // this.compraMercaderiaCredito();
          // tslint:disable-next-line: max-line-length
          this.compraC('catalogo_mercaderia', 'catalogo_iva_credito_fiscal', 'catalogo_por_pagar', this.descripcionCredito, this.codigoCredito, this.dinCompraCredito);
          break;
      }
    } else {
      this.openDialog('Advertencia', 'Seleccione una fecha válida');
    }
  }

  ingresarComprasAlContado() {

    if (this.fechaContado !== undefined) {

      switch (this.selectedContado) {
        case '1':
          // insumos
          // tslint:disable-next-line: max-line-length
          this.compra('catalogo_insumo', 'catalogo_iva_credito_fiscal', 'catalogo_efectivo', this.descripcionContado, this.codigoContado, this.dinCompraContado);
          break;
        case '2':
          // mercaderia
          // tslint:disable-next-line: max-line-length
          this.compra('catalogo_mercaderia', 'catalogo_iva_credito_fiscal', 'catalogo_efectivo', this.descripcionContado, this.codigoContado, this.dinCompraContado);
          break;
      }
    } else {
      this.openDialog('Advertencia', 'Seleccione una fecha válida');
    }
  }

  compra(cCompra: string, cIva: string, cSalida, cDetalle: string, cCodigo: string, din: string) {

    const fConcat =  this.fechaContado.getFullYear() + '-' + (this.fechaContado.getMonth() + 1) + '-' + this.fechaContado.getDate();

    // console.log(fConcat);
    // console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      cuentaCompra: cCompra,
      cuentaIVaFiscal: cIva,
      cuentaSalida: cSalida,
      dinero: din,
      fecha: fConcat,
      detalle: cDetalle,
      codigo: cCodigo
    };

    this.http.post('http://157.230.134.78:5000/compra-contado', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {

      this.dinCompraContado = '';
      this.codigoContado = '';
      this.descripcionContado = '';

      this.dinCompraCredito = '';
      this.codigoCredito = '';
      this.descripcionCredito = '';

      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });

  }

  compraC(cCompra: string, cIva: string, cSalida, cDetalle: string, cCodigo: string, din: string) {

    const fConcat =  this.fechaCredito.getFullYear() + '-' + (this.fechaCredito.getMonth() + 1) + '-' + this.fechaCredito.getDate();

    // console.log(fConcat);
    // console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      cuentaCompra: cCompra,
      cuentaIVaFiscal: cIva,
      cuentaSalida: cSalida,
      dinero: din,
      fecha: fConcat,
      detalle: cDetalle,
      codigo: cCodigo
    };

    this.http.post('http://157.230.134.78:5000/compra-contado', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {

      this.dinCompraContado = '';
      this.codigoContado = '';
      this.descripcionContado = '';

      this.dinCompraCredito = '';
      this.codigoCredito = '';
      this.descripcionCredito = '';

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

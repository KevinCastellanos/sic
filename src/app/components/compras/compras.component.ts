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
  public selectedCredito = '';

  public fechaContado: Date;
  public dinCompraContado = '';
  public selectedContado = '';

  constructor(private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
  }

  ingresarCompraCredito() {

    if (this.fechaCredito !== undefined) {

      switch (this.selectedCredito) {
        case '1':
          this.compraInsumoCredito();
          break;
      }
    } else {
      this.openDialog('Advertencia', 'Seleccione una fecha válida');
    }
  }

  ingresarComprasAlContado() {

    if (this.fechaContado !== undefined) {

      switch (this.selectedCredito) {
        case '1':
          this.compraInsumoContado();
          break;
      }
    } else {
      this.openDialog('Advertencia', 'Seleccione una fecha válida');
    }
  }

  compraInsumoContado() {

    const fConcat =  this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();
    // console.log(fConcat);
    // console.log('selected' + this.selected);
    // console.log(this.dinPago);

    const data = {
      dinero: this.dinCompraCredito,
      fecha: fConcat,
    };

    this.http.post('http://157.230.134.78:5000/compra-insumo-contado', data).subscribe((response) => {
     // console.log(response['affectedRows']);

     // tslint:disable-next-line: no-string-literal
     if (response['affectedRows'] === 1) {
      this.dinCompraCredito = '';
      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });

  }

  compraInsumoCredito() {

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

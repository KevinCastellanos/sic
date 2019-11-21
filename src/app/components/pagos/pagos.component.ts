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

  public fecha: Date;
  public selected = '';
  public dinPago = '';
  constructor(private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
  }

  ingresarPago() {
    if (this.fecha !== undefined) {

      switch (this.selected) {
        case '1':
          console.log("opcion 1");
          this.pagoLocal();
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

}

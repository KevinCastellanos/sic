import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-inversion-capital',
  templateUrl: './inversion-capital.component.html',
  styleUrls: ['./inversion-capital.component.css']
})
export class InversionCapitalComponent implements OnInit {
  public dinCapital = '';
  public dinMercaderia = '';

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  ingresarCapital() {

    const data = {
      dinero: this.dinCapital
    };
    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:5000/guardar-inversion', data).subscribe((response) => {
     console.log(response['affectedRows']);

     if (response['affectedRows'] === 1) {
      this.dinCapital = '';
      this.openDialog('OK', 'Transaccion guardado correctamente');
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
     }
    }, (error) => {
      console.log('error is ', error);
    });
  }

  ingresarInversionInventario() {

    const data = {
      dinero: this.dinMercaderia
    };
    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:5000/inversion-inventario', data).subscribe((response) => {
     console.log(response['affectedRows']);

     if (response['affectedRows'] === 1) {
      this.dinMercaderia = '';
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

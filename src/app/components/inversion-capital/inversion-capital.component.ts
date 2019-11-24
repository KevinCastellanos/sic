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
  public ifInversion = 0;
  public ifInventario = 0;
  public fecha = new Date();
  public fe = '';

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fe = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate();
  }

  ingresarCapital() {
    this.ifInventario = 1;

    const data = {
      dinero: this.dinCapital,
      fecha: this.fe
    };

    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:5000/guardar-inversion', data).subscribe((response) => {

      console.log(response['affectedRows']);

      if (response['affectedRows'] === 1) {
        this.dinCapital = '';
        this.openDialog('OK', 'Transaccion guardado correctamente');
        this.ifInventario = 0;
      } else {
        this.openDialog('ERROR', 'Error al guardar la transacción');
        this.ifInventario = 0;
      }
      }, (error) => {
        console.log('error is ', error);
      });
  }

  ingresarInversionInventario() {
    this.ifInventario = 1;
    const data = {
      dinero: this.dinMercaderia
    };
    // http post
    // tslint:disable-next-line: max-line-length
    this.http.post('http://157.230.134.78:7500/inversion-inventario', data).subscribe((response) => {
     console.log(response['affectedRows']);

     if (response['affectedRows'] === 1) {
      this.dinMercaderia = '';
      this.openDialog('OK', 'Transaccion guardado correctamente');
      this.ifInventario = 0;
     } else {
      this.openDialog('ERROR', 'Error al guardar la transacción');
      this.ifInventario = 0;
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

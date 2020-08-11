import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs'; // {Observable, of}
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page : number): Observable<any> {
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) => {
          console.log('ClienteService: tap1');
          (response.content as Cliente[]).forEach( cliente => {
            console.log(cliente.nombre);
          })
      }),
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            //cliente.apellido = cliente.apellido.toUpperCase();
            let datePipe = new DatePipe('es');
              //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');//formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
            return cliente;
          }
        );
        return response;
      }
    ),
    tap(response => {
        console.log('ClienteService: tap2');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        })
    })
    );
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('error al editar', e.error.mensaje, 'error');
          return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<Cliente> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  /*
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);

  }
  */

}

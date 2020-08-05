import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  //private clienteService: ClienteService;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {
    //this.clienteService = clienteService;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
    let page: number = +params.get('page');
    if (!page){
      page = 0;
    }
    this.clienteService.getClientes(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent: tap3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(response => {
      this.clientes = (response.content as Cliente[])
      this.paginador = response;
    });
      /*function (clientes){
        this.clientes = clientes
      }*/
    });
  }

  delete(cliente: Cliente): void {
      Swal.fire({
        title: 'Estas seguro?',
        text: `Guarda que se borra ${cliente.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo ya fue!'
      }).then((result) => {
        if (result.value) {
          this.clienteService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli => cli != cliente)
              Swal.fire(
                'Cliente Eliminado!',
                `El cliente ${cliente.nombre} se elimino correctamente`,
                'success'
              )
            }
          )
        }
      })
  }
}

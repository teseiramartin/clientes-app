import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  //private clienteService: ClienteService;

  constructor(private clienteService: ClienteService) {
    //this.clienteService = clienteService;
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
      /*function (clientes){
        this.clientes = clientes
      }*/

  }

}

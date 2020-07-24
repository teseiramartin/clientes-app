import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: String = "Crear cliente"

  constructor(public clienteServie: ClienteService, public router: Router,
    public activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteServie.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    this.clienteServie.create(this.cliente).subscribe(cliente =>{
      this.router.navigate(['./clientes'])
      swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
    }
  );
  }

  public update(): void{
    this.clienteServie.update(this.cliente).subscribe(cliente =>{
      this.router.navigate(['./clientes'])
      swal.fire('Cliente Atualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
    }
  );
  }

  /*public delete(): void{
    this.clienteServie.delete(this.cliente.id).subscribe(cliente =>{
      this.router.navigate(['./clientes'])
      swal.fire('Cliente Atualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'warning')
    }
  );
}*/
}

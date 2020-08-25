import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  regiones: Region[];
  public titulo: String = "Crear cliente";

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
    });
    this.clienteServie.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public create(): void{
    this.clienteServie.create(this.cliente).subscribe(json =>{
      this.router.navigate(['./clientes'])
      swal.fire('Nuevo Cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
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

  compararRegion(o1: Region, o2: Region){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null? false: o1.id===o2.id;
  }
}

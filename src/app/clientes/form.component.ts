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
    this.cliente.facturas=null;
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteServie.getCliente(id).subscribe( (cliente) => {
          //console.log(cliente);
          this.cliente = cliente} )
      }
    });
    this.clienteServie.getRegiones().subscribe(regiones => {
      console.log(regiones);
      /*regiones.push({id:0, nombre:"seleccione una region"});
      regiones.sort((a, b) => a.id - b.id);*/
      //let regiones2 = regiones.reverse;
      this.regiones= regiones;
    });
  }

  public create(): void{
    this.cliente.facturas=null;
    this.clienteServie.create(this.cliente).subscribe(json =>{
      this.router.navigate(['./clientes'])
      swal.fire('Nuevo Cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
    }
  );
  }

  public update(): void{
    this.cliente.facturas=null;
    this.clienteServie.update(this.cliente).subscribe(cliente =>{
      this.router.navigate(['./clientes'])
      swal.fire('Cliente Atualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
      }
    );
  }

  clienteVacio(){
    //console.log(this.cliente.id);
    return this.cliente.id === undefined;
  }

  compararRegion(o1: Region, o2: Region){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null? false: o1.id===o2.id;
  }
}

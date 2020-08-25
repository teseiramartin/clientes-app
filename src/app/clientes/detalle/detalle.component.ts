import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;

  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(public clienteService: ClienteService,
    public modalService: ModalService) { }

  ngOnInit(): void { }

  seleccionarFoto(event: any){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire("Error: Seleccionar imagen", 'El archivo debe ser del tipo imagen','error');
      this.fotoSeleccionada=null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal.fire('Error: Upload', 'Debe selleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.modalService.notificarUpload.emit(this.cliente);
        swal.fire('La foto se ha subido completamente!', 'La foto se ha subido con éxito', 'success');
    });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    //this.progreso = 0;
  }


  /*subirFoto() {

  if (!this.fotoSeleccionada) {
    swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
  } else {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;

          this.modalService.notificarUpload.emit(this.cliente);
          swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
        }
      });
    }
  }*/



}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ClienteServicio } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, RouterLink, AlertComponent],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent implements OnInit {
  
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  
  id!: string;
  alertVisible: boolean = false;
  @ViewChild("clienteForm") clienteForm !: NgForm;
  
  constructor(private clienteServicio: ClienteServicio,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'] //obtengo id cliente de la ruta
    
    await this.obtenerCliente();
    console.log(this.cliente);
  }
  
  async obtenerCliente(): Promise<void> {
    this.cliente = await this.clienteServicio.getCliente(this.id)
  }

  guardar(formCliente: NgForm) {
    if (formCliente.invalid) {
      //Error en formulario 
      this.alertVisible = true;
    } 
    else {
      console.log("guardar cliente editado");
      this.clienteServicio.updateCliente(this.id, this.cliente);
      this.clienteForm.resetForm();
      this.router.navigate(['/'])
    }
  }
  
  alertCambioVisibilidad(esVisible: boolean) {
    this.alertVisible = esVisible
    }
  
  eliminar() {
    console.log("eliminar cliente"); 
    this.clienteServicio.deleteCliente(this.id);
    this.router.navigate(['/'])  
  }
}
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from "../alert/alert.component";
import { largeCurrencyPipe } from '../../pipes/largeCurrency.pipe';
import { RolGuard } from '../../guardianes/rol.guard';
import { Rol, Usuario } from '../../modelo/usuario.model';
import { UsuarioServicio } from '../../servicios/usuario.service';
import { LoginService } from '../../servicios/login.service';
import { RolService } from '../../servicios/rol.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, NgClass, NgIf, AlertComponent, largeCurrencyPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  clientes: Cliente[] = [];
  usuarioLogueado!: Usuario;
  rolUsuario: Rol | undefined;
  alertVisible: boolean = false;
  @ViewChild("clienteForm") clienteForm !: NgForm;
  @ViewChild("botonCerrarModal") botonCerrarModal !: ElementRef;

  constructor(private clienteServicio: ClienteServicio,
              private loginServicio: LoginService,
              private usuarioServicio: UsuarioServicio,
              private rolServicio: RolService
  ) { }

  async ngOnInit(): Promise<void> {
    this.clienteServicio.getClientes().subscribe(
      clientes => 
            this.clientes = clientes
    )

    //usuario logueado 
    this.loginServicio.getCurrentUser().subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado = usuario;
    }});
  }
    
  getSaldoTotal() {
    return this.clientes.reduce(
      (acumSaldo, cliente) => acumSaldo + (cliente.saldo || 0), 0)
  }
      
  agregar(formCliente: NgForm) {
    if (formCliente.invalid) {
      //Error en formulario 
      this.alertVisible = true;
    } 
    else {
      //Agregar cliente
      this.clienteServicio.addCliente(this.cliente);
      this.clienteForm.resetForm();
      this.cerrarModal()
    }
  }

  tienePermisoEditor():Boolean {
    return this.rolServicio.puedeEditarClientes(this.usuarioLogueado);
  }

  private cerrarModal():void {
    this.botonCerrarModal.nativeElement.click()
  }

  alertCambioVisibilidad(esVisible: boolean):void {
    this.alertVisible = esVisible
  }
}
    
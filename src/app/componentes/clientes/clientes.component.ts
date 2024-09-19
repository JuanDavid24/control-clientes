import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from "../alert/alert.component";
import { largeCurrencyPipe } from '../../pipes/largeCurrency.pipe';
import { RolGuard } from '../../guardianes/rol.guard';
import { Rol } from '../../modelo/usuario.model';
import { UsuarioServicio } from '../../servicios/usuario.service';
import { LoginService } from '../../servicios/login.service';

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
  rolUsuario: Rol | undefined;
  alertVisible: boolean = false;
  @ViewChild("clienteForm") clienteForm !: NgForm;
  @ViewChild("botonCerrarModal") botonCerrarModal !: ElementRef;

  constructor(private clienteServicio: ClienteServicio,
              private loginServicio: LoginService,
              private usuarioServicio: UsuarioServicio
  ) { }

  async ngOnInit(): Promise<void> {
    this.clienteServicio.getClientes().subscribe(
      clientes => 
            this.clientes = clientes
    )

    const uid = this.loginServicio.getCurrentUserUID();
    if (uid) {
      this.rolUsuario = await this.usuarioServicio.getUserRole(uid)
    }
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
    return this.rolUsuario 
      ? ['admin', 'editor'].includes(this.rolUsuario) 
      : false
  }

  private cerrarModal():void {
    this.botonCerrarModal.nativeElement.click()
  }

  alertCambioVisibilidad(esVisible: boolean):void {
    this.alertVisible = esVisible
  }
}
    
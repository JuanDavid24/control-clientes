import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NgFor, CurrencyPipe, RouterLink, FormsModule, NgClass, NgIf],
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
alertVisible: boolean = false;
@ViewChild("clienteForm") clienteForm !: NgForm;
@ViewChild("botonCerrarModal") botonCerrarModal !: ElementRef;

constructor(private clienteServicio: ClienteServicio) { }

ngOnInit(): void {
  this.clienteServicio.getClientes().subscribe(
    clientes => {
          this.clientes = clientes
          this.clientes.forEach (c => console.log(c))
        }
      )
    }
    
    getSaldoTotal() {
      return this.clientes.reduce(
        (acumSaldo, cliente) => acumSaldo + (cliente.saldo || 0), 0)
      }
      
    agregar(formCliente: NgForm) {
      if (formCliente.invalid) {
        //Error en formulario 
        this.alertVisible = true;
        setTimeout(() => {
          this.alertVisible = false;
        }, 4000); 
      } 
      else {
        //Agregar cliente
        this.clienteServicio.addCliente(this.cliente);
        this.clienteForm.resetForm();
        this.cerrarModal()
      }
    }

    private cerrarModal():void {
      this.botonCerrarModal.nativeElement.click()
    }
  }
    
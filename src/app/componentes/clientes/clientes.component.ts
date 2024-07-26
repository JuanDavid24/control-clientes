import { Component, OnInit } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  
  clientes: Cliente[] = [];

  constructor(private clienteServicio: ClienteServicio) { }

  ngOnInit(): void {
      this.clienteServicio.getClientes().subscribe(
        clientes => {
          this.clientes = clientes
          this.clientes.forEach (c => console.log(c))
        }
      )
  }
}

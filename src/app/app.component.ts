import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ClienteServicio } from './servicios/cliente.service';
import { Cliente } from './modelo/cliente.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableroComponent, CabeceroComponent, PiePaginaComponent, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ClienteServicio]
})
export class AppComponent {
  title = 'control-clientes';
  firestore: Firestore = inject(Firestore);
  cliente!: Observable<Cliente>;
  clientes!: Observable<Cliente[]>

  constructor(private clienteServicio: ClienteServicio) {
    this.clientes = this.clienteServicio.getClientes();
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableroComponent, CabeceroComponent, PiePaginaComponent, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'control-clientes';
  firestore: Firestore = inject(Firestore);
  clientes$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'clientes')
    this.clientes$ = collectionData(aCollection);
  }
}

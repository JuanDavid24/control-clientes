import { Injectable, inject } from "@angular/core";
import { Cliente } from "../modelo/cliente.model";
import { Observable } from "rxjs";
import { Firestore, collection, collectionData, orderBy, query } from "@angular/fire/firestore";

@Injectable({providedIn: 'root'})
export class ClienteServicio{
    private firestore: Firestore = inject(Firestore);
    private clientesCollection = collection(this.firestore, 'clientes');

    getClientes(): Observable<Cliente[]> {
        const queryFn = query(this.clientesCollection, orderBy('nombre', 'asc'));
        return collectionData(queryFn, {idField: 'id'})
    }
}
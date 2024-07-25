import { Injectable, inject } from "@angular/core";
//import { AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Cliente } from "../modelo/cliente.model";
import { Observable } from "rxjs";
//import { map } from "rxjs/operators";
import { Firestore, collection, collectionData, orderBy, query } from "@angular/fire/firestore";

@Injectable()
export class ClienteServicio{
    private firestore: Firestore = inject(Firestore);
    private clientesCollection = collection(this.firestore, 'clientes');

    //clientesColeccion: AngularFirestoreCollection<Cliente>;
    //clienteDoc: AngularFirestoreDocument<Cliente>;
/*
    constructor(){
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
        
    }
*/
    getClientes(): Observable<Cliente[]> {
        //Obtener los clientes 
        /*
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map(accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos
                })
            })
        )
            */
        const queryFn = query(this.clientesCollection, orderBy('nombre', 'asc'));
        return collectionData(queryFn, {idField: 'id'})
        //this.clientes = collectionData<Cliente>(this.clientesCollection);
           
    }
}
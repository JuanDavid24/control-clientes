import { Injectable, inject } from "@angular/core";
import { Cliente } from "../modelo/cliente.model";
import { Observable } from "rxjs";
import { DocumentReference, Firestore, addDoc, collection, collectionData, getDoc, orderBy, query, updateDoc } from "@angular/fire/firestore";
import { doc } from "firebase/firestore";

@Injectable({providedIn: 'root'})
export class ClienteServicio{
    private firestore: Firestore = inject(Firestore);
    private clientesCollection = collection(this.firestore, 'clientes');

    getClientes(): Observable<Cliente[]> {
        const queryFn = query(this.clientesCollection, orderBy('nombre', 'asc'));
        return collectionData(queryFn, {idField: 'id'})
    }

    async getCliente(id: string): Promise<Cliente> {
        const docRef = this.getDocRef(id);
        const docData = await getDoc(docRef);
        return docData.data() as Cliente
    }

    addCliente(cliente: Cliente): Promise<DocumentReference> {
        return addDoc(this.clientesCollection, cliente)
    }

    updateCliente(id: string, cliente: Cliente): void {
        const docRef = this.getDocRef(id);
        updateDoc(docRef, { ...cliente })
    }

    private getDocRef(id: string) {
        return doc(this.firestore, 'clientes', id)
    }
} 
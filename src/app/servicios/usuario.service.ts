import { Injectable, inject } from "@angular/core";
import { Rol, Usuario } from "../modelo/usuario.model";
import { Observable } from "rxjs";
import { Firestore, collection, collectionData, orderBy, query, doc, getDoc, updateDoc } from "@angular/fire/firestore";

@Injectable({providedIn: 'root'})
export class UsuarioServicio{
    private firestore: Firestore = inject(Firestore);
    private usuariosRef = collection(this.firestore, 'usuarios');

    getUsuarios(): Observable<Usuario[]> {
        const queryFn = query(this.usuariosRef, orderBy('rol', 'asc'))
        return collectionData(queryFn, {idField: 'uid'}) as Observable<Usuario[]>
    }

    async getUsuario(uid: string): Promise<Usuario|undefined> {
        const docRef = this.getDocRef(uid);
        const docSnap = await getDoc(docRef);
        
        return docSnap.exists() 
            ? {'uid': uid, ...docSnap.data()} as Usuario
            : undefined
    }

    async getUserRole(uid: string): Promise<Rol|undefined> {
        const usuario = await this.getUsuario(uid);
        return usuario?.rol as Rol
    }

    async updateUser(usuario: Usuario): Promise<void> {
        try {
            const docRef = this.getDocRef(usuario.uid);
            await updateDoc(docRef, {...usuario});       
        } catch (error) {
            console.error('Error al actualizar el usuario en la base de datos');            
            throw error
        }       
    }

    private getDocRef(id: string) {
        return doc(this.firestore, 'usuarios', id)
    }
} 
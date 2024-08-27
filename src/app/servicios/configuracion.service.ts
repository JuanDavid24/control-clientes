import { Injectable, inject } from "@angular/core";
import { Configuracion } from "../modelo/configuracion.model";
import { Firestore, getDoc, updateDoc, docData } from "@angular/fire/firestore";
import { doc } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ConfiguracionServicio{

    constructor(private firestore: Firestore) {
        this.listenConfiguracionChanges();
    }
    
    //id unico de configuracion en la bd
    id: string = '1';

    // enfoque con observables
    private configuracionSubject = new BehaviorSubject<Configuracion | null>(null)
    configuracion$ = this.configuracionSubject.asObservable();

    private listenConfiguracionChanges() {
        const docRef = this.getDocRef(this.id);
        docData(docRef, {idField: 'id'}).subscribe(
            (config) => {this.configuracionSubject.next(config as Configuracion)});
        console.log('escuchando cambios de la configuracion...');
    }

    private getDocRef(id: string) {
        return doc(this.firestore, 'configuracion', id)
    }

    async updateConfiguracion(configuracion: Configuracion): Promise<void> {
        try {
            const docRef = this.getDocRef(this.id);
            await updateDoc(docRef, { ...configuracion });
            console.log("configuracion actualizada");
        }
        catch(error) {
            console.error("Error al actualizar configuración en la BD", error);
            throw error
        }
    }
}
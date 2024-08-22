import { Injectable, inject } from "@angular/core";
import { Configuracion } from "../modelo/configuracion.model";
import { Firestore, getDoc, updateDoc } from "@angular/fire/firestore";
import { doc } from "firebase/firestore";

@Injectable({providedIn: 'root'})
export class ConfiguracionServicio{
    private firestore: Firestore = inject(Firestore);
    
    //id unico de configuracion en la bd
    id: string = '1';

    async getConfiguracion(): Promise<Configuracion> {
        const docRef = this.getDocRef(this.id);
        const docData = await getDoc(docRef);
        return docData.data() as Configuracion
    }

    private getDocRef(id: string) {
        return doc(this.firestore, 'configuracion', id)
    }

    updateConfiguracion(configuracion: Configuracion): void {
        const docRef = this.getDocRef(this.id);
        updateDoc(docRef, { ...configuracion })
    }
}
import { Injectable, inject } from "@angular/core";
import { Configuracion } from "../modelo/configuracion.model";
import { Firestore, getDoc, updateDoc } from "@angular/fire/firestore";
import { doc } from "firebase/firestore";

@Injectable({providedIn: 'root'})
export class ConfiguracionServicio{
    private firestore: Firestore = inject(Firestore);
    
    //id unico de configuracion en la bd
    id: string = '1';
    private configuracionCache?: Configuracion;

    async getConfiguracion(): Promise<Configuracion | undefined> {
        if (this.configuracionCache) {
            console.log("configuración recuperada del caché");
            return this.configuracionCache;
        }
        try {
            const docRef = this.getDocRef(this.id);
            const docData = await getDoc(docRef);
            console.log("configuración obtenida de la BD");
            this.configuracionCache = docData.data() as Configuracion;
            return docData.data() as Configuracion;
                      
        } 
        catch(error) {
            console.error("Error obteniendo configuración de la BD", error);
            throw error;
        }
    }

    private getDocRef(id: string) {
        return doc(this.firestore, 'configuracion', id)
    }

    updateConfiguracion(configuracion: Configuracion): void {
        const docRef = this.getDocRef(this.id);
        updateDoc(docRef, { ...configuracion })
            .then (() => {
                console.log("configuracion actualizada");
                this.configuracionCache = configuracion;
            })
            .catch (error => {
                console.error("Error al actualizar configuración en la BD", error);
            })
    }
}
import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "@angular/fire/auth";
import { UsuarioServicio } from "./usuario.service";
import { Observable, switchMap } from "rxjs";
import { Usuario } from "../modelo/usuario.model";

@Injectable({providedIn: 'root'})
export class LoginService{
    private auth = inject(Auth)
    private usuarioServicio = inject(UsuarioServicio)

    login(email:string, pass:string): Promise<UserCredential> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, pass)
            .then(datos => resolve(datos), 
                error => reject(this.getFriendlyErrorMsg(error)))
        })
    }

    logout() {
        return signOut(this.auth)
    }
    
    getAuth() {
        return authState(this.auth)
    }

    getCurrentUser():Observable<Usuario|null> {
        return this.getAuth().pipe (
            switchMap(async (usuario) => {
                if (!usuario) 
                    return null;
                const rol = await this.usuarioServicio.getUserRole(usuario.uid);
                return new Usuario(usuario.uid, usuario.email ?? '', rol ?? 'lector');
                }
            )
        )
        
    }

    getCurrentUserUID(): string|undefined {
        return this.auth.currentUser?.uid
    }

    register(email:string, pass:string): Promise<UserCredential> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, email, pass)
            .then(datos => resolve(datos),
                  error => reject(this.getFriendlyErrorMsg(error)))
        });
    }

    private getFriendlyErrorMsg(error: any): string {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return('El correo ingresado ya está en uso')
            case 'auth/invalid-credential':
                return('El correo electrónico o la contraseña no son válidos.') 
            default:
                return ('Ocurrió un error al realizar la petición. Inténtalo de nuevo más tarde.');
        }
    }
}
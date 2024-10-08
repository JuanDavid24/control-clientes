import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from "@angular/fire/auth";
import { UsuarioServicio } from "./usuario.service";
import { Observable, switchMap } from "rxjs";
import { Rol, Usuario } from "../modelo/usuario.model";

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

    async register(email:string, pass:string, rol:Rol): Promise<UserCredential> {
        let credencialNuevoUsuario: UserCredential | undefined;
        // creacion usuario firebase
        try {
            credencialNuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, pass);
        } catch (error) {
            throw new Error(this.getFriendlyErrorMsg(error));
        }

        // agregar usuario a coleccion de usuarios de la BD
        const usuario = new Usuario(credencialNuevoUsuario.user.uid, email, rol)
        try {
            await this.usuarioServicio.addUser(usuario);
        } catch (error) {
            throw error;
        }
        return(credencialNuevoUsuario);
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
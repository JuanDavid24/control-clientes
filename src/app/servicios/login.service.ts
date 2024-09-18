import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class LoginService{
    private auth = inject(Auth)

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
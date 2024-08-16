import { inject, Injectable } from "@angular/core";
import { Auth, authState, signInWithEmailAndPassword, signOut, UserCredential } from "@angular/fire/auth";

@Injectable({providedIn: 'root'})
export class LoginService{
    private auth = inject(Auth)

    login(email:string, pass:string): Promise<UserCredential> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, pass)
            .then(datos => resolve(datos), 
                error => reject(error))
        })
    }

    logout() {
        return signOut(this.auth)
    }
    
    getAuth() {
        return authState(this.auth)
    }
}


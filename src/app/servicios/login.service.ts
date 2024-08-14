import { inject, Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth"

@Injectable({providedIn: 'root'})
export class LoginService{
    private auth = inject(Auth)

    login(email:string, pass:string) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, pass)
            .then(datos => resolve(datos), 
                error => reject(error))
        })
    }
}


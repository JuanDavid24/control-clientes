import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../servicios/login.service";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthGuard {
    constructor(
        private router: Router,
        private loginService: LoginService,
    ) {}

    canActivate(): Observable<boolean> {
        return this.loginService.getAuth().pipe(
            take(1),
            map( auth => {
                if (!auth) {
                    this.router.navigate(['/login']);
                    return false
                }
                else 
                    return true
            })
        )
    }
}

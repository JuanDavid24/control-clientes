import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../servicios/login.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private loginService: LoginService,
    ) {}

    canActivate(): Observable<boolean> {
        return this.loginService.getAuth().pipe(
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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioServicio } from "../servicios/usuario.service";
import { LoginService } from "../servicios/login.service";

@Injectable({providedIn: 'root'})
export class AdminGuard {

    constructor(
        private router: Router,
        private usuarioServicio: UsuarioServicio,
        private loginServicio: LoginService
    ) {}

    async canActivate() {
        const currentUserUID = this.loginServicio.getCurrentUserUID();
        if (!currentUserUID) {
            this.router.navigate(["/"]);
            return false;
        }        
        const currentUserRole = await this.usuarioServicio.getUserRole(currentUserUID);
        return currentUserRole === 'admin';       
    }
}
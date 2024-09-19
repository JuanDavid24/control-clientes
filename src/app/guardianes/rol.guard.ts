import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioServicio } from "../servicios/usuario.service";
import { LoginService } from "../servicios/login.service";
import { Rol } from "../modelo/usuario.model";

@Injectable({providedIn: 'root'})
export class RolGuard {

    constructor(
        private router: Router,
        private usuarioServicio: UsuarioServicio,
        private loginServicio: LoginService
    ) {}

    async canActivate(roles: Rol[]) {
        const currentUserUID = this.loginServicio.getCurrentUserUID();
        if (!currentUserUID) {
            this.router.navigate(["/"]);
            return false;
        }        
        
        const currentUserRole: Rol | undefined = await this.usuarioServicio.getUserRole(currentUserUID) as Rol;
        
        if (!currentUserRole) {
            this.router.navigate(["/"]);
            return false;
        }

        return roles.includes(currentUserRole);       
    }
}
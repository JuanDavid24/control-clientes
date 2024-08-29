import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators'
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable({providedIn: 'root'})
export class ConfiguracionGuard {

    constructor(
        private router: Router,
        private configuracionServicio: ConfiguracionServicio
    ) {}

    canActivate(): Observable<boolean> {
        return this.configuracionServicio.configuracion$.pipe(
            take(1),
            map( config => {
                const permitirRegistro = config?.permitirRegistro ?? false
                if (!permitirRegistro) 
                    this.router.navigate(["/login"]);
                return permitirRegistro
            })
        )
    }
}
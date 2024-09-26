import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  constructor() { }
  
  jerarquiaRol = {
    superadmin: 4,
    admin: 3,
    editor: 2,
    lector: 1
  }
  
  puedeEditarClientes(usuario: Usuario): boolean {
    return ['superadmin', 'admin', 'editor'].includes(usuario.rol);
  }

  puedeEditarRol(usuario: Usuario, usuarioObjetivo: Usuario):boolean {
    if (usuario === usuarioObjetivo)
      return false;

    if (['editor', 'lector'].includes(usuario.rol)) 
      return false;

    return (this.jerarquiaRol[usuario.rol] > this.jerarquiaRol[usuarioObjetivo.rol]);
  }
}


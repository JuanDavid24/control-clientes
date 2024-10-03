import { Injectable } from '@angular/core';
import { Rol, Usuario } from '../modelo/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  constructor() { }
  
  private jerarquiaRol = {
    superadmin: 4,
    admin: 3,
    editor: 2,
    lector: 1
  }

  puedeEditarClientes(usuario: Usuario): boolean {
    return usuario 
    ? ['superadmin', 'admin', 'editor'].includes(usuario.rol)
    : false
  }

  puedeEditar(usuario: Usuario, usuarioObjetivo: Usuario):boolean {
    if (usuario === usuarioObjetivo)
      return false;

    if (['editor', 'lector'].includes(usuario.rol)) 
      return false;

    return (this.jerarquiaRol[usuario.rol] > this.jerarquiaRol[usuarioObjetivo.rol]);
  }

  rolesQuePuedeEditar(usuario: Usuario) {
    let roles = Object.keys(this.jerarquiaRol) as Array<Rol>; // lista de roles
    
    return roles.filter(rol => 
      this.jerarquiaRol[usuario.rol] > this.jerarquiaRol[rol]
    )
  }

  esAdmin(usuario: Usuario): boolean {
    return ['superadmin', 'admin'].includes(usuario.rol)
  }
}


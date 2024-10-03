export class Usuario {
    uid: string;
    email: string;
    rol: Rol; 

  constructor(uid: string | '', email: string, rol: Rol | '') {
    this.uid = uid;
    this.email = email;
    this.rol = rol || 'lector';
  }
}

export type Rol = 'superadmin' | 'admin' | 'editor' | 'lector';

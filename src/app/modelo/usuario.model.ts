export interface Usuario {
    uid: string;
    email: string;
    rol: Rol | '';
}

export type Rol = 'admin' | 'editor' | 'lector';
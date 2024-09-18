export interface Usuario {
    uid: string;
    email: string;
    rol: 'admin' | 'editor' | 'lector' | '';
}
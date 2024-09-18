import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';
import { inject } from '@angular/core';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [
    {path: '', component: TableroComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'login', component: AuthComponent},
    {path: 'registrarse', component: AuthComponent, canActivate: [() => inject(ConfiguracionGuard).canActivate()]},
    {path: 'configuracion', component: ConfiguracionComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'cliente/editar/:id', component: EditarClientesComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: '**', component: NoEncontradoComponent}
];

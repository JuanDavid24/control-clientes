import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoggedInGuard } from './guardianes/loggedIn.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';
import { inject } from '@angular/core';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RolGuard } from './guardianes/rol.guard';

export const routes: Routes = [
    {path: '', component: TableroComponent, canActivate: [() => inject(LoggedInGuard).canActivate()]},
    {path: 'login', component: AuthComponent},
    {path: 'registrarse', component: AuthComponent, canActivate: [() => inject(ConfiguracionGuard).canActivate()]},
    {path: 'configuracion', component: ConfiguracionComponent, canActivate: [() => inject(RolGuard).canActivate(['admin'])]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [() => inject(RolGuard).canActivate(['admin'])]},
    {path: 'cliente/editar/:id', component: EditarClientesComponent, canActivate: [() => inject(RolGuard).canActivate(['admin', 'editor'])]},
    {path: '**', component: NoEncontradoComponent}
];

import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';

export const routes: Routes = [
    {path: '', component: TableroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrarse', component: RegistroComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'cliente/editar/:id', component: EditarClientesComponent},
    {path: '**', component: NoEncontradoComponent}
];

import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from '../../servicios/usuario.service';
import { Rol, Usuario } from '../../modelo/usuario.model';
import { NgFor, NgIf } from '@angular/common';
import { RolService } from '../../servicios/rol.service';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario('', '', '');
  usuarioLogueado!: Usuario;


  roles!: Array<Rol>; // para los option del select

  constructor(
    private usuarioService: UsuarioServicio,
    private rolService: RolService,
    private loginService: LoginService) {}

  ngOnInit() {
    //lista de usuarios
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios);
    
    //usuario logueado 
    this.loginService.getCurrentUser().subscribe(usuario => {
        if (usuario) {
          this.usuarioLogueado = usuario;
          
          //lista de roles que el usuario puede editar
          this.roles = this.rolService.rolesQuePuedeEditar(this.usuarioLogueado);
    }});
  }

  async editarUsuario(e: Event, u: Usuario) {
    const select = e.target as HTMLSelectElement;
    u.rol = select.value as Rol ;
    try {
      await this.usuarioService.updateUser(u);
      console.log(`usuario ${u.email} actualizado con rol ${u.rol} `);
    }
    catch (error) {
      console.error("error al actualizar usuario: " + error)
    }
  }

  puedeEditar(usuarioObjetivo: Usuario): boolean {
    return this.rolService.puedeEditar(this.usuarioLogueado, usuarioObjetivo)
  }
}

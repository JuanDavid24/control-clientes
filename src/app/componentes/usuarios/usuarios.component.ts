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


  roles: string[] = ["lector", "editor", "admin"]; // para los option del select

  constructor(
    private usuarioService: UsuarioServicio,
    private rolService: RolService,
    private loginService: LoginService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios);
    
    this.loginService.getAuth().subscribe(
      usuario => {
        if (usuario) {
          try {
            const rol = this.usuarioService.getUserRole(usuario.uid)
          }
          this.usuarioLogueado = new Usuario(usuario.uid, usuario.email??'', rol)
        }
      }
    )
  }

  obtenerUsuario(uid: string) {
    this.usuarioService.getUsuario(uid).then((data) => {
      if (data) this.usuario = data;
      else console.error('no existe usuario');
    });
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
}

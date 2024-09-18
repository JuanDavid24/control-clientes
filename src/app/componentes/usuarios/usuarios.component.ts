import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from '../../servicios/usuario.service';
import { Usuario } from '../../modelo/usuario.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  
  usuario: Usuario = {
    uid: '',
    email: '',
    rol: '',
  };

  roles: string[] = ["lector", "editor", "admin"];

  constructor(private usuarioService: UsuarioServicio) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios);
  }

  obtenerUsuario(uid: string) {
    this.usuarioService.getUsuario(uid).then((data) => {
      if (data) this.usuario = data;
      else console.error('no existe usuario');
    });
  }
}

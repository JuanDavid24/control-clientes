import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NgClass, NgIf } from '@angular/common';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Subscription } from 'rxjs';
import { RolService } from '../../servicios/rol.service';
import { Usuario } from '../../modelo/usuario.model';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, NgIf, NgClass],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {
  
  private subscription: Subscription = new Subscription;
  estaLogueado: boolean = false;
  usuarioLogueado!: Usuario;
  permitirRegistro!: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio,
              private rolServicio: RolService
  ) {}
  
  ngOnInit() {
    this.subscription.add (
      this.configuracionServicio.configuracion$.subscribe( 
        config => this.permitirRegistro = config?.permitirRegistro ?? false
      ));

    //usuario logueado 
    this.loginService.getCurrentUser().subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado = usuario;
        this.estaLogueado = true;     
      }
      else 
        this.estaLogueado = false
    });
  }

  esAdministrador(): boolean {
    return this.usuarioLogueado 
      ? this.rolServicio.esAdmin(this.usuarioLogueado)
      : false
  }

  esSuperadmin(): boolean {
    return this.usuarioLogueado.rol === 'superadmin';
  }

  logout(): void{
    this.loginService.logout();
    this.estaLogueado = false;
    this.router.navigate(['/login'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

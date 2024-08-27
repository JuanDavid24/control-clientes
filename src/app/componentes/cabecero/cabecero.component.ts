import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NgIf } from '@angular/common';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {
  
  private subscription: Subscription = new Subscription;
  estaLogueado: boolean = false;
  usuarioLogueado: string | null = null;
  permitirRegistro!: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio
  ) {}
  
  ngOnInit() {
    this.subscription.add (
      this.configuracionServicio.configuracion$.subscribe( 
        config => this.permitirRegistro = config?.permitirRegistro ?? false
      ));
    
    this.subscription.add(
      this.loginService.getAuth().subscribe(auth => {
        if (auth) {
          this.estaLogueado = true;
          this.usuarioLogueado = auth.email
        }}));
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

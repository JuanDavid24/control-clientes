import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {
  
  estaLogueado: boolean = false;
  usuarioLogueado: string | null = null;

  constructor(private loginService: LoginService,
              private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loginService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.estaLogueado = true;
          this.usuarioLogueado = auth.email
        }
        console.log(`esta logueado: ${this.estaLogueado}`);
        console.log(`usuario logueado: ${this.usuarioLogueado}`);
    })
  }

  logout(): void{
    this.loginService.logout();
    this.estaLogueado = false;
    this.router.navigate(['/login'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  email: string = '';
  password: string = '';

  alertVisible: boolean = false;
  alertMensaje: string = ""

  constructor(private router: Router,
              private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth)
        this.router.navigate(['/'])
    })
  }

  login(loginForm: NgForm){  
    if (loginForm.invalid) 
      this.mostrarAlert("El formulario contiene errores");
    else {
      console.log("Login");    
      this.loginService.login(this.email, this.password)
        .then( _ => this.router.navigate(['/']))
        .catch(error =>
          this.mostrarAlert(`Error al iniciar sesión: ${this.getMensajeErrorAmigable(error)}`))
    }
  }

  private mostrarAlert(mensaje:string) {
    this.alertMensaje = mensaje;
    this.alertVisible = true;
  }

  alertCambioVisibilidad(esVisible: boolean):void {
    this.alertVisible = esVisible
  }

  private getMensajeErrorAmigable(error: any): string {
    if (error.code == 'auth/invalid-credential')
      return('El correo electrónico o la contraseña no son válidos.') 
    else
      return ('Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.');
    }
}

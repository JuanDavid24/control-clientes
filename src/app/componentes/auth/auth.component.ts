import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NgClass, NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  alertVisible: boolean = false;
  alertMensaje: string = "";

  modoRegistro: boolean = false;

  servicioSubmit!: (email: string, pass: string) => Promise<UserCredential>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService) 
  {
    // Determina si la vista es login o registro según la ruta actual
    this.route.url.subscribe(url => {
      this.modoRegistro = url[0].path === 'registrarse';
    });
    
    // Asigno método para el submit
    this.servicioSubmit = this.modoRegistro
      ? this.servicioSubmit = (email, pass) => this.loginService.register(email, pass, 'lector')
      : this.servicioSubmit = (email, pass) => this.loginService.login(email, pass)
  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth)
        this.router.navigate(['/'])
    })
  }

  onSubmit(usuarioForm: NgForm): void {
    console.log("sumbit");  
    if (usuarioForm.invalid) {
      this.mostrarAlert("El formulario contiene errores")
    }
    else this.servicioSubmit(this.email, this.password)
      .then(_ => this.router.navigate(['/']))
      .catch(error => this.mostrarAlert(error))
  }

  private mostrarAlert(mensaje:string) {
    this.alertMensaje = mensaje;
    this.alertVisible = true;
  }

  alertCambioVisibilidad(esVisible: boolean):void {
    this.alertVisible = esVisible
  }
}

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

  usuario: string = '';
  password: string = '';

  alertVisible: boolean = false;

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
    console.log(loginForm);
    
    if (loginForm.invalid) 
      this.alertVisible = true;
    else {
      console.log("Login");    
      this.loginService.login(this.usuario, this.password)
        .then(res => this.router.navigate(['/']))
        .catch(error => console.error(error))
    }
  }

  alertCambioVisibilidad(esVisible: boolean):void {
    this.alertVisible = esVisible
  }
}

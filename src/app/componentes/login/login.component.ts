import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router,
              private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth)
        this.router.navigate(['/'])
    })
  }

  login(){
    console.log("Login");    
    this.loginService.login(this.email, this.password)
      .then(res => this.router.navigate(['/']))
      .catch(error => console.error(error))
  }
}

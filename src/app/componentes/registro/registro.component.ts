import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
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

  registrarse(): void {
    console.log("registro");    
    this.loginService.register(this.email, this.password)
      .then(res => this.router.navigate(['/']))
      .catch(error => console.error(error))
  }
}

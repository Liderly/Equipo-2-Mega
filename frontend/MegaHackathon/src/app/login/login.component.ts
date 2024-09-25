// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  
  constructor(private router: Router) {

   }
  
  email: string = '';
  password: string = '';

  onSubmit() {
   
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.router.navigate(['/DashTecnico']);
  }
}
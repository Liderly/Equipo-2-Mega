// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { ApiService } from '../services/service'; // service.ts

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  
  constructor(private router: Router, private http: HttpClient, private usersService: ApiService) {

   }
  noEmpleado: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    // this.usersService.getTecnicos().suscribe({
    //   next: (response) => {
    //     console.log('que es response? ', response);
    //   }
    // })
   
    console.log('Numero de empleado:', this.noEmpleado);
    console.log('Password:', this.password);
    this.router.navigate(['/DashTecnico']);
  }

  login(noEmpleado: number) {
    return this.http.post<any>("url",
      {noEmpleado: noEmpleado}
    ).pipe()
  }

}
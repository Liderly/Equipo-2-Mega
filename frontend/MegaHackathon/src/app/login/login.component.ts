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


  private apiUrl = 'http://localhost:5009/api'; // Ajusta según tu configuración

  onSubmit() {
    this.usersService.login(this.noEmpleado).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response) {
          this.handleAuthentication(
            response.idTecnico,
            response.nombre,
            response.apellidos,
            response.noEmpleado,
            response.idCuadrilla
          );
          this.router.navigate([`/DashTecnico/:${response.noEmpleado}`]);
        } else {
          console.log('Usuario no encontrado');
        }
      },
      error: (error) => {
        console.error('Login error', error);
      }
    });
  }

  //Guarda login en local storage
  private handleAuthentication(
    idTecnico: number,
    nombre: string,
    apellidos: string,
    noEmpleado: number,
    idCuadrilla: number
  ) {
    //const expirationDate = new Date(new Date().getTime() + 50 * 1000);
    const user = {idTecnico, nombre, apellidos, noEmpleado, idCuadrilla}
    localStorage.setItem('userData', JSON.stringify(user))
  }

}

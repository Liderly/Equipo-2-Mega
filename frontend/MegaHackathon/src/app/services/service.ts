import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tecnico } from '../interface/tecnico';
import { Cliente } from '../interface/clientes';
import { CuadrillaReport } from '../interface/cuadrillas';
import { OrdenTrabajo } from '../interface/ordenTrabajo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5009/api'; // Ajusta según tu configuración

  constructor(private http: HttpClient) {}

  getTecnicos(): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/Tecnico`);
  }

  getTecnicoById(id: number): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/Tecnico/${id}`);
  }

  getClientes(): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/Cliente`);
  }

  getClienteById(id: number): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/Cliente/${id}`);
  }

  getCuadrillas(): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/CuadrillaReport`);
  }

  getOrdenTrabajo(): Observable<any> {
    //Agregar ruta
    return this.http.get(`${this.apiUrl}/Ordentrabajo`);
  }

  getAllCuadrillas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cuadrilla`);
  }

  //Trae info de todas las cuadrillas
  getAllReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/CuadrillaReport`);
  }
  //Reports
  //Cuadrilla
  getCuadrillaReport(id: string): Observable<any> {
    //got 'id' as number
    return this.http.get(`${this.apiUrl}/Cuadrillareport/${id}`);
  }

  //Tecnico
  getTecnicoReport(id: number): Observable<any> {
    //console.log('recibi id - servce ->> ', id);

    return this.http.get(`${this.apiUrl}/tecnicoreport/${id}`);
  }

  //Login user
  login(noEmpleado: string): Observable<any> {
    let data = this.http.get(`${this.apiUrl}/tecnico/${noEmpleado}`);

    //console.log('data es: ', data);

    if (data != null) {
      return data;
    }

    //const loginData = { noEmpleado, password }
    return this.http.get(`${this.apiUrl}/Tecnico/${noEmpleado}`);
  }
}

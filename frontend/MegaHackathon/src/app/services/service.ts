import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tecnicos } from "../interface/tecnicos";
import { Clientes } from '../interface/clientes';
import { Cuadrillas } from '../interface/cuadrillas';
import { OrdernTrabajo } from '../interface/ordenTrabajo';



@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://localhost:5001/api'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  getTecnicos(): Observable<any> {
    //Agregar ruta 
    return this.http.get(`${this.apiUrl}/data`);
  }

  getClientes(): Observable<any> {
    //Agregar ruta 
    return this.http.get(`${this.apiUrl}/data`);
  }

  getCuadrillas(): Observable<any> {
    //Agregar ruta 
    return this.http.get(`${this.apiUrl}/data`);
  }

  getOrdenTrabajo(): Observable<any> {
    //Agregar ruta 
    return this.http.get(`${this.apiUrl}/data`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tecnico } from "../interface/tecnico";
import { Cliente } from '../interface/clientes';
import { CuadrillaReport } from '../interface/cuadrillas';
import { OrdenTrabajo } from '../interface/ordenTrabajo';



@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://localhost:5009/api'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

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


  //Reports
  //Cuadrilla
  getCuadrillaReport(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cuadrillareport/${id}`);
  }

  //Tecnico
  getTecnicoReport(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/TecnicoReport/${id}`)
  }



}
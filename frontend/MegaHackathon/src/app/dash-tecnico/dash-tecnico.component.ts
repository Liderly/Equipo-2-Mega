import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../services/service'; // service.ts

import { HeaderComponent } from '../header/header.component';

interface Order {
  id: string;
  estatus: string;
  numeroOrden: string;
  fecha: string;
  puntosGenerados: string;
  servicio: string;
  trabajoRealizado: string;
  nombreSuscriptor: string;
  numSuscriptor: string; // id
  telefono: string; // telefono
  domicilio: string;
  bonoSemanal: string;
  showDetails: boolean;
}

interface ordersTecSumary {
  trabajoRealizado: string;
  puntosGenerados: string;
  numSuscriptor: string; // ##
  nombreSuscriptor: string; //"## completadas"
  estatus: string; //"total"
  bonoSemanal: string; //"###"
}

@Component({
  selector: 'app-dash-tecnico',
  templateUrl: './dash-tecnico.component.html',
  styleUrls: ['./dash-tecnico.component.css'],
  imports: [CommonModule, HeaderComponent],
  standalone: true,
})
export class DashTecnicoComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private usersService: ApiService
  ) {}

  user: any;

  ordersTecSumary: ordersTecSumary = {
    trabajoRealizado: '',
    puntosGenerados: '',
    numSuscriptor: '',
    nombreSuscriptor: '',
    estatus: '',
    bonoSemanal: '',
  };

  orders: Order[] = [];

  dashboardCards = [
    {
      title: 'N.Total de Puntos',
      value: '', // Initialize as empty
      icon: 'fa-wallet',
      color: 'bg-green-600',
    },
    {
      title: 'Clientes Atendidos',
      value: '', // Initialize as empty
      icon: 'fa-users',
      color: 'bg-blue-600',
    },
    {
      title: 'Nuevos Clientes',
      value: '2',
      icon: 'fa-user-plus',
      color: 'bg-orange-600',
    },
    {
      title: 'Bono Correspondiente',
      value: '', // Initialize as empty
      icon: 'fa-user-plus',
      color: 'bg-purple-600',
    },
  ];

  ngOnInit() {
    this.user = this.getUserData();
    // console.log('lo que vale user.id ===', this.user.idTecnico);

    this.usersService.getTecnicoReport(this.user.idTecnico).subscribe({
      next: (response: Order[]) => {
        // console.log('RESPONSE => ', response);
        this.orders = response;

        // console.log('PASO A SER Orders = ', this.orders);

        if (this.orders.length > 0) {
          this.ordersTecSumary = this.orders[this.orders.length - 1];
          // console.log(
          //   'que paso a ser ordersTecSumary?? ',
          //   this.ordersTecSumary
          // );

          this.orders.pop(); //ultima fila de resumen

          // Update dashboardCards with fetched data
          this.dashboardCards = [
            {
              title: 'N.Total de Puntos',
              value: this.ordersTecSumary.puntosGenerados,
              icon: 'fa-wallet',
              color: 'bg-green-600',
            },
            {
              title: 'Clientes Atendidos',
              value: this.ordersTecSumary.numSuscriptor,
              icon: 'fa-users',
              color: 'bg-blue-600',
            },
            {
              title: 'Nuevos Clientes',
              value: '2',
              icon: 'fa-user-plus',
              color: 'bg-orange-600',
            },
            {
              title: 'Bono Correspondiente',
              value: '$' + this.ordersTecSumary.bonoSemanal,
              icon: 'fa-user-plus',
              color: 'bg-purple-600',
            },
          ];
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  showOrders = false;

  toggleOrders() {
    this.showOrders = !this.showOrders;
    console.log(this.user);
  }

  toggleOrderDetails(index: number) {
    this.orders[index].showDetails = !this.orders[index].showDetails;
  }

  Logout() {
    this.router.navigate(['/login']);
  }

  private getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : {};
    }
    return {};
  }
}

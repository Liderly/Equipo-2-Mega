import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Order {
  id: string;
  status: string;
  date: string;
  service: string;
  work: string;
  client: string;
  phone: string;
  address: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-dash-tecnico',
  templateUrl: './dash-tecnico.component.html',
  styleUrls: ['./dash-tecnico.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class DashTecnicoComponent {
  constructor(private router: Router) {}

  showOrders = false;
  orders: Order[] = [
    {
      id: '1234',
      status: 'Cancelada',
      date: '2023-09-24',
      service: 'Mantenimiento',
      work: 'Revisión general',
      client: 'Empresa A',
      phone: '555-1234',
      address: 'Calle Principal 123, Ciudad',
      showDetails: false
    },
    {
      id: '1554',
      status: 'En proceso',
      date: '2023-09-24',
      service: 'Mantenimiento',
      work: 'Revisión general',
      client: 'Empresa F',
      phone: '555-1234',
      address: 'Calle Principal 123, Ciudad',
      showDetails: false
    },
    {
      id: '5678',
      status: 'Pendiente',
      date: '2023-09-25',
      service: 'Instalación',
      work: 'Nuevo equipo',
      client: 'Empresa B',
      phone: '555-5678',
      address: 'Avenida Secundaria 456, Ciudad',
      showDetails: false
    },
    {
      id: '9101',
      status: 'Completada',
      date: '2023-09-26',
      service: 'Reparación',
      work: 'Cambio de piezas',
      client: 'Empresa C',
      phone: '555-9101',
      address: 'Plaza Central 789, Ciudad',
      showDetails: false
    }
  ];

  dashboardCards = [
    { title: 'N.Total de Puntos', value: '60', icon: 'fa-wallet', color: 'bg-green-600' },
    { title: 'Clientes Atendidos', value: '13', icon: 'fa-users', color: 'bg-blue-600' },
    { title: 'Nuevos Clientes', value: '2', icon: 'fa-user-plus', color: 'bg-orange-600' },
    { title: 'Clientes Pendientes', value: '3', icon: 'fa-user-plus', color: 'bg-purple-600' }
  ];

  toggleOrders() {
    this.showOrders = !this.showOrders;
  }

  toggleOrderDetails(index: number) {
    this.orders[index].showDetails = !this.orders[index].showDetails;
  }

  Logout() {
    this.router.navigate(['/login']);
  }
}




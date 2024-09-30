import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, } from 'chart.js/auto';

import { ApiService } from '../services/service'
import { Tecnico } from '../interface/tecnico'
import { HeaderComponent } from '../header/header.component';

interface Tecnico1 {
  nombreTecnico: string;
  Cuadrilla: number;
  TotalPuntosPorTecnico: number;
  TrabajosCompletados: number;
}

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css'],
})
export class DashAdminComponent implements OnInit {
  @ViewChild('performanceChart', { static: true })
  performanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('servicesChart', { static: true })
  servicesChartRef!: ElementRef<HTMLCanvasElement>;

  tecnico: Tecnico[] = [];
  tecnicos: Tecnico1[] = [];
  cuadrillas: number[] = [];
  selectedCuadrilla: string = '';
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';

  averagePoints: number = 0;
  completionRate: number = 0;
  totalJobs: number = 0;

  constructor(private userService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
    this.initCharts();


    //Cambiar por ruta final que traiga todo 
    this.userService.getTecnicos().subscribe({
      next: (response: Tecnico[]) => {
        this.tecnico = response;
        console.log(this.tecnico)
      }
    })


  }

  loadData(): void {
    // Aquí cargarías los datos reales de tu servicio o API
    this.tecnicos = [
      {
        nombreTecnico: 'Fernando Romero',
        Cuadrilla: 2,
        TotalPuntosPorTecnico: 670,
        TrabajosCompletados: 6,
      },
      {
        nombreTecnico: 'Sofia Castro',
        Cuadrilla: 2,
        TotalPuntosPorTecnico: 670,
        TrabajosCompletados: 6,
      },
      {
        nombreTecnico: 'Andrés Fernández',
        Cuadrilla: 2,
        TotalPuntosPorTecnico: 670,
        TrabajosCompletados: 7,
      },
    ];

    this.cuadrillas = [...new Set(this.tecnicos.map((t) => t.Cuadrilla))];
    this.calculateKPIs();
  }

  calculateKPIs(): void {
    this.averagePoints =
      this.tecnicos.reduce((sum, t) => sum + t.TotalPuntosPorTecnico, 0) /
      this.tecnicos.length;
    this.totalJobs = this.tecnicos.reduce(
      (sum, t) => sum + t.TrabajosCompletados,
      0
    );
    this.completionRate = this.totalJobs / (this.totalJobs + 3); // Asumimos 3 trabajos pendientes para este ejemplo
  }

  initCharts(): void {
    this.createPerformanceChart();
    this.createServicesChart();
  }

  createPerformanceChart(): void {
    const ctx = this.performanceChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: this.tecnicos.map((t) => t.nombreTecnico),
          datasets: [
            {
              label: 'Puntos Generados',
              data: this.tecnicos.map((t) => t.TotalPuntosPorTecnico),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      new Chart(ctx, config);
    }
  }

  createServicesChart(): void {
    const ctx = this.servicesChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: [
            'TELEFONÍA FIJA LIMITADA',
            'TELEFONÍA MÓVIL PAQUETE 300',
            'INTERNET RESIDENCIAL 1GB',
          ],
          datasets: [
            {
              data: [30, 50, 20],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true,
        },
      };
      new Chart(ctx, config);
    }
  }

  applyFilters(): void {
    console.log(
      'Aplicando filtros:',
      this.selectedCuadrilla,
      this.selectedStatus,
      this.startDate,
      this.endDate
    );
  }

  exportData(): void {
    console.log('Exportando datos...');
  }

  verDetalles(tecnico: Tecnico1): void {
    console.log('Viendo detalles de:', tecnico.nombreTecnico);
  }
}

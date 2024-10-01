import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration } from 'chart.js/auto';

import { ApiService } from '../services/service';
import { CuadrillaReport, Cuadrilla } from '../interface/cuadrillas';
import { Tecnico } from '../interface/tecnico';
import { HeaderComponent } from '../header/header.component';

interface Tecnico1 {
  nombreTecnico: string;
  Cuadrilla: number;
  TotalPuntosPorTecnico: number;
  TrabajosCompletados: number;
}

interface Job {
  numTecnico: number;
  nombretecnico: string;
  cuadrilla: number;
  trabajoRealizado: string;
  servicio: string;
  puntosGenerados: number;
  totalPuntosPorTecnico: number;
  estatus: string;
  numCliente: number;
  nombreSuscriptor: string;
  fecha: string;
  valorPago: number;
}

interface TecnicoSummary {
  nombreTecnico: string;
  Cuadrilla: number;
  TotalPuntosPorTecnico: number;
  TrabajosCompletados: number;
  BonoSemanal: number;
}

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css'],
})
export class DashAdminComponent implements OnInit, OnDestroy {
  @ViewChild('performanceChart', { static: true })
  performanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('servicesChart', { static: true })
  servicesChartRef!: ElementRef<HTMLCanvasElement>;

  jobs: Job[] = [];
  tecnicos: TecnicoSummary[] = [];
  cuadrillaReport: CuadrillaReport[] = [];
  tecnico: Tecnico[] = [];
  cuadrillas: number[] = [];
  cuadrillasList: Cuadrilla[] = [];
  selectedCuadrilla: string = '0';
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';
  averagePoints: number = 0;
  completionRate: number = 0;
  totalJobs: number = 0;

  private performanceChart: Chart<'bar'> | null = null;
  private servicesChart: Chart<'pie'> | null = null;

  serviceSummary: { [key: string]: number } = {};

  constructor(private userService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.performanceChart) {
      this.performanceChart.destroy();
    }
    if (this.servicesChart) {
      this.servicesChart.destroy();
    }
  }

  loadData(): void {
    this.userService.getAllCuadrillas().subscribe({
      next: (response: Cuadrilla[]) => {
        this.cuadrillasList = response;
        // console.log('Cuadrillas List:', this.cuadrillasList);
        const evalNumCua = Number(this.selectedCuadrilla);
        // console.log('this.evalNumCua ==>>', evalNumCua);

        if (this.cuadrillasList.length > 0) {
          this.selectedCuadrilla =
            evalNumCua > 1
              ? this.cuadrillasList[Number(this.selectedCuadrilla) - 1]
                  .idCuadrilla
              : this.cuadrillasList[Number(this.selectedCuadrilla)].idCuadrilla;
        }
      },
      error: (error) => {
        console.error('Error fetching cuadrillas:', error);
      },
    });

    this.userService.getCuadrillaReport(this.selectedCuadrilla).subscribe({
      next: (response: Job[]) => {
        this.jobs = response;
        console.log('Raw Jobs Data:', this.jobs);

        this.aggregateTecnicosData();
        this.aggregateServicesData();
        this.initCharts();
      },
      error: (error) => {
        console.error('Error fetching technicians:', error);
      },
    });
  }

  aggregateTecnicosData(): void {
    if (!this.jobs || this.jobs.length === 0) {
      console.warn('No job data available for aggregation.');
      return;
    }

    const grouped = this.jobs.reduce((acc, job) => {
      const key = job.numTecnico;

      if (!acc[key]) {
        acc[key] = {
          nombreTecnico: job.nombretecnico,
          Cuadrilla: job.cuadrilla,
          TotalPuntosPorTecnico: job.totalPuntosPorTecnico,
          TrabajosCompletados: 0,
          BonoSemanal: job.valorPago,
        };
      }

      if (job.estatus && job.estatus.toLowerCase() === 'completada') {
        acc[key].TrabajosCompletados += 1;
      }

      return acc;
    }, {} as { [key: number]: TecnicoSummary });

    this.tecnicos = Object.values(grouped);
    console.log('Aggregated Tecnicos Data:', this.tecnicos);

    this.cuadrillas = [...new Set(this.jobs.map((t) => t.cuadrilla))].sort(
      (a, b) => a - b
    );
    console.log('Cuadrillas:', this.cuadrillas);

    this.calculateKPIs();
  }

  aggregateServicesData(): void {
    if (!this.jobs || this.jobs.length === 0) {
      console.warn('No job data available for aggregation.');
      return;
    }

    const totalJobs = this.jobs.length;

    this.serviceSummary = this.jobs.reduce((acc, job) => {
      if (job.estatus && job.estatus.toLowerCase() === 'completada') {
        const service = job.servicio;
        acc[service] = (acc[service] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    Object.keys(this.serviceSummary).forEach((key) => {
      this.serviceSummary[key] = (this.serviceSummary[key] / totalJobs) * 100;
    });

    console.log('Service Summary:', this.serviceSummary);
  }

  calculateKPIs(): void {
    if (this.tecnicos.length === 0) {
      this.averagePoints = 0;
      this.completionRate = 0;
      this.totalJobs = 0;
      return;
    }

    this.totalJobs = this.tecnicos.reduce(
      (sum, tecnico) => sum + tecnico.TrabajosCompletados,
      0
    );

    this.averagePoints =
      this.tecnicos.reduce(
        (sum, tecnico) => sum + tecnico.TotalPuntosPorTecnico,
        0
      ) / this.tecnicos.length;

    this.completionRate = this.totalJobs / (this.totalJobs + 3);

    console.log('KPIs - Average Points:', this.averagePoints);
    console.log('KPIs - Completion Rate:', this.completionRate);
    console.log('KPIs - Total Jobs:', this.totalJobs);
  }

  initCharts(): void {
    this.initPerformanceChart();
    this.initServicesChart();
  }

  initPerformanceChart(): void {
    const ctx = this.performanceChartRef.nativeElement.getContext('2d');
    if (ctx) {
      if (this.performanceChart) {
        this.performanceChart.destroy();
      }

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
            {
              label: 'Trabajos Completados',
              data: this.tecnicos.map((t) => t.TrabajosCompletados),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
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

      this.performanceChart = new Chart(ctx, config);
    }
  }

  initServicesChart(): void {
    const ctx = this.servicesChartRef.nativeElement.getContext('2d');
    if (ctx) {
      if (this.servicesChart) {
        this.servicesChart.destroy();
      }
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: Object.keys(this.serviceSummary),
          datasets: [
            {
              data: Object.values(this.serviceSummary),
              backgroundColor: [
                'rgba(76, 175, 80, .8)', // Verde medio
                'rgba(255, 213, 79, .8)', // Amarillo dorado
                'rgba(126, 87, 194, .8)', // Morado medio
                'rgba(239, 83, 80, .8)', // Rojo medio
                'rgba(236, 64, 122, .8)', // Rosa medio
                'rgba(66, 165, 245, .8)', // Azul medio
                'rgba(255, 112, 67, .8)', // Naranja medio
                'rgba(216, 27, 96, .8)', // Fucsia medio
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${value.toFixed(2)}%`;
                },
              },
            },
          },
        },
      };
      this.servicesChart = new Chart(ctx, config);
    }
  }

  applyFilters(): void {
    console.log(
      'Aplicando filtros: this.selectedCuadrilla =>',
      this.selectedCuadrilla
    );
    this.loadData();

    this.userService.getCuadrillaReport(this.selectedCuadrilla).subscribe({
      next: (response: CuadrillaReport[]) => {
        this.cuadrillaReport = response;
        console.log([...new Set(this.cuadrillaReport)]);
        console.log('cuadrillaReport ==>>>>', this.cuadrillaReport);
      },
    });
  }

  exportData(): void {
    console.log('Exportando datos...');
  }

  verDetalles(tecnico: Tecnico1): void {
    console.log('Viendo detalles de:', tecnico.nombreTecnico);
  }
}

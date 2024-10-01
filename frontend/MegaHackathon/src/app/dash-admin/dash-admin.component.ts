import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

// Original Job Interface (as per your JSON response)
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

// Interface representing aggregated data per technician
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
export class DashAdminComponent implements OnInit {
  @ViewChild('performanceChart', { static: true })
  performanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('servicesChart', { static: true })
  servicesChartRef!: ElementRef<HTMLCanvasElement>;

  // Raw job data fetched from the API
  jobs: Job[] = [];

  // Aggregated technician data for the table
  tecnicos: TecnicoSummary[] = [];

  cuadrillaReport: CuadrillaReport[] = [];
  tecnico: Tecnico[] = [];
  // tecnicos: Tecnico1[] = [];
  cuadrillas: number[] = [];
  cuadrillasList: Cuadrilla[] = [];
  selectedCuadrilla: number = 4; //AQUIIIIIIIIIIIIIIIII -> Num de Cuadrilla jarcodiado
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';
  //other::
  averagePoints: number = 0;
  completionRate: number = 0;
  totalJobs: number = 0;

  constructor(private userService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
    // Initialize charts after data is loaded
    // Moved initCharts() inside loadData after data is ready
  }

  loadData(): void {
    // Fetch the list of cuadrillas
    this.userService.getAllCuadrillas().subscribe({
      next: (response: Cuadrilla[]) => {
        this.cuadrillasList = response;
        // console.log('Cuadrillas List:', this.cuadrillasList);
      },
      error: (error) => {
        console.error('Error fetching cuadrillas:', error);
      },
    });

    // Fetch the list of technicians (jobs data)
    this.userService.getCuadrillaReport(this.selectedCuadrilla).subscribe({
      next: (response: Job[]) => {
        this.jobs = response;
        console.log('Raw Jobs Data:', this.jobs);

        // Aggregate the jobs data per technician
        this.aggregateTecnicosData();

        // Initialize charts after data aggregation
        this.initCharts();
      },
      error: (error) => {
        console.error('Error fetching technicians:', error);
      },
    });

    console.log('Raw Jobs Data:', this.jobs);
    console.log('Aggregated Tecnicos Data:', this.tecnicos);
  }

  aggregateTecnicosData(): void {
    if (!this.jobs || this.jobs.length === 0) {
      console.warn('No job data available for aggregation.');
      return;
    }

    const grouped = this.jobs.reduce((acc, job) => {
      const key = job.numTecnico; // Unique identifier for each technician

      if (!acc[key]) {
        acc[key] = {
          nombreTecnico: job.nombretecnico,
          Cuadrilla: job.cuadrilla,
          TotalPuntosPorTecnico: job.totalPuntosPorTecnico,
          TrabajosCompletados: 0,
          BonoSemanal: job.valorPago,
        };
      }

      // Safely check if 'estatus' exists and is 'Completada'
      if (job.estatus && job.estatus.toLowerCase() === 'completada') {
        acc[key].TrabajosCompletados += 1; //conteo
      }

      return acc;
    }, {} as { [key: number]: TecnicoSummary });

    // Convert the grouped object into an array
    this.tecnicos = Object.values(grouped);
    console.log('Aggregated Tecnicos Data:', this.tecnicos);

    // Populate the 'cuadrillas' array based on unique 'cuadrilla' in 'jobs'
    this.cuadrillas = [...new Set(this.jobs.map((t) => t.cuadrilla))].sort(
      (a, b) => a - b
    );
    console.log('Cuadrillas:', this.cuadrillas);

    // Calculate Key Performance Indicators (KPIs)
    this.calculateKPIs();
  }

  calculateKPIs(): void {
    if (this.tecnicos.length === 0) {
      this.averagePoints = 0;
      this.completionRate = 0;
      this.totalJobs = 0;
      return;
    }

    // Total completed jobs across all technicians
    this.totalJobs = this.tecnicos.reduce(
      (sum, tecnico) => sum + tecnico.TrabajosCompletados,
      0
    );

    // Average points per technician
    this.averagePoints =
      this.tecnicos.reduce(
        (sum, tecnico) => sum + tecnico.TotalPuntosPorTecnico,
        0
      ) / this.tecnicos.length;

    // Example calculation for completion rate
    // Adjust the denominator based on your actual logic or requirements
    this.completionRate = this.totalJobs / (this.totalJobs + 3); // Example logic

    console.log('KPIs - Average Points:', this.averagePoints);
    console.log('KPIs - Completion Rate:', this.completionRate);
    console.log('KPIs - Total Jobs:', this.totalJobs);
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
            'TELEFONIA FIJA LIMITADA',
            'TELEFONIA MÓVIL PAQUETE 300',
            'INTERNET RESIDENCIAL 1GB',
          ],
          datasets: [
            {
              data: [30, 50, 20], // Adjust based on your actual data
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
      this.selectedCuadrilla
      // this.selectedStatus,
      // this.startDate,
      // this.endDate
    );

    this.userService
      .getCuadrillaReport(Number(this.selectedCuadrilla))
      .subscribe({
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

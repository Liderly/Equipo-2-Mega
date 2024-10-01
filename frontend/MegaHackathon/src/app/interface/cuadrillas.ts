export interface CuadrillaReport {
  numTecnico: number;
  nombreTecnico: string;
  cuadrilla: number;
  trabajoRealizado: string;
  servicio: string;
  puntosGenerados: number;
  totalPuntosPorTecnico: number;
  estatus: string;
  numCliente: number;
  nombreSuscriptor: string;
  fecha: Date;
  valorPago: number;
  puntosTotales: number;
  bonoSemanal: number;
}

export interface Cuadrilla {
  idCuadrilla: string;
  noCuadrilla: string;
}

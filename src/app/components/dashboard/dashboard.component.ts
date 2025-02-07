import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public token = localStorage.getItem('token') || ''; // Recupera el token
  totalVentas: number = 0;
  cantidadVentas: number = 0;
  ingresosGenerados: number = 0;
  productosMasVendidos: any[] = [];

  constructor(private estadisticaService: EstadisticaService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  async loadStatistics() {
    try {
      const filtro = 'mes'; // Filtro dinámico para estadísticas

      // Llamadas a la API en paralelo
      const [ventas, cantidad, ingresos, productos] = await Promise.all([
        this.estadisticaService.getTotalVentas(filtro, this.token).toPromise(),
        this.estadisticaService.getCantidadVentas(filtro, this.token).toPromise(),
        this.estadisticaService.getIngresosGenerados(filtro, this.token).toPromise(),
        this.estadisticaService.getProductosMasVendidos(5, this.token).toPromise(), // Obtiene los 5 productos más vendidos
      ]);

      // Asignación de datos con valores seguros
      this.totalVentas = ventas?.total || 0;
      this.cantidadVentas = cantidad?.cantidad || 0;
      this.ingresosGenerados = ingresos?.ingresos || 0;
      this.productosMasVendidos = productos || [];

      console.log(this.ingresosGenerados)

      this.loadCharts();
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  }

  loadCharts() {
    this.createChart('totalVentasChart', 'bar', ['Enero', 'Febrero', 'Marzo', 'Abril'], [this.totalVentas], "Total Ventas", "rgba(255, 99, 132, 0.5)");

    this.createChart('cantidadVentasChart', 'doughnut', ['Enero', 'Febrero', 'Marzo', 'Abril'], [this.cantidadVentas], "Cantidad de Ventas", ["#ff6384", "#36a2eb", "#ffce56"]);

    this.createChart('ingresosGeneradosChart', 'line', ['Enero', 'Febrero', 'Marzo', 'Abril'], [this.ingresosGenerados], "Ingresos Generados", "rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.2)");

    if (this.productosMasVendidos.length > 0) {
      this.createChart(
        'productosMasVendidosChart',
        'pie',
        this.productosMasVendidos.map(p => p.producto),
        this.productosMasVendidos.map(p => p.totalVendidos),
        "Productos Más Vendidos",
        ["#ff6384", "#36a2eb", "#ffce56"]
      );
    }
  }

  createChart(
    elementId: string,
    type: ChartType,
    labels: string[],
    data: number[],
    label: string,
    bgColor: any,
    borderColor: any = null
  ) {
    const canvasElement = document.getElementById(elementId) as HTMLCanvasElement;
    if (!canvasElement) return;

    new Chart(canvasElement, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: bgColor,
          borderColor: borderColor || bgColor,
          borderWidth: borderColor ? 1 : 0
        }]
      }
    });
  }
}

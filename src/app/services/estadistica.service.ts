import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EstadisticaService {
    public url = GLOBAL.url;

    constructor(private _http: HttpClient) { }

    /**
     * Obtiene el total de ventas en un rango de fechas.
     */
    getTotalVentas(filtro: string, token: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token })
        return this._http.get(`${this.url}/estadisticas/total-ventas?filtro=${filtro}`, { headers });
    }

    /**
     * Obtiene la cantidad total de ventas realizadas en un rango de fechas.
     */
    getCantidadVentas(filtro: string, token: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token })
        return this._http.get(`${this.url}/estadisticas/cantidad-ventas?filtro=${filtro}`, { headers });
    }

    /**
     * Obtiene los ingresos generados en un periodo de tiempo (día, semana, mes, año).
     */
    getIngresosGenerados(filtro: string, token: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token })
        return this._http.get(`${this.url}/estadisticas/ingresos?periodo=${filtro}`, { headers });
    }
    /**
     * Obtiene los productos más vendidos en un rango de fechas.
     */
    getProductosMasVendidos(limit: number, token: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token })
        return this._http.get(`${this.url}/estadisticas/productos-mas-vendidos?limit=${limit}`, { headers });
    }
}

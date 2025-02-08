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

    getTotalVentas(filtro: string, agruparPorMes: boolean, token: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token });
        return this._http.get(`${this.url}/estadisticas/total-ventas?filtro=${filtro}&agruparPorMes=${agruparPorMes}`, { headers });
    }

    getCantidadVentas(filtro: string, token: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token });
        return this._http.get(`${this.url}/estadisticas/cantidad-ventas?filtro=${filtro}`, { headers });
    }

    getIngresosGenerados(filtro: string, token: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token });
        return this._http.get(`${this.url}/estadisticas/ingresos?filtro=${filtro}`, { headers });
    }

    getProductosMasVendidos(limit: number, token: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Autorization': token });
        return this._http.get(`${this.url}/estadisticas/productos-mas-vendidos?limit=${limit}`, { headers });
    }
}

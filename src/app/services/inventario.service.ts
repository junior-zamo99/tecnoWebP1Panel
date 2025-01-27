import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  public url=GLOBAL.url
  constructor(
    private _http:HttpClient
  ) { }


  getProductosInventario(filtro:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getProductosInventario/'+filtro,{headers:headers})
  }

  getVariacionInventario(id:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getVariacionInventario/'+id,{headers:headers})
  }

  getProveedores(token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getProveedores',{headers:headers})
  }

  getAlmacenes(token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getAlmacenes',{headers:headers})
  }

  createProveedor(data:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.post(this.url+'/createProveedor',data,{headers:headers})
  }

  createAlmacen(data:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.post(this.url+'/createAlmacen',data,{headers:headers})
  }

  
}

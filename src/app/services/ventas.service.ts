import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url=GLOBAL.url
  constructor(
    private _http:HttpClient
  ) { }


  getVentas(inicio:any,fin:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getVentas/'+inicio+'/'+fin,{headers:headers})
  } 
  
  getVenta(id:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getVenta/'+id,{headers:headers})
  }

  cambiarEstadoVenta(id:any,data:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.put(this.url+'/cambiarEstadoVenta/'+id,data,{headers:headers})
  }
}

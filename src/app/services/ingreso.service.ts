import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  public url=GLOBAL.url
  constructor(
    private _http:HttpClient
  ) { }

  createIngreso(data:any, token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.post(this.url+'/createIngreso',data,{headers:headers})
  }

  getIngresos(inicio:any,fin:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getIngresos/'+inicio+'/'+fin,{headers:headers})
  }

  getIngreso(id:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getIngreso/'+id,{headers:headers})
  }


  cambiarEstadoIngreso(id:any,data:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.put(this.url+'/cambiarEstadoIngreso/'+id,data,{headers:headers})
  }

  BuscarProductoAlmacen(almacen:any,producto:any,variedad:any,cantidad:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.get(this.url+'/buscarProductoAlmacen/'+almacen+'/'+producto+'/'+variedad+'/'+cantidad,{headers:headers})
   
  }


  createEgreso(data:any,token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json','Autorization':token})
    return this._http.post(this.url+'/createEgreso',data,{headers:headers})
  }

}

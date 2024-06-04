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
}

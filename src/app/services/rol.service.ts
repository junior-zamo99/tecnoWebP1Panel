import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
 
    private _http: HttpClient
  ) { }
  public url= GLOBAL.url


  createRol(data:any,token:any):Observable<any>{
    let headers= new HttpHeaders({'Content-Type':'application/json','Autorization':token})
    return this._http.post(this.url+'/createRol',data,{headers:headers})
  }

  getRoles(token:any):Observable<any>{
    let headers= new HttpHeaders({'Content-Type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getRoles',{headers:headers})
  }

  getRol(id:any,token:any):Observable<any>{
    let headers= new HttpHeaders({'Content-Type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getRol/'+id,{headers:headers})
  }

  updateRol(id:any,data:any,token:any):Observable<any>{
    let headers= new HttpHeaders({'Content-Type':'application/json','Autorization':token})
    return this._http.put(this.url+'/updateRol/'+id,data,{headers:headers})
  }

  getFuncionalidades(token:any):Observable<any>{
    let headers= new HttpHeaders({'Content-Type':'application/json','Autorization':token})
    return this._http.get(this.url+'/getFuncionalidades',{headers:headers})
  }
}

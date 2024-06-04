import { Component } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var toastr:any
@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrl: './edit-rol.component.css'
})
export class EditRolComponent {
  public rol:any={}
  public token=localStorage.getItem('token')
  public userFuncionalidad=localStorage.getItem('funcionalidad')
  public btn_load=false
  public funcionalidad:any={}
  public funcionalidades: Array<any>=[]
  public id=''
  public dataFuncionalidades: Array<any>=[]
  constructor(
    private _rolService: RolService,
    private _router:Router,
    private _route:ActivatedRoute
  ){}


  ngOnInit(){
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
        this.initData()
      }
    )
  }

  initData(){
    console.log(this.userFuncionalidad)
    this._rolService.getRol(this.id,this.token).subscribe(
      response=>{
        
        if(response != undefined){
        this.rol=response
        this.funcionalidades=this.rol.funcionalidades
        }
      }
    )
    this._rolService.getFuncionalidades(this.token).subscribe(
      response=>{
        console.log(response)
        if(response.data){
          this.dataFuncionalidades=response.data
        }else{
          toastr.error(response.message)
        }
      },
      error=>{
        toastr.error("error en el servidor")
      }
    )
  }


  actualizar(){
    this.rol.funcionalidades=this.funcionalidades.map((item:any)=>item._id)
    if(!this.rol.nombre){
      toastr.error("el nombre es requerido")
    }else  if(this.rol.funcionalidades ==0){
      toastr.error("al menos ingrese una funcionalidad")}
    else{
    
      this.btn_load=true
      this._rolService.updateRol(this.id,this.rol,this.token).subscribe(
        response=>{
          this.btn_load=false
          console.log(response)
          if(response != undefined){
            toastr.success("Rol Actualizado")
            this._router.navigate(['/rol'])
          }else{
            toastr.error(response.message)
          }
        }
      )
      
    }
  }

  add(){
    if(this.funcionalidad){
      this.funcionalidad =JSON.parse(this.funcionalidad)
      this.funcionalidades.push(this.funcionalidad)
      console.log(this.funcionalidades)
      this.funcionalidad={}
    }
  }

  remove(idx:any){
    this.funcionalidades.splice(idx,1)
  }
}

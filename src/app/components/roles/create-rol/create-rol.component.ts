import { Component } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { Router } from '@angular/router';
declare var toastr:any
@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrl: './create-rol.component.css'
})
export class CreateRolComponent {

  public rol:any={}
  public token=localStorage.getItem('token')
  public btn_load=false
  public funcionalidad:any={}
  public funcionalidades: Array<any>=[]
  public dataFuncionalidades: Array<any>=[]
  constructor(
    private _rolService: RolService,
    private _router:Router
  ){}

  ngOnInit(){
    this.initData()
  }


  initData(){
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
  


  registrar(){
    this.rol.funcionalidades=this.funcionalidades.map((item:any)=>item._id)
    if(!this.rol.nombre){
      toastr.error("el nombre es requerido")
    }else  if(this.rol.funcionalidades ==0){
      toastr.error("al menos ingrese una funcionalidad")}
    else{
    
      this.btn_load=true
      this._rolService.createRol(this.rol,this.token).subscribe(
        response=>{
          this.btn_load=false
          console.log(response)
          if(response.data){
            toastr.success('rol creado')
            this._router.navigate(['/rol'])
          }else{
            toastr.error(response.message)
          }
        },
        error=>{
          this.btn_load=false
          toastr.error("error en el servidor")
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

import { Component } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { Router } from '@angular/router';
import { RolService } from '../../../services/rol.service';
declare var toastr:any
@Component({
  selector: 'app-create-almacen',
  templateUrl: './create-almacen.component.html',
  styleUrl: './create-almacen.component.css'
})
export class CreateAlmacenComponent {

   public almacen:any={}
  
    public token=localStorage.getItem('token')
    public btn_load=false
    public roles: Array<any>=[]
    constructor(
      private InventarioService: InventarioService,
      private _router:Router,
      private _rolService: RolService 
    ){}
  
    ngOnInit(){
      this.initData()
    }
  
  
    initData(){
      this._rolService.getRoles(this.token).subscribe(
        response=>{
         
          if(response.data != undefined){
            
            this.roles=response.data
            console.log(this.roles)
          }else{
            toastr.error(response.message)
          }
        },
        error=>{
          console.log(error)
        }
      )
    }
  
  
  
    registrar(){
     
      if(!this.almacen.nombre){
        toastr.error("el nombre es requerido")
      }else  if(!this.almacen.direccion){
        toastr.error("la direccion es requerida")
      }else{
        console.log(this.almacen)
        this.btn_load=true
        this.InventarioService.createAlmacen(this.almacen,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              console.log(response)
              this.btn_load=false
              this._router.navigate(['/almacen']) 
            }else{
              toastr.error(response.message)
            }
          },
          error=>{
            console.log(error)
            this.btn_load=false
          }
        )
      }
    }
}

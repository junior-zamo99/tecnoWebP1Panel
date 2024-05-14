import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
declare var toastr:any
@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {
  public token = localStorage.getItem('token');
  public usuario:any={}
  public btn_load=false
  public id=''

  constructor(
    private _route:ActivatedRoute,
    private _usuarioService:UsuarioService
  ){}

  ngOnInit(){
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
        this.init_data()

      }
    )
  }
  init_data(){
    this._usuarioService.getUsuario(this.id,this.token).subscribe(
      response=>{
        this.usuario=response.data
        console.log(response)
      }
    )
  }

  actualizar(){
    if(!this.usuario.nombres){
      toastr.error("los nombre son requeridos")
    }else  if(!this.usuario.apellidos){
      toastr.error("los apellidos son requeridos")
    } else  if(!this.usuario.email){
      toastr.error("el correo electronico es requeridos")
    }else  if(!this.usuario.rol){
      toastr.error("el rol es requeridos")
    }else{
      this._usuarioService.updateUsuario(this.id,this.usuario,this.token).subscribe(
        response=>{
          console.log(response)
          if(response.data!= undefined){
            toastr.success("Usuario Actualizado")
          this.init_data()
          }else{
            toastr.error(response.message)
          }
        }
      )
    }
  }

}

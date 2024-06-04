import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

declare var toastr:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {


  public usuario:any={
    email:'',
    password:''
  }

  constructor(
    private _usuarioServices: UsuarioService,
    private _router: Router
  ){}

  ngOnInit(){

  }

  login(){
      if(!this.usuario.email){
          toastr.error("correo es requerido")
      }else if((!this.usuario.password)){
        toastr.error("la contraseña es requerido")
      }else{
        console.log(this.usuario)
        this._usuarioServices.login(this.usuario).subscribe(
          response=>{
            console.log(response)
            if(response.data != undefined){
                localStorage.setItem('user',JSON.stringify(response.data))
                localStorage.setItem('token',response.jwt)
                localStorage.setItem('funcionalidad',response.funcionalidades)
                this._router.navigate(['/dashboard'])
            }else{
              toastr.error(response.message)
            }
          }
          
        )
      }
  }
}

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
  token: any;
  public bloqueo = 0;
  
  constructor(
    private _usuarioServices: UsuarioService,
    private _router: Router
  ){}

  ngOnInit(){

  }

  login() {
    if (!this.usuario.email) {
      toastr.error('El campo Registro es requerido');
    } else if (!this.usuario.password) {
      toastr.error('El campo password es requerido');
    } else if (this.bloqueo==3) {
      toastr.error('bloqueo por favor espere');
      
    } else {
      console.log(this.usuario);
      this._usuarioServices.login(this.usuario).subscribe(
        response => {
          console.log(response);
          if(response.message == 'la contraseña es incorrecta'){
            this.bloqueo++;
            toastr.error('Contraseña incorrecta, intento '+this.bloqueo+' de 3');
          }else{
            if(response.data!= undefined){
              localStorage.setItem('token', response.jwt);
              localStorage.setItem('user', JSON.stringify(response.data));
              toastr.success('Inicio de sesión exitoso');
              this._router.navigate(['/dashboard']);
            }else{
              toastr.error(response.message);
            }
            this.bloqueo = 0;
          }
          
         
          
        },
        error => {
          toastr.error('Ocurrió un error al intentar iniciar sesión');
          console.error(error);
        }
      );
    }
  }
}

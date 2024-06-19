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
    } else {
      console.log(this.usuario);
      this._usuarioServices.login(this.usuario).subscribe(
        response => {
          console.log(response);
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('user', JSON.stringify(response.data));
     
          toastr.success('Inicio de sesión exitoso');
          this._router.navigate(['/dashboard']);
          
        },
        error => {
          toastr.error('Ocurrió un error al intentar iniciar sesión');
          console.error(error);
        }
      );
    }
  }
}

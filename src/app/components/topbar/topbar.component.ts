import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  public user = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private _userService:UsuarioService,
    private router: Router
  ){
 
  }

  logout(){
    localStorage.clear()
    window.location.reload()
    this.router.navigate(['/']);
  }




}

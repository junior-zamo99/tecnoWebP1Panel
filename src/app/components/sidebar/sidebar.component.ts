import { Component } from '@angular/core';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:[ './sidebar.component.css']
})
export class SidebarComponent {
  public token = localStorage.getItem('token')
  public user = JSON.parse(localStorage.getItem('user') || '{}');
  public rolId =''
  public rol:any;
  public funcionalidades:any=[]
  constructor(
    private rolservice: RolService,
  ) { }

  ngOnInit(): void {
    this.rolId=this.user.rol;
    this.rolservice.getRol(this.rolId,this.token).subscribe(
      response => {
        this.rol = response;
        this.funcionalidades=this.rol.funcionalidades

        console.log(this.rol)
        console.log(this.funcionalidades)
      }
    );
    
  }

  tienePermiso(permiso: string): boolean {
    return this.funcionalidades.some((funcionalidad: any) => funcionalidad.nombre === permiso);
  }
}

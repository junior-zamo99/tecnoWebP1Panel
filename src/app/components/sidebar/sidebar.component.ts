import { Component } from '@angular/core';
import { RolService } from '../../services/rol.service';
declare var KTApp:any;
declare var KTLayoutAside:any;
declare var KTUtil:any;
declare var KTDrawer:any;
declare var KTMenu:any;
declare var KTScroll:any;
declare var KTScrolltop:any;
declare var KTToggle:any;
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
    KTApp.init();
    KTUtil.init();
    KTDrawer.init();
    KTToggle.init();
    KTScroll.init();
    KTDrawer.updateAll();
    KTLayoutAside.init();

    KTScrolltop.init();

    KTMenu.init();
    this.rolId=this.user.rol;
    this.rolservice.getRol(this.rolId,this.token).subscribe(
      response => {
        this.rol = response;
        this.funcionalidades=this.rol.funcionalidades
      }
    );
    
  }

  tienePermiso(permiso: string): boolean {
    return this.funcionalidades.some((funcionalidad: any) => funcionalidad.nombre === permiso);
  }
}

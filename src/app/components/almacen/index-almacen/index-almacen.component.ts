import { Component } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-almacen',
  templateUrl: './index-almacen.component.html',
  styleUrl: './index-almacen.component.css'
})
export class IndexAlmacenComponent {
   public filtro = '';
    public token = localStorage.getItem('token');
    public user = JSON.parse(localStorage.getItem('user') || '{}');
    public rolId =''
  public rol:any;
  public funcionalidades:any=[]
    public almacenes: Array<any> = [];
    public page=1
    public pageSize=3
    public btn_state_load=false
    public load_data=true
  
      constructor(
        private inventarioService: InventarioService,
        private rolservice: RolService,
        private _router:Router,
        private _route:ActivatedRoute
       ) {}
  
  
       ngOnInit(){
        this.cargarRoles()
        this.init_data();
      }
    
        cargarRoles(){
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
    
       init_data() {
        this.load_data=true
        this.inventarioService.getAlmacenes( this.token).subscribe(
          response => {
           console.log(response)
            this.almacenes = response.data;
            this.load_data=false
          }
        );
       }
   
}

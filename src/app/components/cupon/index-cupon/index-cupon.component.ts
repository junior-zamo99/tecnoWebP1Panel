import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrl: './index-cupon.component.css'
})
export class IndexCuponComponent {
  public filtro = '';
    public token = localStorage.getItem('token');
    public user = JSON.parse(localStorage.getItem('user') || '{}');
    public rolId =''
    public rol:any;
    public funcionalidades:any=[]
    public cupones: Array<any> = [];
    public page=1
    public pageSize=3
    public btn_state_load=false
    public load_data=true

    constructor(
      private _productoService:ProductoService,
      private _router:Router,
      private _route:ActivatedRoute,
    ){}
  
    ngOnInit(){
      this._route.queryParams.subscribe(
        params=>{
          this.filtro = params['filter'];
          if(this.filtro){
            this.init_filtro();
          }else{
            this.init_data();
          }
        }
      );
     
    }
  
    init_data(){
      this.load_data = true;
      this._productoService.getCupones("Todos",this.token).subscribe(
        response=>{
          console.log(response);
          this.cupones = response.data;
          this.load_data = false;
        }
      );
    }
  
    init_filtro(){
      this.load_data = true;
      this._productoService.getCupones(this.filtro,this.token).subscribe(
        response=>{
          console.log(response);
          this.cupones = response.data;
          this.load_data = false;
        }
      );
    }
  
    filter(){
      if(this.filtro){
        this._router.navigate(['/cupon'],{ queryParams : { filter : this.filtro } });
      }else{
        this._router.navigate(['/cupon']);
      }
    }
}

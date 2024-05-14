import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute,  Router } from '@angular/router';

declare var $:any


@Component({
  selector: 'app-index-categoria',
  templateUrl: './index-categoria.component.html',
  styleUrl: './index-categoria.component.css'
})
export class IndexCategoriaComponent {

  public load_data=true
  public categorias : Array<any> = []
  public categorias_const : Array<any> = []
  public filtro=''
  public page=1
  public pageSize=3
  public btn_state_load=false
  public token = localStorage.getItem('token');
  public active='Masculino'


  constructor(
    private _productoService:ProductoService,
    private _route: ActivatedRoute,
    private _router:Router
  ){}

  ngOnInit(){
    this._route.params.subscribe(
      params=>{
        if(params['clasificacion']){
          this.active= params['clasificacion']
          this.initData()
        }else{
            this._router.navigate(['/categoria',this.active])
        }
      }
    )
   
  }

  initData(){
    this.load_data=true
      this._productoService.getCategorias(this.active,this.token).subscribe(
        response=>{
          console.log(response);
          if(response != undefined){
            this.categorias=response.data
            this.categorias_const=this.categorias
          }else{

          }
          this.load_data=false
        }
      )
  }

  filter(){
    const test = new RegExp(this.filtro,'i')
      this.categorias=this.categorias_const.filter(item=>test.test(item.titulo))
  }

  setClasificacion(value:any){
    this.active=value
    this._router.navigate(['/categoria',this.active])
  }

  cambioEstado(id: any, estado: any, genero:any) {
    this.btn_state_load=true
    this._productoService.cambioEstadoCategoria(id, {estado: estado, genero:genero}, this.token).subscribe(
      response => {
        console.log(response);
        $('#state-' + id).modal('hide');
        this.initData();
        this.btn_state_load=false
      }
    );
 }
}

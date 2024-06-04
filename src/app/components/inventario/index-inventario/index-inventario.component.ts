import { Component } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { InventarioService } from '../../../services/inventario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-inventario',
  templateUrl: './index-inventario.component.html',
  styleUrl: './index-inventario.component.css'
})
export class IndexInventarioComponent {
  public token=localStorage.getItem('token')
public filtro: string = 'Todos';
public filtro_clasificacion: string = 'Todos';
public filtroCategoria: string = 'Todos'
public filtroSubCategoria: string = 'Todos';
public categorias:Array<any> = [];
public subcategorias:Array<any> = [];
public filtro_estado='Todos'
public loadData = true
public page=1
public pageSize=3
public productos:Array<any>=[]
public url=GLOBAL.url
public constProductos:Array<any>=[]
constructor(
  private inventarioService:InventarioService,
  private _route:ActivatedRoute,
) {}

ngOnInit(){
  this._route.queryParams.subscribe(params=>{
    this.filtro=params['filter']
    if(this.filtro){
      this.InitData(this.filtro)
    }else{
      this.InitData('todos')
    }
    
  })
}

 
InitData(filtro:any){
  this.loadData=true
   this.inventarioService.getProductosInventario(filtro,this.token).subscribe(
      response=>{
        console.log(response)
        this.productos=response.data
        this.constProductos=this.productos
        for(let item of this.productos){
          item.visible=false
        }
        this.loadData=false
      },
      error=>{
        console.log(error)
      }
    )
}

filtroInventario() {}
setClasificacion(){}
setCategoria(){}

filtroAvanzado() {}
}



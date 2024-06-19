import { Component } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { InventarioService } from '../../../services/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../services/rol.service';
import { ProductoService } from '../../../services/producto.service';

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

public user = JSON.parse(localStorage.getItem('user') || '{}');
  public rolId =''
  public rol:any;
  public funcionalidades:any=[]
constructor(
  private inventarioService:InventarioService,
  private _route:ActivatedRoute,
  private rolservice: RolService,
  private _router:Router,
  private _productoService:ProductoService 
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

InitData(filtro:any){
  this.cargarRoles()
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

filtroInventario() {

  if(this.filtro){
    this._router.navigate(['/inventario'],{queryParams:{filter:this.filtro}})
  }else{
    this._router.navigate(['/inventario'])
  }
}
setClasificacion(){
  this._productoService.getCategorias(this.filtro_clasificacion,this.token).subscribe(
    response=>{
      this.categorias=response.data
      this.filtroAvanzado()
    },
    error=>{
      console.log(error)
    }
  )
}

setCategoria(){
  const categoria=this.categorias.find(item=>item._id==this.filtroCategoria)
  console.log(categoria)
  if(categoria){
    this.subcategorias=categoria.subcategorias
    
  }
  this.filtroAvanzado()
}

filtroAvanzado(){
  let arregloUno=[]
  if(this.filtro_clasificacion =='Todos'){
    arregloUno=this.constProductos

  }else{
      arregloUno=this.constProductos.filter(item=>item.producto.clasificacion==this.filtro_clasificacion)
      
  }
  let arregloDos=[]
  if(this.filtroCategoria =='Todos'){
    arregloDos=arregloUno

  }else{
    arregloDos=this.constProductos.filter(item=>item.producto.categoria._id==this.filtroCategoria)
      
  }
  let arregloTres=[]
  if(this.filtroSubCategoria =='Todos'){
    arregloTres=arregloDos

  }else{
    arregloTres=this.constProductos.filter(item=>item.producto.subcategorias==this.filtroSubCategoria)
      
  }

  let arregloCuatro=[]
  if(this.filtro_estado =='Todos'){
    arregloCuatro=arregloTres

  }else{
    
    if(this.filtro_estado=='Publicado'){
      arregloCuatro=arregloTres.filter(item=>item.producto.estado==true)
    }else{
      arregloCuatro=arregloTres.filter(item=>item.producto.estado==false)
    }
      
  }

  this.productos=arregloCuatro
}
}



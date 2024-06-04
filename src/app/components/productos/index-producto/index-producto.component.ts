import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';

declare var $: any;
declare var QRCode:any;
@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrl: './index-producto.component.css'
})
export class IndexProductoComponent {
  
  public token=localStorage.getItem('token')
  public productos:Array<any>=[]
  public constProductos:Array<any>=[]
  public loadData:boolean=true
  public page=1
  public pageSize=3
  public filtro=''
  public url=GLOBAL.url
  public btn_state_load=false
  public filtro_clasificacion='Todos'
  public filtro_estado='Todos'
  public filtroCategoria='Todos'
  public filtroSubCategoria='Todos'
  
  
  public categorias: Array<any> = [];
  public subcategorias: Array<any> = [];
  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute

  ){}
  

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
     this._productoService.getProductos(filtro,this.token).subscribe(
        response=>{
          console.log(response)
          this.productos=response.data
          this.constProductos=this.productos
          this.productos.forEach((element,idx)=>{
            setTimeout(() => {
                new QRCode("qrcode-"+idx, {
                text: GLOBAL.urlTienda+"/producto/"+element.producto.slug,
                width: 50,
                height: 50,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
          },50)
        })
          this.loadData=false
        },
        error=>{
          console.log(error)
        }
      )
  }

  cambioEstado( id:any,estado:any){
    this.btn_state_load=true
    this._productoService.cambioEstadoProducto(id, {estado: estado}, this.token).subscribe(
      response => {
        console.log(response);
        $('#state-' + id).modal('hide');
        this.InitData('todos');
        this.btn_state_load=false
      }
    )
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

  filtroProductos(){
    if(this.filtro){
      this._router.navigate(['/producto'],{queryParams:{filter:this.filtro}})
    }else{
      this._router.navigate(['/producto'])
    }
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

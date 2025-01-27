import { Component } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.component.html',
  styleUrl: './detalle-inventario.component.css'
})
export class DetalleInventarioComponent {

  public id:any
  public token=localStorage.getItem('token')
  public variacion:any={}
  public unidades:Array<any>=[]
  public almacenes: Array<any>=[]
  public almacenActive=''
  public ingresoActive:Array<any>=[]
  public almacenesA:Array<any>=[]

  constructor(
    private inventarioService:InventarioService,
    private route:ActivatedRoute,
    private ProductoService:ProductoService
  ){
    

    
    
  }



  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.initData()
    })
  }


  obtenerAlmacen(){
    this.ProductoService.getAlmacenes(this.token).subscribe(
      response=>{
        if(response.data!=undefined){
          this.almacenesA=response.data
          for(let item of this.almacenesA){
            this.almacenes.push({
              id:item._id,
              almacen:item.nombre,
              unidades:[]
            })
            
            this.almacenActive=this.almacenes[0]
      
           
          }
          console.log(this.almacenes)
        }
      },
      error=>{
        console.log(error)
      })
  }


  initData(){
    this.obtenerAlmacen()
    this.inventarioService.getVariacionInventario(this.id,this.token).subscribe(
      response=>{
        if(response.data!=undefined)
          {
            this.variacion=response.data.variacion
            this.unidades=response.data.unidades
            this.setAlmacen(this.almacenActive)
           for(let item of this.unidades){
             for(let almacen of this.almacenes){
               if(item.ingreso.almacen==almacen.id){
                 almacen.unidades.push(item)
               }
             }
           }
           console.log(this.almacenes)
          }
      },
      error=>{
        console.log(error)
      }
    )
  }

  setAlmacen(almacen:any){
    this.almacenActive=almacen
    this.ingresoActive=this.unidades.filter(item=>item.ingreso.almacen==almacen.id)
    console.log(this.ingresoActive)
  }

}

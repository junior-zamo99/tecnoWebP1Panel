import { Component } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';

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
  constructor(
    private inventarioService:InventarioService,
    private route:ActivatedRoute
  ){
    let almacenesA= GLOBAL.almacenes

    for(let item of almacenesA){
      this.almacenes.push({
        almacen:item,
        unidades:[]
      })

      this.almacenActive=this.almacenes[0].almacen
     
    }

  }



  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.initData()
    })
  }



  initData(){
    this.inventarioService.getVariacionInventario(this.id,this.token).subscribe(
      response=>{
        if(response.data!=undefined)
          {
            this.variacion=response.data.variacion
            this.unidades=response.data.unidades
            this.setAlmacen(this.almacenActive)
           for(let item of this.unidades){
             for(let almacen of this.almacenes){
               if(item.ingreso.almacen==almacen.almacen){
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
    this.ingresoActive=this.unidades.filter(item=>item.ingreso.almacen==almacen)
    console.log(this.ingresoActive)
  }

}

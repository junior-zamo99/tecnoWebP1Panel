import { Component } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { ProductoService } from '../../../services/producto.service';
import { IngresoService } from '../../../services/ingreso.service';
import { Router } from '@angular/router';
import { InventarioService } from '../../../services/inventario.service';
declare var $:any
declare var toastr:any;
@Component({
  selector: 'app-egreso-create',
  templateUrl: './egreso-create.component.html',
  styleUrl: './egreso-create.component.css'
})
export class EgresoCreateComponent {

   public filtroProducto=[]
    public token=localStorage.getItem('token')
    public productos:Array<any>=[]
    public url= GLOBAL.url
    public productoSeleccionado:any={}
    public nombreProducto=''
    public variacionesProducto:Array<any>=[]
    public almacenes:Array<any> =[] 
    public egreso:any={
      almacen:''
    }
    public cantidad=10000000
    public detalleEgreso:any={
      producto_variedad:'',  
    }
  
    public detalles:Array<any>=[]
 
    
    constructor(
      private productoService:ProductoService,
      private ingresoService:IngresoService,
      private router: Router,
      private inventarioService:InventarioService 

    ){}

    ngOnInit(){ 
      this.initAlmacen()
    }
  
    initAlmacen(){
      this.inventarioService.getAlmacenes(this.token).subscribe(
        response=>{
          if(response.data != undefined){
            this.almacenes=response.data
          }else{
            this.almacenes=[]
          }
        }
      )
    }


    guardar(){
      this.egreso.detalles=this.detalles
      
      if(!this.egreso.razon){
        toastr.error('Debe ingresar la razon')
      }else if(!this.egreso.almacen){
        toastr.error('Debe seleccionar un almacen')
      }else if(this.egreso.detalles.length==0){
        toastr.error('Debe agregar al menos un detalle')
      }else{
        this.ingresoService.createEgreso(this.egreso,this.token).subscribe(
          response=>{
            console.log(response)
            if(response.data!=undefined){
              console.log(response.data)
              toastr.success('Egreso creado correctamente')
            }else{
              toastr.error(response.message)
            }
          }
        )
      }
     
    }

    quitarDetalle(index:any){
      this.detalles.splice(index,1)
    }
  
   

    initProducto(){ 
      this.productoService.buscarProducto(this.filtroProducto,this.token).subscribe(
        response=>{
          if(response.data != undefined){
            this.productos=response.data
          }else{
            this.productos=[]
          }
        }
      )
      }


      seleccionarProducto(producto:any){
        this.productoSeleccionado=producto
        this.detalleEgreso.producto=producto._id
        this.nombreProducto=producto.titulo
        this.detalleEgreso.productoTitulo=producto.titulo
        this.productoService.getVariacionesProducto(producto._id,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              console.log(response.data)
              this.variacionesProducto=response.data
            
              $('#modalProducto').modal('hide')
            }else{
              this.variacionesProducto=[]
            }
          }
        )
        
    
      }
  
      seleccionVariacion(){
        let variacion=this.variacionesProducto.find(variacion=>variacion._id==this.detalleEgreso.producto_variedad)
        this.detalleEgreso.talla=variacion.talla
        this.detalleEgreso.color=variacion.color
        console.log(this.detalleEgreso)
      }
    
      agregarDetalle(){
        if(!this.detalleEgreso.producto){
          toastr.error('Debe seleccionar un producto')
        }else if(!this.detalleEgreso.cantidad){
          toastr.error('Debe ingresar la cantidad')
        }else if(!this.detalleEgreso.producto_variedad){
          toastr.error('Debe seleccionar una variedad')
        }else if(this.detalleEgreso.cantidad<=0){
          toastr.error('La cantidad debe ser mayor a 0')
        }else{

          this.ingresoService.BuscarProductoAlmacen(this.egreso.almacen,this.detalleEgreso.producto,this.detalleEgreso.producto_variedad,this.detalleEgreso.cantidad,this.token).subscribe(
            response=>{
              if(response.message!='OK'){
                console.log(response.data)
                  toastr.error(response.message)
                
              }else{
                this.detalles.push(this.detalleEgreso)
                this.detalleEgreso={}
                this.productoSeleccionado={}
                this.nombreProducto=''
                this.variacionesProducto=[]
                console.log(this.detalles)
              }
            }
          )




          
        }
      }


}

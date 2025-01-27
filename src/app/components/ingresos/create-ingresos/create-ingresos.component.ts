import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/GLOBAL';
import { IngresoService } from '../../../services/ingreso.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any
declare var toastr:any;
@Component({
  selector: 'app-create-ingresos',
  templateUrl: './create-ingresos.component.html',
  styleUrl: './create-ingresos.component.css'
})
export class CreateIngresosComponent {

  public filtroProducto=[]
  public token=localStorage.getItem('token')
  public productos:Array<any>=[]
  public url= GLOBAL.url
  public productoSeleccionado:any={}
  public nombreProducto=''
  public variacionesProducto:Array<any>=[]
  public proveedores:Array<any>=GLOBAL.proovedores
  public almacenes:Array<any> =GLOBAL.almacenes  
  public ingreso:any={
    proveedor:'',
    almacen:'',
  }

  public detalleIngreso:any={
    producto_variedad:'',  
  }

  public detalles:Array<any>=[]
  public total=0
  constructor(
    private productoService:ProductoService,
    private ingresoService:IngresoService,
    private router: Router
  ) { }

  ngOnInit(){
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
    this.detalleIngreso.producto=producto._id
    this.nombreProducto=producto.titulo
    this.detalleIngreso.productoTitulo=producto.titulo
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
    let variacion=this.variacionesProducto.find(variacion=>variacion._id==this.detalleIngreso.producto_variedad)
    this.detalleIngreso.talla=variacion.talla
    this.detalleIngreso.color=variacion.color
    console.log(this.detalleIngreso)
  }

  agregarDetalle(){
    if(!this.detalleIngreso.producto){
      toastr.error('Debe seleccionar un producto')
    }else if(!this.detalleIngreso.cantidad){
      toastr.error('Debe ingresar la cantidad')
    }else if(!this.detalleIngreso.precioUnidad){
      toastr.error('Debe ingresar el precio')
    }else if(!this.detalleIngreso.producto_variedad){
      toastr.error('Debe seleccionar una variedad')
    }else if(this.detalleIngreso.cantidad<=0){
      toastr.error('La cantidad debe ser mayor a 0')
    }else if(this.detalleIngreso.precioUnidad<=0){
      toastr.error('El precio debe ser mayor a 0')
    }else{
      this.detalles.push(this.detalleIngreso)
      this.detalleIngreso={}
      this.productoSeleccionado={}
      this.nombreProducto=''
      this.variacionesProducto=[]
      console.log(this.detalles)
      this.calcularTotal()
    }
  }


  quitarDetalle(index:any){
    this.detalles.splice(index,1)
    this.calcularTotal()
  }



  calcularTotal(){
    this.total=0
    this.detalles.forEach(detalle=>{
      this.total+=detalle.cantidad*detalle.precioUnidad
    })
  }

  guardar(){
    this.ingreso.detalles=this.detalles
    this.ingreso.total=this.total
    if(!this.ingreso.proveedor){
      toastr.error('Debe seleccionar un proveedor')
    }else if(!this.ingreso.almacen){
      toastr.error('Debe seleccionar un almacen')
    }else if(this.ingreso.detalles.length==0){
      toastr.error('Debe agregar al menos un detalle')
    }else{
      this.ingresoService.createIngreso(this.ingreso,this.token).subscribe(
        response=>{
         console.log(response)
           if(response.data !=undefined)
            {
              toastr.success('Ingreso registrado correctamente')
              this.router.navigate(['/ingresos'])
              this.ingreso={}
              this.detalleIngreso={}
              this.detalles=[]
              this.total=0
            }else{
              toastr.error('Error al registrar el ingreso')
            }
          
        }
      )
    }
   
  }
}

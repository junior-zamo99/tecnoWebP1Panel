import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
declare var JsBarcode: any;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { VentaService } from '../../../services/ventas.service';
declare var $ : any;
declare var toastr: any;

@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrl: './detalles-ventas.component.css'
})
export class DetallesVentasComponent {

   public id=''
    public token = localStorage.getItem('token')
    public venta:any={}
    public detalles:Array<any>=[] 
    public url= GLOBAL.url
    public loadData=true
    public detallesExcel:Array<any>=[]
    public dataStr:any =''
    constructor(
  
      private ventaService: VentaService ,
      private router: Router,
      private route: ActivatedRoute,
  
    ) { }
  
    ngOnInit(){
      this.route.params.subscribe(params=>{
        this.id=params['id']
        console.log(this.id)
        this.initData()
      })
  
    }
  
    initData(){
      this.loadData=true
      this.ventaService.getVenta(this.id,this.token).subscribe(
        response=>{
          if(response.data != undefined)
            {
              this.venta=response.data
              console.log(this.venta)
              this.dataStr= new Date(this.venta.venta.createdAT)
              this.detalles=response.data.detalles
              console.log(this.detalles)
             this.detalles.forEach((detalle,idx) => {
                
              setTimeout(() => {
                JsBarcode('#barcode-'+idx,detalle.codigo,{format:'CODE128',width:1,height:30,displayValue:true,textAlign:'center'})
              } ,50)
                
                this.detallesExcel.push({
                  producto:detalle.producto.titulo,
                  talla:detalle.variedad.talla,
                  color:detalle.variedad.color,
                  precioUnidad:detalle.variedad.precio,
                 
  
                })
              })
              this.loadData=false
            }
           
        },
        error=>{
          console.log(error)
        }
      )
    }
  
    descargarExcel(){
      let workbook = new Workbook();
  let worksheet = workbook.addWorksheet("Unidades");
  
  worksheet.addRow(undefined);
  for (let x1 of this.detallesExcel){
    let x2=Object.keys(x1);
  
    let temp=[]
    for(let y of x2){
      temp.push(x1[y])
    }
    worksheet.addRow(temp)
  }
  
  //GENERAR EXCEL
  let fname='Venta-'+this.dataStr.getMonth()+'-'+this.dataStr.getFullYear()+'-'+this.venta.venta._id.toString()
  
  worksheet.columns = [
    { header: 'Producto', key: 'col1', width: 35},
    
    { header: 'Talla', key: 'col3', width: 10 },
    { header: 'Color', key: 'col4', width: 15 },
    { header: 'Precio Unidad', key: 'col5', width: 10 },
  
  ]as any;
  
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, fname+'.xlsx');
  });
    }
  
  
    cambiarEstadoVenta(estado:any){
      this.ventaService.cambiarEstadoVenta(this.id,{estado:estado,estado_:estado},this.token).subscribe(
        response=>{
          if(response.data != undefined){
            $('#estadoModal').modal('hide')
            toastr.success('Estado actualizado')
            this.initData()
          }
        },
        error=>{
          console.log(error)
        }
      )
    }
  
}

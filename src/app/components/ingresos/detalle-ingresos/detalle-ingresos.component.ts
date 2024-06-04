import { Component } from '@angular/core';
import { IngresoService } from '../../../services/ingreso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
declare var JsBarcode: any;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
declare var $ : any;
declare var toastr: any;

@Component({
  selector: 'app-detalle-ingresos',
  templateUrl: './detalle-ingresos.component.html',
  styleUrl: './detalle-ingresos.component.css'
})
export class DetalleIngresosComponent {

  public id=''
  public token = localStorage.getItem('token')
  public ingreso:any={}
  public detalles:Array<any>=[] 
  public url= GLOBAL.url
  public loadData=true
  public detallesExcel:Array<any>=[]
  public dataStr:any =''
  constructor(

    private ingresoService: IngresoService,
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
    this.ingresoService.getIngreso(this.id,this.token).subscribe(
      response=>{
        if(response.data != undefined)
          {
            this.ingreso=response.data.ingreso
            this.dataStr= new Date(this.ingreso.createdAT)
            this.detalles=response.data.detalles
            
           this.detalles.forEach((detalle,idx) => {
              
            setTimeout(() => {
              JsBarcode('#barcode-'+idx,detalle.codigo,{format:'CODE128',width:1,height:30,displayValue:true,textAlign:'center'})
            } ,50)
              
              this.detallesExcel.push({
                producto:detalle.producto.titulo,
                codigo:detalle.codigo, 
                talla:detalle.producto_variedad.talla,
                color:detalle.producto_variedad.color,
                precioUnidad:detalle.precioUnidad,
               

              })
            })
            console.log(this.detallesExcel)
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
let fname='Ingreso-'+this.dataStr.getMonth()+'-'+this.dataStr.getFullYear()+'-'+this.ingreso.codigo.toString().padStart(6,'000000')

worksheet.columns = [
  { header: 'Producto', key: 'col1', width: 35},
  { header: 'Codigo', key: 'col2', width: 20 },
  { header: 'Talla', key: 'col3', width: 10 },
  { header: 'Color', key: 'col4', width: 15 },
  { header: 'Precio Unidad', key: 'col5', width: 10 },

]as any;

workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fname+'.xlsx');
});
  }


  cambiarEstadoIngreso(estado:any){
    this.ingresoService.cambiarEstadoIngreso(this.id,{estado:estado,estado_:estado},this.token).subscribe(
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

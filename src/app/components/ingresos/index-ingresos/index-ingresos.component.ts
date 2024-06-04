import { Component } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresoService } from '../../../services/ingreso.service';
import { response } from 'express';
declare var $:any
declare var moment:any

@Component({
  selector: 'app-index-ingresos',
  templateUrl: './index-ingresos.component.html',
  styleUrl: './index-ingresos.component.css'
})
export class IndexIngresosComponent {
  public loadData:boolean=true
  public ingresos:Array<any>=[]
  public page=1
  public pageSize=3
  public url=GLOBAL.url
  public token=localStorage.getItem('token')||''
  public IniciarFecha:any=''
  public FinalFecha:any=''


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private ingresoService:IngresoService
  ){}

  ngOnInit(){
    setTimeout(()=>{
      $("#kt_daterangepicker_1").daterangepicker();

      $("#kt_daterangepicker_1").daterangepicker({
        opens: 'left'
      }, (start:any, end:any, label:any) => {
        let start_date = moment(start).format('YYYY-MM-DD')
        let end_date = moment(end).format('YYYY-MM-DD')

        this.router.navigate(['/ingresos'],{queryParams:{ IniciarFecha:start_date, FinalFecha:end_date }})
      } );

    },50)

    this.route.queryParams.subscribe((params:any)=>{
      if(params.IniciarFecha && params.FinalFecha){
        this.IniciarFecha=params.IniciarFecha
        this.FinalFecha=params.FinalFecha
      }else{
        this.IniciarFecha=moment().startOf('month').format('YYYY-MM-DD')
        this.FinalFecha=moment().endOf('month').format('YYYY-MM-DD')
      }
      this.setFecha()
    })

  }

  setFecha(){

    setTimeout(()=>{
      $("#kt_daterangepicker_1").data('daterangepicker').setStartDate(new Date(this.IniciarFecha+'T00:00:00'))
    $("#kt_daterangepicker_1").data('daterangepicker').setEndDate(new Date(this.FinalFecha+'T00:00:00'))
    },50)
    
    this.filtroIngresos()
  }
  
  filtroIngresos(){
    let inicio=moment(this.IniciarFecha).format('YYYY-MM-DD')
    let fin=moment(this.FinalFecha).format('YYYY-MM-DD')
    this.loadData=true
    this.ingresoService.getIngresos(inicio,fin,this.token).subscribe(response=>{
      console.log(response)
      this.ingresos=response.data
      this.loadData=false
    })
  }
}

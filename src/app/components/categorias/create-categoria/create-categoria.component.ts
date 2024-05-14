import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare var toastr:any;
@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrl: './create-categoria.component.css'
})
export class CreateCategoriaComponent {

  public categoria:any={
    estado : false,
    genero:''
  }
  public token: string | null = null;
  public btn_load=false
  public subcategoria=''
  public subcategorias: Array<any>=[]

  constructor(
    private categoriaService: ProductoService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId:object
  ){
    const esNavegador=isPlatformBrowser(this.platformId)
    if(esNavegador){
      this.token=localStorage.getItem('token')
    }
  }

  ngOnInit(){

  }


  registrar(){
    this.categoria.subcategorias=this.subcategorias
    if(!this.categoria.titulo){
      toastr.error("el titulo es requerido")
    }else if(this.categoria.subcategorias ==0){
      toastr.error("al menos ingrese una subCategoria")}
      else{
        console.log(this.categoria);
        this.btn_load=true
        this.categoriaService.createCategoria(this.categoria,this.token).subscribe(response=>{
          if(response.data != undefined){
            toastr.success("categoria creada")
            this._router.navigate(['/categoria',this.categoria.genero])
          }else{
            toastr.error(response.message)
          }
          this.btn_load=false
        })
      }
  }

  add(){
      if(this.subcategoria){
        this.subcategorias.push(this.subcategoria.trim())
        this.subcategoria=''
      }
  }


  remove(idx:any){
    this.subcategorias.splice(idx,1)
  }
}

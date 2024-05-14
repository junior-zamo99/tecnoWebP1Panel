import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

declare var toastr:any

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css'
})
export class EditCategoriaComponent {
  public categoria:any={
    estado : false,
    genero:''
  }
  public id=''
  public token: string | null = null;
  public btn_load=false
  public subcategoria=''
  public subcategorias: Array<any>=[]

  constructor(
    private categoriaService: ProductoService,
    private route: ActivatedRoute,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId:object
  ){
    const esNavegador=isPlatformBrowser(this.platformId)
    if(esNavegador){
      this.token=localStorage.getItem('token')
    }
  }

  ngOnInit(){
      this.route.params.subscribe(
        params=>{
          this.id=params['id']

          this.initData()
        }
      )
  }

  initData(){
    this.categoriaService.getCategoria(this.id,this.token).subscribe(
      response=>{
        if(response.data != undefined){
          console.log(response);
        this.categoria=response.data
        this.subcategorias=this.categoria.subcategorias
       
        }
        
      }
    )
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

  actualizar(){
    this.categoria.subcategorias=this.subcategorias
    if(!this.categoria.titulo){
      toastr.error("el titulo es requerido")
    }else if(this.categoria.subcategorias ==0){
      toastr.error("al menos ingrese una subCategoria")}
      else{
        this.btn_load=true
        this.categoriaService.updateCategoria(this.id,this.categoria,this.token).subscribe(response=>{
          if(response.data != undefined){
            toastr.success("categoria actualizada")
            //this._router.navigate(['/categoria',this.categoria.genero])
            this.initData()
          }else{
            toastr.error(response.message)
          }
          this.btn_load=false
        })
      }
  }
}

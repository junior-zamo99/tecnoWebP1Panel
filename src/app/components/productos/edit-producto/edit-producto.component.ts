import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
declare var $: any;
declare var Tagify: any;
declare var toastr: any;
@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent {
  public token: any = localStorage.getItem('token');
  public active = 1;
  public producto: any = {
    categoria: '',
    subcategorias: '',
    clasificacion: '',
  };
  public tagify: any;
  public colores: Array<any> = GLOBAL.colores;
  public tallas: Array<any> = GLOBAL.tallas;
  public variacion: any = {
    color: '',
    talla: '',
  };
  public imagen: any = undefined;
  public tituloImagen = '';
 
  public variaciones: Array<any> = [];
  public galeria: Array<any> = [];
  public etiquetas: Array<any> = [];
  public categorias: Array<any> = [];
  public subcategorias: Array<any> = [];
  public btnLoading = false
  public loadVariaciones = true
  public id=''
  public url=GLOBAL.url

  public btn_delete_load=false
  public btn_delete_imagen=false

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}  

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
      this.initVariaciones();
      this.initGaleria()

      setTimeout(() => {
        $('#colorpicker').spectrum({
          color: '#ccc',
        });
      }, 50);
    
    });
  }

  initTagify() {
    setTimeout(() => {
      const input = document.querySelector('#kt_tagify');
      this.tagify = new Tagify(input, {
        maxTags: 10,
        dropdown: {
          classname: 'tagify_inline_suggestions',
          maxItems: 5,
          enabled: 0,
          closeOnSelect: false,
        },
      });
    }, 150);
  }
  
  initVariaciones(){
    this.loadVariaciones = true
    this._productoService.getVariacionesProducto(this.id,this.token).subscribe(
      response=>{
        console.log(response);
        this.loadVariaciones = false
        this.variaciones = response.data
      }
    )
  }

  initGaleria(){
    this.loadVariaciones = true
    this._productoService.getGaleriaProducto(this.id,this.token).subscribe(
      response=>{
        console.log(response);
        this.loadVariaciones = false
        this.galeria = response.data
      }
    )
  }

  initData(){
    this._productoService.getProducto(this.id,this.token).subscribe(
      response=>{
        this.producto=response.data;
        setTimeout(() => {
          const input = document.querySelector('#kt_tagify');
          this.tagify = new Tagify(input, {
            maxTags: 10,
            dropdown: {
              classname: 'tagify_inline_suggestions',
              maxItems: 5,
              enabled: 0,
              closeOnSelect: false,
            },
          });
          this.tagify.addTags(this.producto.labels);
        }, 150);
        this._productoService.getCategorias(this.producto.clasificacion,this.token).subscribe(
          response => {
            if(response.data !=undefined){
              this.categorias = response.data;
              console.log(this.categorias);
              this.setCategoria();
              
            }
          }
        )
        
      })

  }

  setActive(value: any) {
    this.active = value;
  }
  setClasificacion(){
    this._productoService.getCategorias(this.producto.clasificacion,this.token).subscribe(
      response => {
        if(response.data !=undefined){
          this.categorias = response.data;
          
        }
      }
    )
  }

  setCategoria(){
    console.log(this.categorias);
    console.log(this.producto.categoria);
    const categoria=this.categorias.find(item=>item._id==this.producto.categoria);
    this.subcategorias = categoria.subcategorias;
  }

  add_variacion() {
    this.variacion.hxd = $('#colorpicker').spectrum('get').toHexString();

    if (!this.variacion.hxd) {
      toastr.error('Seleccione un color HXD');
    } else if (!this.variacion.talla) {
      toastr.error('Seleccione una talla');
    } else if (!this.variacion.color) {
      toastr.error('Seleccione un color');
    } else {

      this.variacion.producto=this.id;
      this._productoService.addVariacion(this.variacion,this.token).subscribe(
        response=>{
          console.log(response);
          if(response.data){
            toastr.success('Variacion agregada correctamente');
            this.initVariaciones();
          }
        },
        error=>{
          toastr.error('Error al agregar la variacion');
        }
      )
    }
  }

  removeVariacion(index: any) {
    this.variaciones.splice(index, 1);
  }
  removeImagen(index: any) {
    this.galeria.splice(index, 1);
  }
  cargarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (
        file.type.includes('image/jpeg') ||
        file.type.includes('image/png') ||
        file.type.includes('image/jpg') ||
        file.type.includes('image/gif')
      ) {
        if (file.size <= 2097152) {
          
          this.imagen = file;
          this.tituloImagen = file.name;
          console.log(this.imagen);
        } else {
          toastr.error('El tamaño de la imagen no puede ser mayor a 2MB');
          this.imagen = undefined;
          $('#fileInput').val('');
        }
      } else {
        toastr.error('El archivo seleccionado no es una imagen');
        this.imagen = undefined;
        $('#fileInput').val('');
      }
    } else {
      console.log('No hay imagen');
    }
    console.log(this.imagen);
  }


  add_Imagen() {
    if (this.imagen == undefined) {
      toastr.error('Seleccione una imagen');
    } else if (this.tituloImagen == '') {
      toastr.error('Ingrese un titulo para la imagen');
    } else {
      let data={
        imagen:this.imagen,
        titulo:this.tituloImagen,
        producto:this.id
      }

      this._productoService.AddImagenProducto(data,this.token).subscribe(
        response=>{
          console.log(response);
        if(response.data !=undefined){
            toastr.success('Imagen agregada correctamente');
             this.imagen = undefined;
          this.tituloImagen = '';
           $('#fileInput').val('');
            this.initGaleria();
          }else{
            toastr.error('Error al agregar la imagen');
          }
         
        },
        error=>{
          toastr.error('Error al agregar la imagen');
        }
      )
      
    }
  }

  eliminarVariacion(id:any){
    this._productoService.deleteVariacion(id,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.data){
          toastr.success('Variacion eliminada correctamente');
          this.initVariaciones();
        }else{
          toastr.error('Error al eliminar la variacion');
        }
        $('#delete-'+id).modal('hide')
      }
     
    )
  }

  eliminarImagen(id:any){
    this.btn_delete_load=true
    this._productoService.deleteImagen(id,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.data){
          toastr.success('Imagen eliminada correctamente');
          this.initGaleria();
        }else{
          toastr.error('Error al eliminar la imagen');
        }
        $('#deleteImg-'+id).modal('hide')
        this.btn_delete_load=false
      }
     
    )
  }

  actualizar() {
    this.etiquetas = [];
    for(var item of this.tagify.getTagElms()){
      this.etiquetas.push(item.__tagifyTagData.value);
    }
   
    if (!this.producto.titulo) {
      toastr.error('Ingrese un titulo');
    } else if (!this.producto.clasificacion) {
      toastr.error('Ingrese una clasificacion');
    } else if (!this.producto.categoria) {
      toastr.error('Ingrese una categoria');
    } else if (!this.producto.subcategorias) {
      toastr.error('Ingrese una subcategoria');
    } else if (this.etiquetas.length == 0) {
      toastr.error('Ingrese etiquetas');
      
    } else if (!this.producto.descripcion) {
      toastr.error('Ingrese una descripcion');

    }
    else{
      let data:any={
        titulo:this.producto.titulo,
        clasificacion:this.producto.clasificacion,
        categoria:this.producto.categoria,
        subcategorias:this.producto.subcategorias,
        etiquetas:this.etiquetas,
        descripcion:this.producto.descripcion
      }
      
      this._productoService.updateProducto(this.id,data,this.token).subscribe(
        response=>{
          console.log(response);
          if(response.data){
            toastr.success('Producto actualizado correctamente');
            this.initData()
            this._router.navigate(['/producto']);
          }
        },
        error=>{
          toastr.error('Error al actualizar el producto');
        }
      )
    }
  }
}

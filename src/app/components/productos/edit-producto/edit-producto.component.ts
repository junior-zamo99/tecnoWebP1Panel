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
  public imagenStr: any = '';
  public variaciones: Array<any> = [];
  public galeria: Array<any> = [];
  public etiquetas: Array<any> = [];
  public categorias: Array<any> = [];
  public subcategorias: Array<any> = [];
  public btnLoading = false
  
  public id=''

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}  

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    
    });
  }

  initData(){
    this._productoService.getProducto(this.id,this.token).subscribe(
      response=>{
        this.producto=response.data;
        console.log(this.producto);
      })

  }

  setActive(value: any) {
    this.active = value;
  }
  setClasificacion(){
    console.log(this.producto.clasificacion);
    this._productoService.getCategorias(this.producto.clasificacion,this.token).subscribe(
      response => {
        if(response.data !=undefined){
          this.categorias = response.data;
          console.log(this.categorias);

        }
      },
      error => {
        console.log(error);
      }
    )
  }

  setCategoria(){
    const categoria=this.categorias.find(item=>item._id==this.producto.categoria);

    this.subcategorias = categoria.subcategorias;
    console.log(this.subcategorias);
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
      this.variaciones.push(this.variacion);
      this.variacion = {
        color: '',
        talla: '',
      };
      console.log(this.variaciones);
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
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            console.log(reader.result);
            this.imagenStr = reader.result;
          };
          this.imagen = file;
          this.tituloImagen = file.name;
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
      this.galeria.push({
        imagen: this.imagen,
        titulo: this.tituloImagen,
        str: this.imagenStr,
      });
      this.imagen = undefined;
      this.tituloImagen = '';
      this.imagenStr = '';
      $('#fileInput').val('');
    }
  }

  actualizar() {
    
  }
}

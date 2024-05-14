import { Component } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';


declare var $: any;
declare var Tagify: any;
declare var toastr: any;
@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
})
export class CreateProductoComponent {
  public token: any = localStorage.getItem('token');
  public active = 1;
  public producto: any = {
    titulo:'',
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

  public btnLoading = false;
  constructor(
    private _productoService: ProductoService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.initTagify();
    setTimeout(() => {
      $('#colorpicker').spectrum({
        color: '#ccc',
      });
    }, 50);
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

  setActive(value: any) {
    this.active = value;
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

  removeVariacion(index: any) {
    this.variaciones.splice(index, 1);
  }
  removeImagen(index: any) {
    this.galeria.splice(index, 1);
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

  crear() {
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
    } else if (this.variaciones.length == 0) {
      toastr.error('Ingrese al menos una variacion');
    } else if (this.galeria.length == 0) {
      toastr.error('Ingrese al menos una imagen');
    } else {
      this.producto.etiquetas = this.etiquetas;
      this.producto.variaciones = this.variaciones;
      const arregloGaleria = [];
      for (var item of this.galeria) {
        arregloGaleria.push({
          imagen: item.imagen,
          titulo: item.titulo,
      });
      }
      this.producto.galeria = arregloGaleria;

      this.btnLoading = true;
      console.log(this.producto);
      this._productoService.createProducto(this.producto, this.token).subscribe(
        response => {
          console.log(response.data);
          if(response.data != undefined){
          console.log(response.data);
          toastr.success('Producto creado correctamente');
          this._router.navigate(['/producto']);
          }else{
            toastr.error({message: response.message});
          }
          this.btnLoading = false;
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}

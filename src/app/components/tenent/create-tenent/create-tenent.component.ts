import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../services/rol.service';
declare var toastr:any
@Component({
  selector: 'app-create-tenent',
  templateUrl: './create-tenent.component.html',
  styleUrl: './create-tenent.component.css'
})
export class CreateTenentComponent {
  public empresa:any={}
  public tipo: number=0
  public btn_load=false
  public roles: Array<any>=[]

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private _router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(){
    this.route.params.subscribe(params => {
       const tipoStr = params['tipo'].replace(/[{}]/g, ''); // Elimina las llaves
      if (!isNaN(tipoStr)) {
        this.tipo = +tipoStr; // Convierte el parámetro a un número
      } else {
        console.error('Tipo no es un número:', tipoStr);
      }
      console.log(this.tipo) //; // Aquí puedes hacer lo que necesites con el parámetro
    });// El símbolo '+' convierte el parámetro a un número
    
    this._rolService.getFuncionalidades().subscribe(
      response=>{
        if(response.data != undefined){
          this.roles=response.data
          console.log(this.roles)
        }
      }
    )
  }


  registrar(){
    if(!this.empresa.nombreTienda){
      toastr.error("el nombre de la tienda es requerido")
    }else if(!this.empresa.email){
      toastr.error("el correo electronico es requerido")
    }else if(!this.empresa.nombres){
      toastr.error("los nombres son requeridos")
    }else if(!this.empresa.apellidos){
      toastr.error("los apellidos son requeridos")
    }else if(!this.empresa.password){
      toastr.error("la contraseña es requerida")
    }else{
      this.btn_load=true
      this.empresa.tipo=this.tipo
      console.log(this.empresa)
      this._usuarioService.createTenant(this.empresa).subscribe(
        response=>{
          console.log(response)
          if(response.data != undefined){
            console.log(response)
            this.btn_load=false
            toastr.success('Registro exitoso')
            this._router.navigate(['/']) 
          }else{

            toastr.error('Error al registrar')
          }}
      )
    }
  }
}

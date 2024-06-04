import { Component } from '@angular/core';
import { RolService } from '../../../services/rol.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index-rol',
  templateUrl: './index-rol.component.html',
  styleUrl: './index-rol.component.css'
})
export class IndexRolComponent {

  public load_data = true;
  public filtro = '';
  public page=1
  public pageSize=3
  public token = localStorage.getItem('token');
  roles: Array<any> = [];
  constructor(
    private _rolService: RolService,
    private _router: Router,
    private _route: ActivatedRoute
  ){}

  filter(){}

  ngOnInit(){
    this.initData()
  }

  initData(){
    this.load_data=true
    this._rolService.getRoles(this.token).subscribe(
      response=>{
        console.log(response);
        if(response != undefined){
          this.roles=response.data
        }else{

        }
        this.load_data=false
      }
    )
  }
}

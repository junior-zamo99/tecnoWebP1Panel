import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexUsuarioComponent } from './components/usuarios/index-usuario/index-usuario.component';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './components/usuarios/edit-usuario/edit-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { IndexCategoriaComponent } from './components/categorias/index-categoria/index-categoria.component';
import { CreateCategoriaComponent } from './components/categorias/create-categoria/create-categoria.component';
import { EditCategoriaComponent } from './components/categorias/edit-categoria/edit-categoria.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { IndexRolComponent } from './components/roles/index-rol/index-rol.component';
import { CreateRolComponent } from './components/roles/create-rol/create-rol.component';
import { EditRolComponent } from './components/roles/edit-rol/edit-rol.component';
import { IndexIngresosComponent } from './components/ingresos/index-ingresos/index-ingresos.component';
import { CreateIngresosComponent } from './components/ingresos/create-ingresos/create-ingresos.component';
import { DetalleIngresosComponent } from './components/ingresos/detalle-ingresos/detalle-ingresos.component';
import { IndexInventarioComponent } from './components/inventario/index-inventario/index-inventario.component';
import { DetalleInventarioComponent } from './components/inventario/detalle-inventario/detalle-inventario.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},

  {path:'colaborador', component: IndexUsuarioComponent},
  {path:'colaborador/create', component: CreateUsuarioComponent},
  {path:'colaborador/edit/:id', component: EditUsuarioComponent},

  {path:'categoria/create', component: CreateCategoriaComponent},
  {path:'categoria', component: IndexCategoriaComponent},
  {path:'categoria/:clasificacion', component: IndexCategoriaComponent},
  {path:'categoria/edit/:id', component: EditCategoriaComponent},

  {path:'producto', component: IndexProductoComponent},
  {path:'producto/create', component: CreateProductoComponent},
  {path:'producto/edit/:id', component: EditProductoComponent},

  {path:'rol', component: IndexRolComponent},
  {path:'rol/create', component: CreateRolComponent},
  {path:'rol/edit/:id', component: EditRolComponent},

  {path: 'ingresos', component: IndexIngresosComponent},
  {path :'ingresos/create', component:CreateIngresosComponent},
  {path:'ingresos/detalles/:id', component:DetalleIngresosComponent},

  {path: 'inventario', component: IndexInventarioComponent},
  {path:'inventario/detalles/:id', component:DetalleInventarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

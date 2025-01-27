import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexUsuarioComponent } from './components/usuarios/index-usuario/index-usuario.component';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './components/usuarios/edit-usuario/edit-usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importa HttpClient en lugar de provideHttpClient y withFetch
import { LoginComponent } from './components/login/login.component';
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
import { CreateTenentComponent } from './components/tenent/create-tenent/create-tenent.component';
import { SuscripcionComponent } from './components/tenent/suscripcion/suscripcion.component';
import { IndexVentasComponent } from './components/ventas/index-ventas/index-ventas.component';
import { DetallesVentasComponent } from './components/ventas/detalles-ventas/detalles-ventas.component';
import { IndexProveedorComponent } from './components/proveedor/index-proveedor/index-proveedor.component';
import { CreateProveedorComponent } from './components/proveedor/create-proveedor/create-proveedor.component';
import { CreateAlmacenComponent } from './components/almacen/create-almacen/create-almacen.component';
import { IndexAlmacenComponent } from './components/almacen/index-almacen/index-almacen.component';
import { IndexCuponComponent } from './components/cupon/index-cupon/index-cupon.component';
import { CreateCuponComponent } from './components/cupon/create-cupon/create-cupon.component';
import { EditCuponComponent } from './components/cupon/edit-cupon/edit-cupon.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    IndexUsuarioComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent,
    LoginComponent,
    IndexCategoriaComponent,
    CreateCategoriaComponent,
    EditCategoriaComponent,
    IndexProductoComponent,
    CreateProductoComponent,
    EditProductoComponent,
    IndexRolComponent,
    CreateRolComponent,
    EditRolComponent,
    IndexIngresosComponent,
    CreateIngresosComponent,
    DetalleIngresosComponent,
    IndexInventarioComponent,
    DetalleInventarioComponent,
    CreateTenentComponent,
    SuscripcionComponent,
    IndexVentasComponent,
    DetallesVentasComponent,
    IndexProveedorComponent,
    CreateProveedorComponent,
    CreateAlmacenComponent,
    IndexAlmacenComponent,
    IndexCuponComponent,
    CreateCuponComponent,
    EditCuponComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HttpClient, useClass: HttpClient } // Usa HttpClient directamente y proporciona la clase HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistroComponent } from './registro/registro.component';



const routes: Routes = [
  {path:'perfil',component:PerfilComponent},
  {path:'login',component:LogInComponent},
  {path:'register',component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProdGuardService as guard } from './services/guards/prod-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // EXAMPLES
  //{path: 'home', component: HomeComponent,   canActivate: [guard], data: { expectedRol: ['admin', 'user'] } }, 
  //{path: 'add', component: AddFilmComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

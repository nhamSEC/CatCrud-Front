import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component'; 
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { CatListComponent } from './cat/components/cat-list/cat-list.component';
import { CatFormComponent } from './cat/components/cat-form/cat-form.component';
import { CatDetailComponent } from './cat/components/cat-detail/cat-detail.component';
import { authGuard } from './guards/auth.guard';
import { RedirectComponent } from './redirect/components/redirect.component';
import { redirectGuard } from './guards/redirect.guard';

function isLoggedIn(): boolean {
  const user = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')||""):null;
  console.log("user",user,!!user)
  return !!user;
}
export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: isLoggedIn() ? 'dashboard' : 'login',
  //   pathMatch: 'prefix',    
  // }, 
  { path: '', component: RedirectComponent, canActivate: [redirectGuard] },
  { path: 'login', component: LoginComponent}, 
  { path: 'dashboard', component: DashboardComponent ,canActivate: [authGuard]},
  { path: 'cats', component: CatListComponent ,canActivate: [authGuard]},
  { path: 'add', component: CatFormComponent,canActivate: [authGuard] }, 
  { path: 'edit/:id', component: CatFormComponent ,canActivate: [authGuard]}, 
  { path: 'detail/:id', component: CatDetailComponent,canActivate: [authGuard] }, 
  { path: '**', redirectTo: 'login' }, 
];

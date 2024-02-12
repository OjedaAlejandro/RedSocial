import { Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AppComponent } from './app.component';
import { loginGuard } from './guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterDataUserComponent } from './components/users/register-data-user/register-data-user.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { OtrosUsersComponent } from './components/otros-users/otros-users.component';
import { PerfilOtrosUsersComponent } from './components/perfil-otros-users/perfil-otros-users.component';
export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[loginGuard]},// Redirige a /inicio por defecto
    {path:'menu',component:MenuComponent,canActivate:[loginGuard]},
    {path:'register_data',component:RegisterDataUserComponent},
    {path:'home',component:HomeComponent,canActivate:[loginGuard]},
    {path:'registro/:id',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'perfil',component:PerfilComponent,canActivate:[loginGuard]},
    {path:'OtrosUsuarios',component:OtrosUsersComponent,canActivate:[loginGuard]},
    {path:'perfilUsuario/:id',component:PerfilOtrosUsersComponent,canActivate:[loginGuard]},
    {path:'**',component:HomeComponent,canActivate:[loginGuard]}
];

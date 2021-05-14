import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PaysComponent } from './pays/pays.component';
import { ListPaysComponent } from './list-pays/list-pays.component';
import { ListOrganismeComponent } from './list-organisme/list-organisme.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { ListProfilComponent } from './list-profil/list-profil.component';
import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { DomaineComponent } from './domaine/domaine.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'pays', component: ListPaysComponent },
  { path: 'organismes', component: ListOrganismeComponent },
  { path: 'profils', component: ListProfilComponent },
  { path: 'domaines', component: ListDomaineComponent },
  { path: 'addUpdatePays', component: PaysComponent },
  { path: 'addUpdateOrganisme', component: OrganismeComponent },
  { path: 'addUpdateProfil', component: ProfileComponent },
  { path: 'addUpdateDomaine', component: DomaineComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

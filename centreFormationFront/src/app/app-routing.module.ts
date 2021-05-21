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
import { ListFormationComponent } from './list-formation/list-formation.component';
import { FormationComponent } from './formation/formation.component';
import { ListFormateurComponent } from './list-formateur/list-formateur.component';
import { FormateurComponent } from './formateur/formateur.component';
import { ListSessionFormationComponent } from './list-session-formation/list-session-formation.component';
import { SessionFormationComponent } from './session-formation/session-formation.component';
import { ParticipantComponent } from './participant/participant.component';
import { ListParticipantComponent } from './list-participant/list-participant.component';

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
  { path: 'formations', component: ListFormationComponent },
  { path: 'sessionformations', component: ListSessionFormationComponent },
  { path: 'formateurs', component: ListFormateurComponent },
  { path: 'participants', component: ListParticipantComponent },
  { path: 'addUpdatePays', component: PaysComponent },
  { path: 'addUpdateOrganisme', component: OrganismeComponent },
  { path: 'addUpdateProfil', component: ProfileComponent },
  { path: 'addUpdateDomaine', component: DomaineComponent },
  { path: 'addUpdateFormation', component: FormationComponent },
  { path: 'addUpdateSessionFormation', component: SessionFormationComponent },
  { path: 'addUpdateFormateur', component: FormateurComponent },
  { path: 'addUpdateParticipant', component: ParticipantComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

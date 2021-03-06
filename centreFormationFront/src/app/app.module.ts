import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileComponent } from './profile/profile.component';
import { ListPaysComponent } from './list-pays/list-pays.component';
import { PaysComponent } from './pays/pays.component';
import { AuthInterceptor } from './_helpers/auth.service';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ListOrganismeComponent } from './list-organisme/list-organisme.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { ProfilComponent } from './profil/profil.component';
import { ListProfilComponent } from './list-profil/list-profil.component';
import { DomaineComponent } from './domaine/domaine.component';
import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { FormationComponent } from './formation/formation.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { FormateurComponent } from './formateur/formateur.component';
import { ListFormateurComponent } from './list-formateur/list-formateur.component';
import { SessionFormationComponent } from './session-formation/session-formation.component';
import { ListSessionFormationComponent } from './list-session-formation/list-session-formation.component';
import { ParticipantComponent } from './participant/participant.component';
import { ListParticipantComponent } from './list-participant/list-participant.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    BoardAdminComponent,
    BoardUserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListPaysComponent,
    PaysComponent,
    ListOrganismeComponent,
    OrganismeComponent,
    ProfilComponent,
    ListProfilComponent,
    DomaineComponent,
    ListDomaineComponent,
    FormationComponent,
    ListFormationComponent,
    FormateurComponent,
    ListFormateurComponent,
    SessionFormationComponent,
    ListSessionFormationComponent,
    ParticipantComponent,
    ListParticipantComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatDialogModule,
    MatNativeDateModule,
    //MatMomentDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [],
  entryComponents: [
    PaysComponent,
    OrganismeComponent,
    ProfilComponent,
    DomaineComponent,
    FormationComponent,
    FormateurComponent,
    SessionFormationComponent,
    ParticipantComponent,
  ],
})
export class AppModule {}

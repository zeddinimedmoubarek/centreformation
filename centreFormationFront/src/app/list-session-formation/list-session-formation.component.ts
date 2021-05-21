import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SessionFormationModel } from '../models/sessionFormation.model';
import { SessionFormationComponent } from '../session-formation/session-formation.component';
import { SessionFormationService } from '../services/session-formation.service';
import { OrganismeModel } from '../models/organisme.model';
import { FormateurModel } from '../models/formateur.model';

@Component({
  selector: 'app-list-sessionFormation',
  templateUrl: './list-session-formation.component.html',
  styleUrls: ['./list-session-formation.component.css'],
})
export class ListSessionFormationComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'formateur',
    'organisme',
    'lieu',
    'dateDebut',
    'dateFin',
    'nbParticipants',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  sessionFormation: any;
  organismeService: any;
  formateurService: any;
  organismes: OrganismeModel[];
  formateurs: FormateurModel[];

  constructor(
    private sessionFormationService: SessionFormationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sessionFormationService
      .getAllSessionFormation()
      .subscribe((data: SessionFormationModel[]) => {
        this.dataSource.data = data;
      });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SessionFormationComponent, dialogConfig);
  }
  onEdit(id, formateur, organisme, lieu, dateDebut, dateFin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      formateur: formateur,
      organisme: organisme,
      lieu: lieu,
      dateDebut: dateDebut,
      dateFin: dateFin,
    };
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<SessionFormationComponent>;
    dialogRef = this.dialog.open(SessionFormationComponent, dialogConfig);
  }
  deleteSessionFormation(id) {
    this.sessionFormationService
      .deleteSessionFormation(id)
      .subscribe(() => console.log('SessionFormation deleted'));
    this.reloadPage();
    this.snackBar.open('SessionFormation deleted successfully!', '', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
    //this.redirect();
  }
  //custom functions
  reloadPage() {
    window.location.reload();
  }

  redirect() {
    this.router.navigate(['./sessionFormation']);
  }

  getOrganismes() {
    this.organismeService
      .getAllOrganisme()
      .subscribe((data: OrganismeModel[]) => {
        this.organismes = data;
        console.log(this.organismes);
      });
  }

  getFormateurs() {
    this.formateurService
      .getAllFormateur()
      .subscribe((data: FormateurModel[]) => {
        this.formateurs = data;
        console.log(this.formateurs);
      });
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

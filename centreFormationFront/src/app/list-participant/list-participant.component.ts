import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParticipantModel } from '../models/participant.model';
import { ParticipantComponent } from '../participant/participant.component';
import { ParticipantService } from '../services/participant.service';
import { OrganismeModel } from '../models/organisme.model';
import { PaysComponent } from '../pays/pays.component';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.css'],
})
export class ListParticipantComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'email',
    'tel',
    'profil',
    'typeParticipant',
    'organisme',
    'pays',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  participant: any;
  organismeService: any;
  organismes: OrganismeModel[];

  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.participantService
      .getAllParticipant()
      .subscribe((data: ParticipantModel[]) => {
        this.dataSource.data = data;
      });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ParticipantComponent, dialogConfig);
  }
  onEdit(
    id,
    nom,
    prenom,
    email,
    tel,
    profil,
    typeParticipant,
    organisme,
    pays
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      nom: nom,
      prenom: prenom,
      email: email,
      tel: tel,
      profil: profil,
      type: typeParticipant,
      organisme: organisme,
      pays: pays,
    };
    console.log(dialogConfig.data);
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<ParticipantComponent>;
    dialogRef = this.dialog.open(ParticipantComponent, dialogConfig);
  }
  deleteParticipant(id) {
    this.participantService
      .deleteParticipant(id)
      .subscribe(() => console.log('Participant deleted'));
    this.reloadPage();
    this.snackBar.open('Participant deleted successfully!', '', {
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
    this.router.navigate(['./participant']);
  }

  getOrganismes() {
    this.organismeService
      .getAllOrganisme()
      .subscribe((data: OrganismeModel[]) => {
        this.organismes = data;
        console.log(this.organismes);
      });
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormateurModel } from '../models/formateur.model';
import { FormateurComponent } from '../formateur/formateur.component';
import { FormateurService } from '../services/formateur.service';
import { OrganismeModel } from '../models/organisme.model';

@Component({
  selector: 'app-list-formateur',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css'],
})
export class ListFormateurComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'email',
    'tel',
    'type',
    'organisme',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  formateur: any;
  organismeService: any;
  organismes: OrganismeModel[];

  constructor(
    private formateurService: FormateurService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formateurService
      .getAllFormateur()
      .subscribe((data: FormateurModel[]) => {
        this.dataSource.data = data;
      });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FormateurComponent, dialogConfig);
  }
  onEdit(id, nom, prenom, email, tel, type, organisme) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      nom: nom,
      prenom: prenom,
      email: email,
      tel: tel,
      type: type,
      organisme: organisme,
    };
    console.log(dialogConfig.data);
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<FormateurComponent>;
    dialogRef = this.dialog.open(FormateurComponent, dialogConfig);
  }
  deleteFormateur(id) {
    this.formateurService
      .deleteFormateur(id)
      .subscribe(() => console.log('Formateur deleted'));
    this.reloadPage();
    this.snackBar.open('Formateur deleted successfully!', '', {
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
    this.router.navigate(['./formateur']);
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

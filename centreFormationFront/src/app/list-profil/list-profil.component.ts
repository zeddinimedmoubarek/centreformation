import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfilModel } from '../models/profil.model';
import { ProfilComponent } from '../profil/profil.component';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
})
export class ListProfilComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Libelle', 'actions'];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  profil: any;

  constructor(
    private profilService: ProfilService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.profilService.getAllProfil().subscribe((data: ProfilModel[]) => {
      this.dataSource.data = data;
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProfilComponent, dialogConfig);
  }
  onEdit(id, libelle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: id, libelle: libelle };
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<ProfilComponent>;
    dialogRef = this.dialog.open(ProfilComponent, dialogConfig);
  }
  deleteProfil(id) {
    this.profilService
      .deleteProfil(id)
      .subscribe(() => console.log('Profil deleted'));
    this.reloadPage();
    this.snackBar.open('Profil deleted successfully!', '', {
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
    this.router.navigate(['./profil']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DomaineModel } from '../models/domaine.model';
import { DomaineComponent } from '../domaine/domaine.component';
import { DomaineService } from '../services/domaine.service';

@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.css'],
})
export class ListDomaineComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Libelle', 'actions'];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  domaine: any;

  constructor(
    private domaineService: DomaineService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.domaineService.getAllDomaine().subscribe((data: DomaineModel[]) => {
      this.dataSource.data = data;
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DomaineComponent, dialogConfig);
  }
  onEdit(id, libelle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: id, libelle: libelle };
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<DomaineComponent>;
    dialogRef = this.dialog.open(DomaineComponent, dialogConfig);
  }
  deleteDomaine(id) {
    this.domaineService
      .deleteDomaine(id)
      .subscribe(() => console.log('Domaine deleted'));
    this.reloadPage();
    this.snackBar.open('Domaine deleted successfully!', '', {
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
    this.router.navigate(['./domaine']);
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaysModel } from '../models/pays.model';
import { PaysComponent } from '../pays/pays.component';
import { PaysService } from '../services/pays.service';

@Component({
  selector: 'app-list-pays',
  templateUrl: './list-pays.component.html',
  styleUrls: ['./list-pays.component.css'],
})
export class ListPaysComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Libelle', 'actions'];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  pays: any;

  constructor(
    private paysService: PaysService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paysService.getAllPays().subscribe((data: PaysModel[]) => {
      this.dataSource.data = data;
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PaysComponent, dialogConfig);
  }
  onEdit(id, libelle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: id, libelle: libelle };
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<PaysComponent>;
    dialogRef = this.dialog.open(PaysComponent, dialogConfig);
  }
  deletePays(id) {
    this.paysService
      .deletePays(id)
      .subscribe(() => console.log('Pays deleted'));
    this.reloadPage();
    this.snackBar.open('Pays deleted successfully!', '', {
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
    this.router.navigate(['./pays']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

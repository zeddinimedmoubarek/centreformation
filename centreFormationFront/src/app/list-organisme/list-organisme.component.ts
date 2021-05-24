import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrganismeModel } from '../models/organisme.model';
import { OrganismeComponent } from '../organisme/organisme.component';
import { OrganismeService } from '../services/organisme.service';

@Component({
  selector: 'app-list-organisme',
  templateUrl: './list-organisme.component.html',
  styleUrls: ['./list-organisme.component.css'],
})
export class ListOrganismeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Libelle', 'actions'];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  organisme: any;

  constructor(
    private organismeService: OrganismeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.organismeService
      .getAllOrganisme()
      .subscribe((data: OrganismeModel[]) => {
        this.dataSource.data = data;
      });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(OrganismeComponent, dialogConfig);
  }
  onEdit(id, libelle) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: id, libelle: libelle };
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<OrganismeComponent>;
    dialogRef = this.dialog.open(OrganismeComponent, dialogConfig);
  }
  deleteOrganisme(id) {
    this.organismeService
      .deleteOrganisme(id)
      .subscribe(() => console.log('Organisme deleted'));
    this.reloadPage();
    this.snackBar.open('Organisme deleted successfully!', '', {
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
    this.router.navigate(['./organisme']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

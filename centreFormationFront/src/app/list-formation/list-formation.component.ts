import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormationModel } from '../models/formation.model';
import { FormationComponent } from '../formation/formation.component';
import { FormationService } from '../services/formation.service';
import { DomaineModel } from '../models/domaine.model';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css'],
})
export class ListFormationComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'titre',
    'typeFormation',
    'duree',
    'budget',
    'domaine',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  errorMessage = '';
  formation: any;
  domaineService: any;
  domaines: DomaineModel[];

  constructor(
    private formationService: FormationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formationService
      .getAllFormation()
      .subscribe((data: FormationModel[]) => {
        this.dataSource.data = data;
      });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FormationComponent, dialogConfig);
  }
  onEdit(id, titre, typeFormation, duree, budget, domaine) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      titre: titre,
      typeFormation: typeFormation,
      duree: duree,
      budget: budget,
      domaine: domaine,
    };
    console.log(dialogConfig.data);
    dialogConfig.width = '60%';
    let dialogRef: MatDialogRef<FormationComponent>;
    dialogRef = this.dialog.open(FormationComponent, dialogConfig);
  }
  deleteFormation(id) {
    this.formationService
      .deleteFormation(id)
      .subscribe(() => console.log('Formation deleted'));
    this.reloadPage();
    this.snackBar.open('Formation deleted successfully!', '', {
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
    this.router.navigate(['./formation']);
  }

  getDomaines() {
    this.domaineService.getAllDomaine().subscribe((data: DomaineModel[]) => {
      this.domaines = data;
      console.log(this.domaines);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // close() {
  //   this.dialogRef.close();
  // }
}

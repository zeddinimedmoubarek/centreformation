import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DomaineModel } from '../models/domaine.model';
import { FormationModel } from '../models/formation.model';
import { DomaineService } from '../services/domaine.service';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {
  id: any;
  formation: FormationModel = new FormationModel();
  formationForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  domaines: DomaineModel[];
  selectedDomaine: any;
  domaine: DomaineModel = new DomaineModel();
  constructor(
    private formationService: FormationService,
    private domaineService: DomaineService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<FormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormationModel
  ) {
    this.formation.domaine = new DomaineModel();
  }

  ngOnInit(): void {
    this.getDomaines();
    if (this.data == null) {
      this.addMode = true;
      this.formationForm = this.formBuilder.group({
        id: [this.formation.id],
        titre: [
          this.formation.titre,
          [Validators.required, Validators.minLength(3)],
        ],
        typeFormation: [this.formation.typeFormation, [Validators.required]],
        duree: [
          this.formation.duree,
          [Validators.required, Validators.minLength(2)],
        ],
        budget: [
          this.formation.budget,
          [
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.minLength(2),
          ],
        ],
        //nbSessions: [this.formation.nbSessions, [Validators.required]],
        domaine: [this.formation.domaine, [Validators.required]],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.formation = this.data;
      this.selectedDomaine = this.formation.domaine.id;
      console.log(this.selectedDomaine);
      this.formationForm = this.formBuilder.group({
        id: [this.formation.id],
        titre: [
          this.formation.titre,
          [Validators.required, Validators.minLength(3)],
        ],
        typeFormation: [
          this.formation.typeFormation,
          [Validators.required, Validators.minLength(3)],
        ],
        duree: [
          this.formation.duree,
          [Validators.required, Validators.minLength(2)],
        ],
        budget: [
          this.formation.budget,
          [
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.minLength(2),
          ],
        ],
        //nbSessions: [this.formation.nbSessions, [Validators.required]],
        domaine: [this.formation.domaine, [Validators.required]],
      });
    }
  }

  save() {
    this.dialogRef.close(this.formationForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formation.id == null) this.onCreate();
    else if (this.formation.id != null) {
      this.updateFormation(this.formation.id, this.formation);
    }
  }

  onCreate() {
    this.formation.domaine.id = this.selectedDomaine;
    this.formationService.createFormation(this.formation).subscribe(
      (data) => {
        this.snackBar.open('Formation Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.formationForm.value);
        this.onClose();
        this.reloadPage();
        console.log(data);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.snackBar.open(this.errorMessage, '', {
          duration: 6000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      }
    );
  }

  updateFormation(id, formation) {
    this.formation.domaine.id = this.selectedDomaine;
    this.getDomaines();
    this.formationService.updateFormation(id, formation).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Formation updated successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.onClose();
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.snackBar.open(this.errorMessage, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      }
    );
  }
  getDomaines() {
    this.domaineService.getAllDomaine().subscribe((data: DomaineModel[]) => {
      this.domaines = data;
      console.log(this.domaines);
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./formation']);
  }
}

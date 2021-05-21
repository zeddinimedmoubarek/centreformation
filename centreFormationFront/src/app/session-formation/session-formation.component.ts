import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurModel } from '../models/formateur.model';
import { OrganismeModel } from '../models/organisme.model';
import { SessionFormationModel } from '../models/sessionFormation.model';
import { FormateurService } from '../services/formateur.service';
import { OrganismeService } from '../services/organisme.service';
import { SessionFormationService } from '../services/session-formation.service';

@Component({
  selector: 'app-sessionFormation',
  templateUrl: './session-formation.component.html',
  styleUrls: ['./session-formation.component.css'],
})
export class SessionFormationComponent implements OnInit {
  id: any;
  sessionFormation: SessionFormationModel = new SessionFormationModel();
  sessionFormationForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  organismes: OrganismeModel[];
  formateurs: FormateurModel[];
  selectedOrganisme: any;
  selectedFormateur: any;
  organisme: OrganismeModel = new OrganismeModel();
  formateur: FormateurModel = new FormateurModel();
  constructor(
    private sessionFormationService: SessionFormationService,
    private organismeService: OrganismeService,
    private formateurService: FormateurService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<SessionFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionFormationModel
  ) {
    this.sessionFormation.organisme = new OrganismeModel();
    this.sessionFormation.formateur = new FormateurModel();
  }

  ngOnInit(): void {
    this.getOrganismes();
    this.getFormateurs();
    if (this.data == null) {
      this.addMode = true;
      this.sessionFormationForm = this.formBuilder.group({
        id: [this.sessionFormation.id],
        formateur: [this.sessionFormation.formateur, [Validators.required]],
        organisme: [this.sessionFormation.organisme, [Validators.required]],
        lieu: [
          this.sessionFormation.lieu,
          [Validators.required, Validators.minLength(3)],
        ],
        dateDebut: [this.sessionFormation.dateDebut, [Validators.required]],
        dateFin: [this.sessionFormation.dateFin, [Validators.required]],
        //nbParticipants: [this.sessionFormation.nbParticipants, [Validators.required]],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.sessionFormation = this.data;
      this.selectedOrganisme = this.sessionFormation.organisme.id;
      this.selectedFormateur = this.sessionFormation.formateur.id;
      console.log(this.selectedOrganisme);
      this.sessionFormationForm = this.formBuilder.group({
        id: [this.sessionFormation.id],
        formateur: [this.sessionFormation.formateur, [Validators.required]],
        organisme: [this.sessionFormation.organisme, [Validators.required]],
        lieu: [
          this.sessionFormation.lieu,
          [Validators.required, Validators.minLength(3)],
        ],
        dateDebut: [this.sessionFormation.dateDebut, [Validators.required]],
        dateFin: [this.sessionFormation.dateFin, [Validators.required]],
        //nbParticipants: [this.sessionFormation.nbParticipants, [Validators.required]],
      });
    }
  }

  save() {
    this.dialogRef.close(this.sessionFormationForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.sessionFormation.id == null) this.onCreate();
    else if (this.sessionFormation.id != null) {
      this.updateSessionFormation(
        this.sessionFormation.id,
        this.sessionFormation
      );
    }
  }

  onCreate() {
    this.sessionFormation.organisme.id = this.selectedOrganisme;
    this.sessionFormation.formateur.id = this.selectedFormateur;
    this.getOrganismes();
    this.getFormateurs();
    this.sessionFormationService
      .createSessionFormation(this.sessionFormation)
      .subscribe(
        (data) => {
          this.snackBar.open('SessionFormation Add successfully!', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
          this.dialogRef.close(this.sessionFormationForm.value);
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

  updateSessionFormation(id, sessionFormation) {
    this.getOrganismes();
    this.getFormateurs();
    this.sessionFormation.organisme.id = this.selectedOrganisme;
    this.sessionFormation.formateur.id = this.selectedFormateur;
    console.log(this.selectedFormateur);
    this.sessionFormationService
      .updateSessionFormation(id, sessionFormation)
      .subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('SessionFormation updated successfully!', '', {
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
  getOrganismes() {
    this.organismeService
      .getAllOrganisme()
      .subscribe((data: OrganismeModel[]) => {
        this.organismes = data;
      });
  }

  getFormateurs() {
    this.formateurService
      .getAllFormateur()
      .subscribe((data: FormateurModel[]) => {
        this.formateurs = data;
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./sessionFormation']);
  }
}

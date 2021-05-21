import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeModel } from '../models/organisme.model';
import { FormateurModel } from '../models/formateur.model';
import { OrganismeService } from '../services/organisme.service';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css'],
})
export class FormateurComponent implements OnInit {
  id: any;
  formateur: FormateurModel = new FormateurModel();
  formateurForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  organismes: OrganismeModel[];
  selectedOrganisme: any;
  organisme: OrganismeModel = new OrganismeModel();
  constructor(
    private formateurService: FormateurService,
    private organismeService: OrganismeService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<FormateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormateurModel
  ) {
    this.formateur.organisme = new OrganismeModel();
  }

  ngOnInit(): void {
    this.getOrganismes();
    if (this.data == null) {
      this.addMode = true;
      this.formateurForm = this.formBuilder.group({
        id: [this.formateur.id],
        nom: [
          this.formateur.nom,
          [Validators.required, Validators.minLength(3)],
        ],
        prenom: [
          this.formateur.prenom,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [this.formateur.email, [Validators.required, Validators.email]],
        tel: [
          this.formateur.tel,
          [Validators.required, Validators.minLength(2)],
        ],
        type: [
          this.formateur.type,
          [Validators.required, Validators.minLength(2)],
        ],
        //nbSessions: [this.formateur.nbSessions, [Validators.required]],
        organisme: [this.formateur.organisme, [Validators.required]],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.formateur = this.data;
      this.selectedOrganisme = this.formateur.organisme.id;
      console.log(this.selectedOrganisme);
      this.formateurForm = this.formBuilder.group({
        id: [this.formateur.id],
        nom: [
          this.formateur.nom,
          [Validators.required, Validators.minLength(3)],
        ],
        prenom: [
          this.formateur.prenom,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [this.formateur.email, [Validators.required, Validators.email]],
        tel: [
          this.formateur.tel,
          [Validators.required, Validators.minLength(2)],
        ],
        type: [
          this.formateur.type,
          [Validators.required, Validators.minLength(2)],
        ],
        //nbSessions: [this.formateur.nbSessions, [Validators.required]],
        organisme: [this.formateur.organisme, [Validators.required]],
      });
    }
  }

  save() {
    this.dialogRef.close(this.formateurForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formateur.id == null) this.onCreate();
    else if (this.formateur.id != null) {
      this.updateFormateur(this.formateur.id, this.formateur);
    }
  }

  onCreate() {
    this.formateur.organisme.id = this.selectedOrganisme;
    this.formateurService.createFormateur(this.formateur).subscribe(
      (data) => {
        this.snackBar.open('Formateur Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.formateurForm.value);
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

  updateFormateur(id, formateur) {
    this.formateur.organisme.id = this.selectedOrganisme;
    this.getOrganismes();
    this.formateurService.updateFormateur(id, formateur).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Formateur updated successfully!', '', {
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
        console.log(this.organismes);
      });
  }
  onClose() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./formateur']);
  }
}

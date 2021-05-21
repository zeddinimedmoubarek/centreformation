import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DomaineModel } from '../models/domaine.model';
import { DomaineService } from '../services/domaine.service';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css'],
})
export class DomaineComponent implements OnInit {
  id: any;
  domaine: DomaineModel = new DomaineModel();
  domaineForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  libelle: string;
  constructor(
    private domaineService: DomaineService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<DomaineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DomaineModel
  ) {
    //this.domaine = this.data;
  }

  ngOnInit(): void {
    if (this.data == null) {
      this.addMode = true;
      this.domaineForm = this.formBuilder.group({
        id: [this.domaine.id],
        libelle: [
          this.domaine.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.domaine = this.data;
      this.domaineForm = this.formBuilder.group({
        id: [this.domaine.id],
        libelle: [
          this.domaine.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    }
  }

  save() {
    this.dialogRef.close(this.domaineForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.domaine.id == null) this.onCreate();
    else if (this.domaine.id != null) {
      this.updateDomaine(this.domaine.id, this.domaine);
    }
  }

  onCreate() {
    this.domaineService.createDomaine(this.domaine).subscribe(
      (data) => {
        this.snackBar.open('Domaine Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.domaineForm.value);
        this.onClose();
        this.reloadPage();
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

  updateDomaine(id, domaine) {
    this.domaineService.updateDomaine(id, domaine).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Domaine updated successfully!', '', {
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
  onClose() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./domaine']);
  }
}

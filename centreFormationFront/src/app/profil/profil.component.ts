import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilModel } from '../models/profil.model';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  id: any;
  profil: ProfilModel = new ProfilModel();
  profilForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  libelle: string;
  constructor(
    private profilService: ProfilService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfilModel
  ) {
    //this.profil = this.data;
  }

  ngOnInit(): void {
    if (this.data == null) {
      this.addMode = true;
      this.profilForm = this.formBuilder.group({
        id: [this.profil.id],
        libelle: [
          this.profil.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.profil = this.data;
      this.profilForm = this.formBuilder.group({
        id: [this.profil.id],
        libelle: [
          this.profil.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    }
  }

  save() {
    this.dialogRef.close(this.profilForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.profil.id == null) this.onCreate();
    else if (this.profil.id != null) {
      this.updateProfil(this.profil.id, this.profil);
    }
  }

  onCreate() {
    this.profilService.createProfil(this.profil).subscribe(
      (data) => {
        this.snackBar.open('Profil Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.profilForm.value);
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

  updateProfil(id, profil) {
    this.profilService.updateProfil(id, profil).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Profil updated successfully!', '', {
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
    this.router.navigate(['./profil']);
  }
}

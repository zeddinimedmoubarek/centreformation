import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysModel } from '../models/pays.model';
import { PaysService } from '../services/pays.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css'],
})
export class PaysComponent implements OnInit {
  id: any;
  pays: PaysModel = new PaysModel();
  paysForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  libelle: string;
  constructor(
    private paysService: PaysService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<PaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaysModel
  ) {
    //this.pays = this.data;
  }

  ngOnInit(): void {
    if (this.data == null) {
      this.addMode = true;
      this.paysForm = this.formBuilder.group({
        id: [this.pays.id],
        libelle: [
          this.pays.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.pays = this.data;
      this.paysForm = this.formBuilder.group({
        id: [this.pays.id],
        libelle: [
          this.pays.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    }
  }

  save() {
    this.dialogRef.close(this.paysForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.pays.id == null) this.onCreate();
    else if (this.pays.id != null) {
      this.updatePays(this.pays.id, this.pays);
    }
  }

  onCreate() {
    this.paysService.createPays(this.pays).subscribe(
      (data) => {
        this.snackBar.open('Pays Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.paysForm.value);
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

  updatePays(id, pays) {
    this.paysService.updatePays(id, pays).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Pays updated successfully!', '', {
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
    this.router.navigate(['./pays']);
  }
}

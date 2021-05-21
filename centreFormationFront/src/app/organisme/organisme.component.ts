import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeModel } from '../models/organisme.model';
import { OrganismeService } from '../services/organisme.service';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.css'],
})
export class OrganismeComponent implements OnInit {
  id: any;
  organisme: OrganismeModel = new OrganismeModel();
  organismeForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  libelle: string;
  constructor(
    private organismeService: OrganismeService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<OrganismeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganismeModel
  ) {
    //this.organisme = this.data;
  }

  ngOnInit(): void {
    if (this.data == null) {
      this.addMode = true;
      this.organismeForm = this.formBuilder.group({
        id: [this.organisme.id],
        libelle: [
          this.organisme.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.organisme = this.data;
      this.organismeForm = this.formBuilder.group({
        id: [this.organisme.id],
        libelle: [
          this.organisme.libelle,
          [Validators.required, Validators.minLength(3)],
        ],
      });
    }
  }

  save() {
    this.dialogRef.close(this.organismeForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.organisme.id == null) this.onCreate();
    else if (this.organisme.id != null) {
      this.updateOrganisme(this.organisme.id, this.organisme);
    }
  }

  onCreate() {
    this.organismeService.createOrganisme(this.organisme).subscribe(
      (data) => {
        this.snackBar.open('Organisme Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.organismeForm.value);
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

  updateOrganisme(id, organisme) {
    this.organismeService.updateOrganisme(id, organisme).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Organisme updated successfully!', '', {
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
    this.router.navigate(['./organisme']);
  }
}

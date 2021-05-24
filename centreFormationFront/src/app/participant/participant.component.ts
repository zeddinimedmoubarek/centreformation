import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeModel } from '../models/organisme.model';
import { ParticipantModel } from '../models/participant.model';
import { PaysModel } from '../models/pays.model';
import { ProfilModel } from '../models/profil.model';
import { SessionFormationModel } from '../models/sessionFormation.model';
import { OrganismeService } from '../services/organisme.service';
import { ParticipantService } from '../services/participant.service';
import { PaysService } from '../services/pays.service';
import { ProfilService } from '../services/profil.service';
import { SessionFormationService } from '../services/session-formation.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
})
export class ParticipantComponent implements OnInit {
  id: any;
  participant: ParticipantModel = new ParticipantModel();
  participantForm: FormGroup;
  errorMessage = '';
  dialog: any;
  addMode: boolean;
  organismes: OrganismeModel[];
  profils: ProfilModel[];
  payss: PaysModel[];
  sessionFormations: SessionFormationModel[];
  selectedOrganisme: any;
  selectedProfil: any;
  selectedPays: any;
  selectedTypeParticipant: any;
  selectedSessionFormation: any;
  organisme: OrganismeModel = new OrganismeModel();
  profil: ProfilModel = new ProfilModel();
  pays: PaysModel = new PaysModel();
  sessionFormation: SessionFormationModel;
  constructor(
    private participantService: ParticipantService,
    private organismeService: OrganismeService,
    private profilService: ProfilService,
    private paysService: PaysService,
    private sessionsFormationService: SessionFormationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParticipantModel
  ) {
    this.participant.organisme = new OrganismeModel();
    this.participant.profil = new ProfilModel();
    this.participant.pays = new PaysModel();
  }

  ngOnInit(): void {
    this.getOrganismes();
    this.getProfils();
    this.getPays();
    this.getSessionFormations();
    if (this.data == null) {
      this.addMode = true;
      this.participantForm = this.formBuilder.group({
        id: [this.participant.id],
        nom: [
          this.participant.nom,
          [Validators.required, Validators.minLength(3)],
        ],
        prenom: [
          this.participant.prenom,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [
          this.participant.email,
          [Validators.required, Validators.email],
        ],
        tel: [
          this.participant.tel,
          [Validators.required, Validators.minLength(2)],
        ],
        typeParticipant: [
          this.participant.typeParticipant,
          [Validators.required],
        ],
        //nbSessions: [this.participant.nbSessions, [Validators.required]],
        profil: [this.participant.profil, [Validators.required]],
        organisme: [this.participant.organisme, [Validators.required]],
        pays: [this.participant.pays, [Validators.required]],
      });
    } else if (this.data != null) {
      this.addMode = false;
      this.participant = this.data;
      console.log(this.participant);
      this.selectedTypeParticipant = this.participant.typeParticipant;
      this.selectedOrganisme = this.participant.organisme.id;
      this.selectedProfil = this.participant.profil.id;
      this.selectedPays = this.participant.pays.id;
      console.log(this.selectedTypeParticipant);
      this.participantForm = this.formBuilder.group({
        id: [this.participant.id],
        nom: [
          this.participant.nom,
          [Validators.required, Validators.minLength(3)],
        ],
        prenom: [
          this.participant.prenom,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [
          this.participant.email,
          [Validators.required, Validators.email],
        ],
        tel: [
          this.participant.tel,
          [Validators.required, Validators.minLength(2)],
        ],
        typeParticipant: [
          this.participant.typeParticipant,
          [Validators.required],
        ],
        //nbSessions: [this.participant.nbSessions, [Validators.required]],
        profil: [this.participant.profil, [Validators.required]],
        organisme: [this.participant.organisme, [Validators.required]],
        pays: [this.participant.pays, [Validators.required]],
      });
    }
  }

  save() {
    this.dialogRef.close(this.participantForm.value);
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.participant.id == null) this.onCreate();
    else if (this.participant.id != null) {
      this.updateParticipant(this.participant.id, this.participant);
    }
  }

  onCreate() {
    this.participant.organisme.id = this.selectedOrganisme;
    this.participant.profil.id = this.selectedProfil;
    this.participant.pays.id = this.selectedPays;
    this.participantService.createParticipant(this.participant).subscribe(
      (data) => {
        this.snackBar.open('Participant Add successfully!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(this.participantForm.value);
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

  updateParticipant(id, participant) {
    this.getOrganismes();
    this.getProfils();
    this.getPays();
    this.participant.organisme.id = this.selectedOrganisme;
    this.participant.profil.id = this.selectedProfil;
    this.participant.pays.id = this.selectedPays;
    this.participantService.updateParticipant(id, participant).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Participant updated successfully!', '', {
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

  getProfils() {
    this.profilService.getAllProfil().subscribe((data: ProfilModel[]) => {
      this.profils = data;
      console.log(this.profils);
    });
  }

  getPays() {
    this.paysService.getAllPays().subscribe((data: PaysModel[]) => {
      this.payss = data;
      console.log(this.payss);
    });
  }

  getSessionFormations() {
    this.sessionsFormationService
      .getAllSessionFormation()
      .subscribe((data: SessionFormationModel[]) => {
        this.sessionFormations = data;
        console.log(this.sessionFormations);
        //console.log(this.sessionFormations.);
      });
  }
  onClose() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./participant']);
  }
}

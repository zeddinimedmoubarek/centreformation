import { OrganismeModel } from './organisme.model';
import { PaysModel } from './pays.model';
import { ProfilModel } from './profil.model';
import { SessionFormationModel } from './sessionFormation.model';

export class ParticipantModel {
  id: number;
  nom: String;
  prenom: String;
  email: String;
  tel: String;
  typeParticipant: String;
  profil: ProfilModel;
  pays: PaysModel;
  organisme: OrganismeModel;
  sessionFormation: SessionFormationModel[];
}

import { FormateurModel } from './formateur.model';
import { FormationModel } from './formation.model';
import { OrganismeModel } from './organisme.model';

export class SessionFormationModel {
  id: number;
  formateur: FormateurModel;
  organisme: OrganismeModel;
  lieu: String;
  dateDebut: String;
  dateFin: String;
  formation: FormationModel;
  nbParticipants: number;
}

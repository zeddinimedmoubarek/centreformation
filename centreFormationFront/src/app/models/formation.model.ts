import { DomaineModel } from './domaine.model';
import { SessionFormationModel } from './sessionFormation.model';

export class FormationModel {
  id: number;
  titre: String;
  typeFormation: String;
  duree: String;
  budget: number;
  nbSessions: SessionFormationModel[];
  domaine: DomaineModel;
}

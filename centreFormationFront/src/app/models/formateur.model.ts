import { OrganismeModel } from './organisme.model';

export class FormateurModel {
  id: number;
  nom: String;
  prenom: String;
  email: String;
  tel: String;
  type: String;
  organisme: OrganismeModel;
}

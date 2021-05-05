package com.isi.centreformation.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.Set;

/**
 * A ParticipantNational.
 */
@Entity
@DiscriminatorValue(value = "participant_national")
//@Table(name = "participant_national")
public class ParticipantNational extends Participant {

	@ManyToOne
	@JsonIgnoreProperties(value = "participantNationals", allowSetters = true)
	private Organisme organisme;

	public ParticipantNational(Long id, String nom, String prenom, String email, String tel, Profil profil, Set<SessionFormation> sessionFormations, Organisme organisme) {
		super(id, nom, prenom, email, tel, profil, sessionFormations);
		this.organisme = organisme;
	}

	public ParticipantNational() {
		super();
	}

	public Organisme getOrganisme() {
		return organisme;
	}

	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}

	@Override
	public String toString() {
		return "ParticipantNational{" +
				", organisme=" + organisme +
				'}';
	}
}

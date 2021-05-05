package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.Set;

/**
 * A ParticipantInternational.
 */
@Entity
@DiscriminatorValue(value = "participant_international")
//@Table(name = "participant_international")
public class ParticipantInternational extends Participant {

    @ManyToOne
    @JsonIgnoreProperties(value = "participantInternationals", allowSetters = true)
    private Pays pays;

	public ParticipantInternational(Long id, String nom, String prenom, String email, String tel, Profil profil, Set<SessionFormation> sessionFormations, Pays pays) {
		super(id, nom, prenom, email, tel, profil, sessionFormations);
		this.pays = pays;
	}

	public ParticipantInternational() {
		super();
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	@Override
	public String toString() {
		return "ParticipantInternational{" +
				"pays=" + pays +
				'}';
	}
}

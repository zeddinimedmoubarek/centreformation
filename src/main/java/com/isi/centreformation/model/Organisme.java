package com.isi.centreformation.model;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Organisme.
 */
@Entity
@Table(name = "organisme")
public class Organisme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @OneToMany(mappedBy = "organisme")
    private Set<SessionFormation> sessionFormations = new HashSet<>();

    @OneToMany(mappedBy = "organisme")
    private Set<Formateur> formateurs = new HashSet<>();

	@OneToMany(mappedBy = "organisme")
	private Set<Participant> participants = new HashSet<>();

	public Organisme(Long id, String libelle, Set<SessionFormation> sessionFormations, Set<Formateur> formateurs, Set<Participant> participants) {
		this.id = id;
		this.libelle = libelle;
		this.sessionFormations = sessionFormations;
		this.formateurs = formateurs;
		this.participants = participants;
	}

	public Organisme() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Set<SessionFormation> getSessionFormations() {
		return sessionFormations;
	}

	public void setSessionFormations(Set<SessionFormation> sessionFormations) {
		this.sessionFormations = sessionFormations;
	}

	public Set<Formateur> getFormateurs() {
		return formateurs;
	}

	public void setFormateurs(Set<Formateur> formateurs) {
		this.formateurs = formateurs;
	}

	public Set<Participant> getParticipantNationals() {
		return participants;
	}

	public void setParticipantNationals(Set<Participant> participants) {
		this.participants = participants;
	}

	@Override
	public String toString() {
		return "Organisme{" +
				"id=" + id +
				", libelle='" + libelle + '\'' +
				", sessionFormations=" + sessionFormations +
				", formateurs=" + formateurs +
				", participantsNationals=" + participants +
				'}';
	}
}

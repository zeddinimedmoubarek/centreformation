package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A SessionFormation.
 */
@Entity
@Table(name = "session_formation")
public class SessionFormation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lieu")
    private String lieu;

    @Column(name = "date_debut")
    private String dateDebut;

    @Column(name = "date_fin")
    private String dateFin;

    @Column(name = "nb_participant")
    private String nbParticipant;

    @ManyToMany
    @JoinTable(name = "session_formation_participant",
               joinColumns = @JoinColumn(name = "session_formation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "participant_id", referencedColumnName = "id"))
    private Set<Participant> participants = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Formateur formateur;

    @ManyToOne
    @JoinColumn(name = "organisme_id")
    private Organisme organisme;

    @ManyToMany(mappedBy = "nbSessions")
    @JsonIgnore
    private Set<Formation> formations = new HashSet<>();

	public SessionFormation(Long id, String lieu, String dateDebut, String dateFin, String nbParticipant,
			Set<Participant> participants, Formateur formateur, Organisme organisme, Set<Formation> formations) {
		super();
		this.id = id;
		this.lieu = lieu;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.nbParticipant = nbParticipant;
		this.participants = participants;
		this.formateur = formateur;
		this.organisme = organisme;
		this.formations = formations;
	}

	public SessionFormation() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public String getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}

	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}

	public String getNbParticipant() {
		return nbParticipant;
	}

	public void setNbParticipant(String nbParticipant) {
		this.nbParticipant = nbParticipant;
	}

	public Set<Participant> getParticipants() {
		return participants;
	}

	public void setParticipants(Set<Participant> participants) {
		this.participants = participants;
	}

	public Formateur getFormateur() {
		return formateur;
	}

	public void setFormateur(Formateur formateur) {
		this.formateur = formateur;
	}

	public Organisme getOrganisme() {
		return organisme;
	}

	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}

	public Set<Formation> getFormations() {
		return formations;
	}

	public void setFormations(Set<Formation> formations) {
		this.formations = formations;
	}

	@Override
	public String toString() {
		return "SessionFormation [id=" + id + ", lieu=" + lieu + ", dateDebut=" + dateDebut + ", dateFin=" + dateFin
				+ ", nbParticipant=" + nbParticipant + ", participants=" + participants + ", formateur=" + formateur
				+ ", organisme=" + organisme + ", formations=" + formations + "]";
	}

    
}

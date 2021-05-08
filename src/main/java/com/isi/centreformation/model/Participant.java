package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Participant.
 */
@Entity
@Table(name = "participant")
public class Participant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "tel")
    private String tel;

    @Enumerated(EnumType.STRING)
	@Column(name = "type_participant")
    private EParticipant typeParticipant;

	@ManyToOne
	@JsonIgnoreProperties(value = "participants", allowSetters = true)
	private Profil profil;

	@ManyToOne
	@JsonIgnoreProperties(value = "participantInternationals", allowSetters = true)
	private Pays pays;

	@ManyToOne
	@JsonIgnoreProperties(value = "participantNationals", allowSetters = true)
	private Organisme organisme;

    @ManyToMany(mappedBy = "participants")
    @JsonIgnore
    private Set<SessionFormation> sessionFormations = new HashSet<>();

	public Participant(Long id, String nom, String prenom, String email, String tel, EParticipant typeParticipant, Profil profil, Pays pays, Organisme organisme, Set<SessionFormation> sessionFormations) {
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.tel = tel;
		this.typeParticipant = typeParticipant;
		this.profil = profil;
		this.pays = pays;
		this.organisme = organisme;
		this.sessionFormations = sessionFormations;
	}

	public Participant() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public EParticipant getTypeParticipant() {
		return typeParticipant;
	}

	public void setTypeParticipant(EParticipant typeParticipant) {
		this.typeParticipant = typeParticipant;
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	public Organisme getOrganisme() {
		return organisme;
	}

	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}

	public Profil getProfil() {
		return profil;
	}

	public void setProfil(Profil profil) {
		this.profil = profil;
	}

	public Set<SessionFormation> getSessionFormations() {
		return sessionFormations;
	}

	public void setSessionFormations(Set<SessionFormation> sessionFormations) {
		this.sessionFormations = sessionFormations;
	}

	@Override
	public String toString() {
		return "Participant{" +
				"id=" + id +
				", nom='" + nom + '\'' +
				", prenom='" + prenom + '\'' +
				", email='" + email + '\'' +
				", tel='" + tel + '\'' +
				", typeParticipant=" + typeParticipant +
				", pays=" + pays +
				", organisme=" + organisme +
				", profil=" + profil +
				", sessionFormations=" + sessionFormations +
				'}';
	}
}

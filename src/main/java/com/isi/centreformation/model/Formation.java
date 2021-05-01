package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Formation.
 */
@Entity
@Table(name = "formation")
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "type_formation")
    private String typeFormation;

    @Column(name = "nb_session")
    private String nbSession;

    @Column(name = "duree")
    private String duree;

    @Column(name = "budget")
    private String budget;

    @ManyToMany
    @JoinTable(name = "formation_nb_session",
               joinColumns = @JoinColumn(name = "formation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "nb_session_id", referencedColumnName = "id"))
    private Set<SessionFormation> nbSessions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "formations", allowSetters = true)
    private Domaine domaine;

	public Formation(Long id, String titre, String typeFormation, String nbSession, String duree, String budget,
			Set<SessionFormation> nbSessions, Domaine domaine) {
		super();
		this.id = id;
		this.titre = titre;
		this.typeFormation = typeFormation;
		this.nbSession = nbSession;
		this.duree = duree;
		this.budget = budget;
		this.nbSessions = nbSessions;
		this.domaine = domaine;
	}

	public Formation() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getTypeFormation() {
		return typeFormation;
	}

	public void setTypeFormation(String typeFormation) {
		this.typeFormation = typeFormation;
	}

	public String getNbSession() {
		return nbSession;
	}

	public void setNbSession(String nbSession) {
		this.nbSession = nbSession;
	}

	public String getDuree() {
		return duree;
	}

	public void setDuree(String duree) {
		this.duree = duree;
	}

	public String getBudget() {
		return budget;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public Set<SessionFormation> getNbSessions() {
		return nbSessions;
	}

	public void setNbSessions(Set<SessionFormation> nbSessions) {
		this.nbSessions = nbSessions;
	}

	public Domaine getDomaine() {
		return domaine;
	}

	public void setDomaine(Domaine domaine) {
		this.domaine = domaine;
	}

	@Override
	public String toString() {
		return "Formation [id=" + id + ", titre=" + titre + ", typeFormation=" + typeFormation + ", nbSession="
				+ nbSession + ", duree=" + duree + ", budget=" + budget + ", nbSessions=" + nbSessions + ", domaine="
				+ domaine + "]";
	}

    
}

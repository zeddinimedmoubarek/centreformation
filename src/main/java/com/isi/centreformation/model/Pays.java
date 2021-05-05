package com.isi.centreformation.model;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pays.
 */
@Entity
@Table(name = "pays")
public class Pays implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @OneToMany(mappedBy = "pays")
    private Set<Participant> participants = new HashSet<>();

	public Pays(Long id, String libelle, Set<Participant> participants) {
		super();
		this.id = id;
		this.libelle = libelle;
		this.participants = participants;
	}

	public Pays() {
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

	public Set<Participant> getParticipantInternationals() {
		return participants;
	}

	public void setParticipantInternationals(Set<Participant> participants) {
		this.participants = participants;
	}

	@Override
	public String toString() {
		return "Pays [id=" + id + ", libelle=" + libelle + ", participantInternationals=" + participants
				+ "]";
	}

    
}

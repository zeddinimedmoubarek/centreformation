package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ParticipantInternational.
 */
@Entity
@Table(name = "participant_international")
public class ParticipantInternational implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "participantInternationals", allowSetters = true)
    private Pays pays;

	public ParticipantInternational(Long id, Pays pays) {
		super();
		this.id = id;
		this.pays = pays;
	}

	public ParticipantInternational() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	@Override
	public String toString() {
		return "ParticipantInternational [id=" + id + ", pays=" + pays + "]";
	}

   
}

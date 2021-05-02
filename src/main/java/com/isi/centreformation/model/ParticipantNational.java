package com.isi.centreformation.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ParticipantNational.
 */
@Entity
@Table(name = "participant_national")
public class ParticipantNational implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@ManyToOne
	@JsonIgnoreProperties(value = "participantInternationals", allowSetters = true)
	private Organisme organisme;

	public ParticipantNational(Long id, Organisme organisme) {
		this.id = id;
		this.organisme = organisme;
	}

	public ParticipantNational() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
				"id=" + id +
				", organisme=" + organisme +
				'}';
	}
}

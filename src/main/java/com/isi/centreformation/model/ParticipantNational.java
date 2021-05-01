package com.isi.centreformation.model;


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

	public ParticipantNational(Long id) {
		super();
		this.id = id;
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

	@Override
	public String toString() {
		return "ParticipantNational [id=" + id + "]";
	}

    
}

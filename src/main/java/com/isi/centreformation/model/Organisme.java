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
	@Column(name = "organisme_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

	public Organisme(Long id, String libelle) {
		this.id = id;
		this.libelle = libelle;
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

	@Override
	public String toString() {
		return "Organisme{" +
				"id=" + id +
				", libelle='" + libelle + '\'' +
				'}';
	}
}

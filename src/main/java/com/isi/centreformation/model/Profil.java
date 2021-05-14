package com.isi.centreformation.model;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Profil.
 */
@Entity
@Table(name = "profil")
public class Profil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

	public Profil(Long id, String libelle) {
		super();
		this.id = id;
		this.libelle = libelle;
	}

	public Profil() {
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
		return "Profil{" +
				"id=" + id +
				", libelle='" + libelle + '\'' +
				'}';
	}
}

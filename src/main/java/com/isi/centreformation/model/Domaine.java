package com.isi.centreformation.model;


import javax.persistence.*;

import java.io.Serializable;


/**
 * A Domaine.
 */
@Entity
@Table(name = "domaine")
public class Domaine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_domaine")
    private Long id;

    @Column(name = "libelle")
    private String libelle;


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





	public Domaine(Long id, String libelle) {
		super();
		this.id = id;
		this.libelle = libelle;
	}

	public Domaine() {
		super();
	}

	@Override
	public String toString() {
		return "Domaine{" +
				"id=" + id +
				", libelle='" + libelle + '\'' +
				'}';
	}
}

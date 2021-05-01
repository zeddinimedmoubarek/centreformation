package com.isi.centreformation.model;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Domaine.
 */
@Entity
@Table(name = "domaine")
public class Domaine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @OneToMany(mappedBy = "domaine")
    private Set<Formation> formations = new HashSet<>();

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

	public Set<Formation> getFormations() {
		return formations;
	}

	public void setFormations(Set<Formation> formations) {
		this.formations = formations;
	}

	@Override
	public String toString() {
		return "Domaine [id=" + id + ", libelle=" + libelle + ", formations=" + formations + "]";
	}

	public Domaine(Long id, String libelle, Set<Formation> formations) {
		super();
		this.id = id;
		this.libelle = libelle;
		this.formations = formations;
	}

	public Domaine() {
		super();
	}

    
   
}

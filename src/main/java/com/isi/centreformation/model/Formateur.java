package com.isi.centreformation.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Formateur.
 */
@Entity
@Table(name = "formateur")
public class Formateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "formateur_id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "tel")
    private String tel;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "organisme_id")
    private Organisme organisme;

	public Formateur(Long id, String nom, String prenom, String email, String tel, String type, Organisme organisme) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.tel = tel;
		this.type = type;
		this.organisme = organisme;
	}

	public Formateur() {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Organisme getOrganisme() {
		return organisme;
	}

	public void setOrganisme(Organisme organisme) {
		this.organisme = organisme;
	}

	@Override
	public String toString() {
		return "Formateur{" +
				"id=" + id +
				", nom='" + nom + '\'' +
				", prenom='" + prenom + '\'' +
				", email='" + email + '\'' +
				", tel='" + tel + '\'' +
				", type='" + type + '\'' +
				", organisme=" + organisme +
				'}';
	}
}

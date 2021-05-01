package com.isi.centreformation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isi.centreformation.model.Formateur;
@Repository
public interface FormateurRepository  extends JpaRepository<Formateur,Long> {

}

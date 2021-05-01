package com.isi.centreformation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isi.centreformation.model.Formation;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long>{

}

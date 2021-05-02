package com.isi.centreformation.repository;

import com.isi.centreformation.model.Pays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaysRepository extends JpaRepository<Pays, Long> {
}

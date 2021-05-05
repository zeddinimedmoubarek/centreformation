package com.isi.centreformation.repository;

import com.isi.centreformation.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

@NoRepositoryBean
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}

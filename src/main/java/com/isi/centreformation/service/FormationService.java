package com.isi.centreformation.service;

import com.isi.centreformation.model.Formation;

import java.util.List;
import java.util.Optional;

public interface FormationService {
    List<Formation> getAllFormations();
    Optional<Formation> getFormationById(Long id);
    Long createFormation(Formation formation);
    void deleteFormation(Long id);
}

package com.isi.centreformation.service;

import com.isi.centreformation.model.Formateur;
import com.isi.centreformation.model.Formation;

import java.util.List;
import java.util.Optional;

public interface FormationService {
    List<Formation> getAllFormations();
    Optional<Formation> getFormationById(Long id);
    Formation createFormation(Formation formation);
    void deleteFormation(Long id);
}

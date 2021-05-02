package com.isi.centreformation.service;

import com.isi.centreformation.model.Formation;

import java.util.List;

public interface FormationService {
    List<Formation> getAllFormations();
    Formation getFormationById(Long id);
    Formation createFormation(Formation formation);
    void deleteFormation(Long id);
}

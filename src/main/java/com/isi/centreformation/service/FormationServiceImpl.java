package com.isi.centreformation.service;

import com.isi.centreformation.model.Formateur;
import com.isi.centreformation.model.Formation;
import com.isi.centreformation.repository.FormationRepository;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FormationServiceImpl implements FormationService {

    private final Logger log = LoggerFactory.getLogger(FormationService.class);

    @Autowired
    private FormationRepository formationRepository;

    @Override
    public List<Formation> getAllFormations() {
        log.debug("Request to get All Formation");
        List<Formation> formationList = formationRepository.findAll();
        return formationList;
    }

    @Override
    public Optional<Formation> getFormationById(Long id) {
        log.debug("Request to get Formation : {}", id);
        Optional <Formation> formation = formationRepository.findById(id);
        return formation;
    }

    @Override
    public Formation createFormation(Formation formation) {
        log.debug("Request to save formation : {}", formation);
        formation = formationRepository.save(formation);
        return formation;
    }

    @Override
    public void deleteFormation(Long id) {
        log.debug("Request to delete Formation : {}", id);
        formationRepository.deleteById(id);
    }
}

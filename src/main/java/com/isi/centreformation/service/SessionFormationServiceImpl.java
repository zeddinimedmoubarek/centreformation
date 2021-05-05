package com.isi.centreformation.service;

import com.isi.centreformation.model.SessionFormation;
import com.isi.centreformation.repository.SessionFormationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SessionFormationServiceImpl implements SessionFormationService {

    private final Logger log = LoggerFactory.getLogger(SessionFormationService.class);

    @Autowired
    private SessionFormationRepository sessionFormationRepository;

    @Override
    public List<SessionFormation> getAllSessionFormations() {
        log.debug("Request to get all SessionFormations");
        List<SessionFormation> sessionFormationList = sessionFormationRepository.findAll();
        return sessionFormationList;
    }

    @Override
    public Optional<SessionFormation> getSessionFormationById(Long id) {
        log.debug("Request to get SessionFormation : {}", id);
        Optional <SessionFormation> sessionFormation = sessionFormationRepository.findById(id);
        return sessionFormation;
    }

    @Override
    public Long createSessionFormation(SessionFormation sessionFormation) {
        log.debug("Request to save SessionFormation : {}", sessionFormation);
        sessionFormation = sessionFormationRepository.save(sessionFormation);
        return sessionFormation.getId();
    }

    @Override
    public void deleteSessionFormation(Long id) {
        log.debug("Request to delete SessionFormation : {}", id);
        sessionFormationRepository.deleteById(id);

    }
}

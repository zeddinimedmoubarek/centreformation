package com.isi.centreformation.service;

import com.isi.centreformation.model.SessionFormation;

import java.util.List;
import java.util.Optional;

public interface SessionFormationService {
    List<SessionFormation> getAllSessionFormations();
    Optional<SessionFormation> getSessionFormationById(Long id);
    Long createSessionFormation(SessionFormation sessionFormation);
    void deleteSessionFormation(Long id);
}

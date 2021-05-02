package com.isi.centreformation.service;

import com.isi.centreformation.model.SessionFormation;

import java.util.List;

public interface SessionFormationService {
    List<SessionFormation> getAllSessionFormations();
    SessionFormation getSessionFormationById(Long id);
    SessionFormation createSessionFormation(SessionFormation sessionFormation);
    void deleteSessionFormation(Long id);
}

package com.isi.centreformation.service;

import com.isi.centreformation.model.Domaine;

import java.util.List;
import java.util.Optional;

public interface DomaineService {
    List<Domaine> getAllDomaines();
    Optional<Domaine> getDomaineById(Long id);
    Domaine createDomaine(Domaine domaine);
    void deleteDomaine(Long id);
}

package com.isi.centreformation.service;

import com.isi.centreformation.model.Domaine;

import java.util.List;

public interface DomaineService {
    List<Domaine> getAllDomaines();
    Domaine getDomaineById(Long id);
    Domaine createDomaine(Domaine domaine);
    void deleteDomaine(Long id);
}

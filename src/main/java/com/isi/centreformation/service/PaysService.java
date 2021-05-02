package com.isi.centreformation.service;

import com.isi.centreformation.model.Pays;

import java.util.List;

public interface PaysService {
    List<Pays> getAllPayss();
    Pays getPaysById(Long id);
    Pays createPays(Pays pays);
    void deletePays(Long id);
}

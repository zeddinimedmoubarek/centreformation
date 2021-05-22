package com.isi.centreformation.service;

import com.isi.centreformation.model.Formateur;

import java.util.List;
import java.util.Optional;

public interface FormateurService {
    List<Formateur> getAllFormateurs();
    Optional<Formateur> getFormateurById(Long id);
    Formateur createFormateur(Formateur formateur);
    void deleteFormateur(Long id);
}

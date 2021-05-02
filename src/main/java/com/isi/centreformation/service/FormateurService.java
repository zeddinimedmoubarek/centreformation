package com.isi.centreformation.service;

import com.isi.centreformation.model.Formateur;

import java.util.List;

public interface FormateurService {
    List<Formateur> getAllFormateurs();
    Formateur getFormateurById(Long id);
    Formateur createFormateur(Formateur formateur);
    void deleteFormateur(Long id);
}

package com.isi.centreformation.service;

import com.isi.centreformation.model.Profil;

import java.util.List;
import java.util.Optional;

public interface ProfilService {
    List<Profil> getAllProfils();
    Optional<Profil> getProfilById(Long id);
    Profil createProfil(Profil profil);
    void deleteProfil(Long id);
}

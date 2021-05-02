package com.isi.centreformation.service;

import com.isi.centreformation.model.Profil;

import java.util.List;

public interface ProfilService {
    List<Profil> getAllProfils();
    Profil getProfilById(Long id);
    Profil createProfil(Profil profil);
    void deleteProfil(Long id);
}

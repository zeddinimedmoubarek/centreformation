package com.isi.centreformation.service;

import com.isi.centreformation.model.Profil;
import com.isi.centreformation.repository.ProfilRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProfilServiceImpl implements ProfilService {

    private final Logger log = LoggerFactory.getLogger(ProfilService.class);

    @Autowired
    private ProfilRepository profilRepository;

    @Override
    public List<Profil> getAllProfils() {
        log.debug("Request to get all Profils");
        List<Profil> profilList = profilRepository.findAll();
        return profilList;
    }

    @Override
    public Optional<Profil> getProfilById(Long id) {
        log.debug("Request to get Profil : {}", id);
        Optional <Profil> profil = profilRepository.findById(id);
        return profil;
    }

    @Override
    public Long createProfil(Profil profil) {
        log.debug("Request to save Profil : {}", profil);
        profil = profilRepository.save(profil);
        return profil.getId();
    }

    @Override
    public void deleteProfil(Long id) {
        log.debug("Request to delete Profil : {}", id);
        profilRepository.deleteById(id);

    }
}

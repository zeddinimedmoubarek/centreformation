package com.isi.centreformation.service;

import com.isi.centreformation.model.Formateur;
import com.isi.centreformation.repository.FormateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FormateurServiceImpl implements FormateurService {

    private final Logger log = LoggerFactory.getLogger(DomaineService.class);

    @Autowired
    private FormateurRepository formateurRepository;

    @Override
    public List<Formateur> getAllFormateurs() {
        log.debug("Request to get all Formateurs");
        List<Formateur> formateurList = formateurRepository.findAll();
        return formateurList;
    }

    //public Page<Formateur> findAll(Pageable pageable) {
    //log.debug("Request to get all Formateurs");
    //return formateurRepository.findAll(pageable);
    //}

    @Override
    public Optional<Formateur> getFormateurById(Long id) {
        log.debug("Request to get Formateur : {}", id);
        Optional <Formateur> formateur = formateurRepository.findById(id);
        return formateur;
    }

    @Override
    public Long createFormateur(Formateur formateur) {
        log.debug("Request to save Formateur : {}", formateur);
        formateur = formateurRepository.save(formateur);
        return formateur.getId();
    }

    @Override
    public void deleteFormateur(Long id) {
        log.debug("Request to delete Formateur : {}", id);
        formateurRepository.deleteById(id);
    }
}

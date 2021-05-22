package com.isi.centreformation.service;

import com.isi.centreformation.model.Domaine;
import com.isi.centreformation.repository.DomaineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DomaineServiceImpl implements DomaineService {

    private final Logger log = LoggerFactory.getLogger(DomaineService.class);

    @Autowired
    private DomaineRepository domaineRepository;

    @Override
    public List<Domaine> getAllDomaines() {
        log.debug("Request to get all Domaines");
        List<Domaine> domaineList = domaineRepository.findAll();
        return domaineList;
    }

    //public Page<Avance> findAll(Pageable pageable) {
        //log.debug("Request to get all Avances");
        //return avanceRepository.findAll(pageable);
    //}

    @Override
    public Optional<Domaine> getDomaineById(Long id) {
        log.debug("Request to get Domaine : {}", id);
        Optional<Domaine> domaine = domaineRepository.findById(id);
        return domaine;
    }

    @Override
    public Domaine createDomaine(Domaine domaine) {
        log.debug("Request to save Domaine : {}", domaine);
        domaine = domaineRepository.save(domaine);
        return domaine;
    }

    @Override
    public void deleteDomaine(Long id) {
        log.debug("Request to delete Domaine : {}", id);
        domaineRepository.deleteById(id);
    }
}

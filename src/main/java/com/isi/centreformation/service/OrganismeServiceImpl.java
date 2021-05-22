package com.isi.centreformation.service;

import com.isi.centreformation.model.Organisme;
import com.isi.centreformation.repository.OrganismeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OrganismeServiceImpl implements OrganismeService {

    private final Logger log = LoggerFactory.getLogger(OrganismeService.class);

    @Autowired
    private OrganismeRepository organismeRepository;

    @Override
    public List<Organisme> getAllOrganismes() {
        log.debug("Request to get all Organismes");
        List<Organisme> organismeList = organismeRepository.findAll();
        return organismeList;
    }

    @Override
    public Optional<Organisme> getOrganismeById(Long id) {
        log.debug("Request to get Organisme : {}", id);
        Optional <Organisme> organisme = organismeRepository.findById(id);
        return organisme;
    }

    @Override
    public Organisme createOrganisme(Organisme organisme) {
        log.debug("Request to save Organisme : {}", organisme);
        organisme = organismeRepository.save(organisme);
        return organisme;
    }

    @Override
    public void deleteOrganisme(Long id) {
        log.debug("Request to delete Organisme : {}", id);
        organismeRepository.deleteById(id);

    }
}

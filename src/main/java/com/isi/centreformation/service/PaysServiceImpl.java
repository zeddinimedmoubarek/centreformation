package com.isi.centreformation.service;

import com.isi.centreformation.model.Pays;
import com.isi.centreformation.repository.PaysRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PaysServiceImpl implements PaysService {

    private final Logger log = LoggerFactory.getLogger(PaysService.class);

    @Autowired
    private PaysRepository paysRepository;

    @Override
    public List<Pays> getAllPays() {
        log.debug("Request to get all Payss");
        List<Pays> paysList = paysRepository.findAll();
        return paysList;
    }

    @Override
    public Optional<Pays> getPaysById(Long id) {
        log.debug("Request to get Pays : {}", id);
        Optional <Pays> pays = paysRepository.findById(id);
        return pays;
    }

    @Override
    public Pays createPays(Pays pays) {
        log.debug("Request to save Pays : {}", pays);
        pays = paysRepository.save(pays);
        return pays;
    }

    @Override
    public void deletePays(Long id) {
        log.debug("Request to delete Pays : {}", id);
        paysRepository.deleteById(id);

    }
}

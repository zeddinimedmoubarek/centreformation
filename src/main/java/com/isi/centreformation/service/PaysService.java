package com.isi.centreformation.service;

import com.isi.centreformation.model.Pays;


import java.util.List;
import java.util.Optional;

public interface PaysService {
    List<Pays> getAllPays();
    Optional<Pays> getPaysById(Long id);
    Pays createPays(Pays pays);
    void deletePays(Long id);
}

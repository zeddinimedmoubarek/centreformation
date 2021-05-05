package com.isi.centreformation.service;

import com.isi.centreformation.model.Organisme;

import java.util.List;
import java.util.Optional;

public interface OrganismeService {
    List<Organisme> getAllOrganismes();
    Optional<Organisme> getOrganismeById(Long id);
    Long createOrganisme(Organisme organisme);
    void deleteOrganisme(Long id);
}

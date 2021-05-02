package com.isi.centreformation.service;

import com.isi.centreformation.model.Organisme;

import java.util.List;

public interface OrganismeService {
    List<Organisme> getAllOrganismes();
    Organisme getOrganismeById(Long id);
    Organisme createOrganisme(Organisme organisme);
    void deleteOrganisme(Long id);
}

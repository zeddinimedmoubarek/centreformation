package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Organisme;
import com.isi.centreformation.repository.OrganismeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class OrganismeController {
    @Autowired
    private OrganismeRepository organismeRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/organismes")
    public List<Organisme> getAllOrganismes() {
        return organismeRepository.findAll();
    }

    @PostMapping("/organismes")
    public Organisme createOrganisme(@Valid @RequestBody Organisme organisme) {
        return organismeRepository.save(organisme);
    }

    @GetMapping("/organismes/{id}")
    public ResponseEntity<Organisme> getOrganismeById(
            @PathVariable(value = "id") Long organismeId)
            throws ResourceNotFoundException {
        Organisme organisme = organismeRepository.findById(organismeId)
                .orElseThrow(() -> new ResourceNotFoundException("Organisme introuvable avec le code = " + organismeId));
        return ResponseEntity.ok().body(organisme);
    }

    @PutMapping("/organismes/{id}")
    public ResponseEntity<Organisme> updateOrganisme(
            @PathVariable(value = "id") Long organismeId,@Valid @RequestBody Organisme organismeDetails) throws ResourceNotFoundException {
        Organisme organisme = organismeRepository.findById(organismeId).orElseThrow(() -> new ResourceNotFoundException("Organisme introuvable avec le code = " + organismeId));
        organisme.setLibelle(organismeDetails.getLibelle());
        organisme.setFormateurs(organismeDetails.getFormateurs());
        organisme.setSessionFormations(organismeDetails.getSessionFormations());

        final Organisme updatedOrganisme = organismeRepository.save(organisme);
        return ResponseEntity.ok(updatedOrganisme);
    }

    @DeleteMapping("/organismes/{id}")
    public Map<String, Boolean> deleteOrganisme(
            @PathVariable(value = "id") Long organismeId)
            throws ResourceNotFoundException {
        Organisme organisme = organismeRepository.findById(organismeId).orElseThrow(() -> new ResourceNotFoundException("Organisme introuvable avec le code = " + organismeId));

        organismeRepository.delete(organisme);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

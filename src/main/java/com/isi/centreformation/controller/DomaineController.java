package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Domaine;
import com.isi.centreformation.repository.DomaineRepository;
import com.isi.centreformation.service.DomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class DomaineController {

    @Autowired
    private DomaineRepository domaineRepository;
    
    @Autowired
    private DomaineService domaineService;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/domaine")
    public List<Domaine> getAllDomaines() {
        return domaineService.getAllDomaines();
    }

    @PostMapping("/domaine")
    public Long createDomaine(@Valid @RequestBody Domaine domaine) {
        return domaineService.createDomaine(domaine);
    }

    @GetMapping("/domaine/{id}")
    public ResponseEntity<Domaine> getDomaineById(
            @PathVariable(value = "id") Long domaineId)
            throws ResourceNotFoundException {
        Domaine domaine = domaineService.getDomaineById(domaineId)
                .orElseThrow(() -> new ResourceNotFoundException("Domaine introuvable avec le code = " + domaineId));
        return ResponseEntity.ok().body(domaine);
    }

    @PutMapping("/domaine/{id}")
    public ResponseEntity<Domaine> updateDomaine(
            @PathVariable(value = "id") Long domaineId, @Valid @RequestBody Domaine domaineDetails) throws ResourceNotFoundException {
        Domaine domaine = domaineService.getDomaineById(domaineId).orElseThrow(() -> new ResourceNotFoundException("Domaine introuvable avec le code = " + domaineId));
        domaine.setLibelle(domaineDetails.getLibelle());
        domaine.setFormations(domaineDetails.getFormations());

        final Domaine updatedDomaine = domaineRepository.save(domaine);
        return ResponseEntity.ok(updatedDomaine);
    }

    @DeleteMapping("/domaine/{id}")
    public Map<String, Boolean> deleteDomaine(
            @PathVariable(value = "id") Long domaineId)
            throws ResourceNotFoundException {
        Domaine domaine = domaineService.getDomaineById(domaineId).orElseThrow(() -> new ResourceNotFoundException("Domaine introuvable avec le code = " + domaineId));

        domaineService.deleteDomaine(domaine.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
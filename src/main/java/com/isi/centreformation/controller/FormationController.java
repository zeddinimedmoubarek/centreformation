package com.isi.centreformation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Formation;
import com.isi.centreformation.repository.FormationRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class FormationController {
	@Autowired
    private FormationRepository formationRepository;
    
	//@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/formations")
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }
    
    @PostMapping("/formations")
    public Formation createFormation(@Valid @RequestBody Formation formation) {
        return formationRepository.save(formation);
    }

    @GetMapping("/formations/{id}")
    public ResponseEntity<Formation> getFormationById(
            @PathVariable(value = "id") Long formationId)
            throws ResourceNotFoundException {
    	Formation formation = formationRepository.findById(formationId)
                .orElseThrow(() -> new ResourceNotFoundException("Formation introuvable avec le code = " + formationId));
        return ResponseEntity.ok().body(formation);
    }

    @PutMapping("/formations/{id}")
    public ResponseEntity<Formation> updateFormation(
            @PathVariable(value = "id") Long formationId,@Valid @RequestBody Formation formationDetails) throws ResourceNotFoundException {
    	Formation formation = formationRepository.findById(formationId).orElseThrow(() -> new ResourceNotFoundException("Formation introuvable avec le code = " + formationId));
      formation.setBudget(formationDetails.getBudget());
      formation.setDomaine(formationDetails.getDomaine());
      formation.setDuree(formationDetails.getDuree());
      formation.setNbSession(formationDetails.getNbSession());
      formation.setTitre(formationDetails.getTitre());
      formation.setTypeFormation(formationDetails.getTypeFormation());
      
        final Formation updatedFormation = formationRepository.save(formation);
        return ResponseEntity.ok(updatedFormation);
    }

    @DeleteMapping("/formations/{id}")
    public Map<String, Boolean> deleteFormation(
            @PathVariable(value = "id") Long formationId)
            throws ResourceNotFoundException {
    	Formation formation = formationRepository.findById(formationId).orElseThrow(() -> new ResourceNotFoundException("Formation introuvable avec le code = " + formationId));

        formationRepository.delete(formation);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}

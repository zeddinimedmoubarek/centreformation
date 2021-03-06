package com.isi.centreformation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.isi.centreformation.service.SessionFormationService;
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
import com.isi.centreformation.model.SessionFormation;
import com.isi.centreformation.repository.SessionFormationRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class SessionFormationController {

    @Autowired
    private SessionFormationService sessionFormationService;
	@Autowired
    private SessionFormationRepository sessionformationRepository;
    
	//@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/Sessionformation")
    public List<SessionFormation> getAllSessionFormations() {
        return sessionFormationService.getAllSessionFormations();
    }
    
    @PostMapping("/Sessionformation")
    public SessionFormation createFormation(@Valid @RequestBody SessionFormation sessionformation) {
        return sessionFormationService.createSessionFormation(sessionformation);
    }

    @GetMapping("/Sessionformation/id}")
    public ResponseEntity<SessionFormation> getSessionFormationById(
            @PathVariable(value = "id") Long sessionformationId)
            throws ResourceNotFoundException {
    	SessionFormation sessionformation = sessionFormationService.getSessionFormationById(sessionformationId)
                .orElseThrow(() -> new ResourceNotFoundException("SessionFormation introuvable avec le code = " + sessionformationId));
        return ResponseEntity.ok().body(sessionformation);
    }

    @PutMapping("/Sessionformation/{id}")
    public ResponseEntity<SessionFormation> updateSessionFormation(
            @PathVariable(value = "id") Long sessionformationId,@Valid @RequestBody SessionFormation sessionformationDetails) throws ResourceNotFoundException {
    	SessionFormation sessionformation = sessionFormationService.getSessionFormationById(sessionformationId).orElseThrow(() -> new ResourceNotFoundException("SessionFormation introuvable avec le code = " + sessionformationId));
    	sessionformation.setDateDebut(sessionformationDetails.getDateDebut());
    	sessionformation.setDateFin(sessionformationDetails.getDateFin());
    	sessionformation.setFormateur(sessionformationDetails.getFormateur());
    	sessionformation.setFormation(sessionformationDetails.getFormation());
    	sessionformation.setLieu(sessionformationDetails.getLieu());
    	sessionformation.setNbParticipants(sessionformationDetails.getNbParticipants());
    	//sessionformation.setParticipants(sessionformationDetails.getParticipants());
    	sessionformation.setOrganisme(sessionformationDetails.getOrganisme());
      
        final SessionFormation updatedSessionFormation = sessionformationRepository.save(sessionformation);
        return ResponseEntity.ok(updatedSessionFormation);
    }

    @DeleteMapping("/Sessionformation/{id}")
    public Map<String, Boolean> deleteSessionFormation(
            @PathVariable(value = "id") Long sessionformationId)
            throws ResourceNotFoundException {
    	SessionFormation sessionformation = sessionFormationService.getSessionFormationById(sessionformationId).orElseThrow(() -> new ResourceNotFoundException("SessionFormation introuvable avec le code = " + sessionformationId));

        sessionFormationService.deleteSessionFormation(sessionformation.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

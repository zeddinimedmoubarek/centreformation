package com.isi.centreformation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.isi.centreformation.repository.FormateurRepository;
import com.isi.centreformation.service.FormateurService;
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
import com.isi.centreformation.model.Formateur;


@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class FormateurController {

	@Autowired
    private FormateurRepository formateurRepository;

    @Autowired
    private FormateurService formateurService;
    
	//@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/formateur")
    public List<Formateur> getAllFormateurs() {
        return formateurService.getAllFormateurs();
    }
    
    @PostMapping("/formateur")
    public Formateur createFormateur(@Valid @RequestBody Formateur formateur) {
        return formateurService.createFormateur(formateur);
    }

    @GetMapping("/formateur/{id}")
    public ResponseEntity<Formateur> getFormateurById(
            @PathVariable(value = "id") Long formateurId)
            throws ResourceNotFoundException {
    	Formateur formateur = formateurService.getFormateurById(formateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Formateur introuvable avec le code = " + formateurId));
        return ResponseEntity.ok().body(formateur);
    }

    @PutMapping("/formateur/{id}")
    public ResponseEntity<Formateur> updateFormateur(
            @PathVariable(value = "id") Long formateurId,@Valid @RequestBody Formateur formateurDetails) throws ResourceNotFoundException {
    	Formateur formateur = formateurService.getFormateurById(formateurId).orElseThrow(() -> new ResourceNotFoundException("Formateur introuvable avec le code = " + formateurId));
        formateur.setEmail(formateurDetails.getEmail());
        formateur.setNom(formateurDetails.getNom());
        formateur.setOrganisme(formateurDetails.getOrganisme());
        formateur.setPrenom(formateurDetails.getPrenom());
        formateur.setTel(formateurDetails.getTel());
      
        final Formateur updatedFormateur = formateurRepository.save(formateur);
        return ResponseEntity.ok(updatedFormateur);
    }

    @DeleteMapping("/formateur/{id}")
    public Map<String, Boolean> deleteFormateur(
            @PathVariable(value = "id") Long formateurId)
            throws ResourceNotFoundException {
    	Formateur formateur = formateurService.getFormateurById(formateurId).orElseThrow(() -> new ResourceNotFoundException("Formateur introuvable avec le code = " + formateurId));

        formateurService.deleteFormateur(formateur.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}

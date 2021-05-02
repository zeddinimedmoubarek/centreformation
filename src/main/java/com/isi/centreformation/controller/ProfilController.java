package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Profil;
import com.isi.centreformation.repository.ProfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProfilController {
    @Autowired
    private ProfilRepository profilRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/profils")
    public List<Profil> getAllProfils() {
        return profilRepository.findAll();
    }

    @PostMapping("/profils")
    public Profil createProfil(@Valid @RequestBody Profil profil) {
        return profilRepository.save(profil);
    }

    @GetMapping("/profils/{id}")
    public ResponseEntity<Profil> getProfilById(
            @PathVariable(value = "id") Long profilId)
            throws ResourceNotFoundException {
        Profil profil = profilRepository.findById(profilId)
                .orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));
        return ResponseEntity.ok().body(profil);
    }

    @PutMapping("/profils/{id}")
    public ResponseEntity<Profil> updateProfil(
            @PathVariable(value = "id") Long profilId,@Valid @RequestBody Profil profilDetails) throws ResourceNotFoundException {
        Profil profil = profilRepository.findById(profilId).orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));
        profil.setLibelle(profilDetails.getLibelle());
        profil.setParticipants(profilDetails.getParticipants());

        final Profil updatedProfil = profilRepository.save(profil);
        return ResponseEntity.ok(updatedProfil);
    }

    @DeleteMapping("/profils/{id}")
    public Map<String, Boolean> deleteProfil(
            @PathVariable(value = "id") Long profilId)
            throws ResourceNotFoundException {
        Profil profil = profilRepository.findById(profilId).orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));

        profilRepository.delete(profil);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}

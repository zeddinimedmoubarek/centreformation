package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Profil;
import com.isi.centreformation.repository.ProfilRepository;
import com.isi.centreformation.service.ProfilService;
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
    private ProfilService profilService;

    @Autowired
    private ProfilRepository profilRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/profil")
    public List<Profil> getAllProfils() {
        return profilService.getAllProfils();
    }

    @PostMapping("/profil")
    public Profil createProfil(@Valid @RequestBody Profil profil) {
        return profilService.createProfil(profil);
    }

    @GetMapping("/profil/{id}")
    public ResponseEntity<Profil> getProfilById(
            @PathVariable(value = "id") Long profilId)
            throws ResourceNotFoundException {
        Profil profil = profilService.getProfilById(profilId)
                .orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));
        return ResponseEntity.ok().body(profil);
    }

    @PutMapping("/profil/{id}")
    public ResponseEntity<Profil> updateProfil(
            @PathVariable(value = "id") Long profilId,@Valid @RequestBody Profil profilDetails) throws ResourceNotFoundException {
        Profil profil = profilService.getProfilById(profilId).orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));
        profil.setLibelle(profilDetails.getLibelle());

        final Profil updatedProfil = profilRepository.save(profil);
        return ResponseEntity.ok(updatedProfil);
    }

    @DeleteMapping("/profil/{id}")
    public Map<String, Boolean> deleteProfil(
            @PathVariable(value = "id") Long profilId)
            throws ResourceNotFoundException {
        Profil profil = profilService.getProfilById(profilId).orElseThrow(() -> new ResourceNotFoundException("Profil introuvable avec le code = " + profilId));

        profilService.deleteProfil(profil.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}

package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Pays;
import com.isi.centreformation.repository.PaysRepository;
import com.isi.centreformation.service.PaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class PaysController {

    @Autowired
    private PaysService paysService;
    @Autowired
    private PaysRepository paysRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/pays/all")
    public List<Pays> getAllPayss() {
        return paysService.getAllPays();
    }

    @PostMapping("/pays/new")
    public Long createPays(@Valid @RequestBody Pays pays) {
        return paysService.createPays(pays);
    }

    @GetMapping("/pays/get/{id}")
    public ResponseEntity<Pays> getPaysById(
            @PathVariable(value = "id") Long paysId)
            throws ResourceNotFoundException {
        Pays pays = paysService.getPaysById(paysId)
                .orElseThrow(() -> new ResourceNotFoundException("Pays introuvable avec le code = " + paysId));
        return ResponseEntity.ok().body(pays);
    }

    @PutMapping("/pays/update/{id}")
    public ResponseEntity<Pays> updatePays(
            @PathVariable(value = "id") Long paysId,@Valid @RequestBody Pays paysDetails) throws ResourceNotFoundException {
        Pays pays = paysService.getPaysById(paysId).orElseThrow(() -> new ResourceNotFoundException("Pays introuvable avec le code = " + paysId));
        pays.setLibelle(paysDetails.getLibelle());
        pays.setParticipantInternationals(paysDetails.getParticipantInternationals());

        final Pays updatedPays = paysRepository.save(pays);
        return ResponseEntity.ok(updatedPays);
    }

    @DeleteMapping("/pays/delete/{id}")
    public Map<String, Boolean> deletePays(
            @PathVariable(value = "id") Long paysId)
            throws ResourceNotFoundException {
        Pays pays = paysService.getPaysById(paysId).orElseThrow(() -> new ResourceNotFoundException("Pays introuvable avec le code = " + paysId));

        paysService.deletePays(pays.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}

package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Participant;
import com.isi.centreformation.repository.ParticipantRepository;
import com.isi.centreformation.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private ParticipantRepository participantRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/participants/all")
    public List<Participant> getAllParticipants() {
        return participantService.getAllParticipants();
    }

    @PostMapping("/participants/new")
    public Long createParticipant(@Valid @RequestBody Participant participant) {
        return participantService.createParticipant(participant);
    }

    @GetMapping("/participants/get/{id}")
    public ResponseEntity<Participant> getParticipantById(
            @PathVariable(value = "id") Long participantId)
            throws ResourceNotFoundException {
        Participant participant = participantService.getParticipantById(participantId)
                .orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));
        return ResponseEntity.ok().body(participant);
    }

    @PutMapping("/participants/update/{id}")
    public ResponseEntity<Participant> updateParticipant(
            @PathVariable(value = "id") Long participantId, @Valid @RequestBody Participant participantDetails) throws ResourceNotFoundException {
        Participant participant = participantService.getParticipantById(participantId).orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));
        participant.setNom(participantDetails.getNom());
        participant.setPrenom(participantDetails.getPrenom());
        participant.setEmail(participantDetails.getEmail());
        participant.setTel(participantDetails.getTel());
        participant.setTypeParticipant(participantDetails.getTypeParticipant());
        participant.setOrganisme(participantDetails.getOrganisme());
        participant.setPays(participantDetails.getPays());
        participant.setProfil(participantDetails.getProfil());
        participant.setSessionFormations(participantDetails.getSessionFormations());

        final Participant updatedParticipant = participantRepository.save(participant);
        return ResponseEntity.ok(updatedParticipant);
    }

    @DeleteMapping("/participants/delete/{id}")
    public Map<String, Boolean> deleteParticipant(
            @PathVariable(value = "id") Long participantId)
            throws ResourceNotFoundException {
        Participant participant = participantService.getParticipantById(participantId).orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));

        participantService.deleteParticipant(participant.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

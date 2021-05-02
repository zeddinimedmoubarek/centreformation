package com.isi.centreformation.controller;

import com.isi.centreformation.exception.ResourceNotFoundException;
import com.isi.centreformation.model.Participant;
import com.isi.centreformation.repository.ParticipantRepository;
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
    private ParticipantRepository participantRepository;

    //@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/participants")
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @PostMapping("/participants")
    public Participant createParticipant(@Valid @RequestBody Participant participant) {
        return participantRepository.save(participant);
    }

    @GetMapping("/participants/{id}")
    public ResponseEntity<Participant> getParticipantById(
            @PathVariable(value = "id") Long participantId)
            throws ResourceNotFoundException {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));
        return ResponseEntity.ok().body(participant);
    }

    @PutMapping("/participants/{id}")
    public ResponseEntity<Participant> updateParticipant(
            @PathVariable(value = "id") Long participantId, @Valid @RequestBody Participant participantDetails) throws ResourceNotFoundException {
        Participant participant = participantRepository.findById(participantId).orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));
        participant.setNom(participantDetails.getNom());
        participant.setPrenom(participantDetails.getPrenom());
        participant.setEmail(participantDetails.getEmail());
        participant.setTel(participantDetails.getTel());
        participant.setProfil(participantDetails.getProfil());
        participant.setSessionFormations(participantDetails.getSessionFormations());

        final Participant updatedParticipant = participantRepository.save(participant);
        return ResponseEntity.ok(updatedParticipant);
    }

    @DeleteMapping("/participants/{id}")
    public Map<String, Boolean> deleteParticipant(
            @PathVariable(value = "id") Long participantId)
            throws ResourceNotFoundException {
        Participant participant = participantRepository.findById(participantId).orElseThrow(() -> new ResourceNotFoundException("Participant introuvable avec le code = " + participantId));

        participantRepository.delete(participant);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

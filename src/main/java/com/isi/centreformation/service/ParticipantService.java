package com.isi.centreformation.service;

import com.isi.centreformation.model.Participant;

import java.util.List;
import java.util.Optional;

public interface ParticipantService {
    List<Participant> getAllParticipants();
    Optional<Participant> getParticipantById(Long id);
    Long createParticipant(Participant participant);
    void deleteParticipant(Long id);
}

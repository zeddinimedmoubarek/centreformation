package com.isi.centreformation.service;

import com.isi.centreformation.model.Participant;

import java.util.List;

public interface ParticipantService {
    List<Participant> getAllParticipants();
    Participant getParticipantById(Long id);
    Participant createParticipant(Participant participant);
    void deleteParticipant(Long id);
}

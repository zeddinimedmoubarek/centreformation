package com.isi.centreformation.service;

import com.isi.centreformation.model.Participant;
import com.isi.centreformation.repository.ParticipantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ParticipantServiceImpl implements ParticipantService {

    private final Logger log = LoggerFactory.getLogger(ParticipantService.class);

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public List<Participant> getAllParticipants() {
        log.debug("Request to get all Participants");
        List<Participant> participantList = participantRepository.findAll();
        return participantList;
    }

    @Override
    public Optional<Participant> getParticipantById(Long id) {
        log.debug("Request to get Participant : {}", id);
        Optional <Participant> participant = participantRepository.findById(id);
        return participant;
    }

    @Override
    public Participant createParticipant(Participant participant) {
        log.debug("Request to save Participant : {}", participant);
        participant = participantRepository.save(participant);
        return participant;
    }

    @Override
    public void deleteParticipant(Long id) {
        log.debug("Request to delete Participant : {}", id);
        participantRepository.deleteById(id);

    }
}

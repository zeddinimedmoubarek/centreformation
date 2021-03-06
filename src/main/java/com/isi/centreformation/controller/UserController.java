package com.isi.centreformation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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
import com.isi.centreformation.model.User;
import com.isi.centreformation.repository.UserRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
	@Autowired
    private UserRepository userRepository;
    
	//@PreAuthorize("hasRole('ADMIN')") // ki hachtik b admin bark ya3mlha
    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping("/users/new")
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/users/get/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
    	User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User introuvable avec le code = " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id") Long userId,@Valid @RequestBody User userDetails) throws ResourceNotFoundException {
    	User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User introuvable avec le code = " + userId));
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setRoles(userDetails.getRoles());
      
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/delete/{id}")
    public Map<String, Boolean> deleteUser(
            @PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
    	User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User introuvable avec le code = " + userId));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    
}

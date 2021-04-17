package com.isi.centreformation.service;

import com.isi.centreformation.model.CustomUserBean;
import com.isi.centreformation.model.User;
import com.isi.centreformation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException {
       User user = userRepository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User with " + " user name" + username + " not found"));
       return CustomUserBean.createInstance(user);
    }
}

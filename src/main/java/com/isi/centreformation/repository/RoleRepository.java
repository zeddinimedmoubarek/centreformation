package com.isi.centreformation.repository;

import com.isi.centreformation.model.Role;
import com.isi.centreformation.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(Roles role);
}

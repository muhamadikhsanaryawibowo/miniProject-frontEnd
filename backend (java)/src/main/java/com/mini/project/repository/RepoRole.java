package com.mini.project.repository;

import com.mini.project.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoRole extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
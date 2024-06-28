package com.mini.project.repository;

import com.mini.project.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoTransaction extends JpaRepository<Transactions, Integer> {
}

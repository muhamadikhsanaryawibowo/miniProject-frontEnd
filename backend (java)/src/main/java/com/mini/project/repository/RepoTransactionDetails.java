package com.mini.project.repository;

import com.mini.project.entity.TransactionDetails;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepoTransactionDetails extends JpaRepository<TransactionDetails, Integer> {

    List<TransactionDetails> findTransactionDetailsByTransactions_Id (int transaction_id);
}

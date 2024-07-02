package com.mini.project.controller;

import com.mini.project.dto.DtoResponseTransaction;
import com.mini.project.dto.DtoTransaction;
import com.mini.project.entity.Transactions;
import com.mini.project.response.GlobalResponse;
import com.mini.project.service.ServiceTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("pos/api/transaction")
public class TransactionController {
    private final ServiceTransaction transaction;

    @Autowired
    public TransactionController(ServiceTransaction transaction) {
        this.transaction = transaction;
    }

    @PostMapping
    public ResponseEntity<?> addNewTransaction(@RequestBody DtoTransaction dtoTransaction){
        return transaction.addTransaction(dtoTransaction);
    }
    @GetMapping
    public ResponseEntity<List<DtoResponseTransaction>> getAllTransaction(){
        return transaction.getAllTransaction();
    }
}

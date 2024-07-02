package com.mini.project.service;

import com.mini.project.dto.DtoResponseTransaction;
import com.mini.project.dto.DtoTransaction;
import com.mini.project.dto.DtoTransactionDetails;
import com.mini.project.entity.Product;
import com.mini.project.entity.TransactionDetails;
import com.mini.project.entity.Transactions;
import com.mini.project.exception.ApiRequestException;
import com.mini.project.repository.RepoProduct;
import com.mini.project.repository.RepoTransaction;
import com.mini.project.repository.RepoTransactionDetails;
import com.mini.project.response.GlobalResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ServiceTransaction {
    private final RepoTransaction transaction;
    private final RepoProduct repoProduct;
    private RepoTransactionDetails repoTransactionDetails;

    @Autowired
    public ServiceTransaction(RepoTransaction transaction, RepoProduct repoProduct, RepoTransactionDetails repoTransactionDetails) {
        this.transaction = transaction;
        this.repoProduct = repoProduct;
        this.repoTransactionDetails = repoTransactionDetails;
    }


    public ResponseEntity addTransaction(DtoTransaction dtoTransaction) {
        Transactions transactions = new Transactions();
        transactions.setTotal_amount(dtoTransaction.getTotal_amount());
        transactions.setTotal_pay(dtoTransaction.getTotal_pay());
        transactions.setTransactionDate(ZonedDateTime.now(ZoneId.of("Asia/Jakarta")));

        if (dtoTransaction.getTotal_amount() > dtoTransaction.getTotal_pay()){
            throw new ApiRequestException("total amount can not be greater than total pay");
        }
        else {
            transactions = transaction.save(transactions);

            List<DtoTransactionDetails> detailsDTOS = dtoTransaction.getDetails();
            for(DtoTransactionDetails detailsDtO: detailsDTOS){
                TransactionDetails details = new TransactionDetails();
                details.setQuantity(detailsDtO.getQuantity());
                details.setSubtotal(detailsDtO.getSubtotal());
                details.setTransactions(transactions);
                Product productss = repoProduct.getReferenceById(detailsDtO.getProduct());
                details.setProduct(productss);

                int realSubtotal = details.getQuantity() * details.getProduct().getPrice();
                if (detailsDtO.getSubtotal() != realSubtotal){
                    throw new ApiRequestException("Subtotal not match");
                }

                repoTransactionDetails.save(details);
            }

            return ResponseEntity.ok(new GlobalResponse("ok","success"));
        }

    }

    public ResponseEntity<List<DtoResponseTransaction>> getAllTransaction(){
        List<Transactions> view = transaction.findAll();
        return ResponseEntity.ok().body(view.stream().map(this::convertToDto).toList());
    }

    public DtoResponseTransaction convertToDto(Transactions transactions){
        return new DtoResponseTransaction(transactions.getId(), transactions.getTotal_amount(), transactions.getTotal_pay(), transactions.getTransactionDate());

    }
}

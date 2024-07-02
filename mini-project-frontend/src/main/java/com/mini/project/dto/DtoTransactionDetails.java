package com.mini.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.project.entity.Product;
import com.mini.project.entity.TransactionDetails;
import com.mini.project.entity.Transactions;
import lombok.Data;

@Data
public class DtoTransactionDetails {
    private int quantity;
    private int product;
    private int subtotal;
    private Transactions transactions;
}

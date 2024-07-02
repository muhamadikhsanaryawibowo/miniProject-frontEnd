package com.mini.project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Optional;

@Data
@Entity
public class TransactionDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transactions transactions;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @Column
    private int quantity;
    @Column
    private int subtotal;

}

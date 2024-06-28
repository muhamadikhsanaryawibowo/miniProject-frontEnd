package com.mini.project.entity;

import com.mini.project.dto.DtoResponseTransaction;
import com.mini.project.dto.DtoTransaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "transaction_date")
    private ZonedDateTime transactionDate;
    @Column(name = "total_amount")
    private int total_amount;
    @Column(name = "total_pay")
    private int total_pay;

    public Transactions(ZonedDateTime transactionDate,
                        int total_amount,
                        int total_pay){
        this.transactionDate = transactionDate;
        this.total_amount = total_amount;
        this.total_pay = total_pay;
    }

}

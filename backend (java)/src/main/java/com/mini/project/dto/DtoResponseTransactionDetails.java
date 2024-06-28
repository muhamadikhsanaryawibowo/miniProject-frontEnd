package com.mini.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Data
public class DtoResponseTransactionDetails {
    private int transaction_id;
    private int product_id;
    private String product_name;
    private int quantity;
    private int sub_total;
    private int product_price;
    private int total_pay;
    private int total_amount;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy" )
    private ZonedDateTime transaction_date;

}

package com.mini.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class DtoTransaction {
    private int total_amount;
    private int total_pay;
    private List<DtoTransactionDetails> details;
}

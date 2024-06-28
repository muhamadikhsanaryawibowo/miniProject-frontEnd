package com.mini.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DtoResponseProduct{
    private String title;
    private int price;
    private String image;
    private String categoryName;
    private int categoryId;
    private int id;

}

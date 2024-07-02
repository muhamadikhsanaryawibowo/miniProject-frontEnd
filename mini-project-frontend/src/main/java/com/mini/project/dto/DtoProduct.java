package com.mini.project.dto;

import com.mini.project.entity.Category;
import com.mini.project.entity.Product;
import lombok.Data;

@Data
public class DtoProduct {
    private String title;
    private int price;
    private String image;
    private Category category;

    public Product dtoToEntity(){
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        product.setImage(image);
        product.setCategory(category);
        return product;
    }
}

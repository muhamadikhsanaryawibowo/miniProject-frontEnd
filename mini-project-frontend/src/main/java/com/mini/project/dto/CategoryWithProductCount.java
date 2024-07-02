package com.mini.project.dto;

import com.mini.project.entity.Category;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryWithProductCount {
    private int id;
    private String name;
    private long productCount;

    public CategoryWithProductCount(int id, String name, long productCount) {
        this.id = id;
        this.name = name;
        this.productCount = productCount;
    }
}

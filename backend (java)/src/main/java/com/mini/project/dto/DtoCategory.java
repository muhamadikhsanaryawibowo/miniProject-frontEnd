package com.mini.project.dto;

import com.mini.project.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class DtoCategory {
    private String name;

    public Category dtoToEntity() {
        Category category = new Category();
        category.setName(name);
        return category;
    }
}

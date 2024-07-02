package com.mini.project.entity;

import com.mini.project.dto.DtoCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Product> products;


    public Category (int id){
        this.id = id;
    }
    public Category ( String name){
        this.name = name;
    }
}

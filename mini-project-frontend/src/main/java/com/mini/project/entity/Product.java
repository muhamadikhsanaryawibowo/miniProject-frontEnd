package com.mini.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table (name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    @NotBlank(message = "title is mandatory")
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "only accept alphabetical numeric")
    private String title;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String image;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Product(String title,
                   String image,
                   int price,
                   Category category){
        this.title = title;
        this.price = price;
        this.image = image;
        this.category = category;
    }

}

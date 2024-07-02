package com.mini.project.repository;

import com.mini.project.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoProduct extends JpaRepository<Product, Integer> {

    List<Product>findProductByTitleContainingIgnoreCase(String title, Sort price);
    List<Product>findProductByCategory_Id(int category_id, Sort by);


    @Query("select p FROM Product p ")
    List<Product> findProduct();


    Product findById(Product product);
}

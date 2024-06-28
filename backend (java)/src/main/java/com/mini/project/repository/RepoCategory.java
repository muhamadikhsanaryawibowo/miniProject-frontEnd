package com.mini.project.repository;

import com.mini.project.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoCategory extends JpaRepository<Category, Integer> {
        @Query("SELECT c, SIZE(c.products) as productCount FROM Category c")
        List<Object[]> findAllWithProductCount();

}

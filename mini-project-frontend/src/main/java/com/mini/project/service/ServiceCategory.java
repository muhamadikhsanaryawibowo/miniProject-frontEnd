package com.mini.project.service;

import com.mini.project.dto.CategoryWithProductCount;
import com.mini.project.dto.DtoCategory;
import com.mini.project.dto.DtoProduct;
import com.mini.project.dto.DtoResponseCategory;
import com.mini.project.entity.Category;
import com.mini.project.entity.Product;
import com.mini.project.repository.RepoCategory;
import com.mini.project.response.GlobalResponse;
import lombok.Data;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceCategory {
    private final RepoCategory repoCategory;

    @Autowired
    public ServiceCategory(RepoCategory repoCategory){
        this.repoCategory = repoCategory;
    }


    public ResponseEntity<List<CategoryWithProductCount>> getCategoriesWithProductCount() {
        List<Category> categories = repoCategory.findAll();
        return ResponseEntity.ok().body(categories.stream().map(this::convertToDtoResp).toList());
    }
    public ResponseEntity<List<DtoResponseCategory>> getAllResp(){
        List<Category> viewAll = repoCategory.findAll();
        return ResponseEntity.ok().body(viewAll.stream().map(this::convertToDto).toList());
    }


    public GlobalResponse addNewCategory(DtoCategory category){
        repoCategory.save(category.dtoToEntity());
        return new GlobalResponse("ok", "success");

    }

    public ResponseEntity deleteCategory(String id){
        Optional<Category> productExist = repoCategory.findById(Integer.valueOf(String.valueOf(id)));
        if(productExist.isPresent()){
            repoCategory.deleteById(Integer.valueOf(String.valueOf(id)));
            return ResponseEntity.ok(new GlobalResponse("ok", "success"));
        }
        return ResponseEntity.ofNullable("[]");
    }

    public ResponseEntity updateProduct(String id, DtoCategory dtoCategory) {
        Optional<Category> categoryExist = repoCategory.findById(Integer.valueOf(String.valueOf(id)));
        if (categoryExist.isEmpty()){
            return ResponseEntity.ofNullable("[]");
        }
        Category existCategory = categoryExist.get();
        existCategory.setName(dtoCategory.getName());

        repoCategory.save(existCategory);
        return ResponseEntity.ok(new GlobalResponse("ok", "success"));
    }

    public ResponseEntity getById(String id){
            Optional<Category> categoryExist = repoCategory.findById(Integer.valueOf(String.valueOf(id)));
            return  ResponseEntity.ok().body(categoryExist.map(this::convertToDtoResp));
    }

    public CategoryWithProductCount convertToDtoResp(Category category){
        return new CategoryWithProductCount(category.getId(), category.getName(), category.getProducts().size());
    }

    public DtoResponseCategory convertToDto(Category category){
        return new DtoResponseCategory(category.getName(), category.getId());
    }
}


package com.mini.project.service;

import com.mini.project.dto.DtoProduct;
import com.mini.project.dto.DtoResponseProduct;
import com.mini.project.dto.DtoResponseTransaction;
import com.mini.project.entity.Category;
import com.mini.project.entity.Product;
import com.mini.project.entity.Transactions;
import com.mini.project.repository.RepoCategory;
import com.mini.project.repository.RepoProduct;
import com.mini.project.response.GlobalResponse;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceProduct {

    private final RepoProduct repoProduct;

    @Autowired
    public ServiceProduct (RepoProduct product){
        this.repoProduct = product;
    }

    public ResponseEntity addNew(DtoProduct dtoProduct) {
        try {
            repoProduct.save(dtoProduct.dtoToEntity());
            return ResponseEntity.ok(new GlobalResponse("ok", "success"));
        } catch (Exception e){
            System.out.println("error " + e);
        }
        return ResponseEntity.ofNullable("[]");
    }

    public ResponseEntity<List<DtoResponseProduct>> getProductByTitle(String title, String sortBy, String sortOrder){
        List<Product> viewAll = repoProduct.findProductByTitleContainingIgnoreCase(title, Sort.by(Sort.Direction.fromString(sortOrder), sortBy));
        return ResponseEntity.ok().body(viewAll.stream().map(this::convertToDto).toList());
    }

    public ResponseEntity getProductByCategory (String category, String sortBy, String sortOrder){
        List<Product> viewAll = repoProduct.findProductByCategory_Id(Integer.valueOf(String.valueOf(category)), Sort.by(Sort.Direction.fromString(sortOrder), sortBy));
        if(viewAll == null){
            return ResponseEntity.ofNullable("[]");
        }
        return ResponseEntity.ok().body(viewAll.stream().map(this::convertToDto).toList());
    }

    public ResponseEntity<List<DtoResponseProduct>> getAll(String sortBy, String sortOrder){
        List<Product> viewAll = repoProduct.findAll((Sort.by(Sort.Direction.fromString(sortOrder), sortBy)));
        return ResponseEntity.ok().body(viewAll.stream().map(this::convertToDto).toList());
    }

    public ResponseEntity getById(String id){
        try {
            Optional<Product> productExist = repoProduct.findById(Integer.valueOf(String.valueOf(id)));
            if (productExist.isPresent()) {
                return ResponseEntity.ok().body(productExist.map(this::convertToDto));
            }
        }catch (Exception e){
            System.out.println("error " + e);
        }
        return ResponseEntity.ofNullable("[]");
    }

    public ResponseEntity deleteProduct(String id) {
        Optional<Product> productExist = repoProduct.findById(Integer.valueOf(String.valueOf(id)));
        if(productExist.isPresent()){
            repoProduct.deleteById(Integer.valueOf(String.valueOf(id)));
            return ResponseEntity.ok(new GlobalResponse("ok", "success"));
        }
        return ResponseEntity.ofNullable("[]");
    }

    public ResponseEntity updateProduct(String id, DtoProduct dtoProduct) {
        Optional<Product> productExist = repoProduct.findById(Integer.valueOf(String.valueOf(id)));
        if (productExist.isEmpty()){
            return ResponseEntity.ofNullable("[]");
        }
        Product existProduct = productExist.get();
        existProduct.setTitle(dtoProduct.getTitle());
        existProduct.setPrice(dtoProduct.getPrice());
        existProduct.setImage(dtoProduct.getImage());
        existProduct.setCategory(dtoProduct.getCategory());

        repoProduct.save(existProduct);
        return ResponseEntity.ok(new GlobalResponse("ok", "success"));
    }

    public DtoResponseProduct convertToDto(Product product){
        return new DtoResponseProduct(product.getTitle(),product.getPrice(), product.getImage(),
                product.getCategory().getName(), product.getCategory().getId(), product.getId());
    }
}

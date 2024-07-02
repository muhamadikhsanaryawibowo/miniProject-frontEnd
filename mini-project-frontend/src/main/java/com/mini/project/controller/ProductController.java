package com.mini.project.controller;

import com.mini.project.dto.DtoProduct;
import com.mini.project.exception.ApiRequestException;
import com.mini.project.response.GlobalResponse;
import com.mini.project.service.ServiceProduct;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("pos/api/product")
public class ProductController {

    private final ServiceProduct product;

    public ProductController(ServiceProduct product){
        this.product = product;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> getAllProductDefault(
            @RequestParam(name = "category_id", required = false) String category,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "sort_order", required = false, defaultValue = "desc") String sortOrder,
            @RequestParam(name = "sort_by", required = false, defaultValue = "id") String sortBy
            ){
        if (category != null){
            return product.getProductByCategory(category, sortBy, sortOrder);
        }
        if (title != null){
            return product.getProductByTitle(title, sortBy, sortOrder);
        }
        return product.getAll(sortBy, sortOrder);
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity getProductById(@Validated @PathVariable ("id")String id) throws NumberFormatException{
        try {
            return product.getById(id);
        }catch (Exception e){
            throw new ApiRequestException("bad request");
        }
    }

    @PostMapping("addproduct")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity addNewProduct(@Valid @RequestBody DtoProduct dtoProduct){
        try {
            return product.addNew(dtoProduct);
        } catch (Exception e) {
            throw new ApiRequestException("bad request");
        }
    }

    @DeleteMapping("deleteproduct/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity deleteProduct(@PathVariable ("id") String id){
        try {
            return product.deleteProduct(id);
        } catch (Exception e) {
            throw new ApiRequestException("bad request");
        }
    }

    @PutMapping("updateproduct/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity updateProduct(@PathVariable("id") String id,
                                        @RequestBody DtoProduct dtoProduct){
        try {
            return product.updateProduct(id, dtoProduct);
        } catch (Exception e) {
            throw new ApiRequestException("bad request");
        }

    }
}

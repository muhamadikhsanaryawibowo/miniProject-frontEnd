package com.mini.project.controller;

import com.mini.project.dto.CategoryWithProductCount;
import com.mini.project.dto.DtoCategory;
import com.mini.project.dto.DtoProduct;
import com.mini.project.entity.Category;
import com.mini.project.exception.ApiRequestException;
import com.mini.project.response.GlobalResponse;
import com.mini.project.service.ServiceCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("pos/api/category")
public class CategoryController {

    private final ServiceCategory serviceCategory;

    @Autowired
    public CategoryController(ServiceCategory serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    @GetMapping
    public ResponseEntity getAllResp(){
        return serviceCategory.getAllResp();
    }


    @GetMapping("/categoryWithProductCount")
    public ResponseEntity<List<CategoryWithProductCount>> getCategoriesWithProductCount() {
        return serviceCategory.getCategoriesWithProductCount();
    }

    @GetMapping("/{id}")
    public ResponseEntity getCategoryById(@Validated @PathVariable ("id")String id) throws NumberFormatException{
        try {
            return serviceCategory.getById(id);
        }catch (Exception e){
            throw new ApiRequestException("bad request");
        }
    }

    @PostMapping
    public GlobalResponse addNew(@RequestBody DtoCategory dtoCategory){
        return serviceCategory.addNewCategory(dtoCategory);
    }

    @DeleteMapping("deletecategory/{id}")
    public ResponseEntity deleteCategory(@PathVariable ("id") String id){
        try {
            return serviceCategory.deleteCategory(id);
        } catch (Exception e) {
            throw new ApiRequestException("bad request");
        }
    }

    @PutMapping("updatecategory/{id}")
    public ResponseEntity updateCategory(@PathVariable("id") String id,
                                        @RequestBody DtoCategory dtoCategory){
        try {
            return serviceCategory.updateProduct(id, dtoCategory);
        } catch (Exception e) {
            throw new ApiRequestException("bad request");
        }

    }



}

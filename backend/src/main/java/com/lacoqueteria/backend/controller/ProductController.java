package com.lacoqueteria.backend.controller;

import com.lacoqueteria.backend.model.Product;
import com.lacoqueteria.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setNombre(productDetails.getNombre());
        product.setPrecio(productDetails.getPrecio());
        product.setImg(productDetails.getImg());
        product.setCategory(productDetails.getCategory());
        product.setColores(productDetails.getColores());
        product.setTallas(productDetails.getTallas());
        product.setDescription(productDetails.getDescription());
        product.setIsFeatured(productDetails.getIsFeatured());
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}

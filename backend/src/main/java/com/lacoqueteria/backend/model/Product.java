package com.lacoqueteria.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Integer precio;

    @Column(columnDefinition = "TEXT")
    private String img;

    private String category;

    @ElementCollection
    private List<String> colores;

    @ElementCollection
    private List<String> tallas;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Boolean isFeatured;
}

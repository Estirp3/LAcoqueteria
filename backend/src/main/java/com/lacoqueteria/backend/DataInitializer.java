package com.lacoqueteria.backend;

import com.lacoqueteria.backend.model.Banner;
import com.lacoqueteria.backend.model.Category;
import com.lacoqueteria.backend.model.Product;
import com.lacoqueteria.backend.repository.BannerRepository;
import com.lacoqueteria.backend.repository.CategoryRepository;
import com.lacoqueteria.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        private final CategoryRepository categoryRepository;
        private final ProductRepository productRepository;
        private final BannerRepository bannerRepository;

        public DataInitializer(CategoryRepository categoryRepository,
                        ProductRepository productRepository,
                        BannerRepository bannerRepository) {
                this.categoryRepository = categoryRepository;
                this.productRepository = productRepository;
                this.bannerRepository = bannerRepository;
        }

        @Override
        public void run(String... args) {
                // Solo inicializar si no hay datos
                if (categoryRepository.count() > 0) {
                        return;
                }

                // === CATEGORÍAS ===
                Category vestidos = new Category();
                vestidos.setNombre("VESTIDOS");
                vestidos.setImg("https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80");
                vestidos.setToPath("/vestidos");
                categoryRepository.save(vestidos);

                Category pantalones = new Category();
                pantalones.setNombre("PANTALONES");
                pantalones.setImg("https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1200&q=80");
                pantalones.setToPath("/pantalones");
                categoryRepository.save(pantalones);

                Category tops = new Category();
                tops.setNombre("TOPS");
                tops.setImg("https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80");
                tops.setToPath("/tops");
                categoryRepository.save(tops);

                Category faldas = new Category();
                faldas.setNombre("FALDAS");
                faldas.setImg("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1200&q=80");
                faldas.setToPath("/faldas");
                categoryRepository.save(faldas);

                // === BANNERS ===
                Banner banner1 = new Banner();
                banner1.setTitle("NUEVA COLECCIÓN 2024");
                banner1.setSubtitle("Elegancia minimalista para cada ocasión");
                banner1.setImage("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80");
                banner1.setLink("/nueva-coleccion");
                banner1.setButtonText("VER COLECCIÓN");
                bannerRepository.save(banner1);

                Banner banner2 = new Banner();
                banner2.setTitle("VESTIDOS DE VERANO");
                banner2.setSubtitle("Frescura y estilo para esta temporada");
                banner2.setImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=2000&q=80");
                banner2.setLink("/vestidos");
                banner2.setButtonText("COMPRAR AHORA");
                bannerRepository.save(banner2);

                Banner banner3 = new Banner();
                banner3.setTitle("ESTILO URBANO");
                banner3.setSubtitle("Prendas versátiles para tu día a día");
                banner3.setImage("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=80");
                banner3.setLink("/tops");
                banner3.setButtonText("DESCUBRIR");
                bannerRepository.save(banner3);

                // === PRODUCTOS - VESTIDOS ===
                createProduct("Vestido Lino Midi", 45990,
                                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
                                "VESTIDOS", Arrays.asList("NEGRO", "BLANCO", "BEIGE"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Vestido midi de lino con corte recto y cinturón ajustable. Perfecto para ocasiones casuales y elegantes.",
                                true);

                createProduct("Vestido Satén Negro", 59990,
                                "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
                                "VESTIDOS", Arrays.asList("NEGRO"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Vestido de satén con caída fluida y escote en V. Ideal para eventos nocturnos.",
                                true);

                createProduct("Vestido Camisero Blanco", 39990,
                                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
                                "VESTIDOS", Arrays.asList("BLANCO", "AZUL"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Vestido camisero clásico con botones frontales y cinturón. Versátil y atemporal.",
                                false);

                createProduct("Vestido Maxi Floral", 52990,
                                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
                                "VESTIDOS", Arrays.asList("VERDE", "ROSA"),
                                Arrays.asList("S", "M", "L"),
                                "Vestido largo con estampado floral delicado y manga corta. Perfecto para verano.",
                                true);

                createProduct("Vestido Wrap Terracota", 48990,
                                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
                                "VESTIDOS", Arrays.asList("TERRACOTA", "NEGRO"),
                                Arrays.asList("XS", "S", "M", "L", "XL"),
                                "Vestido cruzado con lazo lateral y manga 3/4. Favorecedor y elegante.",
                                false);

                // === PRODUCTOS - PANTALONES ===
                createProduct("Pantalón Wide Leg Beige", 42990,
                                "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
                                "PANTALONES", Arrays.asList("BEIGE", "NEGRO", "GRIS"),
                                Arrays.asList("XS", "S", "M", "L", "XL"),
                                "Pantalón de pierna ancha con cintura alta y bolsillos laterales. Comodidad y estilo.",
                                true);

                createProduct("Pantalón Palazzo Negro", 38990,
                                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
                                "PANTALONES", Arrays.asList("NEGRO", "AZUL MARINO"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Pantalón palazzo fluido con caída elegante. Ideal para oficina y eventos.",
                                true);

                createProduct("Jeans Mom Fit", 35990,
                                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
                                "PANTALONES", Arrays.asList("AZUL DENIM", "NEGRO"),
                                Arrays.asList("XS", "S", "M", "L", "XL"),
                                "Jeans de corte mom con cintura alta y lavado vintage. Clásico renovado.",
                                false);

                createProduct("Pantalón Cargo Verde", 44990,
                                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
                                "PANTALONES", Arrays.asList("VERDE OLIVA", "BEIGE"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Pantalón cargo con múltiples bolsillos y ajuste relajado. Tendencia urbana.",
                                false);

                // === PRODUCTOS - TOPS ===
                createProduct("Blusa Seda Blanca", 32990,
                                "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
                                "TOPS", Arrays.asList("BLANCO", "NEGRO", "BEIGE"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Blusa de seda con cuello en V y manga larga. Sofisticación pura.",
                                true);

                createProduct("Top Crop Ribbed", 19990,
                                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
                                "TOPS", Arrays.asList("NEGRO", "BLANCO", "GRIS"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Top corto de punto acanalado con cuello redondo. Básico esencial.",
                                false);

                createProduct("Camisa Oversize Rayas", 36990,
                                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
                                "TOPS", Arrays.asList("BLANCO/AZUL", "BLANCO/NEGRO"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Camisa oversize con estampado de rayas y bolsillo frontal. Estilo relajado.",
                                true);

                createProduct("Top Halter Negro", 28990,
                                "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80",
                                "TOPS", Arrays.asList("NEGRO", "BLANCO"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Top halter con escote pronunciado y espalda descubierta. Para ocasiones especiales.",
                                false);

                createProduct("Suéter Cuello Alto Camel", 41990,
                                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
                                "TOPS", Arrays.asList("CAMEL", "GRIS", "NEGRO"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Suéter de punto fino con cuello alto y ajuste regular. Calidez y elegancia.",
                                true);

                // === PRODUCTOS - FALDAS ===
                createProduct("Falda Midi Plisada", 37990,
                                "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
                                "FALDAS", Arrays.asList("NEGRO", "BEIGE", "VERDE"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Falda midi plisada con cintura elástica y caída fluida. Femenina y versátil.",
                                true);

                createProduct("Falda Lápiz Negra", 34990,
                                "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
                                "FALDAS", Arrays.asList("NEGRO", "GRIS OSCURO"),
                                Arrays.asList("XS", "S", "M", "L", "XL"),
                                "Falda lápiz de corte recto con abertura trasera. Elegancia corporativa.",
                                false);

                createProduct("Falda Denim Mini", 29990,
                                "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
                                "FALDAS", Arrays.asList("AZUL DENIM", "NEGRO"),
                                Arrays.asList("XS", "S", "M", "L"),
                                "Minifalda de denim con botones frontales y bolsillos. Casual y juvenil.",
                                false);

                createProduct("Falda Maxi Satén", 46990,
                                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
                                "FALDAS", Arrays.asList("CHAMPAGNE", "NEGRO"),
                                Arrays.asList("S", "M", "L", "XL"),
                                "Falda larga de satén con cintura alta y caída elegante. Para eventos especiales.",
                                true);

                System.out.println("✅ Base de datos inicializada con productos de moda profesionales");
        }

        private void createProduct(String nombre, int precio, String img, String category,
                        List<String> colores, List<String> tallas, String description, boolean isFeatured) {
                Product product = new Product();
                product.setNombre(nombre);
                product.setPrecio(precio);
                product.setImg(img);
                product.setCategory(category);
                product.setColores(colores);
                product.setTallas(tallas);
                product.setDescription(description);
                product.setIsFeatured(isFeatured);
                productRepository.save(product);
        }
}

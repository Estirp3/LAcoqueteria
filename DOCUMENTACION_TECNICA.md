# Documentación Técnica - La Coquetería

## 1. Descripción del Proyecto
La Coquetería es una plataforma de e-commerce moderna y elegante diseñada para la venta de moda femenina. El proyecto utiliza una arquitectura separada (Frontend y Backend) para garantizar escalabilidad y mantenibilidad.

## 2. Stack Tecnológico

### Frontend
- **Framework:** React + Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + Variables CSS Nativas (Theming)
- **Iconos:** Lucide React
- **Routing:** React Router DOM

### Backend
- **Framework:** Spring Boot (Java)
- **Base de Datos:** H2 Database (En memoria para desarrollo) / MySQL (Producción)
- **Persistencia:** JPA / Hibernate
- **API:** RESTful

## 3. Arquitectura del Frontend

### 3.1 Sistema de Temas (Nuevo ✨)
Hemos implementado un sistema de temas dinámico y robusto que permite cambiar la apariencia de toda la tienda en tiempo real sin recargar la página.

- **`src/components/ThemeController.tsx`**: Componente invisible que se monta en `main.tsx`. Escucha cambios en `localStorage` y aplica las variables CSS al `body` y `:root`. Garantiza que el tema persista entre recargas.
- **`src/components/admin/AdminThemeManager.tsx`**: Panel de control para seleccionar temas. Incluye 5 paletas predefinidas (Original, Modo Oscuro, Rosa Coquette, Azul Medianoche, Salvia).
- **`src/index.css`**: Define las variables CSS base y utiliza reglas "inteligentes" para adaptar las clases de utilidad de Tailwind (`bg-white`, `text-black`) a las variables del tema (`--color-bg-secondary`, `--color-text-primary`).

**Variables Principales:**
- `--color-bg-primary`: Fondo principal de la página.
- `--color-bg-secondary`: Fondo de tarjetas y headers.
- `--color-text-primary`: Color de texto principal.
- `--color-text-secondary`: Color de texto secundario.
- `--color-accent`: Color de acento (dorado, rosa, etc.).
- `--color-button-bg`: Color de fondo para botones de acción.

### 3.2 Componentes Clave
- **`Header.tsx`**: Navbar responsivo y compacto (55px-65px). Se oculta automáticamente al hacer scroll hacia abajo para maximizar el espacio de visualización.
- **`ProductFilters.tsx`**: Sistema de filtrado simplificado. Elimina filtros complejos de precio y ordenamiento, enfocándose en Búsqueda Inteligente (por palabras clave), Color y Talla.
- **`Home.tsx`**: Página de inicio rediseñada con secciones compactas: Hero Slider, Categorías, Nueva Colección y Valores de Marca.

## 4. Arquitectura del Backend

### 4.1 Entidades Principales
- **Product**: Representa una prenda de ropa (nombre, precio, categoría, imágenes, tallas, colores).
- **Category**: Categorías de productos (Vestidos, Blusas, Pantalones).
- **Banner (Nuevo ✨)**: Imágenes promocionales para el carrusel principal. Permite gestión dinámica desde el admin.

### 4.2 Controladores
- `ProductController`: Gestión CRUD de productos.
- `CategoryController`: Gestión de categorías.
- `BannerController`: Gestión de banners del carrusel.

## 5. Base de Datos
El proyecto utiliza `H2 Database` para desarrollo rápido.
- **Consola H2**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:file:./data/lacoqueteria_db`
- **Usuario**: `sa`
- **Password**: (vacío)

## 6. Instalación y Ejecución

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 7. Estructura de Directorios
```
/
├── backend/            # Código fuente Java/Spring Boot
│   ├── src/main/java/com/lacoqueteria/backend/
│   │   ├── controller/ # Controladores REST
│   │   ├── model/      # Entidades JPA
│   │   ├── repository/ # Repositorios
│   │   └── service/    # Lógica de negocio
│   └── data/           # Archivos de base de datos (gitignored)
│
├── src/                # Código fuente React
│   ├── components/     # Componentes reutilizables (Header, Footer, Cards)
│   │   └── admin/      # Componentes del panel de administración
│   ├── context/        # Contexto global (DataContext)
│   ├── pages/          # Páginas principales (Home, Category, Admin)
│   └── assets/         # Imágenes y recursos estáticos
```

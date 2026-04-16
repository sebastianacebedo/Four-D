package com.fourd;

import java.util.Arrays;
import java.util.List;

/**
 * Hard-coded product catalogue — mirrors the original seed.py data
 * plus additional items to fill the portfolio grid.
 */
public class ProductCatalogue {

    public static List<Product> getProducts() {
        return Arrays.asList(

            new Product(1,
                "Executive Leather Chair",
                "seating",
                "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
                "High-back executive chair upholstered in full-grain leather with adjustable "
                + "lumbar support and polished aluminum base.",
                "70W \u00d7 65D \u00d7 115\u2013125H cm",
                "Full-grain leather, solid steel frame, PU foam",
                true),

            new Product(2,
                "Ergonomic Task Chair",
                "seating",
                "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
                "Breathable mesh back task chair with fully adjustable armrests, seat depth, "
                + "and tilt tension for all-day comfort.",
                "65W \u00d7 60D \u00d7 100\u2013112H cm",
                "Mesh fabric, nylon frame, chrome-finish base",
                true),

            new Product(3,
                "Executive L-Shape Desk",
                "desking",
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
                "Spacious L-shaped executive desk with cable management, a floating return, "
                + "and solid hardwood top in custom finish.",
                "180 \u00d7 90 + 120 \u00d7 60 cm; H: 76 cm",
                "Solid Narra wood, steel frame, lacquer finish",
                true),

            new Product(4,
                "Standing Desk Pro",
                "desking",
                "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
                "Electric height-adjustable standing desk with memory presets, cable tray, "
                + "and anti-collision sensor for seamless transitions.",
                "160W \u00d7 80D cm; H: 62\u2013128 cm",
                "Bamboo top, steel frame, dual-motor lift",
                true),

            new Product(5,
                "Floor-to-Ceiling Shelving Wall",
                "storage",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                "Built-in shelving system with adjustable shelves, integrated lighting, "
                + "and sliding wood panels for a clean, minimal look.",
                "Custom width; D: 35 cm; H: up to 300 cm",
                "Solid wood, MDF panels, integrated LED strip lighting",
                true),

            new Product(6,
                "Mobile Pedestal Cabinet",
                "storage",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                "Rolling under-desk pedestal with two drawers and a file drawer. "
                + "Lockable, with soft-close mechanism and matching desk finish.",
                "40W \u00d7 52D \u00d7 60H cm",
                "Engineered wood, metal drawer glides, ABS edging",
                true),

            new Product(7,
                "Conference Table \u2014 8 Seater",
                "desking",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
                "Solid-top conference table with integrated power and data ports, "
                + "cable management spine, and solid wood legs.",
                "240W \u00d7 110D \u00d7 76H cm",
                "Solid Acacia veneer top, powder-coated steel legs",
                true),

            new Product(8,
                "Mesh Visitor Chair",
                "seating",
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
                "Stackable mesh visitor chair with contoured back support, padded seat, "
                + "and chrome sled base \u2014 ideal for reception areas.",
                "55W \u00d7 58D \u00d7 85H cm",
                "Mesh back, foam seat, chrome sled base",
                false),

            new Product(9,
                "Lateral Filing Cabinet",
                "storage",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
                "Wide lateral file cabinet accommodating letter and legal-size files. "
                + "Full-extension drawers with central lock and label holders.",
                "90W \u00d7 45D \u00d7 72H cm",
                "Cold-rolled steel, powder-coat finish, ABS pulls",
                true)
        );
    }
}

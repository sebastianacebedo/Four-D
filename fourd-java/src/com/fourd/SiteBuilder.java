package com.fourd;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

/**
 * Four-D Furniture Manufacturing — Static Site Generator (Java)
 *
 * Compiling:
 *   javac -d out src/com/fourd/*.java
 *
 * Running:
 *   java -cp out com.fourd.SiteBuilder
 *
 * Output: ./output/  (index.html, portfolio.html, appointment.html, inquiry.html, style.css, script.js)
 */
public class SiteBuilder {

    public static void main(String[] args) throws IOException {
        System.out.println("\nBuilding Four-D Furniture static site (Java)...\n");

        Path outputDir = Paths.get("output");
        Files.createDirectories(outputDir);

        // Seed the product catalogue
        List<Product> products = ProductCatalogue.getProducts();

        // Generate each page
        PageGenerator gen = new PageGenerator(products);

        writeFile(outputDir.resolve("index.html"),       gen.buildIndex());
        writeFile(outputDir.resolve("portfolio.html"),   gen.buildPortfolio());
        writeFile(outputDir.resolve("appointment.html"), gen.buildAppointment());
        writeFile(outputDir.resolve("inquiry.html"),     gen.buildInquiry());
        writeFile(outputDir.resolve("style.css"),        Assets.CSS);
        writeFile(outputDir.resolve("script.js"),        Assets.JS);

        System.out.println("\n  Build complete! 4 HTML pages + style.css + script.js");
        System.out.println("  Output directory: " + outputDir.toAbsolutePath());
        System.out.println("  Open output/index.html in your browser to view the site.\n");
    }

    private static void writeFile(Path path, String content) throws IOException {
        Files.writeString(path, content);
        System.out.printf("  ✓ Generated %s  (%,d chars)%n",
                path.getFileName(), content.length());
    }
}

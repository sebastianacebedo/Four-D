package com.fourd;

/**
 * Represents a single furniture product in the catalogue.
 */
public class Product {

    private final int     id;
    private final String  title;
    private final String  category;   // "seating" | "desking" | "storage"
    private final String  imgUrl;
    private final String  description;
    private final String  dimension;
    private final String  material;
    private final boolean available;

    public Product(int id, String title, String category,
                   String imgUrl, String description,
                   String dimension, String material, boolean available) {
        this.id          = id;
        this.title       = title;
        this.category    = category;
        this.imgUrl      = imgUrl;
        this.description = description;
        this.dimension   = dimension;
        this.material    = material;
        this.available   = available;
    }

    public int     getId()          { return id; }
    public String  getTitle()       { return title; }
    public String  getCategory()    { return category; }
    public String  getImgUrl()      { return imgUrl; }
    public String  getDescription() { return description; }
    public String  getDimension()   { return dimension; }
    public String  getMaterial()    { return material; }
    public boolean isAvailable()    { return available; }

    /** Returns the category with the first letter capitalised. */
    public String getCategoryLabel() {
        if (category == null || category.isEmpty()) return "";
        return Character.toUpperCase(category.charAt(0)) + category.substring(1);
    }

    /** URL-encodes spaces in the title for use in href query strings. */
    public String getTitleEncoded() {
        return title.replace(" ", "%20");
    }
}

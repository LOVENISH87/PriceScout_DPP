# Data Flow Documentation

This document explains how data flows from the Database (MongoDB Atlas) to the Frontend (React Client) in `PriceScout`.

## High-Level Architecture

DATA FLOW:
[MongoDB Atlas Cloud]  <-- (Internet) -->  [Backend Server (Node/Express)]  <-- (HTTP/REST) -->  [Frontend Client (React)]

---

## 1. MongoDB Atlas (Database Layer)
*   **What is it?**: A cloud-hosted NoSQL database.
*   **Location**: `pricescout.rshmocx.mongodb.net` (Cloud)
*   **Database Name**: `priceScout`
*   **Collections**:
    *   `products`: Stores product details (name, price, brand, image, shopRef).
    *   `shops`: Stores shop details (name, location).

## 2. Backend Server (API Layer)
*   **Technology**: Node.js + Express + Mongoose
*   **Config**: 
    *   Connects to Atlas using `MONGO_URI` in `.env`. (Note: Currently set to local `test1` for development, but code supports Atlas).
    *   Runs on port `4800`.
*   **Models** (`src/models/`):
    *   `Product.js`: Defines the schema (structure) for products.
    *   `Shop.js`: Defines the schema for shops.
*   **Controllers** (`src/controllers/`):
    *   `product.controller.js`: Logic to fetch data from DB (e.g., `Product.find()`).
*   **Routes** (`src/routes/`):
    *   `GET /api/products`: Calls controller to return all products.
    *   `GET /api/shops`: Calls controller to return all shops.

## 3. Frontend Client (Presentation Layer)
*   **Technology**: React + Vite + TailwindCSS
*   **API Service** (`client/src/api/`):
    *   `axiosInstance.js`: Sets up the base URL (`http://localhost:4800/api`).
    *   `products.api.js`: Functions like `fetchProducts()` that send HTTP GET requests to the backend.
    *   `shops.api.js`: Functions like `fetchShops()` that send HTTP GET requests to the backend.
*   **Custom Hooks** (`client/src/hooks/`):
    *   `useFetchProducts.js`: Calls `fetchProducts()` and manages `loading`, `error`, and `data` states.
    *   `useFetchShops.js`: Calls `fetchShops()` and manages shop data.
*   **Components**:
    *   `Home.jsx`:
        1.  Calls `useFetchProducts()` when the page loads.
        2.  Receives the array of products.
        3.  Maps over the array and renders a `<ProductCard />` for each item.

## Summary of the "Flow"
1.  **User opens website.**
2.  `Home.jsx` mounts and executes `useFetchProducts`.
3.  `useFetchProducts` calls `fetchProducts` (API helper).
4.  Browser looks up `http://localhost:4800/api/products`.
5.  **Backend Server** receives request at `/api/products`.
6.  **Backend** executes `Product.find()` via Mongoose.
7.  **Mongoose** sends query to **MongoDB Atlas**.
8.  **MongoDB Atlas** returns JSON documents (Products).
9.  **Backend** sends JSON back to Browser.
10. **React** updates state with new data.
11. **User sees products on screen.**

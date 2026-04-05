import React, { createContext, useState, useCallback } from 'react';

export const ProductContext = createContext();

// Sample products data
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', rating: 4.5, image: '💻' },
  { id: 2, name: 'Smartphone', price: 699, category: 'Electronics', rating: 4.8, image: '📱' },
  { id: 3, name: 'Headphones', price: 199, category: 'Electronics', rating: 4.2, image: '🎧' },
  { id: 4, name: 'Tablet', price: 449, category: 'Electronics', rating: 4.6, image: '📱' },
  { id: 5, name: 'Watch', price: 299, category: 'Accessories', rating: 4.3, image: '⌚' },
  { id: 6, name: 'Camera', price: 1299, category: 'Electronics', rating: 4.7, image: '📷' },
  { id: 7, name: 'Speaker', price: 149, category: 'Electronics', rating: 4.1, image: '🔊' },
  { id: 8, name: 'Power Bank', price: 49, category: 'Accessories', rating: 4.4, image: '🔋' },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'priceAsc', 'priceDesc'
  const [loading, setLoading] = useState(false);

  // Simulate fetching products
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setFilteredProducts(INITIAL_PRODUCTS);
      setLoading(false);
    }, 1000);
  }, []);

  // Search and filter products
  const searchProducts = useCallback((query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
    applySort(filtered);
  }, [products]);

  // Sort products
  const applySort = useCallback((productsToSort) => {
    let sorted = [...productsToSort];
    if (sortBy === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  }, [sortBy]);

  const setSortOption = useCallback((option) => {
    setSortBy(option);
    applySort(filteredProducts);
  }, [filteredProducts, applySort]);

  // Pull to refresh
  const refreshProducts = useCallback(() => {
    fetchProducts();
    setSearchQuery('');
  }, [fetchProducts]);

  const value = {
    products: filteredProducts,
    allProducts: products,
    searchQuery,
    sortBy,
    loading,
    searchProducts,
    setSortOption,
    refreshProducts,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

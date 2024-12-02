import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Product[]>([]);

  const addToFavorites = (product: Product) => {
    if (!favorites.value.some(item => item.id === product.id)) {
      favorites.value.push(product);
    }
  };

  const removeFromFavorites = (productId: number) => {
    favorites.value = favorites.value.filter(item => item.id !== productId);
  };

  const isFavorite = (productId: number) => {
    return favorites.value.some(item => item.id === productId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
});
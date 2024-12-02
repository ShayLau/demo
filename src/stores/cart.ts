import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  selected: boolean;
  selectedSpecs?: Record<string, string>;
}

export const useCartStore = defineStore('cart', {
  state: () => {
    const storedItems = localStorage.getItem('cart');
    return {
      items: storedItems ? JSON.parse(storedItems) : [],
    };
  },

  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    selectedItems: (state) => state.items.filter(item => item.selected),
  },

  actions: {
    addToCart(product: Omit<CartItem, 'selected'>) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity;
        if (existingItem.quantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        }
      } else {
        this.items.push({
          ...product,
          selected: true,
        });
      }
      
      this.saveToStorage();
    },

    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToStorage();
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToStorage();
      }
    },

    updateSelection() {
      this.saveToStorage();
    },

    toggleSelectAll(selected: boolean) {
      this.items.forEach(item => item.selected = selected);
      this.saveToStorage();
    },

    removeSelected() {
      this.items = this.items.filter(item => !item.selected);
      this.saveToStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToStorage();
    },

    // 持久化存储
    saveToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    loadFromStorage() {
      const stored = localStorage.getItem('cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
    },
  },
});
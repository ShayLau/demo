<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold text-gray-800">
        优品商城
      </router-link>
      
      <div class="flex items-center space-x-6">
        <nav-menu />
        <router-link to="/cart" class="relative">
          <el-badge :value="cartItemCount" :max="99" class="item">
            <el-icon :size="24"><ShoppingCart /></el-icon>
          </el-badge>
        </router-link>
        <user-menu />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NavMenu from './NavMenu.vue';
import UserMenu from './UserMenu.vue';
import { ShoppingCart } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.totalCount);
</script>
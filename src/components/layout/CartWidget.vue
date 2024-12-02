<template>
  <div class="relative">
    <el-badge :value="itemCount" :hidden="itemCount === 0">
      <el-button
        circle
        @click="navigateToCart"
      >
        <el-icon><ShoppingCart /></el-icon>
      </el-button>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { ShoppingCart } from '@element-plus/icons-vue';

const router = useRouter();
const cartStore = useCartStore();

const itemCount = computed(() => cartStore.items.length);

const navigateToCart = () => {
  router.push('/cart');
};
</script>
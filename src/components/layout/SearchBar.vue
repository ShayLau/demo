<template>
  <div class="relative">
    <el-input
      v-model="searchQuery"
      placeholder="搜索商品..."
      class="w-64"
      :prefix-icon="Search"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'products',
      query: { q: searchQuery.value }
    });
  }
};
</script>
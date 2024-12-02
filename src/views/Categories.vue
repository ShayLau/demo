<template>
  <div class="categories-page">
    <h1 class="text-3xl font-bold mb-8 text-center">商品分类</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <router-link :to="`/products?category=${category.id}`">
          <div class="relative group">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-48 object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
          </div>
          
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ category.name }}</h2>
            <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>
            <el-button type="primary" class="w-full">
              浏览商品
            </el-button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
  // 这里应该是一个API调用，现在我们用模拟数据
  categories.value = [
    {
      id: 1,
      name: '手机数码',
      description: '最新智能手机、平板电脑、智能穿戴设备等',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
    },
    {
      id: 2,
      name: '家用电器',
      description: '智能家电、厨房电器、生活电器等',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80'
    },
    {
      id: 3,
      name: '电脑办公',
      description: '笔记本电脑、台式机、办公设备等',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 4,
      name: '服装配饰',
      description: '男女服装、鞋靴、箱包、珠宝配饰等',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 5,
      name: '美妆护肤',
      description: '化妆品、护肤品、香水、个人护理等',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    },
    {
      id: 6,
      name: '食品生鲜',
      description: '零食、饮料、生鲜、粮油等',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    }
  ];
};

onMounted(() => {
  fetchCategories();
});
</script> 
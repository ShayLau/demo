<template>
  <div class="home">
    <section class="hero bg-gray-100 py-16">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">欢迎来到优品商城</h1>
        <p class="text-xl mb-8">发现优质商品，享受购物乐趣</p>
        <el-button type="primary" size="large" @click="$router.push('/products')">
          立即购物
        </el-button>
      </div>
    </section>

    <section class="featured-products py-16">
      <div class="container mx-auto">
        <h2 class="text-3xl font-semibold mb-8 text-center">热门商品</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 这里可以循环展示一些热门商品 -->
          <div v-for="product in featuredProducts" :key="product.id" class="bg-white shadow rounded-lg overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-red-600">¥{{ product.price }}</span>
                <el-button type="primary" size="small" @click="$router.push(`/products/${product.id}`)">
                  查看详情
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const featuredProducts = ref([
  {
    id: 1,
    name: '高品质耳机',
    description: '享受极致音质体验',
    price: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    name: '智能手表',
    description: '时尚与科技的完美结合',
    price: 799,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80'
  },
  {
    id: 3,
    name: '便携式蓝牙音箱',
    description: '随时随地享受音乐',
    price: 199,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
]);
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
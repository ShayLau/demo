<template>
  <div class="favorites-page">
    <h1 class="text-2xl font-bold mb-6">我的收藏</h1>

    <!-- 收藏为空时显示 -->
    <el-empty
      v-if="!favorites.length"
      description="还没有收藏任何商品"
    >
      <el-button type="primary" @click="$router.push('/products')">
        去逛逛
      </el-button>
    </el-empty>

    <!-- 收藏列表 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- 商品图片 -->
        <div class="relative group">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-48 object-cover"
          >
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
        </div>

        <!-- 商品信息 -->
        <div class="p-4">
          <router-link :to="`/products/${item.id}`">
            <h3 class="text-lg font-medium mb-2 hover:text-blue-600 line-clamp-1">
              {{ item.name }}
            </h3>
          </router-link>
          
          <p class="text-gray-500 text-sm mb-3 line-clamp-2">
            {{ item.description }}
          </p>

          <div class="flex items-center justify-between">
            <span class="text-red-600 text-lg font-bold">
              ¥{{ item.price.toFixed(2) }}
            </span>
            <div class="space-x-2">
              <el-button
                type="primary"
                size="small"
                @click="addToCart(item)"
              >
                加入购物车
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="removeFavorite(item)"
              >
                取消收藏
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-6 flex justify-center" v-if="favorites.length">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[12, 24, 36]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

// 分页相关
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);

// 模拟收藏数据
const favorites = ref([
  {
    id: 1,
    name: '高品质无线耳机',
    description: '蓝牙5.0，40小时续航，主动降噪',
    price: 999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    stock: 100
  },
  {
    id: 2,
    name: '智能手表',
    description: '心率监测，运动追踪，防水设计',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    stock: 50
  },
  // 可以添加更多收藏商品...
]);

// 获取收藏列表
const fetchFavorites = () => {
  // 实际项目中这里会调用API
  total.value = favorites.value.length;
};

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchFavorites();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchFavorites();
};

// 加入购物车
const addToCart = (item: any) => {
  cartStore.addToCart({
    ...item,
    quantity: 1,
  });
  ElMessage.success('已加入购物车');
};

// 取消收藏
const removeFavorite = async (item: any) => {
  // 实际项目中这里会调用API
  favorites.value = favorites.value.filter(f => f.id !== item.id);
  total.value = favorites.value.length;
  ElMessage.success('已取消收藏');
};

onMounted(() => {
  fetchFavorites();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
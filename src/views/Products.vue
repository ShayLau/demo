<template>
  <div class="products-page">
    <!-- 搜索和筛选区域 -->
    <div class="bg-white p-4 mb-6 rounded-lg shadow">
      <div class="search-bar flex items-center space-x-4">
        <el-input
          v-model="searchForm.keyword"
          placeholder="搜索商品"
          class="w-64"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <el-select v-model="searchForm.category" placeholder="商品分类" class="w-32">
          <el-option label="全部分类" value="" />
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          />
        </el-select>

        <el-select v-model="searchForm.sort" placeholder="排序方式" class="w-32">
          <el-option label="默认排序" value="" />
          <el-option label="价格从低到高" value="price-asc" />
          <el-option label="价格从高到低" value="price-desc" />
          <el-option label="最新上架" value="newest" />
        </el-select>

        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative group">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
        </div>
        
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2 line-clamp-1">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
          
          <div class="flex items-center justify-between">
            <span class="text-red-600 font-bold">¥{{ product.price.toFixed(2) }}</span>
            <div class="flex space-x-2">
              <el-button
                type="primary"
                size="small"
                @click="addToCart(product)"
              >
                加入购物车
              </el-button>
              <el-button
                :type="product.isFavorite ? 'danger' : 'default'"
                size="small"
                @click="toggleFavorite(product)"
              >
                <el-icon><Star /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-8 flex justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[12, 24, 36, 48]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Search, Star } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

// 搜索表单
const searchForm = reactive({
  keyword: '',
  category: '',
  sort: '',
});

// 分类数据
const categories = [
  { label: '手机数码', value: 'digital' },
  { label: '家用电器', value: 'appliance' },
  { label: '电脑办公', value: 'computer' },
  { label: '服装配饰', value: 'clothing' },
];

// 分页相关
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(100);

// 模拟商品数据
const products = ref([
  {
    id: 1,
    name: '高品质无线耳机',
    description: '蓝牙5.0，40小时续航，主动降噪，高清音质，舒适佩戴。',
    price: 999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    isFavorite: false,
  },
  // ... 更多商品数据
]);

// 搜索处理
const handleSearch = () => {
  // 实际项目中这里会调用API
  ElMessage.success('搜索条件已更新');
};

const resetSearch = () => {
  searchForm.keyword = '';
  searchForm.category = '';
  searchForm.sort = '';
  handleSearch();
};

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchProducts();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchProducts();
};

// 获取商品数据
const fetchProducts = () => {
  // 实际项目中这里会调用API
  console.log('Fetching products...');
};

// 添加到购物车
const addToCart = (product: any) => {
  cartStore.addToCart({
    ...product,
    quantity: 1,
  });
  ElMessage.success('已添加到购物车');
};

// 收藏切换
const toggleFavorite = (product: any) => {
  product.isFavorite = !product.isFavorite;
  ElMessage.success(product.isFavorite ? '已添加到收藏' : '已取消收藏');
};

onMounted(() => {
  fetchProducts();
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
<template>
  <div class="product-detail">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="mb-6">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/products' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 商品图片展示 -->
        <div class="product-images">
          <el-carousel trigger="click" height="400px" class="rounded-lg overflow-hidden">
            <el-carousel-item v-for="(image, index) in product.images" :key="index">
              <img :src="image" :alt="product.name" class="w-full h-full object-cover">
            </el-carousel-item>
          </el-carousel>
          
          <!-- 缩略图 -->
          <div class="flex mt-4 space-x-2">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2"
              :class="{ 'border-blue-500': currentImageIndex === index }"
              @click="currentImageIndex = index"
            >
              <img :src="image" :alt="product.name" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
          
          <div class="price-section mb-6">
            <div class="text-red-600 text-3xl font-bold mb-2">
              ¥{{ product.price.toFixed(2) }}
            </div>
            <div class="text-gray-500 line-through">
              原价：¥{{ product.originalPrice.toFixed(2) }}
            </div>
          </div>

          <!-- 商品规格选择 -->
          <div class="specs-section mb-6">
            <div v-for="(spec, key) in product.specs" :key="key" class="mb-4">
              <div class="text-gray-700 mb-2">{{ spec.name }}</div>
              <el-radio-group v-model="selectedSpecs[key]">
                <el-radio-button 
                  v-for="option in spec.options"
                  :key="option"
                  :label="option"
                >
                  {{ option }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <!-- 数量选择 -->
          <div class="quantity-section mb-6">
            <div class="text-gray-700 mb-2">数量</div>
            <el-input-number 
              v-model="quantity"
              :min="1"
              :max="product.stock"
              @change="handleQuantityChange"
            />
            <span class="ml-2 text-gray-500">库存: {{ product.stock }}件</span>
          </div>

          <!-- 操作按钮 -->
          <div class="actions-section flex space-x-4">
            <el-button
              type="primary"
              size="large"
              class="flex-1"
              @click="handleBuyNow"
            >
              立即购买
            </el-button>
            
            <el-button
              type="warning"
              size="large"
              class="flex-1"
              @click="handleAddToCart"
            >
              加入购物车
            </el-button>
            
            <el-button
              :type="product.isFavorite ? 'danger' : 'default'"
              size="large"
              @click="toggleFavorite"
            >
              <el-icon><Star /></el-icon>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 商品详情 -->
      <div class="product-details mt-8">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="商品详情" name="details">
            <div class="rich-text-content" v-html="product.description"></div>
          </el-tab-pane>
          
          <el-tab-pane label="规格参数" name="specs">
            <el-descriptions :column="2" border>
              <el-descriptions-item 
                v-for="(value, key) in product.parameters"
                :key="key"
                :label="key"
              >
                {{ value }}
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          
          <el-tab-pane label="用户评价" name="reviews">
            <div class="reviews-list space-y-4">
              <div v-for="review in product.reviews" :key="review.id" class="p-4 border-b">
                <div class="flex items-center mb-2">
                  <el-avatar :size="32" :src="review.userAvatar" />
                  <span class="ml-2">{{ review.userName }}</span>
                  <el-rate
                    v-model="review.rating"
                    disabled
                    class="ml-4"
                  />
                </div>
                <p class="text-gray-600">{{ review.content }}</p>
                <div class="text-gray-400 text-sm mt-2">
                  {{ review.createdAt }}
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Star } from '@element-plus/icons-vue';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const currentImageIndex = ref(0);
const quantity = ref(1);
const activeTab = ref('details');
const selectedSpecs = reactive({});

// 模拟商品数据
const product = ref({
  id: 1,
  name: '高品质无线耳机',
  price: 999,
  originalPrice: 1299,
  stock: 100,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
  ],
  specs: {
    color: {
      name: '颜色',
      options: ['黑色', '白色', '蓝色'],
    },
    size: {
      name: '尺寸',
      options: ['标准版', '豪华版'],
    },
  },
  description: `
    <h3>产品特点</h3>
    <ul>
      <li>蓝牙5.0技术</li>
      <li>主动降噪</li>
      <li>40小时续航</li>
      <li>高清音质</li>
    </ul>
  `,
  parameters: {
    '蓝牙版本': '5.0',
    '续航时间': '40小时',
    '充电时间': '2小时',
    '防水等级': 'IPX4',
  },
  reviews: [
    {
      id: 1,
      userName: '张三',
      userAvatar: '',
      rating: 5,
      content: '音质非常好，续航也很给力！',
      createdAt: '2024-01-20',
    },
  ],
  isFavorite: false,
});

const handleQuantityChange = (value: number) => {
  if (value > product.value.stock) {
    quantity.value = product.value.stock;
    ElMessage.warning('已超出库存数量');
  }
};

const handleAddToCart = () => {
  cartStore.addToCart({
    ...product.value,
    quantity: quantity.value,
    selectedSpecs: { ...selectedSpecs },
  });
  ElMessage.success('已添加到购物车');
};

const handleBuyNow = () => {
  handleAddToCart();
  router.push('/cart');
};

const toggleFavorite = () => {
  product.value.isFavorite = !product.value.isFavorite;
  ElMessage.success(product.value.isFavorite ? '已添加到收藏' : '已取消收藏');
};

onMounted(() => {
  // 实际项目中这里会根据路由参数获取商品详情
  const productId = route.params.id;
  console.log('Loading product:', productId);
});
</script>

<style scoped>
.rich-text-content {
  @apply max-w-none;
}

.rich-text-content h3 {
  @apply text-xl font-bold mb-4;
}

.rich-text-content ul {
  @apply list-disc pl-6 mb-4;
}

.rich-text-content li {
  @apply mb-2;
}
</style>
<template>
  <div class="cart-page">
    <h1 class="text-2xl font-bold mb-6">购物车</h1>

    <!-- 购物车为空时显示 -->
    <el-empty
      v-if="!cartItems.length"
      description="购物车还是空的"
    >
      <el-button type="primary" @click="$router.push('/products')">
        去购物
      </el-button>
    </el-empty>

    <!-- 购物车有商品时显示 -->
    <template v-else>
      <div class="bg-white rounded-lg shadow">
        <!-- 表头 -->
        <div class="grid grid-cols-12 gap-4 p-4 border-b text-gray-500 text-sm">
          <div class="col-span-6">商品信息</div>
          <div class="col-span-2 text-center">单价</div>
          <div class="col-span-2 text-center">数量</div>
          <div class="col-span-1 text-center">小计</div>
          <div class="col-span-1 text-center">操作</div>
        </div>

        <!-- 购物车商品列表 -->
        <div class="divide-y">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="grid grid-cols-12 gap-4 p-4 items-center"
          >
            <!-- 商品信息 -->
            <div class="col-span-6 flex items-center space-x-4">
              <el-checkbox v-model="item.selected" @change="updateSelection" />
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded"
              >
              <div>
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">
                  <template v-if="item.selectedSpecs">
                    <span v-for="(value, key) in item.selectedSpecs" :key="key">
                      {{ key }}: {{ value }}
                    </span>
                  </template>
                </p>
              </div>
            </div>

            <!-- 单价 -->
            <div class="col-span-2 text-center">
              ¥{{ item.price.toFixed(2) }}
            </div>

            <!-- 数量 -->
            <div class="col-span-2 text-center">
              <el-input-number
                v-model="item.quantity"
                :min="1"
                :max="item.stock"
                size="small"
                @change="(val) => updateQuantity(item, val)"
              />
            </div>

            <!-- 小计 -->
            <div class="col-span-1 text-center text-red-600 font-medium">
              ¥{{ (item.price * item.quantity).toFixed(2) }}
            </div>

            <!-- 操作 -->
            <div class="col-span-1 text-center">
              <el-button
                type="danger"
                link
                @click="removeItem(item)"
              >
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算栏 -->
      <div class="mt-4 bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <el-checkbox
            v-model="isAllSelected"
            @change="toggleSelectAll"
          >
            全选
          </el-checkbox>
          <el-button link type="danger" @click="removeSelected">
            删除选中商品
          </el-button>
        </div>

        <div class="flex items-center space-x-8">
          <div>
            已选择 <span class="text-red-600">{{ selectedCount }}</span> 件商品
          </div>
          <div class="text-lg">
            合计：<span class="text-red-600 font-bold">¥{{ totalPrice.toFixed(2) }}</span>
          </div>
          <el-button
            type="primary"
            size="large"
            :disabled="!selectedCount"
            @click="handleCheckout"
          >
            结算
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCartStore } from '../stores/cart';

const router = useRouter();
const cartStore = useCartStore();

// 获取购物车商品列表
const cartItems = computed(() => cartStore.items);

// 选中商品数量
const selectedCount = computed(() => 
  cartItems.value.filter(item => item.selected).length
);

// 总价
const totalPrice = computed(() => 
  cartItems.value
    .filter(item => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0)
);

// 是否全选
const isAllSelected = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every(item => item.selected),
  set: (value) => toggleSelectAll(value)
});

// 更新商品数量
const updateQuantity = (item: any, quantity: number) => {
  cartStore.updateQuantity(item.id, quantity);
  ElMessage.success('已更新商品数量');
};

// 移除商品
const removeItem = async (item: any) => {
  try {
    await ElMessageBox.confirm(
      '确定要从购物车中删除该商品吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    cartStore.removeFromCart(item.id);
    ElMessage.success('已删除商品');
  } catch {
    // 用户取消删除
  }
};

// 更新选择状态
const updateSelection = () => {
  cartStore.updateSelection();
};

// 全选/取消全选
const toggleSelectAll = (value: boolean) => {
  cartStore.toggleSelectAll(value);
};

// 删除选中商品
const removeSelected = async () => {
  if (!selectedCount.value) {
    ElMessage.warning('请先选择要删除的商品');
    return;
  }

  try {
    await ElMessageBox.confirm(
      '确定要删除选中的商品吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    cartStore.removeSelected();
    ElMessage.success('已删除选中商品');
  } catch {
    // 用户取消删除
  }
};

// 结算
const handleCheckout = () => {
  if (!selectedCount.value) {
    ElMessage.warning('请先选择要结算的商品');
    return;
  }
  router.push('/checkout');
};
</script> 
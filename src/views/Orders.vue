<template>
  <div class="orders-page p-6">
    <h1 class="text-2xl font-bold mb-6">我的订单</h1>

    <!-- 订单状态筛选 -->
    <div class="bg-white rounded-lg shadow mb-6">
      <el-tabs v-model="activeStatus" @tab-change="handleStatusChange">
        <el-tab-pane label="全部订单" name="all" />
        <el-tab-pane label="待付款" name="pending" />
        <el-tab-pane label="待发货" name="paid" />
        <el-tab-pane label="待收货" name="shipped" />
        <el-tab-pane label="已完成" name="completed" />
      </el-tabs>
    </div>

    <!-- 订单为空时显示 -->
    <el-empty
      v-if="!orders.length"
      description="暂无相关订单"
    >
      <el-button type="primary" @click="$router.push('/products')">
        去购物
      </el-button>
    </el-empty>

    <!-- 订单列表 -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <!-- 订单头部 -->
        <div class="p-4 bg-gray-50 flex items-center justify-between border-b">
          <div class="space-x-4 text-sm text-gray-500">
            <span>订单号：{{ order.orderNumber }}</span>
            <span>下单时间：{{ order.createTime }}</span>
          </div>
          <el-tag :type="getStatusType(order.status)">
            {{ getStatusText(order.status) }}
          </el-tag>
        </div>

        <!-- 订单商品列表 -->
        <div class="p-4">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center py-4 border-b last:border-0"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-20 h-20 object-cover rounded"
            >
            <div class="ml-4 flex-grow">
              <h3 class="font-medium">{{ item.name }}</h3>
              <p class="text-sm text-gray-500">
                {{ item.specs }}
              </p>
            </div>
            <div class="text-gray-500 text-sm">
              ¥{{ item.price.toFixed(2) }} × {{ item.quantity }}
            </div>
          </div>
        </div>

        <!-- 订单底部 -->
        <div class="p-4 bg-gray-50 flex items-center justify-between border-t">
          <div class="text-sm text-gray-500">
            共 {{ order.totalQuantity }} 件商品，
            实付款：<span class="text-red-600 font-bold">¥{{ order.totalAmount.toFixed(2) }}</span>
          </div>
          <div class="space-x-2">
            <el-button
              v-if="order.status === 'pending'"
              type="primary"
              @click="handlePay(order)"
            >
              立即付款
            </el-button>
            <el-button
              v-if="order.status === 'shipped'"
              type="success"
              @click="handleConfirmReceive(order)"
            >
              确认收货
            </el-button>
            <el-button
              v-if="order.status === 'completed'"
              @click="handleReview(order)"
            >
              评价
            </el-button>
            <el-button
              v-if="order.status === 'pending'"
              type="danger"
              link
              @click="handleCancelOrder(order)"
            >
              取消订单
            </el-button>
            <el-button
              link
              @click="$router.push(`/orders/${order.id}`)"
            >
              订单详情
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-6 flex justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

// 状态过滤
const activeStatus = ref('all');
const handleStatusChange = (status: string) => {
  fetchOrders(status);
};

// 分页
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchOrders();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchOrders();
};

// 模拟订单数据
const orders = ref([]);

// 获取订单列表
const fetchOrders = (status?: string) => {
  // 模拟API调用
  orders.value = [
    {
      id: 1,
      orderNumber: 'ORDER202401200001',
      createTime: '2024-01-20 12:00:00',
      status: 'pending',
      items: [
        {
          id: 1,
          name: '高品质无线耳机',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          price: 999,
          quantity: 1,
          specs: '颜色：黑色，型号：标准版'
        }
      ],
      totalQuantity: 1,
      totalAmount: 999
    },
    {
      id: 2,
      orderNumber: 'ORDER202401200002',
      createTime: '2024-01-20 14:30:00',
      status: 'shipped',
      items: [
        {
          id: 2,
          name: '智能手表',
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
          price: 1299,
          quantity: 1,
          specs: '颜色：银色，尺寸：42mm'
        }
      ],
      totalQuantity: 1,
      totalAmount: 1299
    }
  ];

  // 根据状态筛选
  if (status && status !== 'all') {
    orders.value = orders.value.filter(order => order.status === status);
  }

  // 更新总数
  total.value = orders.value.length;
};

// 获取状态标签类型
const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    pending: 'warning',
    paid: 'primary',
    shipped: 'info',
    completed: 'success',
    cancelled: 'info'
  };
  return types[status] || 'info';
};

// 获取状态文本
const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: '待付款',
    paid: '待发货',
    shipped: '待收货',
    completed: '已完成',
    cancelled: '已取消'
  };
  return texts[status] || status;
};

// 支付订单
const handlePay = async (order: any) => {
  try {
    await ElMessageBox.confirm('确认支付该订单？', '提示');
    ElMessage.success('支付成功');
    fetchOrders();
  } catch {
    // 用户取消支付
  }
};

// 确认收货
const handleConfirmReceive = async (order: any) => {
  try {
    await ElMessageBox.confirm('确认已收到商品？', '提示');
    ElMessage.success('已确认收货');
    fetchOrders();
  } catch {
    // 用户取消确认
  }
};

// 评价订单
const handleReview = (order: any) => {
  // 跳转到评价页面或打开评价弹窗
};

// 取消订单
const handleCancelOrder = async (order: any) => {
  try {
    await ElMessageBox.confirm('确认取消该订单？', '提示', {
      type: 'warning'
    });
    ElMessage.success('订单已取消');
    fetchOrders();
  } catch {
    // 用户取消操作
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
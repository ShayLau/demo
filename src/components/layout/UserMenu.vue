<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="flex items-center cursor-pointer">
      <el-avatar :size="32" :src="userAvatar" />
      <span class="ml-2">{{ userName }}</span>
    </div>
    
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="orders">
          <el-icon><Tickets /></el-icon>
          <span class="ml-2">我的订单</span>
        </el-dropdown-item>
        <el-dropdown-item command="favorites">
          <el-icon><Star /></el-icon>
          <span class="ml-2">我的收藏</span>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <el-icon><SwitchButton /></el-icon>
          <span class="ml-2">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Tickets, Star, SwitchButton } from '@element-plus/icons-vue';
import { useAuthStore } from '../../stores/auth';
import { ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name || '未登录');
const userAvatar = computed(() => authStore.user?.avatar || '');

const handleCommand = (command: string) => {
  switch (command) {
    case 'orders':
      router.push('/orders');
      break;
    case 'favorites':
      router.push('/favorites');
      break;
    case 'logout':
      authStore.logout();
      ElMessage.success('已退出登录');
      router.push('/auth/login');
      break;
  }
};
</script>
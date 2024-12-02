<template>
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">关于我们</h3>
          <p class="text-gray-400">
            优品商城致力于为您提供优质的购物体验。
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/products" class="text-gray-400 hover:text-white">
                商品列表
              </router-link>
            </li>
            <li>
              <router-link to="/orders" class="text-gray-400 hover:text-white">
                我的订单
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">联系我们</h3>
          <p class="text-gray-400">
            邮箱：support@example.com<br>
            电话：400-123-4567
          </p>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} 优品商城. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
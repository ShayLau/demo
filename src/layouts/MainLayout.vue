<template>
  <div class="min-h-screen flex flex-col">
    <app-header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>
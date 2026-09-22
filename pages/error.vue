<template>
  <AppLayout>
    <div class="flex flex-col items-center justify-center text-center p-4">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-xl mb-6">Page Not Found</p>
      <NuxtLink to="/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go Back Home
      </NuxtLink>
    </div>
  </AppLayout>
</template>
<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
</script>


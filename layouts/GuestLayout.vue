<script setup>
import ApplicationLogo from '~/components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="flex  min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
        <slot />
    </div>
</template>

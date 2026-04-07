<template>
  <footer class="footer footer-center p-4 bg-base-200 text-base-content">
    <div>
      <pre>{{ authStore.user }}</pre>
    </div>
    <AppToggleColorMode />
  </footer>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <nuxtLink
    v-if="!isLoggedIn"
    to="/auth/sign-in"
    class="btn btn-ghost outline mr-1"
    >Bejelentkezés</nuxtLink
  >
  <button v-else class="btn btn-ghost outline mr-1" @click.prevent="logOut">
    Kijelentkezés
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.user !== null);
const logOut = () => {
  authStore.signOut();
};
</script>

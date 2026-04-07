<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="navbar-start">
      <!-- <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          menu
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div> -->
    </div>
    <div class="navbar-center">
      <NuxtLink to="/" class="btn btn-ghost text-xl">daisyUI</NuxtLink>
    </div>
    <div class="navbar-end">
      <AuthButton />

      <Icon
        v-if="isLoggedIn"
        name="tabler:cloud-check"
        size="24"
        class="mx-4"
      />
      <Icon v-else name="tabler:cloud-x" size="24" class="mx-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.user !== undefined);
</script>

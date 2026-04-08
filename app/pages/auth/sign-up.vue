<template>
  <div>
    <div class="grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <label for="first-name">First name</label>
          <input
            id="first-name"
            v-model="firstName"
            placeholder="Max"
            required
          />
        </div>
        <div class="grid gap-2">
          <label for="last-name">Last name</label>
          <input
            id="last-name"
            v-model="lastName"
            placeholder="Robinson"
            required
          />
        </div>
      </div>
      <div class="grid gap-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div class="grid gap-2">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <button type="button" class="w-full" @click="handleSignUp">
        Create an account
      </button>
      <div v-if="authStore.errorMessage" class="mt-5">
        <p>Error:</p>
        <p>{{ authStore.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  await authStore.signUp(
    firstName.value,
    lastName.value,
    email.value,
    password.value,
  );
};
</script>

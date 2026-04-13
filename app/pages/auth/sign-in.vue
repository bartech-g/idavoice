<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">Sign In</h2>
        <form class="grid gap-4" @submit.prevent="handleSignIn">
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="m@example.com"
              required
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Password</span>
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="********"
              required
              class="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? "Signing in..." : "Sign In" }}
          </button>
          <div v-if="authStore.errorMessage" class="alert alert-error">
            <span>{{ authStore.errorMessage }}</span>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/sign-up" class="link link-primary"
            >Sign up</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const handleSignIn = async () => {
  await authStore.signIn(email.value, password.value);
};
</script>

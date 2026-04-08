<template>
  <div class="flex items-center justify-center">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">Add Relative</h2>
        <form class="grid gap-4" @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label" for="name">
              <span class="label-text">Name</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="e.g. John Doe"
              required
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label" for="relation">
              <span class="label-text">Relation</span>
            </label>
            <input
              id="relation"
              v-model="form.relation"
              type="text"
              placeholder="e.g. Father, Sister, Cousin"
              required
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label" for="description">
              <span class="label-text">Description</span>
              <span class="label-text-alt text-base-content/50">Optional</span>
            </label>
            <input
              id="description"
              v-model="form.description"
              type="textarea"
              placeholder="A short note about this person..."
              class="textarea textarea-bordered w-full"
              rows="3"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="loading"
          >
            {{ loading ? "Saving..." : "Add Relative" }}
          </button>

          <div v-if="errorMessage" class="alert alert-error">
            <span>{{ errorMessage }}</span>
          </div>

          <div v-if="successMessage" class="alert alert-success">
            <span>{{ successMessage }}</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  name: "",
  relation: "",
  description: "",
});

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleSubmit = async () => {
  if (!authStore.user?.id) {
    errorMessage.value = "You must be logged in to add a relative.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await $fetch("/api/relatives", {
      method: "POST",
      body: {
        name: form.name,
        relation: form.relation,
        description: form.description,
      },
    });

    successMessage.value = "Relative added successfully!";
    form.name = "";
    form.relation = "";
    form.description = "";
    router.push("/settings/relatives");

    // setTimeout(() => router.push("/settings/relatives"), 1000);
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage ?? "Something went wrong.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>

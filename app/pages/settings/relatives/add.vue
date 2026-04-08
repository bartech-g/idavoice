<template>
  <div class="flex items-center justify-center">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl">
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold">Hozzátartozó hozzáadása</h2>

        <FormKit
          type="form"
          :actions="false"
          form-class="space-y-5 text-xl"
          @submit="handleSubmit"
        >
          <FormKit
            type="text"
            name="name"
            label="Név"
            placeholder="pl. Kovács János"
            validation="required|length:2,100"
            :validation-messages="{
              required: 'A név megadása kötelező',
              length: 'A névnek 2-100 karakter hosszúnak kell lennie',
            }"
            input-class="input input-bordered w-full"
            label-class="label"
            wrapper-class="form-control"
            message-class="text-error text-sm mt-1"
          />

          <FormKit
            type="text"
            name="relation"
            label="Rokonság"
            placeholder="pl. Apa, Testvér, Unokatestvér"
            validation="required|length:2,50"
            :validation-messages="{
              required: 'A rokonyság megadása kötelező',
              length: 'A rokonyságnak 2-50 karakter hosszúnak kell lennie',
            }"
            input-class="input input-bordered w-full"
            label-class="label"
            wrapper-class="form-control"
            message-class="text-error text-sm mt-1"
          />

          <FormKit
            type="textarea"
            name="description"
            label="Leírás"
            placeholder="Rövid megjegyzés erről a személyről..."
            validation="length:0,500"
            :validation-messages="{
              length: 'A leírás maximum 500 karakter lehet',
            }"
            input-class="textarea textarea-bordered w-full"
            label-class="label"
            wrapper-class="form-control"
            message-class="text-error text-sm mt-1"
          />

          <div v-if="errorMessage" class="alert alert-error mt-4">
            <span>{{ errorMessage }}</span>
          </div>

          <div v-if="successMessage" class="alert alert-success mt-4">
            <span>{{ successMessage }}</span>
          </div>

          <FormKit
            type="submit"
            :label="loading ? 'Mentés...' : 'Mentés'"
            :disabled="loading"
            input-class="btn uppercase btn-neutral w-full"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleSubmit = async (formData: {
  name: string;
  relation: string;
  description: string;
}) => {
  if (!authStore.user?.id) {
    errorMessage.value =
      "A hozzáadáshoz bejelentkezett felhasználónak kell lenned.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await $fetch("/api/relatives", {
      method: "POST",
      body: {
        name: formData.name,
        relation: formData.relation,
        description: formData.description,
      },
    });

    successMessage.value = "A hozzátartozó sikeresen hozzáadva!";
    router.push("/settings/relatives");
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage ?? "Valami hiba történt.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>

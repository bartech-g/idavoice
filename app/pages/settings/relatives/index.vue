<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Hozzátartozók</h1>
      <NuxtLink to="/settings/relatives/add" class="btn btn-primary">
        <Icon name="tabler:plus" size="20" /><span>ÚJ</span></NuxtLink
      >
    </div>

    <div class="divider" />
    <div v-if="status === 'pending'">
      <span class="loading loading-ring loading-xl"></span>
    </div>
    <pre>{{ status }}</pre>
    <pre>{{ relativesData }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: relativesData, status } = await useFetch("/api/relatives", {
  lazy: true,
});
</script>

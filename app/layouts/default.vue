<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />
    <main class="flex-1 container mx-auto p-8">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

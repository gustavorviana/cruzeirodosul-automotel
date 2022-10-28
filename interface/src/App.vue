<script setup lang="ts">
import { RouterView } from "vue-router";

function onUpdate() {
  setTimeout(() => {
    require('./Utils').refreshSystemIcons();
  }, 100);
}
</script>

<template>
  <RouterView @vnode-updated="onUpdate" />
</template>
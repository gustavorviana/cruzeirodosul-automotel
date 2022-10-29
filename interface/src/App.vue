<script setup lang="ts">
import { RouterView } from "vue-router";

function onUpdate() {
  setTimeout(() => {
    try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch (error) { }
  }, 100);
}
</script>

<template>
  <RouterView @vnode-updated="onUpdate" />
</template>
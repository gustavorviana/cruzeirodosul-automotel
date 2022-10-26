<script setup lang="ts">
import { RouterView } from "vue-router";

function onUpdate() {
  try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch (error) { }
}
</script>

<template>
  <RouterView @vnode-updated="onUpdate"/>
</template>
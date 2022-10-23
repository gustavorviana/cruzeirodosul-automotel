<script setup lang="ts">
defineProps({
    strongTitle: String
});
</script>
<template>
    <h1 class="h3 mb-3"><strong v-if="strongTitle">{{ strongTitle }}</strong>
        <slot></slot>
    </h1>
</template>
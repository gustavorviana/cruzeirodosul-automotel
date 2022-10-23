<script setup lang="ts">
defineProps({
    header: String,
    mb: {
        type: [String, Number],
        default: 3
    }
});
</script>

<template>
    <div :class="`mb-${$props.mb}`">
        <label class="form-label">{{ header }}</label>
        <slot></slot>
    </div>
</template>
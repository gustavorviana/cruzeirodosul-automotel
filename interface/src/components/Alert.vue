<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: "warning"
    },

    canDismiss: Boolean
});
</script>

<template>
    <div :class="[`alert alert-${type} fade show`, canDismiss ? 'alert-dismissible' : '']" role="alert">
        <slot></slot>
        <button v-if="canDismiss" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>
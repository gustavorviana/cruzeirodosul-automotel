<script setup lang="ts">
</script>

<template>
    <div class="card">
        <div v-if="$slots.header" class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>
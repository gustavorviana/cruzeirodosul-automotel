<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
    <div class="card">
        <div v-if="$slots.header || title" class="card-header">
            <slot name="header">
                <h5 v-if="title" class="card-title mb-0">{{ title }}</h5>
            </slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>
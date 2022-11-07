<script setup lang="ts">

const props = defineProps<{
    color: 'red' | 'green' | 'yellow',
    text: string
}>();

function getColor() {
    switch (props.color) {
        case 'red': return 'badge bg-danger';
        case 'green': return 'badge bg-success';
        case 'yellow': return 'badge bg-warning';
        default: return '';
    }
}
</script>

<template>
    <span :class="getColor()">{{ text }}</span>
</template>
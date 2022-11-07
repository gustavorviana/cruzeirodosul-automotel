<script setup lang="ts">

defineProps({
    icon: String,
    class: {
        type: String,
        default: 'align-middle'
    }
})
</script>

<template>
    <i :class="$props.class" :data-feather="$props.icon"></i>
</template>
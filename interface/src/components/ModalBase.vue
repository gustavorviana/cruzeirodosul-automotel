<script setup lang="ts">
const emit = defineEmits(['close'])

defineProps<{
    isOpen?: boolean
}>();

function signalClose() {
    emit('close');
}
</script>

<template>
    <div v-if="$props.isOpen" class="modal-backdrop fade show" @click="signalClose"></div>
    <div v-if="$props.isOpen" class="modal" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
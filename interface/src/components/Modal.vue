<script setup lang="ts">
import ModalBase from './ModalBase.vue';

const emit = defineEmits(['close'])

defineProps<{
    isOpen: boolean,
    title: string
}>();

function signalClose() {
    emit('close');
}
</script>


<template>
    <ModalBase :is-open="$props.isOpen" @close="signalClose">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">{{ $props.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="signalClose"></button>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
        <div class="modal-footer">
            <slot name="button"></slot>
        </div>
    </ModalBase>
</template>
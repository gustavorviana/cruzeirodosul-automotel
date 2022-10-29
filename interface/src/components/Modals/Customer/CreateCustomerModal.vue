<script lang="ts" setup>
import InputGroup from '@/components/Form/InputGroup.vue';
import Modal from '@/components/Modal.vue';
import { onUpdated, ref } from 'vue';
const name = ref<string>();
const document = ref<string>();

let isOpen = false;
const props = defineProps({
    isCreateOpen: Boolean
})
const emit = defineEmits<{
    (e: 'onCancel'): void
    (e: 'onSave', customer: Customer): void
}>();

function save() {
    const nameSize = name.value?.length ?? 0;
    const docSize = document.value?.length ?? 0;

    if (nameSize < 3)
        return alert('O nome deve ter pelo menos 3 caracteres.');
    if (nameSize > 255)
        return alert('O nome deve ter no máximo 255 caracteres.');

    if (docSize > 14)
        return alert('O documento deve ter no máximo 255 caracteres.');

    emit('onSave', {
        id: 0,
        name: name.value as any,
        document: document.value as any
    });
}

onUpdated(() => {
    if (props.isCreateOpen == isOpen)
        return;

    isOpen = props.isCreateOpen;
    if (isOpen) {
        name.value = '';
        document.value = '';
    }
});

function onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    if (target.selectionStart == 0 && target.selectionEnd == target.value.length)
        return;

    if (target.value.length >= 14 || !(e.key >= '0' && e.key <= '9'))
        e.preventDefault();
}
</script>

<template>
    <Modal title="Cadastrar um novo cliente" :is-open="isCreateOpen" @close="() => emit('onCancel')">
        <InputGroup header="Nome">
            <input v-model="name" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="Documento">
            <input v-model="document" type="text" class="form-control" @keypress="onKeyDown" />
        </InputGroup>
        <template v-slot:button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="() => emit('onCancel')">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Cadastrar</button>
        </template>
    </Modal>
</template>
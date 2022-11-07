<script lang="ts" setup>
import InputGroup from '@/components/Form/InputGroup.vue';
import GroupSelector from '@/components/GroupSelector.vue';
import Modal from '@/components/Modal.vue';
import { onUpdated, ref } from 'vue';
const name = ref<string>();
const document = ref<string>();

let isOpen = false;
const props = defineProps<{
    isCreateOpen: boolean
    item?: User
}>()
const emit = defineEmits<{
    (e: 'onCancel'): void
    (e: 'onSave', user: User): void
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

    // emit('onSave', {
    //     id: 0,
    //     name: name.value as any,
    //     document: document.value as any
    // });
}

onUpdated(() => {
    if (props.isCreateOpen == isOpen)
        return;

    isOpen = props.isCreateOpen;

    document.value = '';
    name.value = '';

    if (!props.item)
        return;

    // document.value = props.item.document;
    // name.value = props.item.name;
});
function onSelectGroup(group: Group | null) {
    console.log(group);
}
</script>

<template>
    <Modal title="Cadastrar um novo cliente" :is-open="isCreateOpen" @close="() => emit('onCancel')">
        <InputGroup header="Nome">
            <input v-model="name" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="Grupo">
            <GroupSelector @on-select="onSelectGroup" />
        </InputGroup>
        <template v-slot:button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="() => emit('onCancel')">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
        </template>
    </Modal>
</template>
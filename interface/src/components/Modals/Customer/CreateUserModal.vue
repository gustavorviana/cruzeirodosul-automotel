<script lang="ts" setup>
import InputGroup from '@/components/Form/InputGroup.vue';
import GroupSelector from '@/components/GroupSelector.vue';
import Modal from '@/components/Modal.vue';
import { onUpdated, ref, type Ref } from 'vue';

const name = ref<string>('');
const idGroup = ref<number>(0);
const email = ref<string>('');
const password = ref<string>('');

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
    if (!validateSize(name, 'O nome', 3, 255))
        return;

    if (idGroup.value < 1)
        return alert('Um grupo deve ser selecionado.');

    if (!validateSize(email, 'O email', 3, 255))
        return;

    if (!props.item && !validateSize(password, 'A senha', 3, 255))
        return;

    emit('onSave', {
        id: 0,
        name: name.value,
        document: '',
        email: email.value,
        group: null as any,
        groupId: idGroup.value,
        password: password.value
    });
}

function validateSize(value: Ref<string | undefined>, fieldName: string, min: number, max: number) {
    const size = value?.value?.length ?? 0;
    if (size < min)
        return alert(`${fieldName} deve ter pelo menos ${min} caracteres.`);

    if (size > max)
        return alert(`${fieldName} deve ter no máximo ${max} caracteres.`);

    return true;
}

onUpdated(() => {
    if (props.isCreateOpen == isOpen)
        return;

    isOpen = props.isCreateOpen;
    password.value = '';

    if (!props.item) {
        name.value = '';
        email.value = '';
        idGroup.value = 0;
        return;
    }

    name.value = props.item.name;
    email.value = props.item.email;
    idGroup.value = props.item.groupId ?? props.item?.group?.id;
});

function onSelectGroup(group: Group | null) {
    idGroup.value = group?.id ?? 0;
}
</script>

<template>
    <Modal title="Cadastrar um novo cliente" :is-open="isCreateOpen" @close="() => emit('onCancel')">
        <InputGroup header="Nome">
            <input v-model="name" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="E-mail">
            <input v-model="email" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="Senha">
            <input v-model="password" type="password" class="form-control" />
        </InputGroup>
        <InputGroup header="Grupo" v-if="props?.item?.id != 1">
            <GroupSelector @on-select="onSelectGroup" :groupId="idGroup" />
        </InputGroup>

        <template v-slot:button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="() => emit('onCancel')">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
        </template>
    </Modal>
</template>
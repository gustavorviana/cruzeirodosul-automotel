<script lang="ts" setup>
import InputGroup from '@/components/Form/InputGroup.vue';
import Modal from '@/components/Modal.vue';
import { onUpdated, ref } from 'vue';
const name = ref<string>('');
const quantity = ref<string>('');
const price = ref<string>('');

let lastStock = null;
let isOpen = false;
const props = defineProps<{
    isCreateOpen: boolean,
    item?: Stock;
}>()
const emit = defineEmits<{
    (e: 'onCancel'): void
    (e: 'onSave', item: Stock): void
}>();

function save() {
    const nameSize = name.value.length ?? 0;
    const qtd = Number(quantity.value);
    const priceNum = Number(price.value.replace(',', '.'));

    if (nameSize < 3)
        return alert('O nome deve ter pelo menos 3 caracteres.');

    if (nameSize > 255)
        return alert('O nome deve ter no máximo 255 caracteres.');

    if (Number.isNaN(qtd))
        return alert('A quantidade é inválida.');

    if (Number.isNaN(priceNum))
        return alert('O preço é inválido.');

    emit('onSave', {
        id: 0,
        price: priceNum,
        productName: name.value,
        quantity: qtd
    } as Stock);
}

onUpdated(() => {
    if (props.isCreateOpen == isOpen)
        return;

    isOpen = props.isCreateOpen;
    if (isOpen) {
        name.value = '';
        quantity.value = '';
    }

    price.value = '';
    name.value = '';
    quantity.value = '';

    if (!props.item)
        return;

    price.value = props.item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    name.value = props.item.productName;
    quantity.value = props.item.quantity.toString();
});

</script>

<template>
    <Modal title="Cadastro de item no estoque" :is-open="isCreateOpen" @close="() => emit('onCancel')">
        <InputGroup header="Nome">
            <input v-model="name" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="Quantidade">
            <input v-model="quantity" type="text" class="form-control" />
        </InputGroup>
        <InputGroup header="Preço">
            <input v-model="price" type="text" class="form-control" />
        </InputGroup>
        <template v-slot:button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="() => emit('onCancel')">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="save">Salvar</button>
        </template>
    </Modal>
</template>
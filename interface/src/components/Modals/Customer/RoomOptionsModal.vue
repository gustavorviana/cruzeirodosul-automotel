<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import AutoComplete from '@/components/AutoComplete.vue';
import InputGroup from '@/components/Form/InputGroup.vue';
import { ref } from 'vue';
import { axios } from '@/Defaults';
import { showAxiosError } from '@/utils';

const props = defineProps<{
    isOpen: boolean,
    room?: Room
}>()
const selectedCustomer = ref<Customer>();
const searchCustomers = ref<Customer[]>([]);
const searchCustomersTitle = ref<string[]>([]);

const emit = defineEmits(['onClose']);
function onCustomerTextChange(e: KeyboardEvent) {
    const text = (e.target as HTMLInputElement).value;
    if (!text)
        return searchCustomers.value = [];

    axios.get(`api/clientes?name=${encodeURI(text)}`)
        .then(r => {
            searchCustomers.value = r.data
            searchCustomersTitle.value = searchCustomers.value.map(i => `#${i.id} - ${i.name} (${i.document})`);
        })
        .catch(e => {
            searchCustomers.value = [];
            showAxiosError(e, 'Falha ao recuperar os clientes');
        });
}

function select(index: number) {
    selectedCustomer.value = searchCustomers.value[index];
}

function liberarQuarto() {
    if (!confirm('Deseja realmente liberar o quarto ?'))
        return;

    axios.post(`api/quartos/${props.room?.id}/desocupar`)
        .then(() => emit('onClose'))
        .catch((e) => showAxiosError(e, 'Não foi possível liberar o quarto.'));
}

function ocuparQuarto() {
    if (!confirm('Deseja realmente ocupar o quarto ?'))
        return;

    if (!selectedCustomer.value)
        return alert('Um cliente deve ser selecionado.');

    axios.post(`api/quartos/${props.room?.id}/ocupar`, { idCustomer: selectedCustomer.value.id })
        .then(() => emit('onClose'))
        .catch((e) => showAxiosError(e, 'Não foi possível ocupar o quarto.'));
}

</script>

<template>
    <Modal title="Opções do quarto" :is-open="isOpen" @close="() => emit('onClose')">
        <InputGroup v-if="!props.room?.ocupationInfo" header="Cliente que vai ocupar o quarto">
            <AutoComplete width="465" :items="searchCustomersTitle" @select="select"
                @text-change="onCustomerTextChange" />
        </InputGroup>

        <template v-slot:button>
            <button v-if="!!props.room?.ocupationInfo" class="btn btn-warning" @click="liberarQuarto">Liberar
                quarto</button>
            <button v-if="!props.room?.ocupationInfo" class="btn btn-warning" @click="ocuparQuarto"
                :disabled="!selectedCustomer">Ocupar
                quarto</button>
        </template>
    </Modal>
</template>
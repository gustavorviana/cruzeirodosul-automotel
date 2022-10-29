<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import AutoComplete from '@/components/AutoComplete.vue';
import InputGroup from '@/components/Form/InputGroup.vue';
import { ref } from 'vue';
import { axios } from '@/Defaults';

defineProps<{
    isOpen: boolean,
    room?: Room
}>()
const selectedCustomer = ref<Customer>();
const searchCustomers = ref<Customer[]>([]);
const searchCustomersTitle = ref<string[]>([]);

const emit = defineEmits(['onCancel', 'onSave']);
function onCustomerTextChange(e: KeyboardEvent) {
    const text = (e.target as HTMLInputElement).value;
    if (!text)
        return searchCustomers.value = [];

    axios.get(`api/customers?name=${encodeURI(text)}`)
        .then(r => {
            searchCustomers.value = r.data
            searchCustomersTitle.value = searchCustomers.value.map(i => `#${i.id} - ${i.name} (${i.document})`);
        })
        .catch(e => {
            console.log(e);
            searchCustomers.value = [];
            alert(e.response.data.message);
        });
}

function select(index: number) {
    selectedCustomer.value = searchCustomers.value[index];
}
</script>

<template>
    <Modal title="Opções do quarto" :is-open="isOpen" @close="() => emit('onCancel')">
        <InputGroup header="Cliente que vai ocupar o quarto">
            <AutoComplete width="465" :items="searchCustomersTitle" @select="select"
                @text-change="onCustomerTextChange" />
        </InputGroup>
    </Modal>
</template>
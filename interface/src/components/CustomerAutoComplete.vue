<script setup lang="ts">
import AutoComplete from '@/components/AutoComplete.vue';
import { showAxiosError } from '@/utils';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'onSelect', customer: Customer): void
}>()
const searchCustomers = ref<Customer[]>([]);
const searchCustomersTitle = ref<string[]>([]);

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
    emit('onSelect', searchCustomers.value[index]);
}

</script>

<template>
    <AutoComplete width="465" :items="searchCustomersTitle" @select="select" @text-change="onCustomerTextChange" />
</template>
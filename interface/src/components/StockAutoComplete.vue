<script setup lang="ts">
import AutoComplete from '@/components/AutoComplete.vue';
import { showAxiosError } from '@/utils';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'onSelect', item: Stock): void
}>()
const searchStockItems = ref<Stock[]>([]);
const searchStockTitle = ref<string[]>([]);

function onCustomerTextChange(e: KeyboardEvent) {
    const text = (e.target as HTMLInputElement).value;
    if (!text)
        return searchStockItems.value = [];

    axios.get(`api/estoque?name=${encodeURI(text)}`)
        .then(r => {
            searchStockItems.value = r.data
            searchStockTitle.value = searchStockItems.value.map(i => `#${i.id} - ${i.productName} (Qtd. ${i.quantity}) ${i.price.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            })}`);
        })
        .catch(e => {
            searchStockItems.value = [];
            showAxiosError(e, 'Falha ao recuperar os clientes');
        });
}

function select(index: number) {
    emit('onSelect', searchStockItems.value[index]);
}

</script>

<template>
    <AutoComplete width="465" :items="searchStockTitle" @select="select" @text-change="onCustomerTextChange" />
</template>
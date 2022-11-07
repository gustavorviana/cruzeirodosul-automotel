<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import CreateStockItemModal from '@/components/Modals/Customer/CreateStockItemModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { axios } from '@/Defaults';
import { ref } from 'vue';
import { refreshSystemIcons, showAxiosError } from '../utils';

const toUpdate = ref<Stock>();
const isCreateOpen = ref(false);
const stockItems = ref<Stock[]>([]);

refresh();

function saveItem(stock: Stock) {
    isCreateOpen.value = false;

    if (toUpdate.value) {
        axios.patch('api/estoque/' + toUpdate.value.id, stock)
            .then(() => refresh())
            .catch((e) => showAxiosError(e, 'Ocorreu um erro interno.'));

        toUpdate.value = undefined;
        return;
    }

    axios.post('api/estoque', stock)
        .then(data => stockItems.value = data.data)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Ocorreu um erro interno.'));
}

function showCreateStockItemModal(stock?: Stock) {
    toUpdate.value = stock;
    isCreateOpen.value = true;
}

function deleteItem(id: number) {
    if (!confirm('Deseja realmente apagar esse produto ?'))
        return;

    axios.delete('api/estoque/' + id)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Não foi possível apagar o produto.'));
}

async function refresh() {
    return axios.get('api/estoque')
        .then(data => stockItems.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => showAxiosError(e, 'Não foi possível listar os items do estoque. ' + e));
}
</script>

<template>
    <Layout>
        <PageHeader>
            <template v-slot:title>
                <PageTitle>
                    Estoque
                </PageTitle>
            </template>
            <button class="btn btn-primary" @click="() => showCreateStockItemModal()">Cadastrar</button>
        </PageHeader>

        <Card>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width:35%">Nome</th>
                        <th class="d-none d-md-table-cell" style="width:35%">Quantidade</th>
                        <th class="d-none d-md-table-cell" style="width:10%">Preço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in stockItems">
                        <td>{{ item.productName }}</td>
                        <td class="d-none d-md-table-cell">{{ item.quantity }}</td>
                        <td class="d-none d-md-table-cell">{{ item.price?.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            })
                        }}</td>
                        <td class="table-action">
                            <a href="#" @click="() => showCreateStockItemModal(item)">
                                <Icon icon="settings" />
                            </a>
                            <a href="#" @click="() => deleteItem(item.id)">
                                <Icon icon="trash-2" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <CreateStockItemModal :is-create-open="isCreateOpen" @on-cancel="() => isCreateOpen = false" @on-save="saveItem"
            :item="toUpdate" />
    </Layout>
</template>
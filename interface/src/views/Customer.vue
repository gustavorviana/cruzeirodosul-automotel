<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import CreateCustomerModal from '@/components/Modals/Customer/CreateCustomerModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { axios } from '@/Defaults';
import { ref } from 'vue';
import { refreshSystemIcons, showAxiosError } from '../utils';

const toUpdate = ref<Customer>();
const isCreateOpen = ref(false);
const customers = ref<Customer[]>([]);

refresh();

function saveNewCustomer(customer: Customer) {
    isCreateOpen.value = false;

    axios.post('api/clientes', customer)
        .then(data => customers.value = data.data)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Ocorreu um erro interno.'));
}

function showCreateCustomerModal(customer?: Customer) {
    isCreateOpen.value = true;
    toUpdate.value = customer;
}

async function refresh() {
    return axios.get('api/clientes')
        .then(data => customers.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => showAxiosError(e, 'Não foi possível listar os quartos. ' + e));
}
</script>

<template>
    <Layout>
        <PageHeader>
            <template v-slot:title>
                <PageTitle>
                    Clientes
                </PageTitle>
            </template>
            <button class="btn btn-primary" @click="() =>showCreateCustomerModal()">Cadastrar</button>
        </PageHeader>

        <Card>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width:5%;">Id</th>
                        <th style="width:35%">Cliente</th>
                        <th class="d-none d-md-table-cell">Documento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers">
                        <td>#{{ customer.id }}</td>
                        <td>{{ customer.name ?? '-' }}</td>
                        <td class="d-none d-md-table-cell">{{ customer.document ?? '-' }}
                        </td>
                        <td class="table-action">
                            <a href="#" @click="() => showCreateCustomerModal(customer)">
                                <Icon icon="settings" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <CreateCustomerModal :is-create-open="isCreateOpen" @on-cancel="() => isCreateOpen = false"
            @on-save="saveNewCustomer" :item="toUpdate"/>
    </Layout>
</template>
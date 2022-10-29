<script setup lang="ts">
import Card from '@/components/Card.vue';
import Layout from '@/components/Layout.vue';
import CreateCustomerModal from '@/components/Modals/Customer/CreateCustomerModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { Url } from '@/Defaults';
import axios from 'axios';
import { ref } from 'vue';
import { refreshSystemIcons } from '../utils';

const isCreateOpen = ref(false);
const customers = ref<Customer[]>([]);

refresh();

function saveNewCustomer(customer: Customer) {
    isCreateOpen.value = false;

    axios.post(Url + 'api/customers', customer)
        .then(data => customers.value = data.data)
        .then(() => refresh());
}

function showCreateCustomerModal() {
    isCreateOpen.value = true;
}

async function refresh() {
    return axios.get(Url + 'api/customers')
        .then(data => customers.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => alert('Não foi possível listar os quartos. ' + e));
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
            <button class="btn btn-primary" @click="showCreateCustomerModal">Cadastrar</button>
        </PageHeader>

        <Card>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width:5%;">Id</th>
                        <th style="width:35%">Cliente</th>
                        <th class="d-none d-md-table-cell" style="width:35%">Documento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers">
                        <td>#{{ customer.id }}</td>
                        <td>{{ customer.name ?? '-' }}</td>
                        <td class="d-none d-md-table-cell">{{ customer.document ?? '-' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <CreateCustomerModal :is-create-open="isCreateOpen" @on-cancel="() => isCreateOpen = false"
            @on-save="saveNewCustomer" />
    </Layout>
</template>
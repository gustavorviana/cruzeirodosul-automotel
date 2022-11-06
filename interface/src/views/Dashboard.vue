<script setup lang="ts">
import Card from '@/components/Card.vue';
import CardInfo from '@/components/CardInfo.vue';
import { ref } from 'vue';
import Layout from '../components/Layout.vue'
import PageTitle from '../components/PageTitle.vue'

const clientes = ref<Customer[]>([]);
const faturamento = ref<number>(0);
const estoques = ref<number>(0);

const historicoQuartos = ref<RoomHistory[]>([
    createExemplo(new Date(), null, "Rodolfo"),
    createExemplo(new Date(), new Date(), "Marcelo"),
]);

function createExemplo(enterAt: Date, leaveAt: Date | null, cliente: string) {
    return {
        bedroomId: 1,
        customer: {
            name: cliente,
            document: '000000',
            id: 1
        },
        enterAt,
        leaveAt,
        userId: 1,
        customerId: 1,
        id: 1
    } as RoomHistory;
}
</script>

<template>
    <Layout>
        <PageTitle>
            Dashboard
        </PageTitle>

        <div class="row">
            <div class="col-sm-4">
                <CardInfo title="Itens estoque" :value="estoques.toString()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-truck align-middle">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8">
                        </polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                </CardInfo>
            </div>
            <div class="col-sm-4">
                <CardInfo title="Clientes" :value="clientes.length.toString()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-users align-middle">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
                        </path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </CardInfo>
            </div>
            <div class="col-sm-4">
                <CardInfo title="Faturamento" :value="faturamento.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-dollar-sign align-middle">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6">
                        </path>
                    </svg>
                </CardInfo>
            </div>
        </div>
        <Card title="Clientes">
        

        </Card>
    </Layout>
</template>
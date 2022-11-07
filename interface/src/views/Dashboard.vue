<script setup lang="ts">
import Card from '@/components/Card.vue';
import CardInfo from '@/components/CardInfo.vue';
import { ref } from 'vue';
import Layout from '../components/Layout.vue'
import PageTitle from '../components/PageTitle.vue'

const dashboardCards = ref<DashboardCards>({} as any);
const historicoQuartos = ref<RoomHistory[]>();

axios.get('/api/dashboard').then(r => dashboardCards.value = r.data);
axios.get('/api/historicoquartos').then(r => {

    console.log(r.data);

    historicoQuartos.value = r.data;
});

function toBrDate(data: Date | string | null) {
    if (!data)
        return '-';

    if (typeof data == 'string')
        data = new Date(data);

    return `${data.toLocaleDateString('pt-br')} ${data.toLocaleTimeString('pt-br')}`;
}
</script>

<template>
    <Layout>
        <PageTitle>
            Dashboard
        </PageTitle>

        <div class="row">
            <div class="col-sm-4">
                <CardInfo title="Itens disponíveis estoque" :value="(dashboardCards.estoque ?? 0).toString()">
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
                <CardInfo title="Clientes" :value="(dashboardCards.clientes ?? 0).toString()">
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
                <CardInfo title="Faturamento" :value="(dashboardCards.faturamento ?? 0).toLocaleString('pt-br', {
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
            <table class="table table-hover my-0">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th class="d-none d-xl-table-cell">Entrada</th>
                        <th class="d-none d-xl-table-cell">Saída</th>
                        <th>Quarto</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="historico in historicoQuartos">
                        <td>{{ historico.customer?.name ?? `DESCONHECIDO` }} </td>
                        <td class="d-none d-xl-table-cell">{{ toBrDate(historico.enterAt) }}</td>
                        <td class="d-none d-xl-table-cell">{{ toBrDate(historico.leaveAt) }}
                        </td>
                        <td>#{{ (historico.bedroom as any).number }}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </Layout>
</template>
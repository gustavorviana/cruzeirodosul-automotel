<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref } from 'vue';

const rooms = ref<Room[]>([
    {
        id: 1,
        ocupationInfo: {
            customer: {
                id: 1,
                name: "Marcos Almeida"
            },
            startAt: new Date(),
            timeInfo: "5 minuto"
        }
    },

    {
        id: 2,
        ocupationInfo: {
            customer: {
                id: 1,
                name: "Rodolfo"
            },
            startAt: new Date(),
            timeInfo: "11 minuto"
        }
    },
    {
        id: 3,
        ocupationInfo: null
    }
]);
</script>

<template>
    <Layout>
        <PageTitle>
            Quartos
        </PageTitle>

        <Card>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width:5%;">Nº</th>
                        <th style="width:35%">Cliente ocupando</th>
                        <th class="d-none d-md-table-cell" style="width:35%">Início ocupação</th>
                        <th>Tempo ocupação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="room in rooms">
                        <td>#{{ room.id }}</td>
                        <td>{{ room.ocupationInfo?.customer?.name ?? '-' }}</td>
                        <td class="d-none d-md-table-cell">{{ room.ocupationInfo?.startAt?.toLocaleString() ?? '-' }}</td>
                        <td class="d-none d-md-table-cell">{{ room.ocupationInfo?.timeInfo ?? '-' }}</td>
                        <td class="table-action">
                            <a href="#">
                                <Icon icon="edit" />
                            </a>
                            <a href="#">
                                <Icon icon="trash-2" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </Layout>
</template>
<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import CreateUserModal from '@/components/Modals/Customer/CreateUserModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { axios } from '@/Defaults';
import { ref } from 'vue';
import { refreshSystemIcons, showAxiosError } from '../utils';

const showEdit = ref(false);
const users = ref<User[]>([]);

refresh();

async function refresh() {
    return axios.get('api/usuarios')
        .then(data => users.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => showAxiosError(e, 'Não foi possível listar os usuários. ' + e));
}

async function showCreateUser(usuario?: User) {
    showEdit.value = true;
}
</script>

<template>
    <Layout>
        <PageHeader>
            <template v-slot:title>
                <PageTitle>
                    Usuários
                </PageTitle>
            </template>
            <button class="btn btn-primary" @click="() => showCreateUser()">Cadastrar</button>
        </PageHeader>

        <Card>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width:50px">Id</th>
                        <th class="d-none d-md-table-cell">Nome</th>
                        <th class="d-none d-md-table-cell">E-mail</th>
                        <th class="d-none d-md-table-cell">Grupo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{ user.id }}</td>
                        <td class="d-none d-md-table-cell">{{ user.name }}</td>
                        <td class="d-none d-md-table-cell" v-if="user.id != 1">{{ user.email }}</td>
                        <td class="d-none d-md-table-cell" v-if="user.id == 1">Indisponível</td>
                        <td class="d-none d-md-table-cell">{{ user.group?.name ?? 'Indisponível' }}</td>
                        <td class="table-action">
                            <a href="#">
                                <Icon icon="settings" />
                            </a>
                            <a href="#">
                                <Icon icon="trash-2" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <CreateUserModal :isCreateOpen="showEdit" />
    </Layout>
</template>
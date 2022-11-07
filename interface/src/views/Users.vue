<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import CreateUserModal from '@/components/Modals/Customer/CreateUserModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { axios } from '@/Defaults';
import { getCurrentUser } from '@/utils/UserUtils';
import { ref } from 'vue';
import { refreshSystemIcons, showAxiosError } from '../utils';

const showEdit = ref(false);
const users = ref<User[]>([]);
const toUpdate = ref<User>();

refresh();

function saveItem(usuario: User) {
    if (toUpdate.value) {
        axios.patch('api/usuarios/' + toUpdate.value.id, usuario)
            .then(() => {
                toUpdate.value = undefined;
                showEdit.value = false;
                return refresh();
            })
            .catch((e) => showAxiosError(e, 'Ocorreu um erro interno.'));
        return;
    }

    axios.post('api/usuarios', usuario)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Ocorreu um erro interno.'));
}

async function refresh() {
    return axios.get('api/usuarios')
        .then(data => users.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => showAxiosError(e, 'Não foi possível listar os usuários. ' + e));
}

async function showCreateUser(usuario?: User) {
    showEdit.value = true;
    toUpdate.value = usuario;
}

function deleteItem(id: number) {
    if (!confirm('Deseja realmente apagar esse usuario ?'))
        return;

    axios.delete('api/usuarios/' + id)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Não foi possível apagar o usuario.'));
}

function canDelete(user: User) {
    if (user.id == 1)
        return false;

    return Number(getCurrentUser()?.id) != Number(user.id)
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
                            <a href="#" @click="() => showCreateUser(user)">
                                <Icon icon="settings" />
                            </a>
                            <a href="#" v-if="canDelete(user)" @click="() => deleteItem(user.id)">
                                <Icon icon="trash-2" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <CreateUserModal :isCreateOpen="showEdit" @onCancel="() => showEdit = false" :item="toUpdate"
            @onSave="saveItem" />
    </Layout>
</template>
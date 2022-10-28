<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import Modal from '@/components/Modal.vue';
import NumericInput from '@/components/NumericInput.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { Url } from '@/Defaults';
import axios from 'axios';
import { ref } from 'vue';
import { toBrDate, refreshSystemIcons } from '../utils';

const isCreateOpen = ref(false);
const roomNumber = ref<number | string>('');

const rooms = ref<Room[]>([]);

refresh();

function saveNewRoom() {
    if (roomNumber.value === '')
        return alert('Digite um número para o quarto.');

    const id = Number(roomNumber.value);
    if (id == 0)
        return alert('Não e possível cadastrar um quarto de número "0".');

    if (hasId(id))
        return alert('Um quarto com esse número já foi registrado.');

    isCreateOpen.value = false;

    axios.post(Url + 'api/rooms', { roomNumber: roomNumber.value })
        .then(data => rooms.value = data.data)
        .then(() => refresh());
}

function hasId(id: number) {
    return !!rooms.value.find(r => r.id == id);
}

function showCreateRoomModal() {
    roomNumber.value = '';
    isCreateOpen.value = true;
}

function cancelCreate() {
    isCreateOpen.value = false;
    roomNumber.value = '';
}

function deleteRoom(id: number) {
    if (!confirm('Deseja realmente apagar esse quarto ?'))
        return;

    axios.delete(Url + 'api/rooms', { data: { id } })
        .then(data => rooms.value = data.data)
        .then(() => refresh());
}

async function refresh() {
    return axios.get(Url + 'api/rooms')
        .then(data => rooms.value = data.data)
        .then(() => refreshSystemIcons());
}
</script>

<template>
    <Layout>
        <PageHeader>
            <template v-slot:title>
                <PageTitle>
                    Quartos
                </PageTitle>
            </template>
            <button class="btn btn-primary" @click="showCreateRoomModal">Cadastrar</button>
        </PageHeader>

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
                        <td>#{{ room.roomNumber }}</td>
                        <td>{{ room.ocupationInfo?.customer?.name ?? '-' }}</td>
                        <td class="d-none d-md-table-cell">{{ toBrDate(room.ocupationInfo?.startAt)
                        }}
                        </td>
                        <td class="d-none d-md-table-cell">{{ room.ocupationInfo?.timeInfo ?? '-' }}</td>
                        <td class="table-action">
                            <a href="#" @click="() => deleteRoom(room.id)">
                                <Icon icon="trash-2" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <Modal title="Cadastrar um novo quarto" :is-open="isCreateOpen" @close="cancelCreate">
            <div class="mb-3">
                <label class="form-label">Nº do quarto</label>
                <NumericInput :value="roomNumber" @input="e => roomNumber = e"
                    placeholder="Digite o número do quarto" />
            </div>
            <template v-slot:button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="cancelCreate">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="saveNewRoom">Cadastrar</button>
            </template>
        </Modal>
    </Layout>
</template>
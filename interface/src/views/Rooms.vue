<script setup lang="ts">
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';
import Modal from '@/components/Modal.vue';
import NumericInput from '@/components/NumericInput.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { axios } from '@/Defaults';
import { ref } from 'vue';
import { toBrDate, refreshSystemIcons, showAxiosError } from '../utils';
import RoomOptionsModal from '@/components/Modals/Customer/RoomOptionsModal.vue';
import RoomInfo from '@/components/RoomInfo.vue';

const isCreateOpen = ref(false);
const roomNumber = ref<number | string>('');
const roomOption = ref<Room>();

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

    axios.post('api/quartos', { roomNumber: roomNumber.value })
        .then(data => rooms.value = data.data)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Falha ao criar um novo quarto.'));
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

    axios.delete('api/quartos', { data: { id } })
        .then(data => rooms.value = data.data)
        .then(() => refresh())
        .catch((e) => showAxiosError(e, 'Não foi possível apagar o quarto.'));
}

function closeOptionsModal() {
    roomOption.value = undefined;
    refresh();
}

function showOptionsModal(id: number) {
    axios.get('api/quartos/' + id)
        .then(data => roomOption.value = data.data)
        .catch((e) => showAxiosError(e, 'Não foi possível recuperar informações do quarto.'));
}

async function refresh() {
    return axios.get('api/quartos')
        .then(data => rooms.value = data.data)
        .then(() => refreshSystemIcons())
        .catch((e) => showAxiosError(e, 'Não foi possível listar os quartos.'));
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
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <RoomInfo v-for="room in rooms" :room="room" @on-delete="() => deleteRoom(room.id)"
                        @on-edit="() => showOptionsModal(room.id)" />
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
        <RoomOptionsModal :is-open="!!roomOption" :room="roomOption" @on-close="closeOptionsModal" @refresh="refresh" />
    </Layout>
</template>
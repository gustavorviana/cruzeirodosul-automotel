<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import InputGroup from '@/components/Form/InputGroup.vue';
import { onUpdated, ref } from 'vue';
import { axios } from '@/Defaults';
import { showAxiosError } from '@/utils';
import CustomerAutoComplete from '@/components/CustomerAutoComplete.vue';
import StockAutoComplete from '@/components/StockAutoComplete.vue';
import { LimparQuarto } from '@/Permissions';
import { hasPermission } from '@/utils/UserUtils';

const props = defineProps<{
    isOpen: boolean,
    room?: Room
}>()
let lastIsOpen = false;
const consumos = ref<Consumption[]>();
const selectedCustomer = ref<Customer>();
const selectedStock = ref<Stock>();
const qtdItemStock = ref<string>('1');

const emit = defineEmits(['onClose', 'refresh']);

function liberarQuarto() {
    if (!confirm('Deseja realmente liberar o quarto ?'))
        return;

    axios.post(`api/quartos/${props.room?.id}/desocupar`)
        .then(() => emit('onClose'))
        .catch((e) => showAxiosError(e, 'Não foi possível liberar o quarto.'));
}

function ocuparQuarto() {
    if (!confirm('Deseja realmente ocupar o quarto ?'))
        return;

    if (!selectedCustomer.value)
        return alert('Um cliente deve ser selecionado.');

    axios.post(`api/quartos/${props.room?.id}/ocupar`, { idCustomer: selectedCustomer.value.id })
        .then(() => emit('onClose'))
        .catch((e) => showAxiosError(e, 'Não foi possível ocupar o quarto.'));
}

function limparQuarto() {
    axios.post(`api/quartos/${props.room?.id}/limpar`)
        .then(() => {
            emit('onClose');
            alert('Quarto limpo com sucesso');
        })
        .catch((e) => showAxiosError(e, 'Não foi possível sinalizar que o quarto foi limpo. ' + e));
}

function addStockProduct() {
    const qtd = Number(qtdItemStock.value);
    if (Number.isNaN(qtd) || qtd < 1)
        return alert('Você pode adicionar no mínimo 1 produto.');

    if (!selectedStock.value)
        return alert('Um produto deve ser selecionado.');

    if (!confirm(`Deseja realmente adicionar o produto ${selectedStock.value?.productName} ?`))
        return;

    axios.post(`api/consumos`, { idQuarto: props.room?.id, idProduto: selectedStock.value?.id, quantity: qtd })
        .then(() => refreshConsumos())
        .catch((e) => showAxiosError(e, 'Não foi possível adicionar o produto na lista de consumidos.'));
}

onUpdated(() => {
    if (lastIsOpen == props.isOpen)
        return;

    lastIsOpen = props.isOpen;

    if (lastIsOpen && props.room?.id)
        refreshConsumos();

    if (!lastIsOpen) {

    }
});

function refreshConsumos() {
    return axios.get(`api/consumos/${props.room?.id}`)
        .then(data => consumos.value = data.data)
        .catch((e) => showAxiosError(e, 'Não foi possível listar os items do estoque. ' + e));
}
</script>

<template>
    <Modal title="Opções do quarto" :is-open="isOpen" @close="() => emit('onClose')">
        <InputGroup v-if="!props.room?.ocupationInfo && props.room?.cleared" header="Cliente que vai ocupar o quarto">
            <CustomerAutoComplete @on-select="c => selectedCustomer = c" />
        </InputGroup>

        <p v-if="!props.room?.ocupationInfo && !props.room?.cleared">O quarto foi desocupado mas ainda não foi limpo</p>

        <div v-if="props.room?.ocupationInfo">
            <h5>Produtos consumidos</h5>
            <InputGroup v-if="props.room?.ocupationInfo" header="Adicionar produto">
                <div style="display: flex;">
                    <StockAutoComplete style="width: 100%;" @on-select="item => selectedStock = item" />
                    <input class="form-control" placeholder="Qtd" type="number" v-model="qtdItemStock"
                        style="width: 80px; margin-left: 10px;" min="1" />

                    <button style="margin-left: 10px;" class="btn btn-warning" @click="addStockProduct">Add</button>
                </div>
            </InputGroup>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th class="d-none d-md-table-cell">Qtd.</th>
                        <th>R$ total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in consumos">
                        <td>{{ item.name }}</td>
                        <td class="d-none d-md-table-cell">{{ item.quantity }}
                        </td>
                        <td class="d-none d-md-table-cell">{{ item.total.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            })
                        }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template v-slot:button>
            <button v-if="!!props.room?.ocupationInfo" class="btn btn-warning" @click="liberarQuarto">Liberar
                quarto</button>
            <button v-if="!props.room?.ocupationInfo && props.room?.cleared" class="btn btn-warning"
                @click="ocuparQuarto" :disabled="!selectedCustomer">Ocupar
                quarto</button>

            <button v-if="!props.room?.ocupationInfo && !props.room?.cleared && hasPermission(LimparQuarto)" class="btn btn-warning"
                @click="limparQuarto">Limpar o quarto</button>
        </template>
    </Modal>
</template>
<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import InputGroup from '@/components/Form/InputGroup.vue';
import { ref } from 'vue';
import { axios } from '@/Defaults';
import { showAxiosError } from '@/utils';
import CustomerAutoComplete from '@/components/CustomerAutoComplete.vue';
import StockAutoComplete from '@/components/StockAutoComplete.vue';

const props = defineProps<{
    isOpen: boolean,
    room?: Room
}>()
const selectedCustomer = ref<Customer>();
const selectedStock = ref<Stock>();
const qtdItemStock = ref<string>('1');

const emit = defineEmits(['onClose']);

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

function addStockProduct() {
    const qtd = Number(qtdItemStock.value);
    if (Number.isNaN(qtd) || qtd < 1)
        return alert('Você pode adicionar no mínimo 1 produto.');

    if (!selectedStock.value)
        return alert('Um produto deve ser selecionado.');

    if (!confirm(`Deseja realmente adicionar o produto ${selectedStock.value?.productName} ?`))
        return;

    axios.post(`api/quartos/${props.room?.id}/consumir`, { idQuarto: props.room?.id, idProduto: selectedStock.value?.id, quantity: qtd })
        .then(() => {
            emit('onClose');
            selectedStock.value = undefined;
        })
        .catch((e) => showAxiosError(e, 'Não foi possível adicionar o produto na lista de consumidos.'));
}

</script>

<template>
    <Modal title="Opções do quarto" :is-open="isOpen" @close="() => emit('onClose')">
        <InputGroup v-if="!props.room?.ocupationInfo" header="Cliente que vai ocupar o quarto">
            <CustomerAutoComplete @on-select="c => selectedCustomer = c" />
        </InputGroup>

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
                    <tr v-for="item in room?.consumptions">
                        <td>{{ item.name }}</td>
                        <td class="d-none d-md-table-cell">{{ item.quantity }}
                        </td>
                        <td class="d-none d-md-table-cell">{{ item.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <template v-slot:button>
            <button v-if="!!props.room?.ocupationInfo" class="btn btn-warning" @click="liberarQuarto">Liberar
                quarto</button>
            <button v-if="!props.room?.ocupationInfo" class="btn btn-warning" @click="ocuparQuarto"
                :disabled="!selectedCustomer">Ocupar
                quarto</button>
        </template>
    </Modal>
</template>
<script setup lang="ts">
import { toBrDate } from '@/utils';
import { computed, ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';
import { TimeService } from '@/utils/TimeService';
import Icon from './Icon.vue';

const emit = defineEmits<{
    (e: 'onDelete'): void
    (e: 'onEdit'): void
}>();

let intervalHandle = 0;
const tempoOcupado = ref<string>('-');
const props = defineProps<{ room: Room }>();
const status = computed(() => {
    if (!props.room.ocupationInfo)
        return props.room.cleared ? 'Desocupado' : 'Aguardando limpeza';

    return 'Ocupado';
});

refreshInfo();

onMounted(() => {
    intervalHandle = setInterval(() => refreshInfo(), 1000);
});

function refreshInfo() {
    if (!props.room.ocupationInfo?.startAt)
        return tempoOcupado.value = '-';

    const startAt = new Date(props.room.ocupationInfo?.startAt as any);
    tempoOcupado.value = new TimeService((new Date().getTime() - startAt.getTime())).info;
}

onUnmounted(() => {
    if (intervalHandle)
        clearInterval(intervalHandle);
});
</script>

<template>
    <tr>
        <td>#{{ room.roomNumber }}</td>
        <td>{{ room.ocupationInfo?.customer?.name ?? '-' }}</td>
        <td class="d-none d-md-table-cell">{{ toBrDate(room.ocupationInfo?.startAt) }}</td>
        <td class="d-none d-md-table-cell">{{ tempoOcupado }}</td>
        <td>{{ status }}</td>
        <td class="table-action">
            <a href="#" @click="() => emit('onEdit')">
                <Icon icon="settings" />
            </a>
            <a href="#" @click="() => emit('onDelete')">
                <Icon icon="trash-2" />
            </a>
        </td>
    </tr>
</template>
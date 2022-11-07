<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    groupId?: number
}>();

const groups = ref<Group[]>([]);
const emit = defineEmits<{
    (e: 'onSelect', group: Group | null): void
}>();

function onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const group = groups.value.find(g => g.id == Number(select.value)) ?? null;
    emit('onSelect', group);
}

axios.get('/api/grupos')
    .then(r => groups.value = r.data);

</script>

<template>
    <select class="form-select mb-3" @change="e => onChange(e)">
        <option v-for="group in groups" :value="group.id" :selected="group.id == props.groupId">{{ group.name }}
        </option>
    </select>
</template>
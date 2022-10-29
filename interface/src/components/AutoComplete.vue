<script setup lang="ts">
import { ref } from 'vue';

const hasFocus = ref(false);
const text = ref();

const props = defineProps({
    width: [Number, String],
    items: Array,
    style: String
});

const emit = defineEmits(['select', 'textChange']);
</script>

<template>
    <div>
        <input v-model="text" type="text" :style="`width: ${props.width}px;${style}`"
            @change="e => emit('textChange', (e.target as HTMLInputElement).value)" @focusin="() => hasFocus = true"
            @focusout="() => hasFocus = false" />
        <ul v-if="hasFocus && text && props.items" :style="`width: ${props.width}px;${style}`" class="autocomplete">
            <li v-for="item in (props.items as any[])" @change="e => emit('select', item)">
                <slot name="table-tr" v-bind="{ item }" />
            </li>
        </ul>
    </div>
</template>
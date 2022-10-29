<script setup lang="ts">
import { ref } from 'vue';

const hasFocus = ref(false);
const text = ref();

const props = defineProps<
    {
        items: string[];
    }>();

const emit = defineEmits(['select', 'textChange']);
let timeoutHandle: number | null = null;

function onTextChange(e: KeyboardEvent) {
    if (timeoutHandle)
        return;

    timeoutHandle = setTimeout(() => {
        emit('textChange', e);
        timeoutHandle = null;
    }, 200);
}

function select(index: number) {
    // hasFocus.value = false;
    text.value = props.items[index];
    emit('select', index);
}

function onFocusOut() {
    setTimeout(() => hasFocus.value = false, 150)
}
</script>

<template>
    <div>
        <input v-model="text" type="text" class="form-control" @keydown="onTextChange" @focusin="() => hasFocus = true"
            @focusout="onFocusOut" />
        <ul v-if="hasFocus && text && (props.items?.length ?? 0) > 0" class="autocomplete">
            <li v-for="item, index in props.items" @click="() => select(index)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
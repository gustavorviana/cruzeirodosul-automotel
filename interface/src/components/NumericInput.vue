<script setup lang="ts">
const emit = defineEmits(['input']);

defineProps<{
    value?: string | number,
    placeholder?: string,
}>()

function onInput(e: InputEvent) {
    emit('input', (e.target as HTMLInputElement).value)
}

function onKeyDown(e: KeyboardEvent) {
    if (e.key.length > 1 || e.ctrlKey)
        return;

    const val = Number(e.key);
    if (!(val >= 0 && val <= 9))
        return e.preventDefault();
}
</script>

<template>
    <input type="text" class="form-control" :placeholder="$props.placeholder" :value="$props.value" @input="onInput"
        @keydown="onKeyDown">
</template>

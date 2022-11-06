<script setup lang="ts">
const props = defineProps<{
    title?: string;
    description?: string
    value: string;
}>();
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col mt-0">
                    <h5 class="card-title">{{ props.title }}</h5>
                </div>
                <div class="col-auto">
                    <div class="stat text-primary">
                        <slot />
                    </div>
                </div>
            </div>
            <h1 class="mt-1 mb-3">{{ props.value }}</h1>
            <div class="mb-0" v-if="props.description">{{ props.description }}</div>
        </div>
    </div>
</template>
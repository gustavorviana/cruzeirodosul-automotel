<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";

defineProps<{
    to: RouteLocationRaw;
    name: string;

    icon?: string;
}>()
</script>

<template>
    <RouterLink custom :to="$props.to" v-slot="{ isActive, href, navigate }">
        <li :class="['sidebar-item', isActive ? 'active' : '']">
            <a class="sidebar-link" :href="href" @click="(e) => navigate(e)">
                <i v-if="$props.icon" class="align-middle" :data-feather="$props.icon"></i> <span
                    class="align-middle">{{ $props.name }}</span>
            </a>
        </li>
    </RouterLink>
</template>
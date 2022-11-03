<script setup lang="ts">
import { RouterLink } from "vue-router";
import MenuLink from '../components/MenuLink.vue'
import SidebarHeader from '../components/SidebarHeader.vue'
</script>

<template>
    <nav id="sidebar" class="sidebar js-sidebar">
        <div class="sidebar-content js-simplebar">
            <RouterLink class="sidebar-brand" to="/">
                <span class="align-middle">Automotel</span>
            </RouterLink>

            <ul class="sidebar-nav">
                <SidebarHeader>
                    Páginas
                </SidebarHeader>

                <MenuLink to="/" name="Dashboard" icon="sliders" />
                <MenuLink to="/quartos" name="Quartos" icon="home" />
                <MenuLink to="/clientes" name="Clientes" icon="users" />
                <MenuLink to="/estoque" name="Estoque" icon="list" />
            </ul>
        </div>
    </nav>
</template>
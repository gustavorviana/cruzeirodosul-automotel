<script setup lang="ts">
import { hasPermission } from "@/utils/UserUtils";
import { RouterLink } from "vue-router";
import MenuLink from '../components/MenuLink.vue'
import SidebarHeader from '../components/SidebarHeader.vue'
import { GerenciarQuarto, GerenciarClientes, GerenciarEstoque, LimparQuarto } from '../Permissions';
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
                <MenuLink to="/quartos" name="Quartos" icon="home" v-if="hasPermission(GerenciarQuarto) || hasPermission(LimparQuarto)" />
                <MenuLink to="/clientes" name="Clientes" icon="users" v-if="hasPermission(GerenciarClientes)"/>
                <MenuLink to="/estoque" name="Estoque" icon="list" v-if="hasPermission(GerenciarEstoque)"/>
            </ul>
        </div>
    </nav>
</template>
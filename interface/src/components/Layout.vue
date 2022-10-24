<script setup lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import { logoutUser } from "../utils/UserUtils";
</script>
<script lang="ts">
export default defineComponent({
    methods: {
         logout() {
            logoutUser();
            this.$router.push('/login')
        }
    }
});
</script>

<template>
    <div class="wrapper">
        <Sidebar />

        <div class="main">
            <nav class="navbar navbar-expand navbar-light navbar-bg">
                <a class="sidebar-toggle js-sidebar-toggle" style="margin-left: 10px;">
                    <i class="hamburger align-self-center"></i>
                </a>

                <div class="navbar-collapse collapse" style="margin-right: 10px;">
                    <ul class="navbar-nav navbar-align">
                        <li class="nav-item dropdown">
                            <a href="#" @click="logoutUser">
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="content">
                <div class="container-fluid p-0">
                    <slot></slot>
                </div>
            </main>
        </div>
    </div>
</template>
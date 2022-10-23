<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="wrapper">
        <Sidebar />

        <div class="main">
            <nav class="navbar navbar-expand navbar-light navbar-bg">
                <a class="sidebar-toggle js-sidebar-toggle">
                    <i class="hamburger align-self-center"></i>
                </a>

                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav navbar-align">
                        <li class="nav-item dropdown">
                            <RouterLink to="/logout">
                                Sair
                            </RouterLink>
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
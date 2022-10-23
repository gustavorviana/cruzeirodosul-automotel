<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="wrapper">
        <Sidebar />

        <div class="main">

            <main class="content">
                <div class="container-fluid p-0">
                    <slot></slot>
                </div>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import Card from '../components/Card.vue'
import InputGroup from '../components/Form/InputGroup.vue'
import Alert from '../components/Alert.vue'
import { loginUser } from "../utils/UserUtils";
import { defineComponent } from 'vue';
</script>

<script lang="ts">
export default 
defineComponent({
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async login(e: Event) {
            e.preventDefault();

            try {
                await loginUser(this.email, this.password);
                this.$router.push('/')
                this.errorMessage = "";
            } catch (error: any) {
                this.errorMessage = error.response.data.message;
            }
        }
    }
});
</script>

<template>
    <main class="d-flex w-100">
        <div class="container d-flex flex-column">
            <div class="row vh-100">
                <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                    <div class="d-table-cell align-middle">

                        <div class="text-center mt-4">
                            <h1 class="h2">Entre para continuar</h1>
                        </div>
                        <Alert v-if="errorMessage" can-dismiss>{{ errorMessage }}</Alert>
                        <Card>
                            <div class="m-sm-4">
                                <form @submit="login">
                                    <InputGroup header="Email">
                                        <input class="form-control form-control-md" type="email"
                                            placeholder="Insira seu email" v-model="email" />
                                    </InputGroup>

                                    <InputGroup header="Senha">
                                        <input class="form-control form-control-md" type="password"
                                            placeholder="insira sua senha" v-model="password" />
                                    </InputGroup>

                                    <div class="text-center mt-3">
                                        <button type="submit" class="btn btn-lg btn-primary">Entrar</button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
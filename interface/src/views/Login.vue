<script setup lang="ts">
import Card from '../components/Card.vue'
import InputGroup from '../components/Form/InputGroup.vue'
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

                        <Card>
                            <div class="m-sm-4">
                                <form>
                                    <InputGroup header="Email">
                                        <input class="form-control form-control-md" type="email"
                                            placeholder="Insira seu email" />
                                    </InputGroup>

                                    <InputGroup header="Senha">
                                        <input class="form-control form-control-md" type="password"
                                            placeholder="insira sua senha" />
                                    </InputGroup>

                                    <div class="text-center mt-3">
                                        <a href="/" class="btn btn-lg btn-primary">Entrar</a>
                                        <!-- <button type="submit" class="btn btn-lg btn-primary">Entrar</button> -->
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
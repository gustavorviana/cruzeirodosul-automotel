import express from 'express';
import route from './routes';
import cors from 'cors';
import db from './config/db'
import { configureGroupPermissions, configureGroups, configurePermissions, configureUsers } from './config/ModelConfig';

export default async function () {
    console.log('Verificando banco de dados...');

    await db.authenticate();
    await configurePermissions();
    await configureGroups();
    await configureUsers();
    await configureGroupPermissions();

    console.log("Iniciando express...");

    const app = express();

    console.log("Registrando middlewares...");

    app.use(cors());
    app.use(express.json())
    app.use(express.static('../interface/dist'));

    console.log('Registrando rotas...');

    app.use(route);
    return app;
};


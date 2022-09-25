import express from 'express';
import route from './routes';
import cors from 'cors';
import auth from './middleware/AuthMiddleware';
import { checkConnection, connect } from './config/db'

export default async function () {
    console.log('Verificando banco de dados...');
    
    await checkConnection();
    console.log("Iniciando express...");

    const app = express();

    console.log("Registrando middlewares...");

    app.use(cors());
    app.use(auth);
    app.use(express.json())
    app.use(express.static('../interface/dist/interface'));

    console.log('Registrando rotas...');

    app.use(route);
    return app;
};
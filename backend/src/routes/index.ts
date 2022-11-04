import { Router, Request, Response } from 'express';
import path from 'path';
import LoginController from '../controller/Login';
import LogoutController from '../controller/Logout';
import * as Room from '../controller/Room';
import * as Stock from '../controller/Stock';
import * as Customer from '../controller/Customer';
import auth from '../middleware/AuthMiddleware';

const route = Router();

route.use((request, response, next) => {
    if (request.url.startsWith('/api'))
        return next();

    response.sendFile(path.resolve(__dirname, '../../../interface/dist/index.html'));
});

route.get('/api', (_, res) => res.json({ message: 'Ok.' }));
route.post('/api/logar', _(LoginController));
route.post('/api/deslogar', _(LogoutController));
route.use(auth);

//Quartos
route.get('/api/quartos', _(Room.index));
route.get('/api/quartos/:id', _(Room.get));
route.post('/api/quartos/:id/desocupar', _(Room.freeRoom));
route.post('/api/quartos/:id/ocupar', _(Room.setCustommer));
route.post('/api/quartos/:id/consumir', _(Room.consumirProduto));
route.post('/api/quartos', _(Room.register));
route.delete('/api/quartos', _(Room.deleteRequest));

//Clientes
route.get('/api/clientes', _(Customer.index));
route.get('/api/clientes/:id', _(Customer.get));
route.post('/api/clientes', _(Customer.register));

//Estoque
route.get('/api/estoque', _(Stock.index));
route.get('/api/estoque/:id', _(Stock.get));
route.post('/api/estoque', _(Stock.create));
route.patch('/api/estoque/:id', _(Stock.update));
route.delete('/api/estoque/:id', _(Stock.destroy));

function _(route: (req: Request, res: Response) => Promise<any>) {
    return (req: Request, res: Response) => {
        route(req, res).catch((error: Error) => {
            try {
                console.error(error);
                res.status(500).json({ message: error.message });
            } catch (error) {

            }
        })
    };
}
export default route;

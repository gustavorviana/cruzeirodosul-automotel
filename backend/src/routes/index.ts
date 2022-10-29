import { Router, Request, Response } from 'express';
import path from 'path';
import LoginController from '../controller/Login';
import LogoutController from '../controller/Logout';
import * as Room from '../controller/Room';
import * as RoomHistory from '../controller/RoomHistory';
import * as Customer from '../controller/Customer';
import { getUserFromRequest } from '../services/SessionService';

const route = Router();

route.use((request, response, next) => {
    if (request.url.startsWith('/api'))
        return next();

    response.sendFile(path.resolve(__dirname, '../../../interface/dist/index.html'));
});

route.use((req, res, next) => {
    if (!req.url.startsWith('/api') || req.url.startsWith('/api/login') || req.url.startsWith('/api/logout'))
        return next();

    getUserFromRequest(req).then(user => {
        if (!user)
            return res.status(401).json({ message: 'Você deve estar logado para essa operação.' });
        req.user = user;
        next();
    }).catch(er =>
        res.status(500).json(er)
    );
});

route.get('/api', (_, res) => res.json({ message: 'Ok.' }));
route.post('/api/login', _(LoginController));
route.post('/api/logout', _(LogoutController));

route.get('/api/rooms', _(Room.index));
route.get('/api/rooms/:id', _(Room.get));
route.post('/api/rooms', _(Room.register));
route.delete('/api/rooms', _(Room.deleteRequest));

route.post('/api/rooms/history', _(RoomHistory.register));
route.put('/api/rooms/history', _(RoomHistory.update));

route.get('/api/customers', _(Customer.index));
route.get('/api/customers/:id', _(Customer.get));
route.post('/api/customers', _(Customer.register));

function _(route: (req: Request, res: Response) => Promise<any>) {
    return (req: Request, res: Response) => {
        route(req, res).catch((error: Error) => {
            try {
                res.status(500).json({ message: error.message });
            } catch (error) {

            }
        })
    };
}
export default route;

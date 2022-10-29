import { Router } from 'express';
import path from 'path';
import LoginController from '../controller/Login';
import LogoutController from '../controller/Logout';
import * as Room from '../controller/Room';
import * as Customer from '../controller/Customer';

const route = Router();

route.use((request, response, next) => {
    if (request.url.startsWith('/api'))
        return next();

    response.sendFile(path.resolve(__dirname, '../../../interface/dist/index.html'));
});

route.get('/api', (_, res) => res.json({ message: 'Ok.' }));
route.post('/api/login', LoginController);
route.post('/api/logout', LogoutController)

route.get('/api/rooms', Room.index);
route.get('/api/rooms/:id', Room.get);
route.post('/api/rooms', Room.register);
route.delete('/api/rooms', Room.deleteRequest);

route.get('/api/customers', Customer.index);
route.get('/api/customers/:id', Customer.get);
route.post('/api/customers', Customer.register);
export default route;

import { Router } from 'express';
import path from 'path';
import LoginController from '../controller/Login';
import LogoutController from '../controller/Logout';

const route = Router();

route.use((request, response, next) => {
    if (request.url.startsWith('/api'))
        return next();

    response.sendFile(path.resolve(__dirname, '../../../interface/dist/index.html'));
});

route.get('/api', (_, res) => res.json({ message: 'Ok.' }));
route.post('/api/login', LoginController);
route.post('/api/logout', LogoutController)

export default route;

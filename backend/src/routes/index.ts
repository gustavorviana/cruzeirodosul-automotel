import { Router } from 'express';
import path from 'path';

const route = Router();

route.use((request, response, next) => {
    if (request.url.startsWith('/api'))
        return next();

    response.sendFile(path.resolve(__dirname, '../../../interface/dist/index.html'));
});

route.get('/api', (_, res) => res.json({ message: 'Ok.' }));

export default route;

import { Router } from 'express';
const route = Router();

route.get('/', (_, res) => res.json({ message: 'Ok.' }));

export default route;
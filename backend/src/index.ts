require('dotenv').config()
import app from './app';

const port = process.env.PORT;
app().then(app => app.listen(port, () => console.log(`Rodando em http://localhost:${port}.`)));
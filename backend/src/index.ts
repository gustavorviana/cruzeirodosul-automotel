import app from './app';
require('dotenv').config()

const port = process.env.PORT;
app().then(app => app.listen(port, () => console.log(`Rodando na porta ${port}.`)));
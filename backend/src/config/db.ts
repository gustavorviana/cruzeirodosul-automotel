import { Sequelize } from 'sequelize';

function configureNew() {
    const host = process.env.SQL_HOST;
    const user = process.env.SQL_USER;
    const password = process.env.SQL_PASSWORD;
    const database = process.env.SQL_DATABASE;

    if (!host || !user || !database)
        throw new Error('O banco de dados deve ser configurado!');

    return new Sequelize(database, user, password, {
        host: host,
        dialect: 'mysql',
        timezone: 'America/Sao_Paulo',
        dialectOptions: {
			timezone: "local",
		}
    });
}

export default configureNew();
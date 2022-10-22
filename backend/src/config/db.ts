import mysql from 'mysql2';

function configureNew() {
    const host = process.env.SQL_HOST;
    const user = process.env.SQL_USER;
    const password = process.env.SQL_PASSWORD;
    const database = process.env.SQL_DATABASE;

    if (!host || !user || !database)
        throw new Error('O banco de dados deve ser configurado!');

    return mysql.createConnection({
        host, user, password, database
    });
}

export function connect() {
    return new Promise<mysql.Connection>((resolve, reject) => {
        try {
            const connection = configureNew();
            connection.connect((err) => {
                if (err)
                    return reject(err);

                resolve(connection);
            })
        } catch (error) {
            reject(error);
        }
    });
};

export async function checkConnection() {
    (await connect()).end();
}
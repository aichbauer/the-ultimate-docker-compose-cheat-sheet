const fastify = require('fastify');
const cors = require('@fastify/cors');
const fastifyPostgres = require('@fastify/postgres');

const app = fastify({
  logger: true,
});
const port = 3000;
const host = '0.0.0.0';

app.register(cors);

app.register(fastifyPostgres, {
  // you should use environment variables for a production environment
  // and never put your database credentials in your code
  connectionString: 'postgres://user:password@database/database',
  ssl: false,
});

app.get('/', async (_, reply) => {
  try {
    const client = await app.pg.connect()
    const { rows } = await client.query(
      'SELECT * from messages;',
    );

    if (rows.length === 0) {
      return reply
        .status(404)
        .send({
          messages: rows,
        });
    }

    return reply
      .status(200)
      .send({
        messages: rows,
      });
  } catch (err) {
    app.log.error('error getting messages');
    app.log.error(err);

    return reply
      .status(500)
      .send({
        error: 'Internal Server Error',
      });
  }
});

app.post('/', async (_, reply) => {
  try {
    const client = await app.pg.connect();

    const { rows } = await client.query(
      'INSERT INTO messages (message) VALUES ($1) RETURNING *;',
      ['Hello World'],
    );

    return reply
      .status(201)
      .send({
        messages: rows,
      });
  } catch (err) {
    app.log.error('error creating message');
    app.log.error(err);

    return reply
      .status(500)
      .send({
        error: 'Internal Server Error',
      });
  }
});


const start = async () => {
  try {
    app.log.info(`Server listening on port ${port}`);
    try {
      await app.after();
      const client = await app.pg.connect();

      await client.query(
        'CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, message TEXT);',
      );
      app.log.info('Connected to database');
    } catch (err) {
      app.log.error('error creating table');
      app.log.error(err);
    }
    await app.listen({
      port,
      host,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start();

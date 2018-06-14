import express from 'express';
import next from 'next';
import routes from './routes';
import { loggerMiddleware, logger } from './logger';

const env = process.env.NODE_ENV || "development";
const dev = (env === 'development');
const server = express();
const app = next({ dev, dir: dev ? 'src' : 'build' });
const handler = routes.getRequestHandler(app);

app.prepare()
.then(() => {

  server.use(loggerMiddleware.logger);

  // allow the frontend to log errors to papertrail
  server.get('/log/:type', (req, res) => {
    logger[req.params.type](req.query.message);
    res.send('ok');
  });

  server.use(handler)
  server.use(loggerMiddleware.errorLogger);
  server.listen(3000, (err) => {
    if (err) {
      logger.error(">> Error when starting server", err);
      throw err
    }
    logger.info(`>> Ready on http://localhost:3000 in ${env} environment`);
  })
})
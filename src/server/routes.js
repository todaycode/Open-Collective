import path from 'path';
import nextRoutes from 'next-routes';
import { template } from 'lodash';
import fs from 'fs';

<<<<<<< HEAD
routes.add('event', '/:collectiveSlug/events/:eventSlug');
routes.add('events', '/:collectiveSlug/events');
routes.add('events', '/');
=======
const pages = nextRoutes();

pages.add('event', '/:collectiveSlug/events/:eventSlug');
pages.add('button', '/:collectiveSlug/donate/button');

module.exports = (server) => {

  server.get('/:collectiveSlug/donate/button.js', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname,'../templates/widget.js'), 'utf8');
    const compiled = template(content);
    res.setHeader('content-type', 'application/javascript');
    res.send(compiled({
      collectiveSlug: req.params.collectiveSlug,
      host: process.env.WEBSITE_URL || "http://localhost:3000"
    }))
  });

  return pages.getRequestHandler(server.next);

}
>>>>>>> 2a3fde1... new /:collectiveSlug/donate/button.js route

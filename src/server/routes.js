import path from 'path';
import nextRoutes from 'next-routes';
import _ from 'lodash';
import fs from 'fs';
import pdf from 'html-pdf';
import moment from 'moment';

<<<<<<< HEAD
routes.add('event', '/:collectiveSlug/events/:eventSlug');
routes.add('events', '/:collectiveSlug/events');
routes.add('events', '/');
=======
const pages = nextRoutes();

pages.add('createEvent', '/:collectiveSlug/events/(new|create)');
pages.add('event', '/:collectiveSlug/events/:eventSlug');
<<<<<<< HEAD
<<<<<<< HEAD
=======
pages.add('editEvent', '/:collectiveSlug/events/:eventSlug/edit');
pages.add('events', '/:collectiveSlug/events');
pages.add('events', '/');
>>>>>>> e54bb4f... create/edit event
=======
pages.add('nametags', '/:collectiveSlug/events/:eventSlug/nametags');
>>>>>>> af9cec0... /:collectiveSlug/events/:eventSlug/nametags.pdf
pages.add('button', '/:collectiveSlug/donate/button');

module.exports = (server, app) => {

  server.get('/:collectiveSlug/donate/button:size(|@2x).png', (req, res) => {
    const color = (req.query.color === 'blue') ? 'blue' : 'white';
    res.sendFile(path.join(__dirname, `../static/images/buttons/donate-button-${color}${req.params.size}.png`));
  });

  server.get('/:collectiveSlug/events/:eventSlug/nametags.pdf', (req, res) => {
    const { collectiveSlug, eventSlug, format } = req.params;
    const params = {...req.params, ...req.query};
    app.renderToHTML(req, res, 'nametags', params)
      .then((html) => {
        const options = {
          format: (format === 'A4') ? 'A4' : 'Letter',
          renderDelay: 3000
        };
        // html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'');
        const filename = `${moment().format('YYYYMMDD')}-${collectiveSlug}-${eventSlug}-attendees.pdf`;

        res.setHeader('content-type','application/pdf');
        res.setHeader('content-disposition', `inline; filename="${filename}"`); // or attachment?
        pdf.create(html, options).toStream((err, stream) => {
          stream.pipe(res);
        });
      });
  })

  server.get('/:collectiveSlug/donate/button.js', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname,'../templates/widget.js'), 'utf8');
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(content);
    res.setHeader('content-type', 'application/javascript');
    res.send(compiled({
      collectiveSlug: req.params.collectiveSlug,
      host: process.env.WEBSITE_URL || "http://localhost:3000"
    }))
  });

  return pages.getRequestHandler(server.next);

}
>>>>>>> 2a3fde1... new /:collectiveSlug/donate/button.js route

import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import pdf from 'html-pdf';
import moment from 'moment';
<<<<<<< HEAD

<<<<<<< HEAD
routes.add('event', '/:collectiveSlug/events/:eventSlug');
routes.add('events', '/:collectiveSlug/events');
routes.add('events', '/');
=======
const pages = nextRoutes();

pages.add('createEvent', '/:collectiveSlug/events/(new|create)');
pages.add('events-iframe', '/:collectiveSlug/events/iframe');
pages.add('event', '/:collectiveSlug/events/:eventSlug');
<<<<<<< HEAD
<<<<<<< HEAD
=======
pages.add('editEvent', '/:collectiveSlug/events/:eventSlug/edit');
pages.add('events', '/:collectiveSlug/events');
pages.add('transactions', '/:collectiveSlug/transactions');
pages.add('events', '/');
>>>>>>> e54bb4f... create/edit event
=======
pages.add('nametags', '/:collectiveSlug/events/:eventSlug/nametags');
<<<<<<< HEAD
>>>>>>> af9cec0... /:collectiveSlug/events/:eventSlug/nametags.pdf
pages.add('button', '/:collectiveSlug/donate/button');
=======
pages.add('button', '/:collectiveSlug/:verb(contribute|donate)/button');
>>>>>>> 4013f11... new contribute button
=======
import pages from './pages';
<<<<<<< HEAD
>>>>>>> 3e63f41... wip
=======
import { translateApiUrl } from '../lib/utils';
import request from 'request';
>>>>>>> 20155ce... work in progress

module.exports = (server, app) => {

  server.get('/favicon.*', (req, res) => res.send(404));

  server.all('/api/*', (req, res) => {
    console.log(">>> api request", translateApiUrl(req.url));
    req
      .pipe(request(translateApiUrl(req.url), { followRedirect: false }))
      .on('error', (e) => {
        console.error("error calling api", translateApiUrl(req.url), e);
        res.status(500).send(e);
      })
      .pipe(res);
  });

  server.get('/:collectiveSlug/:verb(contribute|donate)/button:size(|@2x).png', (req, res) => {
    const color = (req.query.color === 'blue') ? 'blue' : 'white';
    res.sendFile(path.join(__dirname, `../static/images/buttons/${req.params.verb}-button-${color}${req.params.size}.png`));
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

  server.get('/:collectiveSlug/:verb(contribute|donate)/button.js', (req, res) => {
<<<<<<< HEAD
    const content = fs.readFileSync(path.join(__dirname,'../templates/button.js'), 'utf8');
=======
    const content = fs.readFileSync(path.join(__dirname,'../templates/widget.js'), 'utf8');
>>>>>>> 4013f11... new contribute button
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(content);
    res.setHeader('content-type', 'application/javascript');
    res.send(compiled({
      collectiveSlug: req.params.collectiveSlug,
      verb: req.params.verb,
      host: process.env.WEBSITE_URL || `http://localhost:${process.env.PORT || 3000}`
    }))
  });

  server.get('/:collectiveSlug/events.js', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname,'../templates/events.js'), 'utf8');
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(content);
    res.setHeader('content-type', 'application/javascript');
    res.send(compiled({
      collectiveSlug: req.params.collectiveSlug,
      id: req.query.id,
      host: process.env.WEBSITE_URL || `http://localhost:${process.env.PORT || 3000}`
    }))
  });

  return pages.getRequestHandler(server.next);

}
>>>>>>> 2a3fde1... new /:collectiveSlug/donate/button.js route

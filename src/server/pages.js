import nextRoutes from 'next-routes';

const pages = nextRoutes();

pages
  .add('widgets', '/widgets')
  .add('tos', '/tos')
  .add('privacypolicy', '/privacypolicy')
  .add('redeem', '/redeem')
  .add('signin', '/signin/:token?')
  .add('button', '/:collectiveSlug/:verb(contribute|donate)/button')
  .add('createEvent', '/:parentCollectiveSlug/events/(new|create)')
  .add('events-iframe', '/:collectiveSlug/events/iframe')
  .add('event', '/:parentCollectiveSlug/events/:eventSlug')
  .add('editEvent', '/:parentCollectiveSlug/events/:eventSlug/edit')
  .add('events', '/:collectiveSlug/events')
  .add('tiers', '/:collectiveSlug/tiers')
  .add('editTiers', '/:collectiveSlug/tiers/edit')
  .add('orderCollectiveTier', '/:collectiveSlug/order/:TierId/:amount?/:interval?', 'createOrder')
  .add('orderEventTier', '/:collectiveSlug/events/:eventSlug/order/:TierId', 'createOrder')
  .add('donate', '/:collectiveSlug/:verb(donate|pay|contribute)/:amount?/:interval(month|monthly|year|yearly)?/:description?', 'createOrder')
  .add('tiers-iframe', '/:collectiveSlug/tiers/iframe')
  .add('transactions', '/:collectiveSlug/transactions')
  .add('expenses', '/:collectiveSlug/expenses')
  .add('host.expenses', '/:hostCollectiveSlug/collectives/expenses')
  .add('nametags', '/:parentCollectiveSlug/events/:eventSlug/nametags')
  .add('collective', '/:slug')
  .add('editCollective', '/:slug/edit')

  module.exports = pages;
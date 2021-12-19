import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('distribution/orders', 'OrderController.all')
}).middleware('auth:distribution')

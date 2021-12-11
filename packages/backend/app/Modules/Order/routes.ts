import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('shop/orders', 'OrderController.list')
  Route.post('shop/order', 'OrderController.create')
  Route.put('shop/order/:id', 'OrderController.update')
}).middleware('auth:user')

Route.group(() => {
  Route.get('distribution/orders', 'OrderController.all')
}).middleware('auth:distribution')

import Route from '@ioc:Adonis/Core/Route'

Route.post('shop/log', 'LogController.create')

Route.group(() => {
  Route.get('shop/logs', 'LogController.list')
}).middleware('auth:admin')

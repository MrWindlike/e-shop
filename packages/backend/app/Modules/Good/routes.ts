import Route from '@ioc:Adonis/Core/Route'

Route.get('shop/goods', 'GoodController.list')
Route.get('shop/good/:id', 'GoodController.show')
Route.group(() => {
  Route.post('shop/good', 'GoodController.create')
  Route.put('shop/good/:id', 'GoodController.update')
  Route.delete('shop/good/:id', 'GoodController.delete')
}).middleware('auth:admin')

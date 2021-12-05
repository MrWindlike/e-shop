import Route from '@ioc:Adonis/Core/Route'

Route.post('shop/login', 'UserController.login')
Route.post('shop/user', 'UserController.create')
Route.group(() => {
  Route.get('shop/user', 'UserController.show')
  Route.post('shop/logout', 'UserController.logout')
}).middleware('auth:user')
Route.group(() => {
  Route.get('shop/users', 'UserController.list')
}).middleware('auth:admin')

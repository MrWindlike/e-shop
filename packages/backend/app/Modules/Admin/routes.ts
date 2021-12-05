import Route from '@ioc:Adonis/Core/Route'

Route.post('admin/login', 'AdminController.login')

Route.group(() => {
  Route.get('admin/admin', 'AdminController.show')
  Route.get('admin/logout', 'AdminController.logout')
}).middleware('auth:admin')

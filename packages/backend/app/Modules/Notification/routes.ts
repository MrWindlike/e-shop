import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('transportation/notifications', 'NotificationController.list')
}).middleware('auth:admin')

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('distribution/notifications', 'NotificationController.list')
}).middleware('auth:distribution')

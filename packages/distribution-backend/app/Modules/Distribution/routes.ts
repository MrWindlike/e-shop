import Route from '@ioc:Adonis/Core/Route'

Route.post('distribution/login', 'DistributionController.login')

Route.group(() => {
  Route.get('distribution/admin', 'DistributionController.show')
  Route.delete('distribution/logout', 'DistributionController.logout')
}).middleware('auth:distribution')

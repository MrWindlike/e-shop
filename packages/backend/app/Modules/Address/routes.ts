import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('shop/addresses', 'AddressController.list')
  Route.post('shop/address', 'AddressController.create')
  Route.put('shop/address/:id', 'AddressController.update')
  Route.delete('shop/address/:id', 'AddressController.delete')
}).middleware('auth:user')

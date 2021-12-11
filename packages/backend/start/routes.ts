/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import 'App/Modules/User/routes'
import 'App/Modules/Admin/routes'
import 'App/Modules/Address/routes'
import 'App/Modules/Good/routes'
import 'App/Modules/Order/routes'
import 'App/Modules/Log/routes'
import 'App/Modules/Notification/routes'
import 'App/Modules/Distribution/routes'

Route.get('/', async () => {
  return { hello: 'world' }
})

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.create({
      account: 'admin',
      password: 'admin',
      role: 'admin',
    })
    await User.create({
      account: 'admin',
      password: 'admin',
      role: 'distribution',
    })
  }
}

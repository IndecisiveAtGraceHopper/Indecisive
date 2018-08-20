'use strict'

const db = require('./server/db')
const {User, Pod, Adventure, Activity, Note, Poll, UserPod} = require('./server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

//users
    const karaH = await User.create({
      firstName: 'Kara',
      lastName: 'Hirschman',
      email: 'karah@indecisive.com',
      password: '123',
      phone:2403296669,
      address: '5 Hanover Square'})

    const karaF = await User.create({
      firstName: 'Kara',
      lastName: 'Ferrari',
      email: 'karaf@indecisive.com',
      password: '123',
      phone:2039062676,
      address: '10 Hanover Square'})

    const sarah = await User.create({
      firstName: 'Sarah',
      lastName: 'Lynch',
      email: 'sarah@indecisive.com',
      password: '123',
      phone:2039062676,
      address: '20 Hanover Square'})

    const hawa = await User.create({
      firstName: 'Hawa',
      lastName: 'Sako',
      email: 'hawa@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '25 Hanover Square'})

    const sophia = await User.create({
      firstName: 'Sophia',
      lastName: 'Milano',
      email: 'sophia@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '205 Water street'})

    const rayna = await User.create({
      firstName: 'Rayna',
      lastName: 'Mauss',
      email: 'rayna@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '2 East 126th street'
    })
    const james = await User.create({
      firstName: 'James',
      lastName: 'Miao',
      email: 'James@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '4 East 126th street'})

    const lucas = await User.create({
      firstName: 'Lucas',
      lastName: 'Simoné',
      email: 'lucas@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '10 West 130th street'})

    const mia = await User.create({
      firstName: 'Mia',
      lastName: 'Carpenter',
      email: 'mia@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '10 East 99th street'})

    const alex = await User.create({
      firstName: 'Alex',
      lastName: 'Rivera',
      email: 'alex@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '140 Joralemon street'})

    const peter = await User.create({
      firstName: 'Peter',
      lastName: 'Mills',
      email: 'peter@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '111-12 Atlantic Avenue'
    })

    const matt = await User.create({
      firstName: 'Matt',
      lastName: 'Norwett',
      email: 'matt@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '140 Joralemon street'})

    const rema = await User.create({
      firstName: 'Rema',
      lastName: 'Singh',
      email: 'rema@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '5 Atlantic Avenue'})

    const brandon = await User.create({
      firstName: 'Brandon',
      lastName: 'Ortega',
      email: 'brandon@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '10 east 52nd street'})

    const jake = await User.create({
      firstName: 'Jake',
      lastName: 'Matthews',
      email: 'jake@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '12 East 12th street'})

    const silas = await User.create({
      firstName: 'Silas',
      lastName: 'Miller',
      email: 'silas@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '1 Bank Street'})

    const john = await User.create({
      firstName: 'John',
      lastName: 'McDonald',
      email: 'john@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '1433 Harrod Avenue'})

    const mitch = await User.create({
      firstName: 'Peter',
      lastName: 'Michaelson',
      email: 'michaelson@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '12 E Tremont Ave'})

    const simon = await User.create({
      firstName: 'Simon',
      lastName: 'Francis',
      email: 'simon@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '1170 Grand Concourse'})

    const carter = await User.create({
      firstName: 'Carter',
      lastName: 'Brady',
      email: 'carter@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '10 East 24th street'})

    const resse = await User.create({
      firstName: 'Reese',
      lastName: 'Pinkerton',
      email: 'reese@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '12 East 24th street'})

    const dan = await User.create({
      firstName: 'Dan',
      lastName: 'Sohval',
      email: 'dan@indecisive.com',
      password: '123',
      phone:6462281767,
      address: '5 East 110th street'})

    //pods
    const pod1 = await Pod.create({name: 'The crew'})
    const pod2 = await Pod.create({name: 'UN Friends'})
    const pod3 = await Pod.create({name: 'The Click'})
    const pod4 = await Pod.create({name: 'The Marvels'})
    const pod5 = await Pod.create({name: 'Chic Click'})
    const pod6 = await Pod.create({name: 'The ultimate pod'})
    const pod7 = await Pod.create({name: 'adventure buds'})
    const pod8 = await Pod.create({name: 'Liberados'})

    //adventure

    const adventure1 = await Adventure.create({name:'Out and About', date: Date.now(),totalCount: 4, coordinator: 4, podId:1})
    const adventure2 = await Adventure.create({name:'Catching Up', date: Date.now(), totalCount: 3, coordinator: 3, podId:5})
    const adventure3 = await Adventure.create({name:'Planning for fun', date: Date.now(), totalCount: 5, coordinator: 2, podId:2})
    const adventure4 = await Adventure.create({name:'Adventure', date: Date.now(), totalCount: 6, coordinator: 1, podId:4})
    const adventure5 = await Adventure.create({name:'Fun with Friends', date: Date.now(), totalCount: 4, coordinator: 20, podId:6})
    const adventure6 = await Adventure.create({name:'Friday night fun', date: Date.now(), totalCount: 3, coordinator: 13, podId:3})
    const adventure7 = await Adventure.create({name:'Get ready for fun', date: Date.now(), totalCount: 4, coordinator: 1, podId:7})
    const adventure8 = await Adventure.create({name:'leave your SO at home', date: Date.now(), totalCount: 6, coordinator: 19, podId:8})


    //userpod

    const userPod1 = await UserPod.create({userId: 4, podId:1})
    const userPod2 = await UserPod.create({userId: 1, podId:1})
    const userPod3 = await UserPod.create({userId: 5, podId:1})
    const userPod4 = await UserPod.create({userId: 3, podId:1})

    const userPod5 = await UserPod.create({userId: 3, podId:5})
    const userPod6 = await UserPod.create({userId: 22, podId:5})
    const userPod7 = await UserPod.create({userId: 19, podId:5})

    const userPod8 = await UserPod.create({userId: 8, podId:2})
    const userPod9 = await UserPod.create({userId: 10, podId:2})
    const userPod10 = await UserPod.create({userId: 2, podId:2})
    const userPod11 = await UserPod.create({userId: 1, podId:2})
    const userPod12 = await UserPod.create({userId: 5, podId:2})

    const userPod13 = await UserPod.create({userId: 1, podId:4})
    const userPod14 = await UserPod.create({userId: 7, podId:4})
    const userPod15 = await UserPod.create({userId: 9, podId:4})
    const userPod16 = await UserPod.create({userId: 15, podId:4})
    const userPod17 = await UserPod.create({userId: 12, podId:4})
    const userPod18 = await UserPod.create({userId: 3, podId:4})

    const userPod19 = await UserPod.create({userId: 20, podId:6})
    const userPod20 = await UserPod.create({userId: 2, podId:6})
    const userPod21 = await UserPod.create({userId: 4, podId:6})
    const userPod22 = await UserPod.create({userId: 11, podId:6})

    const userPod23 = await UserPod.create({userId: 13, podId:3})
    const userPod24 = await UserPod.create({userId: 14, podId:3})
    const userPod25 = await UserPod.create({userId: 19, podId:3})


    const userPod26 = await UserPod.create({userId: 1, podId:7})
    const userPod27 = await UserPod.create({userId: 2, podId:7})
    const userPod28 = await UserPod.create({userId: 3, podId:7})
    const userPod29 = await UserPod.create({userId: 4, podId:7})

    const userPod30 = await UserPod.create({userId: 19, podId:8})
    const userPod31 = await UserPod.create({userId: 7, podId:8})
    const userPod32 = await UserPod.create({userId: 8, podId:8})
    const userPod33 = await UserPod.create({userId: 11, podId:8})
    const userPod34 = await UserPod.create({userId: 12, podId:8})
    const userPod35 = await UserPod.create({userId: 17, podId:8})


    const nitehawkCinema = await Activity.create({date: Date.now(), address: '136 Metropolitan Ave, Brooklyn, NY', selected: false, adventureId: 1, name:'Nitehawk Cinema'})
    const bigGayIceCream = await Activity.create({date: Date.now(), address: '61 Grove St, New York, NY', selected: false, adventureId: 1, name: 'Big Gay Ice Cream Shop'})

  const board1 = await Note.create({notes: "can't wait to go rock climbing!", adventureId: 1})

  const poll1 = await Poll.create({priceRange: 4, activityLevel: 4, artsyLevel: 1, hungerLevel: 2, drinkLevel: 2, userId: 1, adventureId:1})
  const poll2 = await Poll.create({priceRange: 4, activityLevel: 4, artsyLevel: 1, hungerLevel: 2, drinkLevel: 2, userId: 2, adventureId:1})
  const poll3 = await Poll.create({priceRange: 4, activityLevel: 4, artsyLevel: 1, hungerLevel: 2, drinkLevel: 2, userId: 3, adventureId:1})
  const poll4 = await Poll.create({priceRange: 4, activityLevel: 4, artsyLevel: 1, hungerLevel: 2, drinkLevel: 2, userId: 4, adventureId:1})


  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

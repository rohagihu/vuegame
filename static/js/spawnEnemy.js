/* eslint-disable */
import store from '@/store'
import paint from './../../static/js/paint'
var Chance = require('chance') // eslint-disable-line
var chance = new Chance()

/*
 * Args:
 * 1: Anzahl
 * 2: paint them
 */

export default function spawnEnemy(anz, doPaint) {
  const arrayOfEnemies = []
  let x
  let y
  let enemyIndex
  let enemy
  let obj
  let fieldSize = store.state.field.fieldsize
  let enemiesPool = store.state.enemiesPool
  let generated = store.state.field.generated
  for (let c = 1; c <= anz; c++) {
    let goAhead = false
    do {
      let isEmptyField = true
      x = chance.integer({min: 1, max: fieldSize})
      y = chance.integer({min: 1, max: fieldSize})
      enemyIndex = chance.integer({min: 0, max: enemiesPool.length - 1})
      enemy = enemiesPool[enemyIndex]
      obj = {
        'x': x,
        'y': y,
        'icon': enemy.icon,
        'life': enemy.life
      }

      // check if new x y field is empty or already used
      store.state.enemies.map(function (obj) {
        // console.log('DEBUG: x ' + x + ' obj.x ' + obj.x  + ' y ' +  y  + ' obj.y ' +  obj.y)
        if (x === obj.x && y === obj.y) {
            isEmptyField = false;
            return 0;
        }
      })
      if (isEmptyField && ((x >= 1 && y !== 1) || (x !== 1 && y >= 1))) goAhead = true
    }
    while (!goAhead)

    // block the enemy field (set block to true)
    let fieldObj = generated.find(function (field) {
      return field.x === x && field.y === y
    })
    fieldObj.blocked = true

    // set enemy in store
    store.commit('setEnemyArray', obj)

    // paint enemy if is not an initialize for data-only
    if (doPaint) {
      paint(obj, 'enemy')
    }
  }
}
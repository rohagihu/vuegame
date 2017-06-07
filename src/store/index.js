import Vue from 'vue'
import Vuex from 'vuex'
import players from '../components/players/players'
import enemies from '../components/players/enemies'
import listenToMoveEvent from '@/../static/js/listenToMoveEvent'
var Chance = require('chance') // eslint-disable-line
var chance = new Chance()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: '',
    field: {
      fieldsize: chance.integer({min: 3, max: 10}),
      generated: [],
      fieldStack: [{
        // 0
        'color': '#000',
        'img': '',
        'blocked': true,
        'enabled': false
      },
      {
        // 1
        'color': '#3ecc02',
        'img': '',
        'blocked': false,
        'enabled': false
      },
      {
        // 2
        'color': '#0065ff',
        'img': '',
        'blocked': false,
        'enabled': false
      },
      {
        // 3
        'color': '#ff00d4',
        'img': '',
        'blocked': false,
        'enabled': false
      },
      {
        // 4
        'color': '#7BFCFE',
        'img': '',
        'blocked': false,
        'enabled': false
      },
      {
        // 5
        'color': '#FDE24E',
        'img': '',
        'blocked': false,
        'enabled': false
      },
      {
        // 6
        'color': '',
        'img': './static/img/mountain.jpg',
        'blocked': true,
        'enabled': false
      },
      {
        // 7
        'color': '',
        'img': './static/img/wasser.jpg',
        'blocked': true,
        'enabled': false
      },
      {
        // 8
        'color': '',
        'img': './static/img/wiese.jpg',
        'blocked': false,
        'enabled': true
      },
      {
        // 9
        'color': '',
        'img': './static/img/wueste.jpg',
        'blocked': false,
        'enabled': true
      },
      {
        // 10
        'color': '',
        'img': './static/img/wald1.jpg',
        'blocked': false,
        'enabled': true
      },
      {
        // 11
        'color': '',
        'img': './static/img/wald2.jpg',
        'blocked': false,
        'enabled': true
      }],
      elementSize: 0,
      siblingXOffset: 0,
      siblingYOffset: 0
    },
    playerXY: [1, 1],
    playerX: 1,
    playerY: 1,
    // ui: {
    //   'enableShooting': false
    // },
    playerIcons: [players.sheep, players.tank],
    enemiesPool: [enemies.doener, enemies.bug],
    enemies: [],
    playerHalos: ['playerHalo--purple', 'playerHalo--yellow', 'playerHalo--green', 'playerHalo--white'],
    playerIcon: '',
    playerHalo: ''
  },
  mutations: {
    setFieldsize (state, val) {
      state.field.fieldsize = val
    },
    setFieldGenerate (state) {
      state.field.fieldGenerating = false
    },
    setPlayerIcon (state, val) {
      state.playerIcon = val
    },
    setPlayerHalo (state, val) {
      state.playerHalo = val
    },
    setElementSize (state, val) {
      state.field.elementSize = val
    },
    // setEnemyArray (state, val) {
    //   state.enemies = val
    // },
    setEnemyArray (state, val) {
      state.enemies.push(val)
    },
    setElementsSiblingsOffsets (state) {
      let a11 = document.querySelectorAll('.fieldelement')[0]
      let a21 = document.querySelectorAll('.fieldelement')[1]
      let a12 = document.querySelector('[data-fieldx="1"][data-fieldy="2"]')
      state.field.siblingXOffset = a21.offsetLeft - a11.offsetLeft
      state.field.siblingYOffset = a12.offsetTop - a11.offsetTop
    },
    deleteEnemy (state, obj) {
      let index = state.enemies.indexOf(obj)
      state.enemies.splice(index, 1)
    },
    loadSaveGame (state, val) {
      state.field.fieldsize = val.fieldsize
      state.field.fieldsizeComplete = val.fieldsizeComplete
      state.playerX = val.playerX
      state.playerY = val.playerY
      state.playerHalo = val.playerHalo
      state.playerIcon = val.playerIcon
      state.field.generated = val.generated
      state.field.elementSize = val.elementSize
      console.log(val)
    },
    toggleFieldElementEnabled (state, fieldElement) {
      fieldElement.enabled = !fieldElement.enabled
    },
    pushElementToGeneratedField (state, obj) {
      state.field.generated.push(obj)
    },
    movePlayer (state, obj) {
      console.log(obj)
      state.playerX = state.playerX + obj.x
      state.playerY = state.playerY + obj.y
    },
    moveUp (state) {
      let p = state.playerY - 1
      let blocked = state.field.generated.filter((element) => {
        return element.x === state.playerX && element.y === state.playerY - 1 && element.blocked === true
      })
      p < 1 ? state.playerY = 1 : (blocked.length === 0 ? state.playerY = p : '')
      state.debug = ``
    },
    moveDown (state) {
      let p = state.playerY + 1
      let blocked = state.field.generated.filter((element) => {
        return element.x === state.playerX && element.y === state.playerY + 1 && element.blocked === true
      })
      p > state.field.fieldsize ? state.playerY = state.field.fieldsize : (blocked.length === 0 ? state.playerY = p : '')
      state.debug = ``
    },
    moveLeft (state) {
      let p = state.playerX - 1
      let blocked = state.field.generated.filter((element) => {
        return element.x === state.playerX - 1 && element.y === state.playerY && element.blocked === true
      })
      p < 1 ? state.playerX = 1 : (blocked.length === 0 ? state.playerX = p : '')
      state.debug = ``
    },
    moveRight (state) {
      let p = state.playerX + 1
      let blocked = state.field.generated.filter((element) => {
        return element.x === state.playerX + 1 && element.y === state.playerY && element.blocked === true
      })
      p > state.field.fieldsize ? state.playerX = state.field.fieldsize : (blocked.length === 0 ? state.playerX = p : '')
      state.debug = ``
    }
  },
  getters: {
    debug: (state) => state.debug,
    fieldsize: (state) => state.field.fieldsize,
    elementSize: (state) => state.field.elementSize,
    siblingsOffset: (state) => [state.field.siblingXOffset, state.field.siblingYOffset],
    fieldStack: (state) => state.field.fieldStack,
    playerHalo: (state) => state.playerHalo,
    playerHalos: (state) => state.playerHalos,
    enemies: (state) => state.enemies,
    enemiesPool: (state) => state.enemiesPool,
    generated: (state) => state.field.generated,
    playerX: (state) => state.playerX,
    playerY: (state) => state.playerY,
    getTheIndex: (state) => {
      return (state.field.fieldsize) * (state.playerY - 1) + (state.playerX - 1)
    },
    fieldsizeComplete: (state) => {
      return state.field.fieldsize * state.field.fieldsize
    },
    playerIcon: (state) => state.playerIcon,
    playerIcons: (state) => state.playerIcons,
    handlerPlayerMovement: () => {
      return function (e) {
        listenToMoveEvent(e)
      }
    }
  },
  actions: {
  }
})

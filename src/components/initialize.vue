<template>
  <div>
    <ul class="initialize">
      <li>
        <h3>Fieldsize: </h3>
        <input type="text" v-model="field.fieldsize" @keyup="chkInput">
      </li>

      <li>
        <h3>Choose Player Icon:</h3>
        <div class="">
          <span v-for="(playerIcon, key) in playerIcons" >
          <span v-html="playerIcon"></span>
            <input type="radio" v-model="choosedPlayer" :value="playerIcon">
          </span>
        </div>
      </li>

      <li>
        <h3>Choose Player Halo:</h3>
        <div class="">
          <div class="choosePlayerHalo" v-for="(halo, key) in playerHalos">
            <span :class="halo">
            <span v-html="choosedPlayer"></span>
            <input type="radio" v-model="choosedHalo" :value="halo">
            </span>
          </div>
        </div>
      </li>

      <li>
        <h3>Choose Field Elements:</h3>
        <div class="">
          <div v-for="(fieldElement, key) in fieldStack" class="fieldElementInitialize" :style="{backgroundColor: fieldElement.color, backgroundImage: 'url(' + fieldElement.img + ')'}" @click="toggleFieldElementEnabled(fieldElement)">
            <input type="checkbox" :checked="fieldElement.enabled">
          </div>
        </div>
      </li>

      <li>
        <button type="submit" @click.prevent="generateField">Generate Field</button>
      </li>

  <!--     <li>
        <h3>DEBUGGER</h3>
        <div>Player: {{choosedPlayer}}</div>
      </li> -->
    </ul>

    <loaderSavegame></loaderSavegame>
  </div>
</template>

<script>
import store from './../store'
import loaderSavegame from '@/components/build/loaderSavegame'
import { mapGetters } from 'vuex'
var Chance = require('chance') // eslint-disable-line
var chance = new Chance()

export default {
  name: 'initialize',
  data () {
    return {
      field: store.state.field,
      choosedPlayer: store.state.playerIcons[chance.integer({min: 0, max: store.state.playerIcons.length - 1})],
      choosedHalo: store.state.playerHalos[chance.integer({min: 0, max: store.state.playerHalos.length - 1})]
    }
  },
  components: {
    loaderSavegame
  },
  computed: {
    ...mapGetters([
      'fieldsize', 'fieldsizeComplete', 'playerIcons', 'playerIcon', 'fieldStack', 'generated', 'playerHalos', 'enemiesPool', 'enemies'
    ])
  },
  watch: {
  },
  methods: {
    chkInput () {
      this.field.fieldsize > 20 ? this.field.fieldsize = 20 : ''
    },
    generateField () {
      store.commit('setFieldsize', this.field.fieldsize)
      store.commit('setFieldGenerate')
      store.commit('setPlayerIcon', this.choosedPlayer)
      store.commit('setPlayerHalo', this.choosedHalo)
      // FIELD
      const anzMax = this.fieldStack.length - 1
      const windowHeight = 2 * (window.innerHeight - (this.fieldsize * 18))
      const windowWidth = window.innerWidth - (this.fieldsize * 10)
      let refSize = Math.min(windowHeight, windowWidth)
      let elementSize = Math.floor(refSize / this.fieldsize) - (Math.floor(refSize / this.fieldsize) * 1 / 2)
      store.commit('setElementSize', elementSize)
      for (let y = 1; y <= this.field.fieldsize; y++) {
        for (let x = 1; x <= this.field.fieldsize; x++) {
          let enabled = false
          // console.log('x: ' + x + ' y: ' + y)
          // console.log('enabled initialize: ' + enabled)
          while (enabled === false) {
            let giveMeIndex = chance.integer({min: 0, max: anzMax})
            enabled = this.fieldStack[giveMeIndex].enabled
            // console.log('enabled in while: ' + enabled)
            if (enabled) {
              let obj = {
                'x': x,
                'y': y,
                'blocked': this.fieldStack[giveMeIndex].blocked,
                'color': this.fieldStack[giveMeIndex].color,
                'img': this.fieldStack[giveMeIndex].img
              }
              store.commit('pushElementToGeneratedField', obj)
            }
          }
        }
      }
      // ENEMIES
      const anzEnemy = 4
      const arrayOfEnemies = []
      let x
      let y
      let enemyIndex
      let enemy
      let obj
      for (let c = 1; c <= anzEnemy; c++) {
        let goAhead = false
        do {
          x = chance.integer({min: 1, max: this.fieldsize})
          y = chance.integer({min: 1, max: this.fieldsize})
          enemyIndex = chance.integer({min: 0, max: this.enemiesPool.length - 1})
          enemy = this.enemiesPool[enemyIndex]
          obj = {
            'x': x,
            'y': y,
            'icon': enemy.icon,
            'life': enemy.life
          }
          let enemyObj = arrayOfEnemies.find(function (enemy) {
            return enemy.x === x && enemy.y === y
          })
          console.log(enemyObj)
          // if (!enemyObj || x !== 0 || y !== 0) goAhead = true
          if (!enemyObj && ((x >= 1 && y !== 1) || (x !== 1 && y >= 1))) goAhead = true
          // if (!enemyObj) goAhead = true
        }
        while (!goAhead)
        arrayOfEnemies.push(obj)

        // block the enemy field
        let fieldObj = this.generated.find(function (field) {
          return field.x === x && field.y === y
        })
        fieldObj.blocked = true
      }
      // console.log('arrayOfEnemies')
      // console.log(arrayOfEnemies)
      store.commit('setEnemyArray', arrayOfEnemies)
      this.$router.push('/world')
      // console.log(this.generated)

      // console.log(' ')
      // console.log(chance.d20())
    },
    toggleFieldElementEnabled (fieldElement) {
      store.commit('toggleFieldElementEnabled', fieldElement)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

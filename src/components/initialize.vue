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
      <div style="position: absolute; bottom: 0; right: 0;">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </ul>

    <loaderSavegame></loaderSavegame>
  </div>
</template>

<script>
import store from './../store'
import spawnEnemy from './../../static/js/spawnEnemy'
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
      spawnEnemy(4, false)
      // redirect to the world
      this.$router.push('/world')
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

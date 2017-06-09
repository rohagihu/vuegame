<template>
  <div class="ui">
    <div class="world-debugger">
      <button class="saveField" @click="saveFieldToLocalStorage">Speichern</button>
      <input type="text" v-model="saveGameName">

      <div>X: {{playerX}}</div>
      <div>Y: {{playerY}}</div>
      <div>Index: {{getTheIndex}}</div>
      <div>Fieldsize: {{fieldsize}} ({{fieldsizeComplete}})</div>
      <div>
        Field: 
        <div :style="{backgroundColor: generated[getIndex(playerX,playerY)].color, backgroundImage: 'url(' + generated[getIndex(playerX, playerY)].img + ')', width: '10px', height: '10px', display: 'inline-block'}"></div>
        <span style="margin-left: 3px;">({{generated[getIndex(playerX,playerY)].color}})</span>
      </div>
      <div>Debug: {{debug}}</div>
    </div>

    <div class="panel">
      <div class="panel__buttons">
        <button :disabled="!enableShooting" :class="{'active': enableShooting}" @click="shoot">Schießen</button>
        <button @click="triggerSpawnEnemy">Spawn Enemy</button>
        <button @click="triggerSpawnTreasure">Spawn Treasure</button>
      </div>

      <div class="panel__buttons" v-html="getEvents()">
      </div>

      <div class="panel__enemySelector">
        <h4 class="center">Select Enemy:</h4>
          <div class="selectorBoxEnemies">
            <div class="selectorBoxEnemies__enemy" :title="key" v-for="(enemy, key) in enemies" @click="selectEnemy(enemy, key)">
              <div class="enemy" v-html="enemy.icon"></div>
              <div class="life" :style="returnLifeBar(enemy.life)"></div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import componentName from '@/components/--Path'
import store from './../../store'
import spawnEnemy from './../../../static/js/spawnEnemy'
import checkForEvents from './../../../static/js/checkForEvents'
import { mapGetters } from 'vuex'
import movejs from 'movejs'
import paint from './../../../static/js/paint'
export default {

  name: 'ui',

  data () {
    return {
      saveGameName: 'Game ' + localStorage.length,
      selectedEnemy: [store.state.enemies[0].x, store.state.enemies[0].y],
      enableShooting: false
    }
  },
  computed: {
    ...mapGetters([
      'fieldsize', 'fieldsizeComplete', 'playerX', 'playerY', 'playerHalo', 'playerIcon', 'generated', 'elementSize', 'getTheIndex', 'debug', 'enemies', 'objects',
      'events'
    ])
  },
  methods: {
    triggerSpawnTreasure () {
      let x = 2
      let y = 2
      let obj = {
        'x': x,
        'y': y,
        'icon': this.objects[0].icon
      }
      let event = {
        'label': 'Open Chest',
        'trigger': 'openChest',
        'x': x,
        'y': y,
        'fieldID': this.getIndex(x, y)
      }
      store.commit('setEvent', event)
      this.events.push(event)
      this.generated[this.getIndex(x, y)].blocked = true
      paint(obj, 'object')
    },
    getEvents () {
      let genHTML
      let pos00 = (this.playerX - 1 > 0 && this.playerY - 1 > 0) ? checkForEvents(this.getIndex((this.playerX - 1), (this.playerY - 1))) : 'n/a'
      let pos10 = (this.playerY - 1 > 0) ? checkForEvents(this.getIndex((this.playerX), (this.playerY - 1))) : 'n/a'
      let pos20 = (this.playerX + 1 <= this.fieldsize && this.playerY - 1 > 0) ? checkForEvents(this.getIndex((this.playerX + 1), (this.playerY - 1))) : 'n/a'
      let pos01 = (this.playerX - 1 > 0) ? checkForEvents(this.getIndex((this.playerX - 1), (this.playerY))) : 'n/a'
      let pos21 = (this.playerX + 1 <= this.fieldsize) ? checkForEvents(this.getIndex((this.playerX + 1), (this.playerY))) : 'n/a'
      let pos02 = (this.playerX - 1 > 0 && this.playerY + 1 <= this.fieldsize) ? checkForEvents(this.getIndex((this.playerX - 1), (this.playerY + 1))) : 'n/a'
      let pos12 = (this.playerY + 1 <= this.fieldsize) ? checkForEvents(this.getIndex((this.playerX), (this.playerY + 1))) : 'n/a'
      let pos22 = (this.playerX + 1 <= this.fieldsize && this.playerY + 1 <= this.fieldsize) ? checkForEvents(this.getIndex((this.playerX + 1), (this.playerY + 1))) : 'n/a'
      genHTML = '<div><span>' + pos00 + ' | </span>'
      genHTML += '<span>' + pos10 + ' | </span>'
      genHTML += '<span>' + pos20 + '</span></div>'

      genHTML += '<div><span>' + pos01 + ' | </span>'
      genHTML += '<span>X | </span>'
      genHTML += '<span>' + pos21 + '</span></div>'

      genHTML += '<div><span>' + pos02 + ' | </span>'
      genHTML += '<span>' + pos12 + ' | </span>'
      genHTML += '<span>' + pos22 + '</span></div>'
      return genHTML
    },
    returnLifeBar (life) {
      return 'width: ' + life + '%;'
    },
    selectEnemy (enemy, key) {
      // Set Enemy Selection
      this.selectedEnemy = [enemy.x, enemy.y]
      console.log(this.selectedEnemy)
      // Select in World
      let i
      let selectAllEnemieOnField = document.getElementsByClassName('enemy')
      for (i = 0; i < selectAllEnemieOnField.length; i++) {
        selectAllEnemieOnField[i].classList.remove('marked')
      }
      let selectEnemyOnField = document.querySelector('[data-fieldx="' + enemy.x + '"][data-fieldy="' + enemy.y + '"] .enemy')
      selectEnemyOnField.classList.add('marked')
      // Select in UI Panel
      let selectedEnemieUIPanel = document.getElementsByClassName('selectorBoxEnemies__enemy')
      // remove all
      for (i = 0; i < selectedEnemieUIPanel.length; i++) {
        selectedEnemieUIPanel[i].classList.remove('marked')
      }
      // select the ion
      selectedEnemieUIPanel[key].className += ' marked'
      this.enableShooting = true
      // alert(enemy.x + ' ' + enemy.y)
    },
    saveFieldToLocalStorage () {
      let obj = {
        'fieldsize': this.fieldsize,
        'fieldsizeComplete': this.fieldsizeComplete,
        'playerX': this.playerX,
        'playerY': this.playerY,
        'playerHalo': this.playerHalo,
        'playerIcon': this.playerIcon,
        'generated': this.generated,
        'elementSize': this.elementSize
      }
      // let name = 'game' + localStorage.length
      if (localStorage.getItem(this.saveGameName) !== null) {
        if (confirm('Speicherstand existiert bereits. Überschreiben?') === true) {
          localStorage.setItem(this.saveGameName, JSON.stringify(obj))
        }
      } else {
        localStorage.setItem(this.saveGameName, JSON.stringify(obj))
      }
    },
    shoot () {
      let component = this
      let xEnemyField = component.selectedEnemy[0]
      let yEnemyField = component.selectedEnemy[1]
      let allEnemies = component.enemies
      let allGenerated = component.generated
      // let enableShooting = this.enableShooting
      let sho = document.getElementsByClassName('shootingLine')
      if (sho.length > 0) {
        sho[0].remove()
      }
      let player = document.querySelector('.player')
      let playerRect = player.getBoundingClientRect()
      // console.log(rect.top, rect.right, rect.bottom, rect.left)
      let x = playerRect.left
      let y = playerRect.top
      let shootLine = document.createElement('div')
      shootLine.className = 'shootingLine'
      shootLine.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;width:7px;height:7px;z-index:100;background:#f00;'
      document.body.appendChild(shootLine)

      // enemy x y
      let enemy = document.querySelector('[data-fieldx="' + xEnemyField + '"][data-fieldy="' + yEnemyField + '"] .enemy')
      let enemyRect = enemy.getBoundingClientRect()
      let xE = enemyRect.left
      let yE = enemyRect.top
      xE = xE + (parseInt(enemy.offsetWidth) / 2)
      yE = yE + (parseInt(enemy.offsetHeight) / 2)
      let highestX = Math.max(x, xE)
      let lowestX = Math.min(x, xE)
      let xDirection = xE >= x ? 1 : -1
      let highestY = Math.max(y, yE)
      let lowestY = Math.min(y, yE)
      let yDirection = yE >= y ? 1 : -1

      console.log('================================================================')
      console.log('x: ' + x + ' y: ' + y + ';; xE: ' + xE + ', yE: ' + yE)
      console.log('Enemy:')
      console.log(enemy)
      console.log('highestX :' + highestX)
      console.log('lowestX :' + lowestX)
      console.log('highestX :' + highestY)
      console.log('lowestY :' + lowestY)
      console.log('Direction X :' + xDirection)
      console.log('Direction Y :' + yDirection)
      movejs('.shootingLine').x((highestX - lowestX) * xDirection).y((highestY - lowestY) * yDirection).end(function () {
        let enemyObj = allEnemies.find(function (enemy) {
          return enemy.x === xEnemyField && enemy.y === yEnemyField
        })
        enemyObj.life -= 10
        if (enemyObj.life <= 0) {
          store.commit('deleteEnemy', enemyObj)
          let selectEnemyOnField = document.querySelector('[data-fieldx="' + xEnemyField + '"][data-fieldy="' + yEnemyField + '"] .enemy')
          selectEnemyOnField.classList.add('fadeOut')
          let el = document.querySelector('.selectorBoxEnemies__enemy.marked')
          el.classList.remove('marked')
          component.enableShooting = false
        }

        let fieldObj = allGenerated.find(function (field) {
          return field.x === xEnemyField && field.y === yEnemyField
        })
        fieldObj.blocked = false
        shootLine.remove()
      })
    },

    triggerSpawnEnemy () {
      spawnEnemy(1, true)
    },

    getIndex (X, Y) {
      return (this.fieldsize) * (Y - 1) + (X - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

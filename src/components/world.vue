<template>
  <div class="world">
    <div class="world__field">
      <field></field>
      <ui></ui>
    </div>

<!--     <div>
      <h3>DEBUGGER</h3>
      <div>Player: {{playerIcon}}</div>
      <div>Fieldsize: {{fieldsize}}</div>
      <div>fieldsizeComplete: {{fieldsizeComplete}}</div>
    </div> -->
  </div>
</template>

<script>
// import componentName from '@/components/--Path'
import field from '@/components/build/field'
import store from './../store'
// import playerMove from '@/../static/js/playermove'
// import listenToMoveEvent from '@/../static/js/listenToMoveEvent'
import ui from '@/components/build/ui'
import { mapGetters } from 'vuex'
export default {

  name: 'world',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'fieldsize', 'fieldsizeComplete', 'playerIcon', 'playerHalo', 'playerX', 'playerY', 'enemies', 'handlerPlayerMovement'
    ])
  },
  watch: {
    playerX () {
      document.querySelector('.player').remove()
      let init = document.querySelector('[data-fieldx="' + this.playerX + '"][data-fieldy="' + this.playerY + '"]')
      init.innerHTML = '<span class="player ' + this.playerHalo + '">' + this.playerIcon + '</span>'
    },
    playerY () {
      document.querySelector('.player').remove()
      let init = document.querySelector('[data-fieldx="' + this.playerX + '"][data-fieldy="' + this.playerY + '"]')
      init.innerHTML = '<span class="player ' + this.playerHalo + '">' + this.playerIcon + '</span>'
    }
  },
  mounted: function () {
    // player Init
    let select = document.querySelector('[data-fieldx="' + this.playerX + '"][data-fieldy="' + this.playerY + '"]')
    select.innerHTML = '<span class="player ' + this.playerHalo + '">' + this.playerIcon + '</span>'
    // enemies init
    for (let enemy of this.enemies) {
      select = document.querySelector('[data-fieldx="' + enemy.x + '"][data-fieldy="' + enemy.y + '"]')
      select.innerHTML = '<span title="' + this.enemies.indexOf(enemy) + '" class="enemy">' + enemy.icon + '</span>'
    }
    // set siblings offsets
    store.commit('setElementsSiblingsOffsets')
    // player movement
    window.addEventListener('keyup', this.handlerPlayerMovement)
  },
  methods: {
  },
  components: {
    field, ui
  }
}
</script>

<style lang="scss" scoped>
</style>

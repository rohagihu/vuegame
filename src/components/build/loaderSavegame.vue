<template>
  <div class="loaderSavegame">
    Loader
    <div v-for="(game, key) in games">
      <a href="#" @click.prevent="loadgame(key)">{{key}}</a>
    </div>
  </div>
</template>

<script>
// import componentName from '@/components/--Path'
import { mapGetters } from 'vuex'
import store from './../../store'
export default {

  name: 'loaderSavegame',

  data () {
    return {
      games: localStorage
    }
  },
  methods: {
    loadgame (key) {
      const loadedGame = JSON.parse(localStorage[key])
      store.commit('loadSaveGame', loadedGame)
      this.$router.push('/world')
    }
  },
  computed: {
    ...mapGetters([
      'fieldsize', 'fieldsizeComplete', 'playerX', 'playerY', 'playerHalo', 'playerIcon', 'generated', 'elementSize'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="field">
  <!-- Fieldsize: {{this.parsedFieldSize}} -->
    <div class="fieldRow" v-for="fieldelementY in parsedFieldSize" :key="fieldelementY+'Y'" :data-fieldRowY="fieldelementY">
      <fieldelement 
        :data-fieldx="fieldelementX" 
        :data-fieldy="fieldelementY" 
        v-for="fieldelementX in parsedFieldSize" 
        :key="'X'+fieldelementX+'Y'+fieldelementY"
        :style="{backgroundColor: generated[getIndex(fieldelementY, fieldelementX)].color, backgroundImage: 'url(' + generated[getIndex(fieldelementY, fieldelementX)].img + ')', width: elementSize + 'px', height: elementSize/2 + 'px'}"
        ></fieldelement>
    </div>
  </div>
</template>

<script>
// import componentName from '@/components/--Path'
import { mapGetters } from 'vuex'
// import store from './../../store'
import fieldelement from '@/components/build/fieldelement'
// import movejs from 'movejs'
export default {

  name: 'field',

  data () {
    return {
    }
  },
  // watch: {
  //   playerX () {
  //     document.querySelector('.player').remove()
  //     let init = document.querySelector('[data-fieldx="' + this.playerX + '"][data-fieldy="' + this.playerY + '"]')
  //     init.innerHTML = '<span class="player ' + this.playerHalo + '">' + this.playerIcon + '</span>'
  //   },
  //   playerY () {
  //     document.querySelector('.player').remove()
  //     let init = document.querySelector('[data-fieldx="' + this.playerX + '"][data-fieldy="' + this.playerY + '"]')
  //     init.innerHTML = '<span class="player ' + this.playerHalo + '">' + this.playerIcon + '</span>'
  //   }
  // },
  computed: {
    parsedFieldSize () {
      return parseInt(this.fieldsize) || 0
    },
    ...mapGetters([
      'fieldsize', 'fieldsizeComplete', 'playerX', 'playerY', 'playerXY', 'playerIcons', 'playerHalo', 'playerIcon', 'fieldStack', 'generated', 'elementSize', 'getTheIndex', 'siblingsOffset'
    ])
  },
  methods: {
    getIndex (fieldelementY, fieldelementX) {
      return (this.parsedFieldSize) * (fieldelementY - 1) + (fieldelementX - 1)
    }
  },
  mounted: function () {
    let pointZero = Math.floor(this.fieldsize / 2)
    let offset = 40
    // console.log(`Fieldsize: ${this.fieldsize}; pointZero: ${pointZero}`)
    // console.log(`Height Element: ${this.elementSize / 2}px`)
    // the upper ones
    let marginValue = offset
    for (let i = (pointZero - 1); i >= 1; i--) {
      let row = document.querySelector('.fieldRow[data-fieldRowY="' + i + '"]')
      row.style.marginLeft = marginValue + 'px'
      marginValue += this.elementSize / 2 + offset
    }

    // the lower ones
    marginValue = this.elementSize / 2
    for (let i = pointZero; i <= this.fieldsize; i++) {
      let row = document.querySelector('.fieldRow[data-fieldRowY="' + i + '"]')
      row.style.marginRight = marginValue + 'px'
      marginValue += this.elementSize / 2 + offset
    }
    // alert(this.fieldsize)
  },
  components: {
    fieldelement
  }
}
</script>

<style lang="scss" scoped>
</style>

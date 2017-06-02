/* eslint-disable */
import store from '@/store'
import movejs from 'movejs'

export default function playerMove (x, y, direction) {
    window.removeEventListener('keyup', store.getters.handlerPlayerMovement) // disable movement during animation
    let theDirection
    let theOtherDirection
    let p
    let siblingsXOffset =  store.state.field.siblingXOffset // distance of X1 to X2
    let siblingsYOffset =  store.state.field.siblingYOffset // distance of Y1 to Y2
    if (direction === 'x') {
        theDirection = store.state.playerX
        theOtherDirection = store.state.playerY
        p = theDirection + x // the new X
        siblingsXOffset = siblingsXOffset * x // distance * direction (plus || minus)
        siblingsYOffset = -15 // rotate the player
    } else {
        theDirection = store.state.playerY
        theOtherDirection = store.state.playerX
        p = theDirection + y // the new Y
        siblingsXOffset = -15 // rotate the player
        siblingsYOffset = siblingsYOffset * y // distance * direction (plus || minus)
    }
    let blocked = store.state.field.generated.filter((element) => {
      return element.x === store.state.playerX + x && element.y === store.state.playerY + y && element.blocked === true
    }) // check if the next fieldelement is blocked

    if (p > store.state.field.fieldsize) { // new fielelement is larger than the field, set to limit
        switch (direction) {
        case 'x':
            store.state.playerX = store.state.field.fieldsize
            break
        case 'y':
            store.state.playerY = store.state.field.fieldsize
            break
        }
        window.addEventListener('keyup', store.getters.handlerPlayerMovement)
    } else if (p < 1) { // new fielelement is lower than the field, set to 1
        switch (direction) {
        case 'x':
            store.state.playerX = 1
            break
        case 'y':
            store.state.playerY = 1
            break
        }
        window.addEventListener('keyup', store.getters.handlerPlayerMovement)
    } else if (blocked.length === 0) { // new element is not blocked
        movejs('.player').x(siblingsXOffset).y(siblingsYOffset).end(function () {
            store.commit('movePlayer', {x, y})
            window.addEventListener('keyup', store.getters.handlerPlayerMovement)  // enable movement after animation
        })
    } else { // new element is blocked, enable movement event
        window.addEventListener('keyup', store.getters.handlerPlayerMovement)
    }
}

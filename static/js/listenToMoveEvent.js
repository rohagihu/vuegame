import playerMove from './../../static/js/playermove'

export default function listenToMoveEvent (event) {
  if (event.keyCode === 40) { // down
    playerMove(0, 1, 'y')
  }
  if (event.keyCode === 38) { // up
    playerMove(0, -1, 'y')
  }
  if (event.keyCode === 37) { // left
    playerMove(-1, 0, 'x')
  }
  if (event.keyCode === 39) { // right
    playerMove(1, 0, 'x')
  }
}

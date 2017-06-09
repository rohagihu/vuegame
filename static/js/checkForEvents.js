/* eslint-disable */
import store from '@/store'

/*
 * Args:
 * 1: index (Field)
 */

export default function checkForEvents(fieldIndex) {
  let events = store.state.field.events
  let hasEvent = false
  console.log(events)
  hasEvent = events.find(function(element, index, array) {
    console.log(element)
    console.log(index)
    console.log(array)
    console.log(val.fieldIndex)
    console.log(index)
    console.log('===============')
    if (val.index == index) return true
  })
  
  return hasEvent
}

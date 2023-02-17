export function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }
  // Return and apply new order
  return result.map((current, index) => {
    return { ...current, ...{ order: index + 1 } }
  })
}

export function deepCopy(target) {
  return JSON.parse(JSON.stringify(target))
}

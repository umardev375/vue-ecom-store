export function paginationNumbers(current = 1, total = 1, displayLength = 1) {
  current = current > total ? total : current

  const indexes = []

  // less than current
  let starti = current - 1
  for (starti; starti >= current - displayLength; starti -= 1) {
    if (starti > 1) {
      indexes.unshift(starti)
    }
  }

  // first page separator
  if (starti > 1) {
    indexes.unshift('')
  }

  // first page
  indexes.unshift(1)

  // current page
  if (current !== 1) {
    indexes.push(current)
  }

  // more than current
  let endi = current + 1
  for (endi; endi <= current + displayLength; endi += 1) {
    if (endi < total) {
      indexes.push(endi)
    }
  }

  // last page separator
  if (endi < total) {
    indexes.push('')
  }

  // last page
  if (current < total) {
    indexes.push(total)
  }

  return indexes
}

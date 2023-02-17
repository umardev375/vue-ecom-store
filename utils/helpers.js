export function chunk(arr, chunkSize = 4) {
  const R = []
  for (let i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize))
  return R
}

export function groupBy(arr, groupBy) {
  return arr.reduce((r, a) => {
    r[a[groupBy]] = [...(r[a[groupBy]] || []), a]

    return r
  }, {})
}

export function getPercentageChange(
  oldPrice,
  newPrice,
  prefix = '-',
  suffix = '%'
) {
  const decreaseValue = oldPrice - newPrice

  // return `${prefix}${Math.round((decreaseValue / oldPrice) * 100)}${suffix}`
  return `${prefix}${test(decreaseValue, oldPrice)}${suffix}`
}

function test(val, max, min = 0) {
  const range = Math.abs(max - min)
  const value = val - min
  const percent = (100.0 * parseFloat(value)) / parseFloat(range) / 100
  return parseInt(percent * 100)
}

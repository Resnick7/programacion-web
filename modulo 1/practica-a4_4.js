const nums = [ 1, 3, 3, 6, 4, 4, 4, 5, 6, 7, 1]

const moreRepeated = nums.reduce((acc, n) => {
  acc[n] = (acc[n] || 0) + 1
  return acc
}, {})

const result = Object.keys(moreRepeated).reduce((a,b) => moreRepeated[a] > moreRepeated[b] ? a : b)

console.log(result)
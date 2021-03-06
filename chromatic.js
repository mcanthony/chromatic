'use strict'

var SCALES = [
  'C Db D Eb E F Gb G Ab A Bb B'.split(' '),
  'Cb Dbb Db Ebb Eb Fb Gbb Gb Abb Ab Bbb Bb'.split(' '),
  'C C# D D# E F F# G G# A A# B'.split(' '),
  'C# C## D# D## E# F# F## G# G## A# A## B#'.split(' ')
]

function Chromatic (root, octave, length, descending) {
  if (!root) throw Error('Give me a root, please')
  length = length || 12
  root = root.charAt(0).toUpperCase() + root.slice(1).toLowerCase()
  descending = descending === true ? 1 : 0

  return SCALES.reduce(function (all, notes) {
    var scale = find(root, notes)
    if (scale) all.push(octavize(forceLength(reverse(scale, descending), length), octave, descending))
    return all
  }, [])
}

function find (root, notes) {
  var index = notes.indexOf(root)
  return index < 0 ? null : rotate(notes, index)
}

function reverse (scale, reverse) {
  return reverse ? rotate(scale.reverse(), scale.length - 1) : scale
}

function octavize (scale, octave, descending) {
  if (!octave) return scale
  octave = +octave
  var change = descending ? substract : add
  return scale.map(function (note, index) {
    if (index !== 0 && note[0] === 'C' && scale[index - 1][0] !== 'C') {
      octave = change(octave)
    }
    return note + octave
  })
}
function add (n) { return n + 1 }
function substract (n) { return n - 1 }

function forceLength (scale, length) {
  var original = scale.length
  var result = []
  for (var i = 0; i < length; i++) {
    result.push(scale[i % original])
  }
  return result
}

function rotate (arr, positions) {
  return arr.slice(positions, 12).concat(arr.slice(0, positions))
}

module.exports = Chromatic

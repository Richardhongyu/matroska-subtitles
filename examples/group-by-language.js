const fs = require('fs')
const MatroskaSubtitles = require('..')

var tracks = new Map()
var parser = new MatroskaSubtitles()

parser.once('tracks', function (subtitleTracks) {
  subtitleTracks.forEach(function (track) {
    tracks.set(track.number, {
      language: track.language,
      subtitles: []
    })
  })

  parser.on('subtitle', function (subtitle, trackNumber) {
    tracks.get(trackNumber).subtitles.push(subtitle)
  })
})

parser.on('finish', function () {
  tracks.forEach((track) => console.log(track))
})

fs.createReadStream(process.argv[2]).pipe(parser)
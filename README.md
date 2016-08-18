# matroska-subtitles [![npm][npm-img]][npm-url] [![dependencies][dep-img]][dep-url] [![license][lic-img]][lic-url]

[npm-img]: https://img.shields.io/npm/v/matroska-subtitles.svg
[npm-url]: https://www.npmjs.com/package/matroska-subtitles
[dep-img]: https://david-dm.org/mathiasvr/matroska-subtitles.svg
[dep-url]: https://david-dm.org/mathiasvr/matroska-subtitles
[lic-img]: http://img.shields.io/:license-MIT-blue.svg
[lic-url]: http://mvr.mit-license.org

Writable stream for parsing embedded .mkv subtitles.

> Currently supports extraction of the .srt and .ass format.

## install

```bash
npm install matroska-subtitles
```

## example

```javascript
const fs = require('fs')
const MatroskaSubtitles = require('matroska-subtitles')

var parser = new MatroskaSubtitles()

// first an array of subtitle track information is emitted
parser.once('tracks', function (tracks) {
  console.log(tracks)
})

// afterwards each subtitle is emitted
parser.on('subtitle', function (subtitle, trackNumber) {
  console.log('Track ' + trackNumber + ':', subtitle)
})

fs.createReadStream('Sintel.2010.720p.mkv').pipe(parser)
```

### tracks format

```javascript
[
  { number: 3, language: 'eng', type: 'UTF8' },
  { number: 4, language: 'jpn', type: 'ASS', header: '[Script Info]\r\n...' }
]
```

> Note that the `language` may be `undefined` if the mkv track doesn't specify it.

### subtitle format

```javascript
{
  text: 'This blade has a dark past.',
  time: 107250,  // ms
  duration: 1970 // ms
}
```

> May also contain additional `.ass` specific values

## random access
The parser must obtain the `tracks` metadata event before it can begin to emit subtitles.
To read subtitles from a specific point in the stream,
you can pass in a previous instance as parameter: `parser = new MatroskaSubtitles(parser)`
after the `tracks` event and pipe from a given position. See `examples/random-access.js` for an example.

## contributing

This is still a work in progress.

If you find a bug or have suggestions feel free to create an issue or a pull request!

## see also 

[mkv-subtitle-extractor](https://www.npmjs.com/package/mkv-subtitle-extractor)

## license

MIT

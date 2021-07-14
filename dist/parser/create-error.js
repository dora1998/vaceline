'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createError = createError

var chalk = _interopRequireWildcard(require('../utils/chalk'))

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function () {
    return cache
  }
  return cache
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

const MARGIN = 2
const HORIZONTAL_MARK = '> '
const VERTICAL_MARK = '^'

function createError(source, message, start, end) {
  const topLineNumber = start.line >= MARGIN ? start.line - MARGIN : start.line
  const topLineOffset = topLineNumber - 1 // zero-offset

  const indicator = source
    .split('\n')
    .slice(topLineOffset, topLineOffset + MARGIN * 2 + 1)
    .map((line, i) => {
      const lineNumber = topLineNumber + i
      const lineOffset = topLineOffset + i
      const bar = chalk.gray(String(lineNumber) + ' | ')

      if (lineNumber === start.line) {
        return [
          chalk.red(HORIZONTAL_MARK) + bar + line,
          ' '.repeat(5 + String(lineOffset).length + start.column - 1) +
            chalk.red(VERTICAL_MARK.repeat(end.offset + 1 - start.offset)),
        ]
      }

      return ' '.repeat(HORIZONTAL_MARK.length) + bar + line
    })
    .flat()
    .join('\n')
  return new SyntaxError(message + '\n\n' + indicator + '\n')
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvY3JlYXRlLWVycm9yLnRzIl0sIm5hbWVzIjpbIk1BUkdJTiIsIkhPUklaT05UQUxfTUFSSyIsIlZFUlRJQ0FMX01BUksiLCJjcmVhdGVFcnJvciIsInNvdXJjZSIsIm1lc3NhZ2UiLCJzdGFydCIsImVuZCIsInRvcExpbmVOdW1iZXIiLCJsaW5lIiwidG9wTGluZU9mZnNldCIsImluZGljYXRvciIsInNwbGl0Iiwic2xpY2UiLCJtYXAiLCJpIiwibGluZU51bWJlciIsImxpbmVPZmZzZXQiLCJiYXIiLCJjaGFsayIsImdyYXkiLCJTdHJpbmciLCJyZWQiLCJyZXBlYXQiLCJsZW5ndGgiLCJjb2x1bW4iLCJvZmZzZXQiLCJmbGF0Iiwiam9pbiIsIlN5bnRheEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUdBLE1BQU1BLE1BQU0sR0FBRyxDQUFmO0FBQ0EsTUFBTUMsZUFBZSxHQUFHLElBQXhCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLEdBQXRCOztBQUVPLFNBQVNDLFdBQVQsQ0FDTEMsTUFESyxFQUVMQyxPQUZLLEVBR0xDLEtBSEssRUFJTEMsR0FKSyxFQUtRO0FBQ2IsUUFBTUMsYUFBYSxHQUFHRixLQUFLLENBQUNHLElBQU4sSUFBY1QsTUFBZCxHQUF1Qk0sS0FBSyxDQUFDRyxJQUFOLEdBQWFULE1BQXBDLEdBQTZDTSxLQUFLLENBQUNHLElBQXpFO0FBQ0EsUUFBTUMsYUFBYSxHQUFHRixhQUFhLEdBQUcsQ0FBdEMsQ0FGYSxDQUUyQjs7QUFFeEMsUUFBTUcsU0FBUyxHQUFHUCxNQUFNLENBQ3JCUSxLQURlLENBQ1QsSUFEUyxFQUVmQyxLQUZlLENBRVRILGFBRlMsRUFFTUEsYUFBYSxHQUFHVixNQUFNLEdBQUcsQ0FBekIsR0FBNkIsQ0FGbkMsRUFHZmMsR0FIZSxDQUdYLENBQUNMLElBQUQsRUFBT00sQ0FBUCxLQUFhO0FBQ2hCLFVBQU1DLFVBQVUsR0FBR1IsYUFBYSxHQUFHTyxDQUFuQztBQUNBLFVBQU1FLFVBQVUsR0FBR1AsYUFBYSxHQUFHSyxDQUFuQztBQUVBLFVBQU1HLEdBQUcsR0FBR0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLE1BQU0sQ0FBQ0wsVUFBRCxDQUFOLEdBQXFCLEtBQWhDLENBQVo7O0FBRUEsUUFBSUEsVUFBVSxLQUFLVixLQUFLLENBQUNHLElBQXpCLEVBQStCO0FBQzdCLGFBQU8sQ0FDTFUsS0FBSyxDQUFDRyxHQUFOLENBQVVyQixlQUFWLElBQTZCaUIsR0FBN0IsR0FBbUNULElBRDlCLEVBRUwsSUFBSWMsTUFBSixDQUFXLElBQUlGLE1BQU0sQ0FBQ0osVUFBRCxDQUFOLENBQW1CTyxNQUF2QixHQUFnQ2xCLEtBQUssQ0FBQ21CLE1BQXRDLEdBQStDLENBQTFELElBQ0VOLEtBQUssQ0FBQ0csR0FBTixDQUFVcEIsYUFBYSxDQUFDcUIsTUFBZCxDQUFxQmhCLEdBQUcsQ0FBQ21CLE1BQUosR0FBYSxDQUFiLEdBQWlCcEIsS0FBSyxDQUFDb0IsTUFBNUMsQ0FBVixDQUhHLENBQVA7QUFLRDs7QUFFRCxXQUFPLElBQUlILE1BQUosQ0FBV3RCLGVBQWUsQ0FBQ3VCLE1BQTNCLElBQXFDTixHQUFyQyxHQUEyQ1QsSUFBbEQ7QUFDRCxHQWxCZSxFQW1CZmtCLElBbkJlLEdBb0JmQyxJQXBCZSxDQW9CVixJQXBCVSxDQUFsQjtBQXNCQSxTQUFPLElBQUlDLFdBQUosQ0FBZ0J4QixPQUFPLEdBQUcsTUFBVixHQUFtQk0sU0FBbkIsR0FBK0IsSUFBL0MsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2hhbGsgZnJvbSAnLi4vdXRpbHMvY2hhbGsnXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4uL25vZGVzJ1xuXG5jb25zdCBNQVJHSU4gPSAyXG5jb25zdCBIT1JJWk9OVEFMX01BUksgPSAnPiAnXG5jb25zdCBWRVJUSUNBTF9NQVJLID0gJ14nXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFcnJvcihcbiAgc291cmNlOiBzdHJpbmcsXG4gIG1lc3NhZ2U6IHN0cmluZyxcbiAgc3RhcnQ6IFBvc2l0aW9uLFxuICBlbmQ6IFBvc2l0aW9uXG4pOiBTeW50YXhFcnJvciB7XG4gIGNvbnN0IHRvcExpbmVOdW1iZXIgPSBzdGFydC5saW5lID49IE1BUkdJTiA/IHN0YXJ0LmxpbmUgLSBNQVJHSU4gOiBzdGFydC5saW5lXG4gIGNvbnN0IHRvcExpbmVPZmZzZXQgPSB0b3BMaW5lTnVtYmVyIC0gMSAvLyB6ZXJvLW9mZnNldFxuXG4gIGNvbnN0IGluZGljYXRvciA9IHNvdXJjZVxuICAgIC5zcGxpdCgnXFxuJylcbiAgICAuc2xpY2UodG9wTGluZU9mZnNldCwgdG9wTGluZU9mZnNldCArIE1BUkdJTiAqIDIgKyAxKVxuICAgIC5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVOdW1iZXIgPSB0b3BMaW5lTnVtYmVyICsgaVxuICAgICAgY29uc3QgbGluZU9mZnNldCA9IHRvcExpbmVPZmZzZXQgKyBpXG5cbiAgICAgIGNvbnN0IGJhciA9IGNoYWxrLmdyYXkoU3RyaW5nKGxpbmVOdW1iZXIpICsgJyB8ICcpXG5cbiAgICAgIGlmIChsaW5lTnVtYmVyID09PSBzdGFydC5saW5lKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgY2hhbGsucmVkKEhPUklaT05UQUxfTUFSSykgKyBiYXIgKyBsaW5lLFxuICAgICAgICAgICcgJy5yZXBlYXQoNSArIFN0cmluZyhsaW5lT2Zmc2V0KS5sZW5ndGggKyBzdGFydC5jb2x1bW4gLSAxKSArXG4gICAgICAgICAgICBjaGFsay5yZWQoVkVSVElDQUxfTUFSSy5yZXBlYXQoZW5kLm9mZnNldCArIDEgLSBzdGFydC5vZmZzZXQpKSxcbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyAnLnJlcGVhdChIT1JJWk9OVEFMX01BUksubGVuZ3RoKSArIGJhciArIGxpbmVcbiAgICB9KVxuICAgIC5mbGF0KClcbiAgICAuam9pbignXFxuJylcblxuICByZXR1cm4gbmV3IFN5bnRheEVycm9yKG1lc3NhZ2UgKyAnXFxuXFxuJyArIGluZGljYXRvciArICdcXG4nKVxufVxuIl19

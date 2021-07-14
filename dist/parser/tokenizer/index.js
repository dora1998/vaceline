'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.Tokenizer = exports.getJoinedRegExp = void 0

var _createError = require('../create-error')

var _operators = require('./operators')

var _debug = require('../../utils/debug')

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

const debug = (0, _debug.buildDebug)('tokenize')
const debugToken = debug.extend('token')
const debugRaw = debug.extend('raw')
const symbols = [';', ':', '.', ',', '/', '{', '}', '(', ')', '+']

const escapeRegExp = (s) =>
  s instanceof RegExp ? s.source : s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

const getJoinedRegExp = (s) => s.map(escapeRegExp).join('|')

exports.getJoinedRegExp = getJoinedRegExp
const splitters = [
  /* spaces         */
  / +/,
  /* tabs           */
  /\t+/,
  /* newline        */
  '\n',
  /* line comment   */
  /#[^\n]*|\/\/[^\n]*/,
  /* inline comment */
  /\/\*[\s\S]*\*\//,
  /* string         */
  /"[^\n]*?"/,
  /* multiline str  */
  /{"[\s\S]*?"}/,
  /* ident          */
  /[A-z][A-z\d-_]*/,
  /* numeric        */
  /[\d][\d.]+%?/,
  ..._operators.operators,
  ...symbols,
]
const matchers = {
  symbols: new Set(symbols),
  operators: new Set(_operators.operators),
}
const reSplitter = new RegExp('(' + getJoinedRegExp(splitters) + ')')

class Tokenizer {
  constructor(raw /* opts: { keywords?: Array<string> } = {} */) {
    _defineProperty(this, 'raw', void 0)

    _defineProperty(this, 'source', void 0)

    this.raw = raw
    this.source = raw.split(reSplitter)

    if (debugRaw.enabled) {
      debugRaw(this.source.filter((t) => !/^\s*$/.test(t)))
    }
  }

  tokenize() {
    const source = this.source
    const tokens = []
    let cur = 0
    let offset = 0
    let line = 1
    let column = 1

    while (cur < source.length) {
      const str = source[cur++]

      if (!str) {
        continue
      } // only whitespaces or tabs

      if (/^( |\t)/.test(str)) {
        offset += str.length
        column += str.length
        continue
      } // newline

      if (str === '\n') {
        offset += str.length
        line++
        column = 1
        continue
      }

      let err = undefined
      /** determine token start */

      const startOffset = offset
      const startLine = line
      const startColumn = column
      /** determine token type */

      let type

      if (matchers.symbols.has(str)) {
        type = 'symbol'
      } else if (matchers.operators.has(str)) {
        type = 'operator'
      } else if (/^(true|false)$/.test(str)) {
        type = 'boolean'
      } else if (str.startsWith('"')) {
        type = 'string'

        if (!str.endsWith('"') || str === '"') {
          err =
            'Invalid token (string may have newlines inside normal quotes, use `{" "}`)'
        }
      } else if (str.startsWith('{"')) {
        type = 'string' // string can have newline inside

        const lines = str.split('\n')
        line += lines.length - 1
        column = lines[lines.length - 1].length - (str.length - 1)
      } else if (/^[\d.]+%?$/.test(str)) {
        type = 'numeric'
      } else if (/^(#|\/\/|\/\*)/.test(str)) {
        type = 'comment'
      } else {
        type = 'ident'

        if (!/^[A-Za-z_][A-Za-z\d.-_]*/.test(str)) {
          err = `Invalid token: '${str}'`
        }
      }
      /** update position */

      offset += str.length
      column += str.length
      /** determine token end */

      const endOffset = offset - 1
      const endLine = line
      const endColumn = column - 1

      if (err) {
        throw (0, _createError.createError)(
          this.raw,
          err,
          {
            offset: startOffset,
            line: startLine,
            column: startColumn,
          },
          {
            offset: endOffset,
            line: endLine,
            column,
          }
        )
      }

      const token = {
        type,
        value: str,
        loc: {
          start: {
            offset: startOffset,
            line: startLine,
            column: startColumn,
          },
          end: {
            offset: endOffset,
            line: endLine,
            column: endColumn,
          },
        },
      }

      if (debugToken.enabled) {
        debugToken(`${token.type}: ${token.value}`)
      }

      tokens.push(token)
    }

    return tokens
  }
}

exports.Tokenizer = Tokenizer
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvdG9rZW5pemVyL2luZGV4LnRzIl0sIm5hbWVzIjpbImRlYnVnIiwiZGVidWdUb2tlbiIsImV4dGVuZCIsImRlYnVnUmF3Iiwic3ltYm9scyIsImVzY2FwZVJlZ0V4cCIsInMiLCJSZWdFeHAiLCJzb3VyY2UiLCJyZXBsYWNlIiwiZ2V0Sm9pbmVkUmVnRXhwIiwibWFwIiwiam9pbiIsInNwbGl0dGVycyIsIm9wZXJhdG9ycyIsIm1hdGNoZXJzIiwiU2V0IiwicmVTcGxpdHRlciIsIlRva2VuaXplciIsImNvbnN0cnVjdG9yIiwicmF3Iiwic3BsaXQiLCJlbmFibGVkIiwiZmlsdGVyIiwidCIsInRlc3QiLCJ0b2tlbml6ZSIsInRva2VucyIsImN1ciIsIm9mZnNldCIsImxpbmUiLCJjb2x1bW4iLCJsZW5ndGgiLCJzdHIiLCJlcnIiLCJ1bmRlZmluZWQiLCJzdGFydE9mZnNldCIsInN0YXJ0TGluZSIsInN0YXJ0Q29sdW1uIiwidHlwZSIsImhhcyIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsImxpbmVzIiwiZW5kT2Zmc2V0IiwiZW5kTGluZSIsImVuZENvbHVtbiIsInRva2VuIiwidmFsdWUiLCJsb2MiLCJzdGFydCIsImVuZCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7OztBQUVBLE1BQU1BLEtBQUssR0FBRyx1QkFBVyxVQUFYLENBQWQ7QUFDQSxNQUFNQyxVQUFVLEdBQUdELEtBQUssQ0FBQ0UsTUFBTixDQUFhLE9BQWIsQ0FBbkI7QUFDQSxNQUFNQyxRQUFRLEdBQUdILEtBQUssQ0FBQ0UsTUFBTixDQUFhLEtBQWIsQ0FBakI7QUFpQkEsTUFBTUUsT0FBTyxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLENBQWhC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SE8sT0FBZDs7QUFTQSxVQUFJN0MsVUFBVSxDQUFDcUIsT0FBZixFQUF3QjtBQUN0QnJCLFFBQUFBLFVBQVUsQ0FBRSxHQUFFOEMsS0FBSyxDQUFDUixJQUFLLEtBQUlRLEtBQUssQ0FBQ0MsS0FBTSxFQUEvQixDQUFWO0FBQ0Q7O0FBRURyQixNQUFBQSxNQUFNLENBQUN5QixJQUFQLENBQVlMLEtBQVo7QUFDRDs7QUFFRCxXQUFPcEIsTUFBUDtBQUNEOztBQXhJb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFcnJvciB9IGZyb20gJy4uL2NyZWF0ZS1lcnJvcidcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vbm9kZXMnXG5pbXBvcnQgeyBvcGVyYXRvcnMgfSBmcm9tICcuL29wZXJhdG9ycydcbmltcG9ydCB7IGJ1aWxkRGVidWcgfSBmcm9tICcuLi8uLi91dGlscy9kZWJ1ZydcblxuY29uc3QgZGVidWcgPSBidWlsZERlYnVnKCd0b2tlbml6ZScpXG5jb25zdCBkZWJ1Z1Rva2VuID0gZGVidWcuZXh0ZW5kKCd0b2tlbicpXG5jb25zdCBkZWJ1Z1JhdyA9IGRlYnVnLmV4dGVuZCgncmF3JylcblxuZXhwb3J0IHR5cGUgVG9rZW5UeXBlID1cbiAgfCAnaWRlbnQnXG4gIHwgJ3N5bWJvbCdcbiAgfCAnb3BlcmF0b3InXG4gIHwgJ2NvbW1lbnQnXG4gIHwgJ3N0cmluZydcbiAgfCAnbnVtZXJpYydcbiAgfCAnYm9vbGVhbidcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbiB7XG4gIHR5cGU6IFRva2VuVHlwZVxuICB2YWx1ZTogc3RyaW5nXG4gIGxvYzogTG9jYXRpb25cbn1cblxuY29uc3Qgc3ltYm9scyA9IFsnOycsICc6JywgJy4nLCAnLCcsICcvJywgJ3snLCAnfScsICcoJywgJyknLCAnKyddIGFzIGNvbnN0XG5cbmNvbnN0IGVzY2FwZVJlZ0V4cCA9IChzOiBzdHJpbmcgfCBSZWdFeHApID0+XG4gIHMgaW5zdGFuY2VvZiBSZWdFeHAgPyBzLnNvdXJjZSA6IHMucmVwbGFjZSgvWy1cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJylcbmV4cG9ydCBjb25zdCBnZXRKb2luZWRSZWdFeHAgPSAoczogQXJyYXk8c3RyaW5nIHwgUmVnRXhwPikgPT5cbiAgcy5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8JylcblxuY29uc3Qgc3BsaXR0ZXJzID0gW1xuICAvKiBzcGFjZXMgICAgICAgICAqLyAvICsvLFxuICAvKiB0YWJzICAgICAgICAgICAqLyAvXFx0Ky8sXG4gIC8qIG5ld2xpbmUgICAgICAgICovICdcXG4nLFxuICAvKiBsaW5lIGNvbW1lbnQgICAqLyAvI1teXFxuXSp8XFwvXFwvW15cXG5dKi8sXG4gIC8qIGlubGluZSBjb21tZW50ICovIC9cXC9cXCpbXFxzXFxTXSpcXCpcXC8vLFxuICAvKiBzdHJpbmcgICAgICAgICAqLyAvXCJbXlxcbl0qP1wiLyxcbiAgLyogbXVsdGlsaW5lIHN0ciAgKi8gL3tcIltcXHNcXFNdKj9cIn0vLFxuICAvKiBpZGVudCAgICAgICAgICAqLyAvW0Etel1bQS16XFxkLV9dKi8sXG4gIC8qIG51bWVyaWMgICAgICAgICovIC9bXFxkXVtcXGQuXSslPy8sXG4gIC4uLm9wZXJhdG9ycyxcbiAgLi4uc3ltYm9scyxcbl1cblxuY29uc3QgbWF0Y2hlcnMgPSB7XG4gIHN5bWJvbHM6IG5ldyBTZXQoc3ltYm9scyksXG4gIG9wZXJhdG9yczogbmV3IFNldChvcGVyYXRvcnMpLFxufSBhcyBjb25zdFxuXG5jb25zdCByZVNwbGl0dGVyID0gbmV3IFJlZ0V4cCgnKCcgKyBnZXRKb2luZWRSZWdFeHAoc3BsaXR0ZXJzKSArICcpJylcblxuZXhwb3J0IGNsYXNzIFRva2VuaXplciB7XG4gIHJhdzogc3RyaW5nXG4gIHNvdXJjZTogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG5cbiAgY29uc3RydWN0b3IocmF3OiBzdHJpbmcgLyogb3B0czogeyBrZXl3b3Jkcz86IEFycmF5PHN0cmluZz4gfSA9IHt9ICovKSB7XG4gICAgdGhpcy5yYXcgPSByYXdcbiAgICB0aGlzLnNvdXJjZSA9IHJhdy5zcGxpdChyZVNwbGl0dGVyKVxuXG4gICAgaWYgKGRlYnVnUmF3LmVuYWJsZWQpIHtcbiAgICAgIGRlYnVnUmF3KHRoaXMuc291cmNlLmZpbHRlcigodCkgPT4gIS9eXFxzKiQvLnRlc3QodCkpKVxuICAgIH1cbiAgfVxuXG4gIHRva2VuaXplKCk6IEFycmF5PFRva2VuPiB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2VcbiAgICBjb25zdCB0b2tlbnMgPSBbXVxuXG4gICAgbGV0IGN1ciA9IDBcblxuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbGV0IGxpbmUgPSAxXG4gICAgbGV0IGNvbHVtbiA9IDFcblxuICAgIHdoaWxlIChjdXIgPCBzb3VyY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzdHIgPSBzb3VyY2VbY3VyKytdXG5cbiAgICAgIGlmICghc3RyKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkgd2hpdGVzcGFjZXMgb3IgdGFic1xuICAgICAgaWYgKC9eKCB8XFx0KS8udGVzdChzdHIpKSB7XG4gICAgICAgIG9mZnNldCArPSBzdHIubGVuZ3RoXG4gICAgICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoXG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gbmV3bGluZVxuICAgICAgaWYgKHN0ciA9PT0gJ1xcbicpIHtcbiAgICAgICAgb2Zmc2V0ICs9IHN0ci5sZW5ndGhcbiAgICAgICAgbGluZSsrXG4gICAgICAgIGNvbHVtbiA9IDFcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBsZXQgZXJyOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcblxuICAgICAgLyoqIGRldGVybWluZSB0b2tlbiBzdGFydCAqL1xuXG4gICAgICBjb25zdCBzdGFydE9mZnNldCA9IG9mZnNldFxuICAgICAgY29uc3Qgc3RhcnRMaW5lID0gbGluZVxuICAgICAgY29uc3Qgc3RhcnRDb2x1bW4gPSBjb2x1bW5cblxuICAgICAgLyoqIGRldGVybWluZSB0b2tlbiB0eXBlICovXG5cbiAgICAgIGxldCB0eXBlOiBUb2tlblR5cGVcblxuICAgICAgaWYgKChtYXRjaGVycy5zeW1ib2xzIGFzIFNldDxzdHJpbmc+KS5oYXMoc3RyKSkge1xuICAgICAgICB0eXBlID0gJ3N5bWJvbCdcbiAgICAgIH0gZWxzZSBpZiAoKG1hdGNoZXJzLm9wZXJhdG9ycyBhcyBTZXQ8c3RyaW5nPikuaGFzKHN0cikpIHtcbiAgICAgICAgdHlwZSA9ICdvcGVyYXRvcidcbiAgICAgIH0gZWxzZSBpZiAoL14odHJ1ZXxmYWxzZSkkLy50ZXN0KHN0cikpIHtcbiAgICAgICAgdHlwZSA9ICdib29sZWFuJ1xuICAgICAgfSBlbHNlIGlmIChzdHIuc3RhcnRzV2l0aCgnXCInKSkge1xuICAgICAgICB0eXBlID0gJ3N0cmluZydcblxuICAgICAgICBpZiAoIXN0ci5lbmRzV2l0aCgnXCInKSB8fCBzdHIgPT09ICdcIicpIHtcbiAgICAgICAgICBlcnIgPVxuICAgICAgICAgICAgJ0ludmFsaWQgdG9rZW4gKHN0cmluZyBtYXkgaGF2ZSBuZXdsaW5lcyBpbnNpZGUgbm9ybWFsIHF1b3RlcywgdXNlIGB7XCIgXCJ9YCknXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RyLnN0YXJ0c1dpdGgoJ3tcIicpKSB7XG4gICAgICAgIHR5cGUgPSAnc3RyaW5nJ1xuXG4gICAgICAgIC8vIHN0cmluZyBjYW4gaGF2ZSBuZXdsaW5lIGluc2lkZVxuICAgICAgICBjb25zdCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAgICAgbGluZSArPSBsaW5lcy5sZW5ndGggLSAxXG4gICAgICAgIGNvbHVtbiA9IGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdLmxlbmd0aCAtIChzdHIubGVuZ3RoIC0gMSlcbiAgICAgIH0gZWxzZSBpZiAoL15bXFxkLl0rJT8kLy50ZXN0KHN0cikpIHtcbiAgICAgICAgdHlwZSA9ICdudW1lcmljJ1xuICAgICAgfSBlbHNlIGlmICgvXigjfFxcL1xcL3xcXC9cXCopLy50ZXN0KHN0cikpIHtcbiAgICAgICAgdHlwZSA9ICdjb21tZW50J1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9ICdpZGVudCdcblxuICAgICAgICBpZiAoIS9eW0EtWmEtel9dW0EtWmEtelxcZC4tX10qLy50ZXN0KHN0cikpIHtcbiAgICAgICAgICBlcnIgPSBgSW52YWxpZCB0b2tlbjogJyR7c3RyfSdgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqIHVwZGF0ZSBwb3NpdGlvbiAqL1xuXG4gICAgICBvZmZzZXQgKz0gc3RyLmxlbmd0aFxuICAgICAgY29sdW1uICs9IHN0ci5sZW5ndGhcblxuICAgICAgLyoqIGRldGVybWluZSB0b2tlbiBlbmQgKi9cblxuICAgICAgY29uc3QgZW5kT2Zmc2V0ID0gb2Zmc2V0IC0gMVxuICAgICAgY29uc3QgZW5kTGluZSA9IGxpbmVcbiAgICAgIGNvbnN0IGVuZENvbHVtbiA9IGNvbHVtbiAtIDFcblxuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihcbiAgICAgICAgICB0aGlzLnJhdyxcbiAgICAgICAgICBlcnIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgb2Zmc2V0OiBzdGFydE9mZnNldCxcbiAgICAgICAgICAgIGxpbmU6IHN0YXJ0TGluZSxcbiAgICAgICAgICAgIGNvbHVtbjogc3RhcnRDb2x1bW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvZmZzZXQ6IGVuZE9mZnNldCxcbiAgICAgICAgICAgIGxpbmU6IGVuZExpbmUsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRva2VuID0ge1xuICAgICAgICB0eXBlLFxuICAgICAgICB2YWx1ZTogc3RyLFxuICAgICAgICBsb2M6IHtcbiAgICAgICAgICBzdGFydDogeyBvZmZzZXQ6IHN0YXJ0T2Zmc2V0LCBsaW5lOiBzdGFydExpbmUsIGNvbHVtbjogc3RhcnRDb2x1bW4gfSxcbiAgICAgICAgICBlbmQ6IHsgb2Zmc2V0OiBlbmRPZmZzZXQsIGxpbmU6IGVuZExpbmUsIGNvbHVtbjogZW5kQ29sdW1uIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG5cbiAgICAgIGlmIChkZWJ1Z1Rva2VuLmVuYWJsZWQpIHtcbiAgICAgICAgZGVidWdUb2tlbihgJHt0b2tlbi50eXBlfTogJHt0b2tlbi52YWx1ZX1gKVxuICAgICAgfVxuXG4gICAgICB0b2tlbnMucHVzaCh0b2tlbilcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5zIGFzIEFycmF5PFRva2VuPlxuICB9XG59XG4iXX0=

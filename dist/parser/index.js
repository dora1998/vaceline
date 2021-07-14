'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.Parser = exports.parse = void 0

var _tokenizer = require('./tokenizer')

var _createError = require('./create-error')

var _tokenReader = require('./token-reader')

var _token2 = require('../utils/token')

var _index = require('./statement/index')

var _compound = require('./compound')

var _debug = require('../utils/debug')

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

const debug = {
  start: (0, _debug.buildDebug)('parser:start'),
  finish: (0, _debug.buildDebug)('parser:finish'),
  trace: (0, _debug.buildDebug)('parser:trace'),
}

const parse = (source) => new Parser(source).parse()

exports.parse = parse

class Parser {
  constructor(source /* opts: { keywords?: Array<string> } = {} */) {
    _defineProperty(this, 'source', void 0)

    _defineProperty(this, 'reader', void 0)

    const tokens = new _tokenizer.Tokenizer(source).tokenize()
    this.source = source
    this.reader = new _tokenReader.TokenReader(tokens)
  }

  parse() {
    const body = (0, _compound.parseCompound)(this, _index.parseStmt)
    const pos = {
      offset: 0,
      line: 1,
      column: 1,
    }
    const node = {
      type: 'Program',
      body,
      loc: {
        start: pos,
        end: this.reader.getCurrentToken().loc.end,
      },
    }
    node.leadingComments = []
    node.innerComments = this.parseInnerComments()
    node.trailingComments = this.parseTrailingComments()
    return node
  }

  parseNode(token, parse) {
    debug.start(token)
    const state = {
      token,
      pos: token.loc.start,
    }
    const leadingComments = this.parseLeadingComments(state.pos)
    const node = parse(state)

    if (!node.loc) {
      node.loc = {
        start: state.pos,
        end: this.reader.getCurrentToken().loc.end,
      }
    }

    node.leadingComments = leadingComments
    node.innerComments = this.parseInnerComments()
    node.trailingComments = this.parseTrailingComments()
    debug.finish(node) // @ts-expect-error FIXME:

    return node
  }

  parseLeadingComments(pos) {
    const leadingComments = []
    let i = this.reader.comments.length - 1

    while (
      (_ref =
        (_this$reader$comments = this.reader.comments[i]) === null ||
        _this$reader$comments === void 0
          ? void 0
          : (_this$reader$comments2 = _this$reader$comments.loc) === null ||
            _this$reader$comments2 === void 0
          ? void 0
          : _this$reader$comments2.start.line) !== null && _ref !== void 0
        ? _ref
        : Infinity < pos.line
    ) {
      var _ref, _this$reader$comments, _this$reader$comments2

      leadingComments === null || leadingComments === void 0
        ? void 0
        : leadingComments.push(this.reader.comments[i])
      i--
    }

    this.reader.comments = this.reader.comments.slice(0, i + 1)
    return leadingComments.reverse()
  }

  parseInnerComments() {
    const innerComments = this.reader.comments.slice()
    this.reader.comments = []
    return innerComments
  }

  parseTrailingComments() {
    const trailingComments = []
    let cur = this.reader.getCursor()
    let token = this.reader.getToken(cur)

    while (
      ((_token = token) === null || _token === void 0
        ? void 0
        : _token.type) === 'comment' &&
      token.loc.start.line === this.reader.getCurrentToken().loc.end.line
    ) {
      var _token

      this.reader.jumpTo(cur + 1)
      trailingComments.push({
        type: 'CommentLine',
        value: token.value,
        loc: token.loc,
      })
      token = this.reader.getToken(++cur)
    }

    return trailingComments
  }

  read() {
    return this.reader.read()
  }

  peek() {
    return this.reader.peek()
  }

  take() {
    return this.reader.take()
  }

  getCursor() {
    return this.reader.getCursor()
  }

  jumpTo(cur) {
    return this.reader.jumpTo(cur)
  }

  getCurrentToken() {
    return this.reader.getCurrentToken()
  }

  validateNode(node, ...types) {
    if (!types.includes(node.type)) {
      throw (0, _createError.createError)(
        this.source,
        'Expected one of [' + types.join(', ') + ']',
        node.loc.start,
        node.loc.end
      )
    }

    return node
  }

  validateToken(token, type, value) {
    if (!(0, _token2.isToken)(token, type, value)) {
      throw (0, _createError.createError)(
        this.source,
        `Expected '${value}' ${type} token`,
        token.loc.start,
        token.loc.end
      )
    }

    return token
  }
}

exports.Parser = Parser
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvaW5kZXgudHMiXSwibmFtZXMiOlsiZGVidWciLCJzdGFydCIsImZpbmlzaCIsInRyYWNlIiwicGFyc2UiLCJzb3VyY2UiLCJQYXJzZXIiLCJjb25zdHJ1Y3RvciIsInRva2VucyIsIlRva2VuaXplciIsInRva2VuaXplIiwicmVhZGVyIiwiVG9rZW5SZWFkZXIiLCJib2R5IiwicGFyc2VTdG10IiwicG9zIiwib2Zmc2V0IiwibGluZSIsImNvbHVtbiIsIm5vZGUiLCJ0eXBlIiwibG9jIiwiZW5kIiwiZ2V0Q3VycmVudFRva2VuIiwibGVhZGluZ0NvbW1lbnRzIiwiaW5uZXJDb21tZW50cyIsInBhcnNlSW5uZXJDb21tZW50cyIsInRyYWlsaW5nQ29tbWVudHMiLCJwYXJzZVRyYWlsaW5nQ29tbWVudHMiLCJwYXJzZU5vZGUiLCJ0b2tlbiIsInN0YXRlIiwicGFyc2VMZWFkaW5nQ29tbWVudHMiLCJpIiwiY29tbWVudHMiLCJsZW5ndGgiLCJJbmZpbml0eSIsInB1c2giLCJzbGljZSIsInJldmVyc2UiLCJjdXIiLCJnZXRDdXJzb3IiLCJnZXRUb2tlbiIsImp1bXBUbyIsInZhbHVlIiwicmVhZCIsInBlZWsiLCJ0YWtlIiwidmFsaWRhdGVOb2RlIiwidHlwZXMiLCJpbmNsdWRlcyIsImpvaW4iLCJ2YWxpZGF0ZVRva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBVUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxLQUFLLEdBQUc7QUFDWkMsRUFBQUEsS0FBSyxFQUFFLHVCQUFXLGNBQVgsQ0FESztBQUVaQyxFQUFBQSxNQUFNLEVBQUUsdUJBQVcsZUFBWCxDQUZJO0FBR1pDLEVBQUFBLEtBQUssRUFBRSx1QkFBVyxjQUFYO0FBSEssQ0FBZDs7QUFNTyxNQUFNQyxLQUFLLEdBQUlDLE1BQUQsSUFBNkIsSUFBSUMsTUFBSixDQUFXRCxNQUFYLEVBQW1CRCxLQUFuQixFQUEzQzs7OztB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QVA7QUFDRDs7QUFFRGlDLEVBQUFBLGFBQWEsQ0FDWHRCLEtBRFcsRUFFWFYsSUFGVyxFQUdYd0IsS0FIVyxFQUlvQjtBQUMvQixRQUFJLENBQUMscUJBQVFkLEtBQVIsRUFBZVYsSUFBZixFQUFxQndCLEtBQXJCLENBQUwsRUFBa0M7QUFDaEMsWUFBTSw4QkFDSixLQUFLdkMsTUFERCxFQUVILGFBQVl1QyxLQUFNLEtBQUl4QixJQUFLLFFBRnhCLEVBR0pVLEtBQUssQ0FBQ1QsR0FBTixDQUFVcEIsS0FITixFQUlKNkIsS0FBSyxDQUFDVCxHQUFOLENBQVVDLEdBSk4sQ0FBTjtBQU1EOztBQUVELFdBQU9RLEtBQVA7QUFDRDs7QUFqS2lCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9rZW5pemVyLCBUb2tlbiwgVG9rZW5UeXBlIH0gZnJvbSAnLi90b2tlbml6ZXInXG5pbXBvcnQge1xuICBOb2RlLFxuICBMb2NhdGVkLFxuICBOb2RlVHlwZSxcbiAgU3RhdGVtZW50LFxuICBQcm9ncmFtLFxuICBQb3NpdGlvbixcbiAgQ29tbWVudCxcbn0gZnJvbSAnLi4vbm9kZXMnXG5pbXBvcnQgeyBjcmVhdGVFcnJvciB9IGZyb20gJy4vY3JlYXRlLWVycm9yJ1xuaW1wb3J0IHsgVG9rZW5SZWFkZXIgfSBmcm9tICcuL3Rva2VuLXJlYWRlcidcblxuaW1wb3J0IHsgaXNUb2tlbiB9IGZyb20gJy4uL3V0aWxzL3Rva2VuJ1xuaW1wb3J0IHsgcGFyc2VTdG10IH0gZnJvbSAnLi9zdGF0ZW1lbnQvaW5kZXgnXG5pbXBvcnQgeyBwYXJzZUNvbXBvdW5kIH0gZnJvbSAnLi9jb21wb3VuZCdcbmltcG9ydCB7IGJ1aWxkRGVidWcgfSBmcm9tICcuLi91dGlscy9kZWJ1ZydcblxuY29uc3QgZGVidWcgPSB7XG4gIHN0YXJ0OiBidWlsZERlYnVnKCdwYXJzZXI6c3RhcnQnKSxcbiAgZmluaXNoOiBidWlsZERlYnVnKCdwYXJzZXI6ZmluaXNoJyksXG4gIHRyYWNlOiBidWlsZERlYnVnKCdwYXJzZXI6dHJhY2UnKSxcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlID0gKHNvdXJjZTogc3RyaW5nKTogUHJvZ3JhbSA9PiBuZXcgUGFyc2VyKHNvdXJjZSkucGFyc2UoKVxuXG5pbnRlcmZhY2UgUGFyc2luZ1N0YXRlIHtcbiAgdG9rZW46IFRva2VuXG4gIHBvczogUG9zaXRpb25cbiAgY29tbWVudHM/OiBBcnJheTxDb21tZW50PlxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VyIHtcbiAgc291cmNlOiBzdHJpbmdcbiAgcHJpdmF0ZSByZWFkZXI6IFRva2VuUmVhZGVyXG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBzdHJpbmcgLyogb3B0czogeyBrZXl3b3Jkcz86IEFycmF5PHN0cmluZz4gfSA9IHt9ICovKSB7XG4gICAgY29uc3QgdG9rZW5zID0gbmV3IFRva2VuaXplcihzb3VyY2UpLnRva2VuaXplKClcblxuICAgIHRoaXMuc291cmNlID0gc291cmNlXG4gICAgdGhpcy5yZWFkZXIgPSBuZXcgVG9rZW5SZWFkZXIodG9rZW5zKVxuICB9XG5cbiAgcGFyc2UoKTogTG9jYXRlZDxQcm9ncmFtPiB7XG4gICAgY29uc3QgYm9keSA9IHBhcnNlQ29tcG91bmQ8U3RhdGVtZW50Pih0aGlzLCBwYXJzZVN0bXQpXG5cbiAgICBjb25zdCBwb3MgPSB7IG9mZnNldDogMCwgbGluZTogMSwgY29sdW1uOiAxIH1cblxuICAgIGNvbnN0IG5vZGU6IExvY2F0ZWQ8UHJvZ3JhbT4gPSB7XG4gICAgICB0eXBlOiAnUHJvZ3JhbScsXG4gICAgICBib2R5LFxuICAgICAgbG9jOiB7XG4gICAgICAgIHN0YXJ0OiBwb3MsXG4gICAgICAgIGVuZDogdGhpcy5yZWFkZXIuZ2V0Q3VycmVudFRva2VuKCkubG9jLmVuZCxcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgbm9kZS5sZWFkaW5nQ29tbWVudHMgPSBbXVxuICAgIG5vZGUuaW5uZXJDb21tZW50cyA9IHRoaXMucGFyc2VJbm5lckNvbW1lbnRzKClcbiAgICBub2RlLnRyYWlsaW5nQ29tbWVudHMgPSB0aGlzLnBhcnNlVHJhaWxpbmdDb21tZW50cygpXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgcGFyc2VOb2RlPFQgZXh0ZW5kcyBOb2RlVHlwZT4oXG4gICAgdG9rZW46IFRva2VuLFxuICAgIHBhcnNlOiAoc3RhdGU6IFBhcnNpbmdTdGF0ZSkgPT4gTm9kZSAmIHsgdHlwZTogVCB9XG4gICk6IExvY2F0ZWQ8Tm9kZSAmIHsgdHlwZTogVCB9PiB7XG4gICAgZGVidWcuc3RhcnQodG9rZW4pXG5cbiAgICBjb25zdCBzdGF0ZTogUGFyc2luZ1N0YXRlID0ge1xuICAgICAgdG9rZW4sXG4gICAgICBwb3M6IHRva2VuLmxvYy5zdGFydCxcbiAgICB9XG5cbiAgICBjb25zdCBsZWFkaW5nQ29tbWVudHMgPSB0aGlzLnBhcnNlTGVhZGluZ0NvbW1lbnRzKHN0YXRlLnBvcylcblxuICAgIGNvbnN0IG5vZGUgPSBwYXJzZShzdGF0ZSlcblxuICAgIGlmICghbm9kZS5sb2MpIHtcbiAgICAgIG5vZGUubG9jID0ge1xuICAgICAgICBzdGFydDogc3RhdGUucG9zLFxuICAgICAgICBlbmQ6IHRoaXMucmVhZGVyLmdldEN1cnJlbnRUb2tlbigpLmxvYy5lbmQsXG4gICAgICB9XG4gICAgfVxuXG4gICAgbm9kZS5sZWFkaW5nQ29tbWVudHMgPSBsZWFkaW5nQ29tbWVudHNcbiAgICBub2RlLmlubmVyQ29tbWVudHMgPSB0aGlzLnBhcnNlSW5uZXJDb21tZW50cygpXG4gICAgbm9kZS50cmFpbGluZ0NvbW1lbnRzID0gdGhpcy5wYXJzZVRyYWlsaW5nQ29tbWVudHMoKVxuXG4gICAgZGVidWcuZmluaXNoKG5vZGUpXG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEZJWE1FOlxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBwYXJzZUxlYWRpbmdDb21tZW50cyhwb3M6IFBvc2l0aW9uKTogQXJyYXk8Q29tbWVudD4ge1xuICAgIGNvbnN0IGxlYWRpbmdDb21tZW50cyA9IFtdXG5cbiAgICBsZXQgaSA9IHRoaXMucmVhZGVyLmNvbW1lbnRzLmxlbmd0aCAtIDFcblxuICAgIHdoaWxlICh0aGlzLnJlYWRlci5jb21tZW50c1tpXT8ubG9jPy5zdGFydC5saW5lID8/IEluZmluaXR5IDwgcG9zLmxpbmUpIHtcbiAgICAgIGxlYWRpbmdDb21tZW50cz8ucHVzaCh0aGlzLnJlYWRlci5jb21tZW50c1tpXSlcbiAgICAgIGktLVxuICAgIH1cblxuICAgIHRoaXMucmVhZGVyLmNvbW1lbnRzID0gdGhpcy5yZWFkZXIuY29tbWVudHMuc2xpY2UoMCwgaSArIDEpXG5cbiAgICByZXR1cm4gbGVhZGluZ0NvbW1lbnRzLnJldmVyc2UoKVxuICB9XG5cbiAgcGFyc2VJbm5lckNvbW1lbnRzKCk6IEFycmF5PENvbW1lbnQ+IHtcbiAgICBjb25zdCBpbm5lckNvbW1lbnRzID0gdGhpcy5yZWFkZXIuY29tbWVudHMuc2xpY2UoKVxuXG4gICAgdGhpcy5yZWFkZXIuY29tbWVudHMgPSBbXVxuXG4gICAgcmV0dXJuIGlubmVyQ29tbWVudHNcbiAgfVxuXG4gIHBhcnNlVHJhaWxpbmdDb21tZW50cygpOiBBcnJheTxDb21tZW50PiB7XG4gICAgY29uc3QgdHJhaWxpbmdDb21tZW50czogQXJyYXk8Q29tbWVudD4gPSBbXVxuXG4gICAgbGV0IGN1ciA9IHRoaXMucmVhZGVyLmdldEN1cnNvcigpXG4gICAgbGV0IHRva2VuID0gdGhpcy5yZWFkZXIuZ2V0VG9rZW4oY3VyKVxuXG4gICAgd2hpbGUgKFxuICAgICAgdG9rZW4/LnR5cGUgPT09ICdjb21tZW50JyAmJlxuICAgICAgdG9rZW4ubG9jLnN0YXJ0LmxpbmUgPT09IHRoaXMucmVhZGVyLmdldEN1cnJlbnRUb2tlbigpLmxvYy5lbmQubGluZVxuICAgICkge1xuICAgICAgdGhpcy5yZWFkZXIuanVtcFRvKGN1ciArIDEpXG5cbiAgICAgIHRyYWlsaW5nQ29tbWVudHMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdDb21tZW50TGluZScsXG4gICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgbG9jOiB0b2tlbi5sb2MsXG4gICAgICB9KVxuXG4gICAgICB0b2tlbiA9IHRoaXMucmVhZGVyLmdldFRva2VuKCsrY3VyKVxuICAgIH1cblxuICAgIHJldHVybiB0cmFpbGluZ0NvbW1lbnRzXG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRlci5yZWFkKClcbiAgfVxuICBwZWVrKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRlci5wZWVrKClcbiAgfVxuICB0YWtlKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRlci50YWtlKClcbiAgfVxuICBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZGVyLmdldEN1cnNvcigpXG4gIH1cbiAganVtcFRvKGN1cjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZGVyLmp1bXBUbyhjdXIpXG4gIH1cbiAgZ2V0Q3VycmVudFRva2VuKCk6IFRva2VuIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkZXIuZ2V0Q3VycmVudFRva2VuKClcbiAgfVxuXG4gIHZhbGlkYXRlTm9kZTxUIGV4dGVuZHMgQXJyYXk8Tm9kZVR5cGU+PihcbiAgICBub2RlOiBMb2NhdGVkPE5vZGU+LFxuICAgIC4uLnR5cGVzOiBUXG4gICk6IExvY2F0ZWQ8Tm9kZSAmIHsgdHlwZTogVFtudW1iZXJdIH0+IHtcbiAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKG5vZGUudHlwZSkpIHtcbiAgICAgIHRocm93IGNyZWF0ZUVycm9yKFxuICAgICAgICB0aGlzLnNvdXJjZSxcbiAgICAgICAgJ0V4cGVjdGVkIG9uZSBvZiBbJyArIHR5cGVzLmpvaW4oJywgJykgKyAnXScsXG4gICAgICAgIG5vZGUubG9jLnN0YXJ0LFxuICAgICAgICBub2RlLmxvYy5lbmRcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZSBhcyBMb2NhdGVkPE5vZGUgJiB7IHR5cGU6IFQgfT5cbiAgfVxuXG4gIHZhbGlkYXRlVG9rZW48VCBleHRlbmRzIFRva2VuVHlwZSwgVSBleHRlbmRzIHN0cmluZz4oXG4gICAgdG9rZW46IFRva2VuLFxuICAgIHR5cGU6IFQsXG4gICAgdmFsdWU/OiBVXG4gICk6IFRva2VuICYgeyB0eXBlOiBUOyB2YWx1ZTogVSB9IHtcbiAgICBpZiAoIWlzVG9rZW4odG9rZW4sIHR5cGUsIHZhbHVlKSkge1xuICAgICAgdGhyb3cgY3JlYXRlRXJyb3IoXG4gICAgICAgIHRoaXMuc291cmNlLFxuICAgICAgICBgRXhwZWN0ZWQgJyR7dmFsdWV9JyAke3R5cGV9IHRva2VuYCxcbiAgICAgICAgdG9rZW4ubG9jLnN0YXJ0LFxuICAgICAgICB0b2tlbi5sb2MuZW5kXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuIGFzIFRva2VuICYgeyB0eXBlOiBUOyB2YWx1ZTogVSB9XG4gIH1cbn1cbiJdfQ==

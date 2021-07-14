'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.TokenReader = void 0

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

class TokenReader {
  constructor(tokens) {
    _defineProperty(this, 'tokens', void 0)

    _defineProperty(this, 'cur', void 0)

    _defineProperty(this, 'comments', void 0)

    this.tokens = tokens
    this.comments = []
    this.cur = 0
  }

  getCurrentToken() {
    return this.tokens[this.cur - 1]
  }

  jumpTo(cur) {
    this.cur = cur
  }

  getCursor() {
    return this.cur
  }

  getToken(cur) {
    return this.tokens[cur]
  }

  read() {
    const token = this.tokens[this.cur++]

    if (!token) {
      throw new SyntaxError('Unexpected EOF')
    }

    if (token.type === 'comment') {
      this.comments.push({
        type: 'CommentLine',
        value: token.value,
        loc: token.loc,
      })
      return this.read()
    }

    return token
  }

  peek(skip = 0) {
    const token = this.tokens[this.cur + skip]
    if (!token) return undefined

    if (token.type === 'comment') {
      return this.peek(skip + 1)
    }

    return token
  } // TODO: This can be replaced with read()

  take() {
    this.read()
  }
}

exports.TokenReader = TokenReader
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvdG9rZW4tcmVhZGVyLnRzIl0sIm5hbWVzIjpbIlRva2VuUmVhZGVyIiwiY29uc3RydWN0b3IiLCJ0b2tlbnMiLCJjb21tZW50cyIsImN1ciIsImdldEN1cnJlbnRUb2tlbiIsImp1bXBUbyIsImdldEN1cnNvciIsImdldFRva2VuIiwicmVhZCIsInRva2VuIiwiU3ludGF4RXJyb3IiLCJ0eXBlIiwicHVzaCIsInZhbHVlIiwibG9jIiwicGVlayIsInNraXAiLCJ1bmRlZmluZWQiLCJ0YWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHTyxNQUFNQSxXQUFOLENBQWtCO0FBTXZCQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBdUI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDaEMsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUVBLFNBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0Q7O0FBRURDLEVBQUFBLGVBQWUsR0FBVTtBQUN2QixXQUFPLEtBQUtILE1BQUwsQ0FBWSxLQUFLRSxHQUFMLEdBQVcsQ0FBdkIsQ0FBUDtBQUNEOztBQUVERSxFQUFBQSxNQUFNLENBQUNGLEdBQUQsRUFBYztBQUNsQixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDRDs7QUFFREcsRUFBQUEsU0FBUyxHQUFXO0FBQ2xCLFdBQU8sS0FBS0gsR0FBWjtBQUNEOztBQUVESSxFQUFBQSxRQUFRLENBQUNKLEdBQUQsRUFBNEI7QUFDbEMsV0FBTyxLQUFLRixNQUFMLENBQVlFLEdBQVosQ0FBUDtBQUNEOztBQUVESyxFQUFBQSxJQUFJLEdBQVU7QUFDWixVQUFNQyxLQUFLLEdBQUcsS0FBS1IsTUFBTCxDQUFZLEtBQUtFLEdBQUwsRUFBWixDQUFkOztBQUVBLFFBQUksQ0FBQ00sS0FBTCxFQUFZO0FBQ1YsWUFBTSxJQUFJQyxXQUFKLENBQWdCLGdCQUFoQixDQUFOO0FBQ0Q7O0FBRUQsUUFBSUQsS0FBSyxDQUFDRSxJQUFOLEtBQWUsU0FBbkIsRUFBOEI7QUFDNUIsV0FBS1QsUUFBTCxDQUFjVSxJQUFkLENBQW1CO0FBQ2pCRCxRQUFBQSxJQUFJLEVBQUUsYUFEVztBQUVqQkUsUUFBQUEsS0FBSyxFQUFFSixLQUFLLENBQUNJLEtBRkk7QUFHakJDLFFBQUFBLEdBQUcsRUFBRUwsS0FBSyxDQUFDSztBQUhNLE9BQW5CO0FBS0EsYUFBTyxLQUFLTixJQUFMLEVBQVA7QUFDRDs7QUFFRCxXQUFPQyxLQUFQO0FBQ0Q7O0FBRURNLEVBQUFBLElBQUksQ0FBQ0MsSUFBSSxHQUFHLENBQVIsRUFBOEI7QUFDaEMsVUFBTVAsS0FBSyxHQUFHLEtBQUtSLE1BQUwsQ0FBWSxLQUFLRSxHQUFMLEdBQVdhLElBQXZCLENBQWQ7QUFFQSxRQUFJLENBQUNQLEtBQUwsRUFBWSxPQUFPUSxTQUFQOztBQUVaLFFBQUlSLEtBQUssQ0FBQ0UsSUFBTixLQUFlLFNBQW5CLEVBQThCO0FBQzVCLGFBQU8sS0FBS0ksSUFBTCxDQUFVQyxJQUFJLEdBQUcsQ0FBakIsQ0FBUDtBQUNEOztBQUVELFdBQU9QLEtBQVA7QUFDRCxHQTFEc0IsQ0E0RHZCOzs7QUFDQVMsRUFBQUEsSUFBSSxHQUFTO0FBQ1gsU0FBS1YsSUFBTDtBQUNEOztBQS9Ec0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tZW50IH0gZnJvbSAnLi4vbm9kZXMnXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdG9rZW5pemVyJ1xuXG5leHBvcnQgY2xhc3MgVG9rZW5SZWFkZXIge1xuICBwcml2YXRlIHRva2VuczogQXJyYXk8VG9rZW4+XG4gIHByaXZhdGUgY3VyOiBudW1iZXJcblxuICBjb21tZW50czogQXJyYXk8Q29tbWVudD5cblxuICBjb25zdHJ1Y3Rvcih0b2tlbnM6IEFycmF5PFRva2VuPikge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zXG4gICAgdGhpcy5jb21tZW50cyA9IFtdXG5cbiAgICB0aGlzLmN1ciA9IDBcbiAgfVxuXG4gIGdldEN1cnJlbnRUb2tlbigpOiBUb2tlbiB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuY3VyIC0gMV1cbiAgfVxuXG4gIGp1bXBUbyhjdXI6IG51bWJlcikge1xuICAgIHRoaXMuY3VyID0gY3VyXG4gIH1cblxuICBnZXRDdXJzb3IoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJcbiAgfVxuXG4gIGdldFRva2VuKGN1cjogbnVtYmVyKTogVG9rZW4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbY3VyXVxuICB9XG5cbiAgcmVhZCgpOiBUb2tlbiB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2Vuc1t0aGlzLmN1cisrXVxuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIEVPRicpXG4gICAgfVxuXG4gICAgaWYgKHRva2VuLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgdGhpcy5jb21tZW50cy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ0NvbW1lbnRMaW5lJyxcbiAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgICAgICBsb2M6IHRva2VuLmxvYyxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpcy5yZWFkKClcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5cbiAgfVxuXG4gIHBlZWsoc2tpcCA9IDApOiBUb2tlbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2Vuc1t0aGlzLmN1ciArIHNraXBdXG5cbiAgICBpZiAoIXRva2VuKSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgICBpZiAodG9rZW4udHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5wZWVrKHNraXAgKyAxKVxuICAgIH1cblxuICAgIHJldHVybiB0b2tlblxuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCByZWFkKClcbiAgdGFrZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWQoKVxuICB9XG59XG4iXX0=

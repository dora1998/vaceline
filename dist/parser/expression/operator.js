'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseOperatorExpr = parseOperatorExpr

var ops = _interopRequireWildcard(require('../tokenizer/operators'))

var _token = require('../../utils/token')

var _humble = require('./humble')

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

function parseOperatorExpr(p, token = p.read(), shortcut = false) {
  const expr = (0, _humble.parseHumbleExpr)(p, token)
  if (shortcut) return expr

  if ((0, _token.isToken)(token, 'symbol', ';')) {
    return expr
  } // let node = p.startNode()

  let backup = p.getCursor()
  const rpn = [expr]
  const opStack = []
  let op // covert expression sequence into rpn

  while ((op = p.peek())) {
    const isBinary = ops.binary.has(op.value)
    const isLogical = !isBinary && ops.logical.has(op.value)
    if (!isBinary && !isLogical) break
    p.take()
    op.precedence = ops.getPrecedence(op.value)
    op.isBinary = isBinary

    while (op.precedence >= (opStack[opStack.length - 1] || {}).precedence) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rpn.push(opStack.pop())
    }

    opStack.push(op)

    try {
      rpn.push((0, _humble.parseHumbleExpr)(p))
    } catch (err) {
      if (err instanceof SyntaxError) {
        p.jumpTo(backup)
        break
      }

      throw err
    }

    backup = p.getCursor()
  }

  while (opStack.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rpn.push(opStack.pop())
  } // calculate rpn

  const stack = []

  for (let i = 0; i < rpn.length; i++) {
    const item = rpn[i]

    if (item.type !== 'operator') {
      stack.push(item)
      continue
    } // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    const right = stack.pop() // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    const left = stack.pop()
    const type = item.isBinary ? 'BinaryExpression' : 'LogicalExpression'
    const expr = {
      type,
      left,
      right,
      operator: item.value,
      loc: {
        start: left.loc.start,
        end: right.loc.end,
      },
    }
    stack.push(expr)
  }

  if (stack.length !== 1) {
    throw new Error()
  }

  return stack[0]
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvZXhwcmVzc2lvbi9vcGVyYXRvci50cyJdLCJuYW1lcyI6WyJwYXJzZU9wZXJhdG9yRXhwciIsInAiLCJ0b2tlbiIsInJlYWQiLCJzaG9ydGN1dCIsImV4cHIiLCJiYWNrdXAiLCJnZXRDdXJzb3IiLCJycG4iLCJvcFN0YWNrIiwib3AiLCJwZWVrIiwiaXNCaW5hcnkiLCJvcHMiLCJiaW5hcnkiLCJoYXMiLCJ2YWx1ZSIsImlzTG9naWNhbCIsImxvZ2ljYWwiLCJ0YWtlIiwicHJlY2VkZW5jZSIsImdldFByZWNlZGVuY2UiLCJsZW5ndGgiLCJwdXNoIiwicG9wIiwiZXJyIiwiU3ludGF4RXJyb3IiLCJqdW1wVG8iLCJzdGFjayIsImkiLCJpdGVtIiwidHlwZSIsInJpZ2h0IiwibGVmdCIsIm9wZXJhdG9yIiwibG9jIiwic3RhcnQiLCJlbmQiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBOztBQUVBOztBQUNBOzs7Ozs7QUFFTyxTQUFTQSxpQkFBVCxDQUNMQyxDQURLLEVBRUxDLEtBQVksR0FBR0QsQ0FBQyxDQUFDRSxJQUFGLEVBRlYsRUFHTEMsUUFBUSxHQUFHLEtBSE4sRUFJZ0I7QUFDckIsUUFBTUMsSUFBSSxHQUFHLDZCQUFnQkosQ0FBaEIsRUFBbUJDLEtBQW5CLENBQWI7QUFFQSxNQUFJRSxRQUFKLEVBQWMsT0FBT0MsSUFBUDs7QUFFZCxNQUFJLG9CQUFRSCxLQUFSLEVBQWUsUUFBZixFQUF5QixHQUF6QixDQUFKLEVBQW1DO0FBQ2pDLFdBQU9HLElBQVA7QUFDRCxHQVBvQixDQVNyQjs7O0FBQ0EsTUFBSUMsTUFBTSxHQUFHTCxDQUFDLENBQUNNLFNBQUYsRUFBYjtBQVFBLFFBQU1DLEdBQStDLEdBQUcsQ0FBQ0gsSUFBRCxDQUF4RDtBQUNBLFFBQU1JLE9BQTZCLEdBQUcsRUFBdEM7QUFFQSxNQUFJQyxFQUFKLENBckJxQixDQXNCckI7O0FBQ0EsU0FBUUEsRUFBRSxHQUFHVCxDQUFDLENBQUNVLElBQUYsRUFBYixFQUFnRDtBQUM5QyxVQUFNQyxRQUFRLEdBQUdDLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxHQUFYLENBQWVMLEVBQUUsQ0FBQ00sS0FBbEIsQ0FBakI7QUFDQSxVQUFNQyxTQUFTLEdBQUcsQ0FBQ0wsUUFBRCxJQUFhQyxHQUFHLENBQUNLLE9BQUosQ0FBWUgsR0FBWixDQUFnQkwsRUFBRSxDQUFDTSxLQUFuQixDQUEvQjtBQUVBLFFBQUksQ0FBQ0osUUFBRCxJQUFhLENBQUNLLFNBQWxCLEVBQTZCO0FBRTdCaEIsSUFBQUEsQ0FBQyxDQUFDa0IsSUFBRjtBQUVBVCxJQUFBQSxFQUFFLENBQUNVLFVBQUgsR0FBZ0JQLEdBQUcsQ0FBQ1EsYUFBSixDQUFrQlgsRUFBRSxDQUFDTSxLQUFyQixDQUFoQjtBQUNBTixJQUFBQSxFQUFFLENBQUNFLFFBQUgsR0FBY0EsUUFBZDs7QUFFQSxXQUFPRixFQUFFLENBQUNVLFVBQUgsSUFBaUIsQ0FBQ1gsT0FBTyxDQUFDQSxPQUFPLENBQUNhLE1BQVIsR0FBaUIsQ0FBbEIsQ0FBUCxJQUErQixFQUFoQyxFQUFvQ0YsVUFBNUQsRUFBd0U7QUFDdEU7QUFDQVosTUFBQUEsR0FBRyxDQUFDZSxJQUFKLENBQVNkLE9BQU8sQ0FBQ2UsR0FBUixFQUFUO0FBQ0Q7O0FBRURmLElBQUFBLE9BQU8sQ0FBQ2MsSUFBUixDQUFhYixFQUFiOztBQUVBLFFBQUk7QUFDRkYsTUFBQUEsR0FBRyxDQUFDZSxJQUFKLENBQVMsNkJBQWdCdEIsQ0FBaEIsQ0FBVDtBQUNELEtBRkQsQ0FFRSxPQUFPd0IsR0FBUCxFQUFZO0FBQ1osVUFBSUEsR0FBRyxZQUFZQyxXQUFuQixFQUFnQztBQUM5QnpCLFFBQUFBLENBQUMsQ0FBQzBCLE1BQUYsQ0FBU3JCLE1BQVQ7QUFDQTtBQUNEOztBQUNELFlBQU1tQixHQUFOO0FBQ0Q7O0FBRURuQixJQUFBQSxNQUFNLEdBQUdMLENBQUMsQ0FBQ00sU0FBRixFQUFUO0FBQ0Q7O0FBRUQsU0FBT0UsT0FBTyxDQUFDYSxNQUFmLEVBQXVCO0FBQ3JCO0FBQ0FkLElBQUFBLEdBQUcsQ0FBQ2UsSUFBSixDQUFTZCxPQUFPLENBQUNlLEdBQVIsRUFBVDtBQUNELEdBekRvQixDQTJEckI7OztBQUNBLFFBQU1JLEtBQWlDLEdBQUcsRUFBMUM7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHckIsR0FBRyxDQUFDYyxNQUF4QixFQUFnQ08sQ0FBQyxFQUFqQyxFQUFxQztBQUNuQyxVQUFNQyxJQUFJLEdBQUd0QixHQUFHLENBQUNxQixDQUFELENBQWhCOztBQUNBLFFBQUlDLElBQUksQ0FBQ0MsSUFBTCxLQUFjLFVBQWxCLEVBQThCO0FBQzVCSCxNQUFBQSxLQUFLLENBQUNMLElBQU4sQ0FBV08sSUFBWDtBQUNBO0FBQ0QsS0FMa0MsQ0FPbkM7OztBQUNBLFVBQU1FLEtBQUssR0FBR0osS0FBSyxDQUFDSixHQUFOLEVBQWQsQ0FSbUMsQ0FTbkM7O0FBQ0EsVUFBTVMsSUFBSSxHQUFHTCxLQUFLLENBQUNKLEdBQU4sRUFBYjtBQUVBLFVBQU1PLElBQUksR0FBR0QsSUFBSSxDQUFDbEIsUUFBTCxHQUFnQixrQkFBaEIsR0FBcUMsbUJBQWxEO0FBQ0EsVUFBTVAsSUFBbUQsR0FBRztBQUMxRDBCLE1BQUFBLElBRDBEO0FBRTFERSxNQUFBQSxJQUYwRDtBQUcxREQsTUFBQUEsS0FIMEQ7QUFJMURFLE1BQUFBLFFBQVEsRUFBRUosSUFBSSxDQUFDZCxLQUoyQztBQUsxRG1CLE1BQUFBLEdBQUcsRUFBRTtBQUFFQyxRQUFBQSxLQUFLLEVBQUVILElBQUksQ0FBQ0UsR0FBTCxDQUFTQyxLQUFsQjtBQUF5QkMsUUFBQUEsR0FBRyxFQUFFTCxLQUFLLENBQUNHLEdBQU4sQ0FBVUU7QUFBeEM7QUFMcUQsS0FBNUQ7QUFRQVQsSUFBQUEsS0FBSyxDQUFDTCxJQUFOLENBQVdsQixJQUFYO0FBQ0Q7O0FBRUQsTUFBSXVCLEtBQUssQ0FBQ04sTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixVQUFNLElBQUlnQixLQUFKLEVBQU47QUFDRDs7QUFFRCxTQUFPVixLQUFLLENBQUMsQ0FBRCxDQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJzZXIgfSBmcm9tICcuLidcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnLidcbmltcG9ydCB7XG4gIEJpbmFyeUV4cHJlc3Npb24sXG4gIEV4cHJlc3Npb24sXG4gIExvZ2ljYWxFeHByZXNzaW9uLFxuICBMb2NhdGVkLFxufSBmcm9tICcuLi8uLi9ub2RlcydcbmltcG9ydCAqIGFzIG9wcyBmcm9tICcuLi90b2tlbml6ZXIvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi90b2tlbml6ZXInXG5pbXBvcnQgeyBpc1Rva2VuIH0gZnJvbSAnLi4vLi4vdXRpbHMvdG9rZW4nXG5pbXBvcnQgeyBwYXJzZUh1bWJsZUV4cHIgfSBmcm9tICcuL2h1bWJsZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT3BlcmF0b3JFeHByKFxuICBwOiBQYXJzZXIsXG4gIHRva2VuOiBUb2tlbiA9IHAucmVhZCgpLFxuICBzaG9ydGN1dCA9IGZhbHNlXG4pOiBMb2NhdGVkPEV4cHJlc3Npb24+IHtcbiAgY29uc3QgZXhwciA9IHBhcnNlSHVtYmxlRXhwcihwLCB0b2tlbilcblxuICBpZiAoc2hvcnRjdXQpIHJldHVybiBleHByXG5cbiAgaWYgKGlzVG9rZW4odG9rZW4sICdzeW1ib2wnLCAnOycpKSB7XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIC8vIGxldCBub2RlID0gcC5zdGFydE5vZGUoKVxuICBsZXQgYmFja3VwID0gcC5nZXRDdXJzb3IoKVxuXG4gIHR5cGUgT3BlcmF0b3JUb2tlbiA9IFRva2VuICYge1xuICAgIHR5cGU6ICdvcGVyYXRvcidcbiAgICBwcmVjZWRlbmNlOiBudW1iZXJcbiAgICBpc0JpbmFyeTogYm9vbGVhblxuICB9XG5cbiAgY29uc3QgcnBuOiBBcnJheTxMb2NhdGVkPEV4cHJlc3Npb24+IHwgT3BlcmF0b3JUb2tlbj4gPSBbZXhwcl1cbiAgY29uc3Qgb3BTdGFjazogU3RhY2s8T3BlcmF0b3JUb2tlbj4gPSBbXVxuXG4gIGxldCBvcDogT3BlcmF0b3JUb2tlbiB8IG51bGxcbiAgLy8gY292ZXJ0IGV4cHJlc3Npb24gc2VxdWVuY2UgaW50byBycG5cbiAgd2hpbGUgKChvcCA9IHAucGVlaygpIGFzIE9wZXJhdG9yVG9rZW4gfCBudWxsKSkge1xuICAgIGNvbnN0IGlzQmluYXJ5ID0gb3BzLmJpbmFyeS5oYXMob3AudmFsdWUpXG4gICAgY29uc3QgaXNMb2dpY2FsID0gIWlzQmluYXJ5ICYmIG9wcy5sb2dpY2FsLmhhcyhvcC52YWx1ZSlcblxuICAgIGlmICghaXNCaW5hcnkgJiYgIWlzTG9naWNhbCkgYnJlYWtcblxuICAgIHAudGFrZSgpXG5cbiAgICBvcC5wcmVjZWRlbmNlID0gb3BzLmdldFByZWNlZGVuY2Uob3AudmFsdWUpXG4gICAgb3AuaXNCaW5hcnkgPSBpc0JpbmFyeVxuXG4gICAgd2hpbGUgKG9wLnByZWNlZGVuY2UgPj0gKG9wU3RhY2tbb3BTdGFjay5sZW5ndGggLSAxXSB8fCB7fSkucHJlY2VkZW5jZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIHJwbi5wdXNoKG9wU3RhY2sucG9wKCkhKVxuICAgIH1cblxuICAgIG9wU3RhY2sucHVzaChvcClcblxuICAgIHRyeSB7XG4gICAgICBycG4ucHVzaChwYXJzZUh1bWJsZUV4cHIocCkpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcbiAgICAgICAgcC5qdW1wVG8oYmFja3VwKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuXG4gICAgYmFja3VwID0gcC5nZXRDdXJzb3IoKVxuICB9XG5cbiAgd2hpbGUgKG9wU3RhY2subGVuZ3RoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBycG4ucHVzaChvcFN0YWNrLnBvcCgpISlcbiAgfVxuXG4gIC8vIGNhbGN1bGF0ZSBycG5cbiAgY29uc3Qgc3RhY2s6IFN0YWNrPExvY2F0ZWQ8RXhwcmVzc2lvbj4+ID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJwbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGl0ZW0gPSBycG5baV1cbiAgICBpZiAoaXRlbS50eXBlICE9PSAnb3BlcmF0b3InKSB7XG4gICAgICBzdGFjay5wdXNoKGl0ZW0pXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgY29uc3QgcmlnaHQgPSBzdGFjay5wb3AoKSFcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IGxlZnQgPSBzdGFjay5wb3AoKSFcblxuICAgIGNvbnN0IHR5cGUgPSBpdGVtLmlzQmluYXJ5ID8gJ0JpbmFyeUV4cHJlc3Npb24nIDogJ0xvZ2ljYWxFeHByZXNzaW9uJ1xuICAgIGNvbnN0IGV4cHI6IExvY2F0ZWQ8QmluYXJ5RXhwcmVzc2lvbiB8IExvZ2ljYWxFeHByZXNzaW9uPiA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQsXG4gICAgICBvcGVyYXRvcjogaXRlbS52YWx1ZSxcbiAgICAgIGxvYzogeyBzdGFydDogbGVmdC5sb2Muc3RhcnQsIGVuZDogcmlnaHQubG9jLmVuZCB9LFxuICAgIH1cblxuICAgIHN0YWNrLnB1c2goZXhwcilcbiAgfVxuXG4gIGlmIChzdGFjay5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICB9XG5cbiAgcmV0dXJuIHN0YWNrWzBdXG59XG4iXX0=

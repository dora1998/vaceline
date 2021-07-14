'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseHumbleExpr = parseHumbleExpr

var _token = require('../../utils/token')

var _createError = require('../create-error')

var _literal = require('../literal')

var _ = require('.')

var _compound = require('../compound')

var _identifier = require('./identifier')

function parseHumbleExpr(p, token = p.read()) {
  const literal = (0, _literal.parseLiteral)(p, token)
  if (literal) return literal

  if (token.type === 'ident') {
    return p.parseNode(token, () => {
      const id = (0, _identifier.parseId)(p, token)

      if ((0, _token.isToken)(p.peek(), 'symbol', '(')) {
        p.take() // skip '(' symbol

        const args = (0, _compound.parseCompound)(p, _.parseExpr, {
          until: ')',
          delimiter: ',',
        })
        return {
          type: 'FunCallExpression',
          callee: id,
          args,
        }
      }

      return id
    })
  }

  if (token.type === 'symbol' && token.value === '(') {
    return p.parseNode(token, () => {
      const body = (0, _.parseExpr)(p)
      p.validateToken(p.read(), 'symbol', ')')
      return {
        type: 'BooleanExpression',
        body,
      }
    })
  }

  if (token.type === 'operator' && token.value === '!') {
    return p.parseNode(token, () => {
      return {
        type: 'UnaryExpression',
        operator: token.value,
        argument: (0, _.parseExpr)(p),
      }
    })
  }

  throw (0, _createError.createError)(
    p.source,
    'Expression not implemented yet',
    token.loc.start,
    token.loc.end
  )
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvZXhwcmVzc2lvbi9odW1ibGUudHMiXSwibmFtZXMiOlsicGFyc2VIdW1ibGVFeHByIiwicCIsInRva2VuIiwicmVhZCIsImxpdGVyYWwiLCJ0eXBlIiwicGFyc2VOb2RlIiwiaWQiLCJwZWVrIiwidGFrZSIsImFyZ3MiLCJwYXJzZUV4cHIiLCJ1bnRpbCIsImRlbGltaXRlciIsImNhbGxlZSIsInZhbHVlIiwiYm9keSIsInZhbGlkYXRlVG9rZW4iLCJvcGVyYXRvciIsImFyZ3VtZW50Iiwic291cmNlIiwibG9jIiwic3RhcnQiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxTQUFTQSxlQUFULENBQ0xDLENBREssRUFFTEMsS0FBWSxHQUFHRCxDQUFDLENBQUNFLElBQUYsRUFGVixFQUdnQjtBQUNyQixRQUFNQyxPQUFPLEdBQUcsMkJBQWFILENBQWIsRUFBZ0JDLEtBQWhCLENBQWhCO0FBRUEsTUFBSUUsT0FBSixFQUFhLE9BQU9BLE9BQVA7O0FBRWIsTUFBSUYsS0FBSyxDQUFDRyxJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsV0FBT0osQ0FBQyxDQUFDSyxTQUFGLENBQVlKLEtBQVosRUFBbUIsTUFBTTtBQUM5QixZQUFNSyxFQUFFLEdBQUcseUJBQVFOLENBQVIsRUFBV0MsS0FBWCxDQUFYOztBQUVBLFVBQUksb0JBQVFELENBQUMsQ0FBQ08sSUFBRixFQUFSLEVBQWtCLFFBQWxCLEVBQTRCLEdBQTVCLENBQUosRUFBc0M7QUFDcENQLFFBQUFBLENBQUMsQ0FBQ1EsSUFBRixHQURvQyxDQUMzQjs7QUFFVCxjQUFNQyxJQUFJLEdBQUcsNkJBQWNULENBQWQsRUFBaUJVLFdBQWpCLEVBQTRCO0FBQUVDLFVBQUFBLEtBQUssRUFBRSxHQUFUO0FBQWNDLFVBQUFBLFNBQVMsRUFBRTtBQUF6QixTQUE1QixDQUFiO0FBRUEsZUFBTztBQUNMUixVQUFBQSxJQUFJLEVBQUUsbUJBREQ7QUFFTFMsVUFBQUEsTUFBTSxFQUFFUCxFQUZIO0FBR0xHLFVBQUFBO0FBSEssU0FBUDtBQUtEOztBQUVELGFBQU9ILEVBQVA7QUFDRCxLQWhCTSxDQUFQO0FBaUJEOztBQUVELE1BQUlMLEtBQUssQ0FBQ0csSUFBTixLQUFlLFFBQWYsSUFBMkJILEtBQUssQ0FBQ2EsS0FBTixLQUFnQixHQUEvQyxFQUFvRDtBQUNsRCxXQUFPZCxDQUFDLENBQUNLLFNBQUYsQ0FBWUosS0FBWixFQUFtQixNQUFNO0FBQzlCLFlBQU1jLElBQUksR0FBRyxpQkFBVWYsQ0FBVixDQUFiO0FBQ0FBLE1BQUFBLENBQUMsQ0FBQ2dCLGFBQUYsQ0FBZ0JoQixDQUFDLENBQUNFLElBQUYsRUFBaEIsRUFBMEIsUUFBMUIsRUFBb0MsR0FBcEM7QUFFQSxhQUFPO0FBQUVFLFFBQUFBLElBQUksRUFBRSxtQkFBUjtBQUE2QlcsUUFBQUE7QUFBN0IsT0FBUDtBQUNELEtBTE0sQ0FBUDtBQU1EOztBQUVELE1BQUlkLEtBQUssQ0FBQ0csSUFBTixLQUFlLFVBQWYsSUFBNkJILEtBQUssQ0FBQ2EsS0FBTixLQUFnQixHQUFqRCxFQUFzRDtBQUNwRCxXQUFPZCxDQUFDLENBQUNLLFNBQUYsQ0FBWUosS0FBWixFQUFtQixNQUFNO0FBQzlCLGFBQU87QUFDTEcsUUFBQUEsSUFBSSxFQUFFLGlCQUREO0FBRUxhLFFBQUFBLFFBQVEsRUFBRWhCLEtBQUssQ0FBQ2EsS0FGWDtBQUdMSSxRQUFBQSxRQUFRLEVBQUUsaUJBQVVsQixDQUFWO0FBSEwsT0FBUDtBQUtELEtBTk0sQ0FBUDtBQU9EOztBQUVELFFBQU0sOEJBQ0pBLENBQUMsQ0FBQ21CLE1BREUsRUFFSixnQ0FGSSxFQUdKbEIsS0FBSyxDQUFDbUIsR0FBTixDQUFVQyxLQUhOLEVBSUpwQixLQUFLLENBQUNtQixHQUFOLENBQVVFLEdBSk4sQ0FBTjtBQU1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnLi4nXG5pbXBvcnQgeyBMb2NhdGVkLCBFeHByZXNzaW9uIH0gZnJvbSAnLi4vLi4vbm9kZXMnXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uL3Rva2VuaXplcidcbmltcG9ydCB7IGlzVG9rZW4gfSBmcm9tICcuLi8uLi91dGlscy90b2tlbidcbmltcG9ydCB7IGNyZWF0ZUVycm9yIH0gZnJvbSAnLi4vY3JlYXRlLWVycm9yJ1xuaW1wb3J0IHsgcGFyc2VMaXRlcmFsIH0gZnJvbSAnLi4vbGl0ZXJhbCdcbmltcG9ydCB7IHBhcnNlRXhwciB9IGZyb20gJy4nXG5pbXBvcnQgeyBwYXJzZUNvbXBvdW5kIH0gZnJvbSAnLi4vY29tcG91bmQnXG5pbXBvcnQgeyBwYXJzZUlkIH0gZnJvbSAnLi9pZGVudGlmaWVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIdW1ibGVFeHByKFxuICBwOiBQYXJzZXIsXG4gIHRva2VuOiBUb2tlbiA9IHAucmVhZCgpXG4pOiBMb2NhdGVkPEV4cHJlc3Npb24+IHtcbiAgY29uc3QgbGl0ZXJhbCA9IHBhcnNlTGl0ZXJhbChwLCB0b2tlbilcblxuICBpZiAobGl0ZXJhbCkgcmV0dXJuIGxpdGVyYWxcblxuICBpZiAodG9rZW4udHlwZSA9PT0gJ2lkZW50Jykge1xuICAgIHJldHVybiBwLnBhcnNlTm9kZSh0b2tlbiwgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBwYXJzZUlkKHAsIHRva2VuKVxuXG4gICAgICBpZiAoaXNUb2tlbihwLnBlZWsoKSwgJ3N5bWJvbCcsICcoJykpIHtcbiAgICAgICAgcC50YWtlKCkgLy8gc2tpcCAnKCcgc3ltYm9sXG5cbiAgICAgICAgY29uc3QgYXJncyA9IHBhcnNlQ29tcG91bmQocCwgcGFyc2VFeHByLCB7IHVudGlsOiAnKScsIGRlbGltaXRlcjogJywnIH0pXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnRnVuQ2FsbEV4cHJlc3Npb24nLFxuICAgICAgICAgIGNhbGxlZTogaWQsXG4gICAgICAgICAgYXJncyxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaWRcbiAgICB9KVxuICB9XG5cbiAgaWYgKHRva2VuLnR5cGUgPT09ICdzeW1ib2wnICYmIHRva2VuLnZhbHVlID09PSAnKCcpIHtcbiAgICByZXR1cm4gcC5wYXJzZU5vZGUodG9rZW4sICgpID0+IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBwYXJzZUV4cHIocClcbiAgICAgIHAudmFsaWRhdGVUb2tlbihwLnJlYWQoKSwgJ3N5bWJvbCcsICcpJylcblxuICAgICAgcmV0dXJuIHsgdHlwZTogJ0Jvb2xlYW5FeHByZXNzaW9uJywgYm9keSB9XG4gICAgfSlcbiAgfVxuXG4gIGlmICh0b2tlbi50eXBlID09PSAnb3BlcmF0b3InICYmIHRva2VuLnZhbHVlID09PSAnIScpIHtcbiAgICByZXR1cm4gcC5wYXJzZU5vZGUodG9rZW4sICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdVbmFyeUV4cHJlc3Npb24nLFxuICAgICAgICBvcGVyYXRvcjogdG9rZW4udmFsdWUsXG4gICAgICAgIGFyZ3VtZW50OiBwYXJzZUV4cHIocCksXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRocm93IGNyZWF0ZUVycm9yKFxuICAgIHAuc291cmNlLFxuICAgICdFeHByZXNzaW9uIG5vdCBpbXBsZW1lbnRlZCB5ZXQnLFxuICAgIHRva2VuLmxvYy5zdGFydCxcbiAgICB0b2tlbi5sb2MuZW5kXG4gIClcbn1cbiJdfQ==

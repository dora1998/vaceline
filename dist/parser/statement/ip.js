'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseIp = parseIp

var _token = require('../../utils/token')

var _isIp = _interopRequireDefault(require('is-ip'))

var _createError = require('../create-error')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function parseIp(p, token = p.read()) {
  return p.parseNode(token, () => {
    // TODO: We can know what Ip addresses look like and detect them
    // so it should be parsed not as StringLiteral even outside of AclStatement
    const str = p.validateToken(token, 'string')
    const value = str.value.slice(1, -1) // strip quotes

    const isLocalhost = value === 'localhost'

    const version = _isIp.default.version(value)

    if (!isLocalhost && !version) {
      throw (0, _createError.createError)(
        p.source,
        'Invalid ip address, Expected `"localhost"`, "IP"`, or `"IP"/prefix`',
        token.loc.start,
        token.loc.end
      )
    }

    let cidr = undefined

    if ((0, _token.isToken)(p.peek(), 'symbol', '/')) {
      p.take()
      const token = p.validateToken(p.read(), 'numeric')
      cidr = Number(token.value)
      let message

      if (isLocalhost && cidr != undefined) {
        message = 'A prefix length is not supported for `localhost`'
      }

      if (version === 4 && (cidr < 0 || 32 < cidr)) {
        message = 'IPv4 prefix length must be between 0 and 32'
      }

      if (version === 6 && (cidr < 0 || 128 < cidr)) {
        message = 'IPv6 prefix length must be between 0 and 128'
      }

      if (message) {
        throw (0, _createError.createError)(
          p.source,
          `Invalid ip address(${message})`,
          token.loc.start,
          token.loc.end
        )
      }
    }

    return {
      type: 'Ip',
      value,
      cidr,
    }
  })
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvc3RhdGVtZW50L2lwLnRzIl0sIm5hbWVzIjpbInBhcnNlSXAiLCJwIiwidG9rZW4iLCJyZWFkIiwicGFyc2VOb2RlIiwic3RyIiwidmFsaWRhdGVUb2tlbiIsInZhbHVlIiwic2xpY2UiLCJpc0xvY2FsaG9zdCIsInZlcnNpb24iLCJpc0lwIiwic291cmNlIiwibG9jIiwic3RhcnQiLCJlbmQiLCJjaWRyIiwidW5kZWZpbmVkIiwicGVlayIsInRha2UiLCJOdW1iZXIiLCJtZXNzYWdlIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sU0FBU0EsT0FBVCxDQUFpQkMsQ0FBakIsRUFBNEJDLEtBQUssR0FBR0QsQ0FBQyxDQUFDRSxJQUFGLEVBQXBDLEVBQThDO0FBQ25ELFNBQU9GLENBQUMsQ0FBQ0csU0FBRixDQUFZRixLQUFaLEVBQW1CLE1BQU07QUFDOUI7QUFDQTtBQUVBLFVBQU1HLEdBQUcsR0FBR0osQ0FBQyxDQUFDSyxhQUFGLENBQWdCSixLQUFoQixFQUF1QixRQUF2QixDQUFaO0FBQ0EsVUFBTUssS0FBSyxHQUFHRixHQUFHLENBQUNFLEtBQUosQ0FBVUMsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFDLENBQXBCLENBQWQsQ0FMOEIsQ0FLTzs7QUFFckMsVUFBTUMsV0FBVyxHQUFHRixLQUFLLEtBQUssV0FBOUI7O0FBQ0EsVUFBTUcsT0FBTyxHQUFHQyxjQUFLRCxPQUFMLENBQWFILEtBQWIsQ0FBaEI7O0FBRUEsUUFBSSxDQUFDRSxXQUFELElBQWdCLENBQUNDLE9BQXJCLEVBQThCO0FBQzVCLFlBQU0sOEJBQ0pULENBQUMsQ0FBQ1csTUFERSxFQUVKLHFFQUZJLEVBR0pWLEtBQUssQ0FBQ1csR0FBTixDQUFVQyxLQUhOLEVBSUpaLEtBQUssQ0FBQ1csR0FBTixDQUFVRSxHQUpOLENBQU47QUFNRDs7QUFFRCxRQUFJQyxJQUFJLEdBQUdDLFNBQVg7O0FBRUEsUUFBSSxvQkFBUWhCLENBQUMsQ0FBQ2lCLElBQUYsRUFBUixFQUFrQixRQUFsQixFQUE0QixHQUE1QixDQUFKLEVBQXNDO0FBQ3BDakIsTUFBQUEsQ0FBQyxDQUFDa0IsSUFBRjtBQUVBLFlBQU1qQixLQUFLLEdBQUdELENBQUMsQ0FBQ0ssYUFBRixDQUFnQkwsQ0FBQyxDQUFDRSxJQUFGLEVBQWhCLEVBQTBCLFNBQTFCLENBQWQ7QUFDQWEsTUFBQUEsSUFBSSxHQUFHSSxNQUFNLENBQUNsQixLQUFLLENBQUNLLEtBQVAsQ0FBYjtBQUVBLFVBQUljLE9BQUo7O0FBQ0EsVUFBSVosV0FBVyxJQUFJTyxJQUFJLElBQUlDLFNBQTNCLEVBQXNDO0FBQ3BDSSxRQUFBQSxPQUFPLEdBQUcsa0RBQVY7QUFDRDs7QUFFRCxVQUFJWCxPQUFPLEtBQUssQ0FBWixLQUFrQk0sSUFBSSxHQUFHLENBQVAsSUFBWSxLQUFLQSxJQUFuQyxDQUFKLEVBQThDO0FBQzVDSyxRQUFBQSxPQUFPLEdBQUcsNkNBQVY7QUFDRDs7QUFFRCxVQUFJWCxPQUFPLEtBQUssQ0FBWixLQUFrQk0sSUFBSSxHQUFHLENBQVAsSUFBWSxNQUFNQSxJQUFwQyxDQUFKLEVBQStDO0FBQzdDSyxRQUFBQSxPQUFPLEdBQUcsOENBQVY7QUFDRDs7QUFFRCxVQUFJQSxPQUFKLEVBQWE7QUFDWCxjQUFNLDhCQUNKcEIsQ0FBQyxDQUFDVyxNQURFLEVBRUgsc0JBQXFCUyxPQUFRLEdBRjFCLEVBR0puQixLQUFLLENBQUNXLEdBQU4sQ0FBVUMsS0FITixFQUlKWixLQUFLLENBQUNXLEdBQU4sQ0FBVUUsR0FKTixDQUFOO0FBTUQ7QUFDRjs7QUFFRCxXQUFPO0FBQUVPLE1BQUFBLElBQUksRUFBRSxJQUFSO0FBQWNmLE1BQUFBLEtBQWQ7QUFBcUJTLE1BQUFBO0FBQXJCLEtBQVA7QUFDRCxHQW5ETSxDQUFQO0FBb0REIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnLi4nXG5pbXBvcnQgeyBpc1Rva2VuIH0gZnJvbSAnLi4vLi4vdXRpbHMvdG9rZW4nXG5pbXBvcnQgaXNJcCBmcm9tICdpcy1pcCdcbmltcG9ydCB7IGNyZWF0ZUVycm9yIH0gZnJvbSAnLi4vY3JlYXRlLWVycm9yJ1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJcChwOiBQYXJzZXIsIHRva2VuID0gcC5yZWFkKCkpIHtcbiAgcmV0dXJuIHAucGFyc2VOb2RlKHRva2VuLCAoKSA9PiB7XG4gICAgLy8gVE9ETzogV2UgY2FuIGtub3cgd2hhdCBJcCBhZGRyZXNzZXMgbG9vayBsaWtlIGFuZCBkZXRlY3QgdGhlbVxuICAgIC8vIHNvIGl0IHNob3VsZCBiZSBwYXJzZWQgbm90IGFzIFN0cmluZ0xpdGVyYWwgZXZlbiBvdXRzaWRlIG9mIEFjbFN0YXRlbWVudFxuXG4gICAgY29uc3Qgc3RyID0gcC52YWxpZGF0ZVRva2VuKHRva2VuLCAnc3RyaW5nJylcbiAgICBjb25zdCB2YWx1ZSA9IHN0ci52YWx1ZS5zbGljZSgxLCAtMSkgLy8gc3RyaXAgcXVvdGVzXG5cbiAgICBjb25zdCBpc0xvY2FsaG9zdCA9IHZhbHVlID09PSAnbG9jYWxob3N0J1xuICAgIGNvbnN0IHZlcnNpb24gPSBpc0lwLnZlcnNpb24odmFsdWUpXG5cbiAgICBpZiAoIWlzTG9jYWxob3N0ICYmICF2ZXJzaW9uKSB7XG4gICAgICB0aHJvdyBjcmVhdGVFcnJvcihcbiAgICAgICAgcC5zb3VyY2UsXG4gICAgICAgICdJbnZhbGlkIGlwIGFkZHJlc3MsIEV4cGVjdGVkIGBcImxvY2FsaG9zdFwiYCwgXCJJUFwiYCwgb3IgYFwiSVBcIi9wcmVmaXhgJyxcbiAgICAgICAgdG9rZW4ubG9jLnN0YXJ0LFxuICAgICAgICB0b2tlbi5sb2MuZW5kXG4gICAgICApXG4gICAgfVxuXG4gICAgbGV0IGNpZHIgPSB1bmRlZmluZWRcblxuICAgIGlmIChpc1Rva2VuKHAucGVlaygpLCAnc3ltYm9sJywgJy8nKSkge1xuICAgICAgcC50YWtlKClcblxuICAgICAgY29uc3QgdG9rZW4gPSBwLnZhbGlkYXRlVG9rZW4ocC5yZWFkKCksICdudW1lcmljJylcbiAgICAgIGNpZHIgPSBOdW1iZXIodG9rZW4udmFsdWUpXG5cbiAgICAgIGxldCBtZXNzYWdlXG4gICAgICBpZiAoaXNMb2NhbGhvc3QgJiYgY2lkciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWVzc2FnZSA9ICdBIHByZWZpeCBsZW5ndGggaXMgbm90IHN1cHBvcnRlZCBmb3IgYGxvY2FsaG9zdGAnXG4gICAgICB9XG5cbiAgICAgIGlmICh2ZXJzaW9uID09PSA0ICYmIChjaWRyIDwgMCB8fCAzMiA8IGNpZHIpKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSVB2NCBwcmVmaXggbGVuZ3RoIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAzMidcbiAgICAgIH1cblxuICAgICAgaWYgKHZlcnNpb24gPT09IDYgJiYgKGNpZHIgPCAwIHx8IDEyOCA8IGNpZHIpKSB7XG4gICAgICAgIG1lc3NhZ2UgPSAnSVB2NiBwcmVmaXggbGVuZ3RoIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMjgnXG4gICAgICB9XG5cbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKFxuICAgICAgICAgIHAuc291cmNlLFxuICAgICAgICAgIGBJbnZhbGlkIGlwIGFkZHJlc3MoJHttZXNzYWdlfSlgLFxuICAgICAgICAgIHRva2VuLmxvYy5zdGFydCxcbiAgICAgICAgICB0b2tlbi5sb2MuZW5kXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyB0eXBlOiAnSXAnLCB2YWx1ZSwgY2lkciB9XG4gIH0pXG59XG4iXX0=

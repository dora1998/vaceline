'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.isFromStdin = exports.readdirr = void 0

var _fs = _interopRequireDefault(require('fs'))

var _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// readdir recursively
const readdirr = (dirPath) =>
  _fs.default.statSync(dirPath).isDirectory()
    ? _fs.default
        .readdirSync(dirPath)
        .reduce(
          (acc, p) => acc.concat(readdirr(_path.default.join(dirPath, p))),
          []
        )
    : [dirPath]

exports.readdirr = readdirr
const isFromStdin = !process.stdin.isTTY
exports.isFromStdin = isFromStdin
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvdXRpbHMudHMiXSwibmFtZXMiOlsicmVhZGRpcnIiLCJkaXJQYXRoIiwiZnMiLCJzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwicmVhZGRpclN5bmMiLCJyZWR1Y2UiLCJhY2MiLCJwIiwiY29uY2F0IiwicGF0aCIsImpvaW4iLCJpc0Zyb21TdGRpbiIsInByb2Nlc3MiLCJzdGRpbiIsImlzVFRZIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQTtBQUNPLE1BQU1BLFFBQVEsR0FBSUMsT0FBRCxJQUN0QkMsWUFBR0MsUUFBSCxDQUFZRixPQUFaLEVBQXFCRyxXQUFyQixLQUNJRixZQUNHRyxXQURILENBQ2VKLE9BRGYsRUFFR0ssTUFGSCxDQUdJLENBQUNDLEdBQUQsRUFBTUMsQ0FBTixLQUFZRCxHQUFHLENBQUNFLE1BQUosQ0FBV1QsUUFBUSxDQUFDVSxjQUFLQyxJQUFMLENBQVVWLE9BQVYsRUFBbUJPLENBQW5CLENBQUQsQ0FBbkIsQ0FIaEIsRUFJSSxFQUpKLENBREosR0FPSSxDQUFDUCxPQUFELENBUkM7OztBQVVBLE1BQU1XLFdBQVcsR0FBRyxDQUFDQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0MsS0FBbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyByZWFkZGlyIHJlY3Vyc2l2ZWx5XG5leHBvcnQgY29uc3QgcmVhZGRpcnIgPSAoZGlyUGF0aDogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiA9PlxuICBmcy5zdGF0U3luYyhkaXJQYXRoKS5pc0RpcmVjdG9yeSgpXG4gICAgPyBmc1xuICAgICAgICAucmVhZGRpclN5bmMoZGlyUGF0aClcbiAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAoYWNjLCBwKSA9PiBhY2MuY29uY2F0KHJlYWRkaXJyKHBhdGguam9pbihkaXJQYXRoLCBwKSkpLFxuICAgICAgICAgIFtdIGFzIEFycmF5PHN0cmluZz5cbiAgICAgICAgKVxuICAgIDogW2RpclBhdGhdXG5cbmV4cG9ydCBjb25zdCBpc0Zyb21TdGRpbiA9ICFwcm9jZXNzLnN0ZGluLmlzVFRZXG4iXX0=

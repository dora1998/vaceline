'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.debugVacel = exports.buildDebug = void 0

var _debug = _interopRequireDefault(require('debug'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const vaceline = (0, _debug.default)('vaceline') // stderr is used by default but
// it is for printing output(code|ast)

exports.debugVacel = vaceline
vaceline.log = console.log.bind(console)
const buildDebug = vaceline.extend.bind(vaceline)
exports.buildDebug = buildDebug
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kZWJ1Zy50cyJdLCJuYW1lcyI6WyJ2YWNlbGluZSIsImxvZyIsImNvbnNvbGUiLCJiaW5kIiwiYnVpbGREZWJ1ZyIsImV4dGVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLG9CQUFNLFVBQU4sQ0FBakIsQyxDQUVBO0FBQ0E7OztBQUNBQSxRQUFRLENBQUNDLEdBQVQsR0FBZUMsT0FBTyxDQUFDRCxHQUFSLENBQVlFLElBQVosQ0FBaUJELE9BQWpCLENBQWY7QUFFTyxNQUFNRSxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssTUFBVCxDQUFnQkYsSUFBaEIsQ0FBcUJILFFBQXJCLENBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJ1xuXG5jb25zdCB2YWNlbGluZSA9IGRlYnVnKCd2YWNlbGluZScpXG5cbi8vIHN0ZGVyciBpcyB1c2VkIGJ5IGRlZmF1bHQgYnV0XG4vLyBpdCBpcyBmb3IgcHJpbnRpbmcgb3V0cHV0KGNvZGV8YXN0KVxudmFjZWxpbmUubG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKVxuXG5leHBvcnQgY29uc3QgYnVpbGREZWJ1ZyA9IHZhY2VsaW5lLmV4dGVuZC5iaW5kKHZhY2VsaW5lKVxuXG5leHBvcnQgeyB2YWNlbGluZSBhcyBkZWJ1Z1ZhY2VsIH1cbiJdfQ==

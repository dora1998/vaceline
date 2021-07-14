'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getPrecedence = getPrecedence
exports.operators = exports.assign = exports.logical = exports.unary = exports.binary = void 0
const binary = new Set(['==', '!=', '>=', '>', '<=', '<', '~', '!~'])
exports.binary = binary
const unary = new Set(['!'])
exports.unary = unary
const logical = new Set(['||', '&&'])
exports.logical = logical
const assign = new Set(['=', '*=', '+=', '-=', '/=', '||=', '&&='])
exports.assign = assign
const operators = new Set([...binary, ...unary, ...logical, ...assign])
exports.operators = operators

function getPrecedence(op) {
  if (binary.has(op)) return 1
  if (op === '&&') return 2
  if (op === '||') return 3
  return 0
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvdG9rZW5pemVyL29wZXJhdG9ycy50cyJdLCJuYW1lcyI6WyJiaW5hcnkiLCJTZXQiLCJ1bmFyeSIsImxvZ2ljYWwiLCJhc3NpZ24iLCJvcGVyYXRvcnMiLCJnZXRQcmVjZWRlbmNlIiwib3AiLCJoYXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxNQUFNQSxNQUFNLEdBQUcsSUFBSUMsR0FBSixDQUFRLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLEdBQW5CLEVBQXdCLElBQXhCLEVBQThCLEdBQTlCLEVBQW1DLEdBQW5DLEVBQXdDLElBQXhDLENBQVIsQ0FBZjs7QUFDQSxNQUFNQyxLQUFLLEdBQUcsSUFBSUQsR0FBSixDQUFRLENBQUMsR0FBRCxDQUFSLENBQWQ7O0FBQ0EsTUFBTUUsT0FBTyxHQUFHLElBQUlGLEdBQUosQ0FBUSxDQUFDLElBQUQsRUFBTyxJQUFQLENBQVIsQ0FBaEI7O0FBQ0EsTUFBTUcsTUFBTSxHQUFHLElBQUlILEdBQUosQ0FBUSxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QixLQUE5QixFQUFxQyxLQUFyQyxDQUFSLENBQWY7O0FBRUEsTUFBTUksU0FBUyxHQUFHLElBQUlKLEdBQUosQ0FBUSxDQUFDLEdBQUdELE1BQUosRUFBWSxHQUFHRSxLQUFmLEVBQXNCLEdBQUdDLE9BQXpCLEVBQWtDLEdBQUdDLE1BQXJDLENBQVIsQ0FBbEI7OztBQUVBLFNBQVNFLGFBQVQsQ0FBdUJDLEVBQXZCLEVBQW1DO0FBQ3hDLE1BQUlQLE1BQU0sQ0FBQ1EsR0FBUCxDQUFXRCxFQUFYLENBQUosRUFBb0IsT0FBTyxDQUFQO0FBQ3BCLE1BQUlBLEVBQUUsS0FBSyxJQUFYLEVBQWlCLE9BQU8sQ0FBUDtBQUNqQixNQUFJQSxFQUFFLEtBQUssSUFBWCxFQUFpQixPQUFPLENBQVA7QUFDakIsU0FBTyxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYmluYXJ5ID0gbmV3IFNldChbJz09JywgJyE9JywgJz49JywgJz4nLCAnPD0nLCAnPCcsICd+JywgJyF+J10pXG5leHBvcnQgY29uc3QgdW5hcnkgPSBuZXcgU2V0KFsnISddKVxuZXhwb3J0IGNvbnN0IGxvZ2ljYWwgPSBuZXcgU2V0KFsnfHwnLCAnJiYnXSlcbmV4cG9ydCBjb25zdCBhc3NpZ24gPSBuZXcgU2V0KFsnPScsICcqPScsICcrPScsICctPScsICcvPScsICd8fD0nLCAnJiY9J10pXG5cbmV4cG9ydCBjb25zdCBvcGVyYXRvcnMgPSBuZXcgU2V0KFsuLi5iaW5hcnksIC4uLnVuYXJ5LCAuLi5sb2dpY2FsLCAuLi5hc3NpZ25dKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJlY2VkZW5jZShvcDogc3RyaW5nKSB7XG4gIGlmIChiaW5hcnkuaGFzKG9wKSkgcmV0dXJuIDFcbiAgaWYgKG9wID09PSAnJiYnKSByZXR1cm4gMlxuICBpZiAob3AgPT09ICd8fCcpIHJldHVybiAzXG4gIHJldHVybiAwXG59XG4iXX0=

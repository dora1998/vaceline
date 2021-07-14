'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.transform = transform
exports.transformFile = transformFile
Object.defineProperty(exports, 'parse', {
  enumerable: true,
  get: function () {
    return _lib.parse
  },
})
Object.defineProperty(exports, 'transformFromAst', {
  enumerable: true,
  get: function () {
    return _lib.generate
  },
})

var _path = require('path')

var _fs = require('fs')

var _assert = _interopRequireDefault(require('assert'))

var _lib = require('./lib')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function transform(code, options = {}) {
  const ast = (0, _lib.parse)(code)
  const result = (0, _lib.generate)(ast, options)
  result.ast = ast
  return result
}

function transformFile(filePath, options = {}) {
  const inputPath = (0, _path.resolve)(filePath)
  ;(0, _assert.default)(
    (0, _fs.existsSync)(inputPath),
    'File not found: ' + inputPath
  )
  const ast = (0, _lib.parse)((0, _fs.readFileSync)(filePath, 'utf8'))
  const result = (0, _lib.generate)(ast, options)
  result.ast = ast
  return result
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ0cmFuc2Zvcm0iLCJjb2RlIiwib3B0aW9ucyIsImFzdCIsInJlc3VsdCIsInRyYW5zZm9ybUZpbGUiLCJmaWxlUGF0aCIsImlucHV0UGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQWtCTyxTQUFTQSxTQUFULENBQ0xDLElBREssRUFFTEMsT0FBeUIsR0FBRyxFQUZ2QixFQUdZO0FBQ2pCLFFBQU1DLEdBQUcsR0FBRyxnQkFBTUYsSUFBTixDQUFaO0FBRUEsUUFBTUcsTUFBZ0MsR0FBRyxtQkFBU0QsR0FBVCxFQUFjRCxPQUFkLENBQXpDO0FBRUFFLEVBQUFBLE1BQU0sQ0FBQ0QsR0FBUCxHQUFhQSxHQUFiO0FBRUEsU0FBT0MsTUFBUDtBQUNEOztBQUVNLFNBQVNDLGFBQVQsQ0FDTEMsUUFESyxFQUVMSixPQUF5QixHQUFHLEVBRnZCLEVBR1k7QUFDakIsUUFBTUssU0FBUyxHQUFHLG1CQUFZRCxRQUFaLENBQWxCO0FBQ0EsdUJBQU8sb0JBQVdDLFNBQVgsQ0FBUCxFQUE4QixxQkFBcUJBLFNBQW5EO0FBRUEsUUFBTUosR0FBRyxHQUFHLGdCQUFNLHNCQUFhRyxRQUFiLEVBQXVCLE1BQXZCLENBQU4sQ0FBWjtBQUNBLFFBQU1GLE1BQWdDLEdBQUcsbUJBQVNELEdBQVQsRUFBY0QsT0FBZCxDQUF6QztBQUVBRSxFQUFBQSxNQUFNLENBQUNELEdBQVAsR0FBYUEsR0FBYjtBQUVBLFNBQU9DLE1BQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgYXMgcmVzb2x2ZVBhdGggfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcblxuaW1wb3J0IHtcbiAgcGFyc2UsXG4gIGdlbmVyYXRlLFxuICAvLyB0cmF2ZXJzZSxcbn0gZnJvbSAnLi9saWInXG5pbXBvcnQgeyBHZW5lcmF0ZU9wdGlvbnMgfSBmcm9tICcuL2dlbmVyYXRvcidcbmltcG9ydCB7IFByb2dyYW0gfSBmcm9tICcuL25vZGVzJ1xuXG5pbnRlcmZhY2UgVHJhbnNmb3JtUmVzdWx0IHtcbiAgY29kZTogc3RyaW5nXG4gIG1hcDogc3RyaW5nXG4gIGFzdDogUHJvZ3JhbVxufVxuXG5leHBvcnQgeyBwYXJzZSwgZ2VuZXJhdGUgYXMgdHJhbnNmb3JtRnJvbUFzdCB9XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnMgPSB7fSAmIEdlbmVyYXRlT3B0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKFxuICBjb2RlOiBzdHJpbmcsXG4gIG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fVxuKTogVHJhbnNmb3JtUmVzdWx0IHtcbiAgY29uc3QgYXN0ID0gcGFyc2UoY29kZSlcblxuICBjb25zdCByZXN1bHQ6IFBhcnRpYWw8VHJhbnNmb3JtUmVzdWx0PiA9IGdlbmVyYXRlKGFzdCwgb3B0aW9ucylcblxuICByZXN1bHQuYXN0ID0gYXN0XG5cbiAgcmV0dXJuIHJlc3VsdCBhcyBUcmFuc2Zvcm1SZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybUZpbGUoXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fVxuKTogVHJhbnNmb3JtUmVzdWx0IHtcbiAgY29uc3QgaW5wdXRQYXRoID0gcmVzb2x2ZVBhdGgoZmlsZVBhdGgpXG4gIGFzc2VydChleGlzdHNTeW5jKGlucHV0UGF0aCksICdGaWxlIG5vdCBmb3VuZDogJyArIGlucHV0UGF0aClcblxuICBjb25zdCBhc3QgPSBwYXJzZShyZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykpXG4gIGNvbnN0IHJlc3VsdDogUGFydGlhbDxUcmFuc2Zvcm1SZXN1bHQ+ID0gZ2VuZXJhdGUoYXN0LCBvcHRpb25zKVxuXG4gIHJlc3VsdC5hc3QgPSBhc3RcblxuICByZXR1cm4gcmVzdWx0IGFzIFRyYW5zZm9ybVJlc3VsdFxufVxuIl19

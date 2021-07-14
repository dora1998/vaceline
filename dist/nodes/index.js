'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
var _exportNames = {
  isLocated: true,
}
exports.isLocated = isLocated

var _program = require('./program')

Object.keys(_program).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _program[key]
    },
  })
})

var _statement = require('./statement')

Object.keys(_statement).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _statement[key]
    },
  })
})

var _expression = require('./expression')

Object.keys(_expression).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _expression[key]
    },
  })
})

var _literal = require('./literal')

Object.keys(_literal).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _literal[key]
    },
  })
})

var _location = require('./location')

Object.keys(_location).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _location[key]
    },
  })
})

var _comment = require('./comment')

Object.keys(_comment).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comment[key]
    },
  })
})

function isLocated(node) {
  return 'loc' in node
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2Rlcy9pbmRleC50cyJdLCJuYW1lcyI6WyJpc0xvY2F0ZWQiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTU8sU0FBU0EsU0FBVCxDQUFtQ0MsSUFBbkMsRUFBZ0U7QUFDckUsU0FBTyxTQUFTQSxJQUFoQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZ3JhbSB9IGZyb20gJy4vcHJvZ3JhbSdcbmltcG9ydCB7IEV4cHJlc3Npb24gfSBmcm9tICcuL2V4cHJlc3Npb24nXG5pbXBvcnQgeyBTdGF0ZW1lbnQgfSBmcm9tICcuL3N0YXRlbWVudCdcblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICcuL2xvY2F0aW9uJ1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gJy4vY29tbWVudCdcblxuZXhwb3J0ICogZnJvbSAnLi9wcm9ncmFtJ1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0ZW1lbnQnXG5leHBvcnQgKiBmcm9tICcuL2V4cHJlc3Npb24nXG5leHBvcnQgKiBmcm9tICcuL2xpdGVyYWwnXG5cbmV4cG9ydCAqIGZyb20gJy4vbG9jYXRpb24nXG5leHBvcnQgKiBmcm9tICcuL2NvbW1lbnQnXG5cbmV4cG9ydCB0eXBlIE5vZGUgPSBQcm9ncmFtIHwgU3RhdGVtZW50IHwgRXhwcmVzc2lvblxuZXhwb3J0IHR5cGUgUGxhaW5Ob2RlPE4gZXh0ZW5kcyBOb2RlPiA9IE9taXQ8Tiwga2V5b2YgTm9kZT5cbmV4cG9ydCB0eXBlIExvY2F0ZWQ8TiBleHRlbmRzIE5vZGU+ID0gTiAmIHsgbG9jOiBMb2NhdGlvbiB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2F0ZWQ8VCBleHRlbmRzIE5vZGU+KG5vZGU6IFQpOiBub2RlIGlzIExvY2F0ZWQ8VD4ge1xuICByZXR1cm4gJ2xvYycgaW4gbm9kZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VOb2RlIHtcbiAgdHlwZTogc3RyaW5nXG4gIGxvYz86IExvY2F0aW9uXG4gIGxlYWRpbmdDb21tZW50cz86IEFycmF5PENvbW1lbnQ+XG4gIGlubmVyQ29tbWVudHM/OiBBcnJheTxDb21tZW50PlxuICB0cmFpbGluZ0NvbW1lbnRzPzogQXJyYXk8Q29tbWVudD5cbn1cblxuZXhwb3J0IHR5cGUgTm9kZVR5cGUgPSBOb2RlWyd0eXBlJ11cbiJdfQ==

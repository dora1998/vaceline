'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.traverseNode = traverseNode
exports.traverse = traverse
exports.createPathArray = createPathArray

var _path = require('./path')

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

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

const flat = (arr) => arr.reduce((acc, cur) => acc.concat(cur), [])

function next(node) {
  return flat(
    Object.values(node).filter(
      (v) =>
        Array.isArray(v) || // FIXME: too fragile
        typeof (v === null || v === void 0 ? void 0 : v.type) === 'string'
    )
  )
}

function traverseNode(
  node,
  callback,
  context = {
    parent: null,
    parentPath: null,
    inList: false,
    state: null,
  }
) {
  const path = new _path.NodePath(node, context) // If sobroutine, ..., then set `inList` true

  callback(path, context)
  const nextNodes = next(node)

  for (const nextNode of nextNodes) {
    traverseNode(
      nextNode,
      callback,
      _objectSpread({}, context, {
        parent: node,
        parentPath: path,
      })
    )
  }
}

function traverse(
  ast,
  handler,
  context = {
    parent: null,
    parentPath: null,
    inList: false,
    state: null,
  }
) {
  const handle = (path, context) => {
    if (handler.entry) {
      handler.entry.call(context.state, path)
    }
  }

  traverseNode(ast, handle, context)
} // Create traversal path array recursively

function createPathArray(
  ast,
  context = {
    parent: null,
    parentPath: null,
    inList: false,
    state: null,
  }
) {
  const paths = []

  const appendPath = (path) => paths.push(path)

  traverseNode(ast, appendPath, context)
  return paths
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmF2ZXJzZXIvaW5kZXgudHMiXSwibmFtZXMiOlsiZmxhdCIsImFyciIsInJlZHVjZSIsImFjYyIsImN1ciIsImNvbmNhdCIsIm5leHQiLCJub2RlIiwiT2JqZWN0IiwidmFsdWVzIiwiZmlsdGVyIiwidiIsIkFycmF5IiwiaXNBcnJheSIsInR5cGUiLCJ0cmF2ZXJzZU5vZGUiLCJjYWxsYmFjayIsImNvbnRleHQiLCJwYXJlbnQiLCJwYXJlbnRQYXRoIiwiaW5MaXN0Iiwic3RhdGUiLCJwYXRoIiwiTm9kZVBhdGgiLCJuZXh0Tm9kZXMiLCJuZXh0Tm9kZSIsInRyYXZlcnNlIiwiYXN0IiwiaGFuZGxlciIsImhhbmRsZSIsImVudHJ5IiwiY2FsbCIsImNyZWF0ZVBhdGhBcnJheSIsInBhdGhzIiwiYXBwZW5kUGF0aCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLElBQUksR0FBT0MsR0FBSixJQUNYQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBY0QsR0FBRyxDQUFDRSxNQUFKLENBQVdELEdBQVgsQ0FBekIsRUFBMEMsRUFBMUMsQ0FERjs7QUFHQSxTQUFTRSxJQUFULENBQWNDLElBQWQsRUFBMEI7QUFDeEIsU0FBT1AsSUFBSSxDQUNUUSxNQUFNLENBQUNDLE1BQVAsQ0FBY0YsSUFBZCxFQUFvQkcsTUFBcEIsQ0FDR0MsQ0FBRCxJQUNFQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsQ0FBZCxLQUNBO0FBQ0EsVUFBT0EsQ0FBUCxhQUFPQSxDQUFQLHVCQUFPQSxDQUFDLENBQUVHLElBQVYsTUFBbUIsUUFKdkIsQ0FEUyxDQUFYO0FBUUQ7O0FBRU0sU0FBU0MsWUFBVCxDQUNMUixJQURLLEVBRUxTLFFBRkssRUFHTEMsT0FBeUIsR0FBRztBQUMxQkMsRUFBQUEsTUFBTSxFQUFFLElBRGtCO0FBRTFCQyxFQUFBQSxVQUFVLEVBQUUsSUFGYztBQUcxQkMsRUFBQUEsTUFBTSxFQUFFLEtBSGtCO0FBSTFCQyxFQUFBQSxLQUFLLEVBQUU7QUFKbUIsQ0FIdkIsRUFTQztBQUNOLFFBQU1DLElBQUksR0FBRyxJQUFJQyxjQUFKLENBQWFoQixJQUFiLEVBQW1CVSxPQUFuQixDQUFiLENBRE0sQ0FHTjs7QUFFQUQsRUFBQUEsUUFBUSxDQUFDTSxJQUFELEVBQU9MLE9BQVAsQ0FBUjtBQUVBLFFBQU1PLFNBQVMsR0FBR2xCLElBQUksQ0FBQ0MsSUFBRCxDQUF0Qjs7QUFFQSxPQUFLLE1BQU1rQixRQUFYLElBQXVCRCxTQUF2QixFQUFrQztBQUNoQ1QsSUFBQUEsWUFBWSxDQUFDVSxRQUFELEVBQVdULFFBQVgsb0JBQ1BDLE9BRE87QUFFVkMsTUFBQUEsTUFBTSxFQUFFWCxJQUZFO0FBR1ZZLE1BQUFBLFVBQVUsRUFBRUc7QUFIRixPQUFaO0FBS0Q7QUFDRjs7QUFFTSxTQUFTSSxRQUFULENBQ0xDLEdBREssRUFFTEMsT0FGSyxFQUdMWCxPQUF5QixHQUFHO0FBQzFCQyxFQUFBQSxNQUFNLEVBQUUsSUFEa0I7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRSxJQUZjO0FBRzFCQyxFQUFBQSxNQUFNLEVBQUUsS0FIa0I7QUFJMUJDLEVBQUFBLEtBQUssRUFBRTtBQUptQixDQUh2QixFQVNDO0FBQ04sUUFBTVEsTUFBTSxHQUFHLENBQUNQLElBQUQsRUFBaUJMLE9BQWpCLEtBQStDO0FBQzVELFFBQUlXLE9BQU8sQ0FBQ0UsS0FBWixFQUFtQjtBQUNqQkYsTUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNDLElBQWQsQ0FBbUJkLE9BQU8sQ0FBQ0ksS0FBM0IsRUFBa0NDLElBQWxDO0FBQ0Q7QUFDRixHQUpEOztBQU1BUCxFQUFBQSxZQUFZLENBQUNZLEdBQUQsRUFBTUUsTUFBTixFQUFjWixPQUFkLENBQVo7QUFDRCxDLENBRUQ7OztBQUNPLFNBQVNlLGVBQVQsQ0FDTEwsR0FESyxFQUVMVixPQUF5QixHQUFHO0FBQzFCQyxFQUFBQSxNQUFNLEVBQUUsSUFEa0I7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRSxJQUZjO0FBRzFCQyxFQUFBQSxNQUFNLEVBQUUsS0FIa0I7QUFJMUJDLEVBQUFBLEtBQUssRUFBRTtBQUptQixDQUZ2QixFQVFZO0FBQ2pCLFFBQU1ZLEtBQXNCLEdBQUcsRUFBL0I7O0FBQ0EsUUFBTUMsVUFBVSxHQUFJWixJQUFELElBQW9CVyxLQUFLLENBQUNFLElBQU4sQ0FBV2IsSUFBWCxDQUF2Qzs7QUFFQVAsRUFBQUEsWUFBWSxDQUFDWSxHQUFELEVBQU1PLFVBQU4sRUFBa0JqQixPQUFsQixDQUFaO0FBRUEsU0FBT2dCLEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9ub2RlcydcbmltcG9ydCB7IE5vZGVQYXRoLCBUcmF2ZXJzYWxDb250ZXh0LCBIYW5kbGVyIH0gZnJvbSAnLi9wYXRoJ1xuXG5jb25zdCBmbGF0ID0gPFQ+KGFycjogQXJyYXk8VD4pID0+XG4gIGFyci5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MuY29uY2F0KGN1ciksIFtdIGFzIEFycmF5PFQ+KVxuXG5mdW5jdGlvbiBuZXh0KG5vZGU6IE5vZGUpIHtcbiAgcmV0dXJuIGZsYXQoXG4gICAgT2JqZWN0LnZhbHVlcyhub2RlKS5maWx0ZXIoXG4gICAgICAodikgPT5cbiAgICAgICAgQXJyYXkuaXNBcnJheSh2KSB8fFxuICAgICAgICAvLyBGSVhNRTogdG9vIGZyYWdpbGVcbiAgICAgICAgdHlwZW9mIHY/LnR5cGUgPT09ICdzdHJpbmcnXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZU5vZGUoXG4gIG5vZGU6IE5vZGUsXG4gIGNhbGxiYWNrOiAocGF0aDogTm9kZVBhdGgsIGNvbnRleHQ6IFRyYXZlcnNhbENvbnRleHQpID0+IHZvaWQsXG4gIGNvbnRleHQ6IFRyYXZlcnNhbENvbnRleHQgPSB7XG4gICAgcGFyZW50OiBudWxsLFxuICAgIHBhcmVudFBhdGg6IG51bGwsXG4gICAgaW5MaXN0OiBmYWxzZSxcbiAgICBzdGF0ZTogbnVsbCxcbiAgfVxuKTogdm9pZCB7XG4gIGNvbnN0IHBhdGggPSBuZXcgTm9kZVBhdGgobm9kZSwgY29udGV4dClcblxuICAvLyBJZiBzb2Jyb3V0aW5lLCAuLi4sIHRoZW4gc2V0IGBpbkxpc3RgIHRydWVcblxuICBjYWxsYmFjayhwYXRoLCBjb250ZXh0KVxuXG4gIGNvbnN0IG5leHROb2RlcyA9IG5leHQobm9kZSlcblxuICBmb3IgKGNvbnN0IG5leHROb2RlIG9mIG5leHROb2Rlcykge1xuICAgIHRyYXZlcnNlTm9kZShuZXh0Tm9kZSwgY2FsbGJhY2ssIHtcbiAgICAgIC4uLmNvbnRleHQsXG4gICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICBwYXJlbnRQYXRoOiBwYXRoLFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKFxuICBhc3Q6IE5vZGUsXG4gIGhhbmRsZXI6IEhhbmRsZXIsXG4gIGNvbnRleHQ6IFRyYXZlcnNhbENvbnRleHQgPSB7XG4gICAgcGFyZW50OiBudWxsLFxuICAgIHBhcmVudFBhdGg6IG51bGwsXG4gICAgaW5MaXN0OiBmYWxzZSxcbiAgICBzdGF0ZTogbnVsbCxcbiAgfVxuKTogdm9pZCB7XG4gIGNvbnN0IGhhbmRsZSA9IChwYXRoOiBOb2RlUGF0aCwgY29udGV4dDogVHJhdmVyc2FsQ29udGV4dCkgPT4ge1xuICAgIGlmIChoYW5kbGVyLmVudHJ5KSB7XG4gICAgICBoYW5kbGVyLmVudHJ5LmNhbGwoY29udGV4dC5zdGF0ZSwgcGF0aClcbiAgICB9XG4gIH1cblxuICB0cmF2ZXJzZU5vZGUoYXN0LCBoYW5kbGUsIGNvbnRleHQpXG59XG5cbi8vIENyZWF0ZSB0cmF2ZXJzYWwgcGF0aCBhcnJheSByZWN1cnNpdmVseVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhdGhBcnJheShcbiAgYXN0OiBOb2RlLFxuICBjb250ZXh0OiBUcmF2ZXJzYWxDb250ZXh0ID0ge1xuICAgIHBhcmVudDogbnVsbCxcbiAgICBwYXJlbnRQYXRoOiBudWxsLFxuICAgIGluTGlzdDogZmFsc2UsXG4gICAgc3RhdGU6IG51bGwsXG4gIH1cbik6IEFycmF5PE5vZGVQYXRoPiB7XG4gIGNvbnN0IHBhdGhzOiBBcnJheTxOb2RlUGF0aD4gPSBbXVxuICBjb25zdCBhcHBlbmRQYXRoID0gKHBhdGg6IE5vZGVQYXRoKSA9PiBwYXRocy5wdXNoKHBhdGgpXG5cbiAgdHJhdmVyc2VOb2RlKGFzdCwgYXBwZW5kUGF0aCwgY29udGV4dClcblxuICByZXR1cm4gcGF0aHNcbn1cbiJdfQ==

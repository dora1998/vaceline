'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.generate = generate

var _doc = require('prettier/doc')

var _printAST = require('./printAST')

const defaultGenerateOptions = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
}

function generate(ast, options = defaultGenerateOptions) {
  var _options$printWidth, _options$tabWidth, _options$useTabs

  const { formatted } = _doc.printer.printDocToString(
    (0, _printAST.printNode)(ast, {
      lineNum: 1,
    }),
    {
      printWidth:
        (_options$printWidth = options.printWidth) !== null &&
        _options$printWidth !== void 0
          ? _options$printWidth
          : defaultGenerateOptions.printWidth,
      tabWidth:
        (_options$tabWidth = options.tabWidth) !== null &&
        _options$tabWidth !== void 0
          ? _options$tabWidth
          : defaultGenerateOptions.tabWidth,
      useTabs:
        (_options$useTabs = options.useTabs) !== null &&
        _options$useTabs !== void 0
          ? _options$useTabs
          : defaultGenerateOptions.useTabs,
    }
  )

  return {
    code: formatted,
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW5lcmF0b3IvaW5kZXgudHMiXSwibmFtZXMiOlsiZGVmYXVsdEdlbmVyYXRlT3B0aW9ucyIsInByaW50V2lkdGgiLCJ0YWJXaWR0aCIsInVzZVRhYnMiLCJnZW5lcmF0ZSIsImFzdCIsIm9wdGlvbnMiLCJmb3JtYXR0ZWQiLCJwcmludGVyIiwicHJpbnREb2NUb1N0cmluZyIsImxpbmVOdW0iLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBSUEsTUFBTUEsc0JBQXVDLEdBQUc7QUFDOUNDLEVBQUFBLFVBQVUsRUFBRSxHQURrQztBQUU5Q0MsRUFBQUEsUUFBUSxFQUFFLENBRm9DO0FBRzlDQyxFQUFBQSxPQUFPLEVBQUU7QUFIcUMsQ0FBaEQ7O0FBTU8sU0FBU0MsUUFBVCxDQUNMQyxHQURLLEVBRUxDLE9BQWlDLEdBQUdOLHNCQUYvQixFQUcyQjtBQUFBOztBQUNoQyxRQUFNO0FBQUVPLElBQUFBO0FBQUYsTUFBZ0JDLGFBQVFDLGdCQUFSLENBQ3BCLHlCQUFVSixHQUFWLEVBQWU7QUFDYkssSUFBQUEsT0FBTyxFQUFFO0FBREksR0FBZixDQURvQixFQUlwQjtBQUNFVCxJQUFBQSxVQUFVLHlCQUFFSyxPQUFPLENBQUNMLFVBQVYscUVBQXdCRCxzQkFBc0IsQ0FBQ0MsVUFEM0Q7QUFFRUMsSUFBQUEsUUFBUSx1QkFBRUksT0FBTyxDQUFDSixRQUFWLGlFQUFzQkYsc0JBQXNCLENBQUNFLFFBRnZEO0FBR0VDLElBQUFBLE9BQU8sc0JBQUVHLE9BQU8sQ0FBQ0gsT0FBViwrREFBcUJILHNCQUFzQixDQUFDRztBQUhyRCxHQUpvQixDQUF0Qjs7QUFXQSxTQUFPO0FBQUVRLElBQUFBLElBQUksRUFBRUo7QUFBUixHQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmludGVyLCBQcmludGVyT3B0aW9ucyB9IGZyb20gJ3ByZXR0aWVyL2RvYydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9ub2RlcydcbmltcG9ydCB7IHByaW50Tm9kZSB9IGZyb20gJy4vcHJpbnRBU1QnXG5cbmV4cG9ydCB0eXBlIEdlbmVyYXRlT3B0aW9ucyA9IHt9ICYgUHJpbnRlck9wdGlvbnNcblxuY29uc3QgZGVmYXVsdEdlbmVyYXRlT3B0aW9uczogR2VuZXJhdGVPcHRpb25zID0ge1xuICBwcmludFdpZHRoOiAxMDAsXG4gIHRhYldpZHRoOiAyLFxuICB1c2VUYWJzOiBmYWxzZSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlKFxuICBhc3Q6IE5vZGUsXG4gIG9wdGlvbnM6IFBhcnRpYWw8R2VuZXJhdGVPcHRpb25zPiA9IGRlZmF1bHRHZW5lcmF0ZU9wdGlvbnNcbik6IHsgY29kZTogc3RyaW5nOyBtYXA/OiBzdHJpbmcgfSB7XG4gIGNvbnN0IHsgZm9ybWF0dGVkIH0gPSBwcmludGVyLnByaW50RG9jVG9TdHJpbmcoXG4gICAgcHJpbnROb2RlKGFzdCwge1xuICAgICAgbGluZU51bTogMSxcbiAgICB9KSxcbiAgICB7XG4gICAgICBwcmludFdpZHRoOiBvcHRpb25zLnByaW50V2lkdGggPz8gZGVmYXVsdEdlbmVyYXRlT3B0aW9ucy5wcmludFdpZHRoLFxuICAgICAgdGFiV2lkdGg6IG9wdGlvbnMudGFiV2lkdGggPz8gZGVmYXVsdEdlbmVyYXRlT3B0aW9ucy50YWJXaWR0aCxcbiAgICAgIHVzZVRhYnM6IG9wdGlvbnMudXNlVGFicyA/PyBkZWZhdWx0R2VuZXJhdGVPcHRpb25zLnVzZVRhYnMsXG4gICAgfVxuICApXG5cbiAgcmV0dXJuIHsgY29kZTogZm9ybWF0dGVkIH1cbn1cbiJdfQ==

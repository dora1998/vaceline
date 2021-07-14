'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.assert = void 0
const assert = // FIXME: remove undefined handling after server-side is also built by webpack
  typeof BUILD_ENV === 'undefined' && BUILD_ENV === 'development'
    ? console.assert // eslint-disable-next-line @typescript-eslint/no-empty-function
    : () => {}
exports.assert = assert
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hc3NlcnQudHMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiQlVJTERfRU5WIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTUEsTUFBNkIsR0FDeEM7QUFDQSxPQUFPQyxTQUFQLEtBQXFCLFdBQXJCLElBQW9DQSxTQUFTLEtBQUssYUFBbEQsR0FDSUMsT0FBTyxDQUFDRixNQURaLEdBRUk7QUFDQSxNQUFNLENBQUUsQ0FMUCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBhc3NlcnQ6IHR5cGVvZiBjb25zb2xlLmFzc2VydCA9XG4gIC8vIEZJWE1FOiByZW1vdmUgdW5kZWZpbmVkIGhhbmRsaW5nIGFmdGVyIHNlcnZlci1zaWRlIGlzIGFsc28gYnVpbHQgYnkgd2VicGFja1xuICB0eXBlb2YgQlVJTERfRU5WID09PSAndW5kZWZpbmVkJyAmJiBCVUlMRF9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgICA/IGNvbnNvbGUuYXNzZXJ0XG4gICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgICAoKSA9PiB7fVxuIl19

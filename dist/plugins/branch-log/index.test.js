'use strict'

var _lib = require('../../lib')

var _ = _interopRequireDefault(require('.'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const code = `

sub vcl_recv {
  if (true) {
    set req.http.Test = 1;
  } else if (false) {
    set req.http.Test = 1;
  } else {
    set req.http.Test = 1;
  }
}

sub my_function {
  set req.http.Test = 1;
}

sub vcl_deliver {
  call my_function;

  set req.http.Test = 1;
}

`.trim()
describe('BranchLogPlugin', () => {
  const ast = (0, _lib.parse)(code)
  it('should create Branch-Log nodes inside each branch', () => {
    ;(0, _.default)(ast)
    ;(0, _lib.traverse)(ast, {
      entry({ node }) {
        if (node.type === 'SubroutineStatement') {
          if (node.id.name === 'vcl_recv') {
            const loggerNode = node.body[0]
            expect((0, _lib.generate)(loggerNode).code).toMatch(
              /set req\.http\.Vaceline-Branch-Log = "\(vcl_recv\).*";/
            )
          } else {
            const loggerNode = node.body[0]
            expect(loggerNode).toMatchObject({
              type: 'AddStatement',
              left: {
                member: {
                  name: 'Vaceline-Branch-Log',
                },
              },
            })
            expect((0, _lib.generate)(loggerNode).code).toMatch(
              /add req\.http\.Vaceline-Branch-Log = "\(.*\).*";/
            )
          }

          if (node.id.name === 'vcl_deliver') {
            const [stdCollect, reqToResp] = node.body.slice(-2)
            expect((0, _lib.generate)(stdCollect).code).toMatch(
              'std.collect(req.http.Vaceline-Branch-Log);'
            )
            expect((0, _lib.generate)(reqToResp).code).toMatch(
              'set resp.http.Vaceline-Branch-Log = req.http.Vaceline-Branch-Log;'
            )
          }
        } else if (node.type === 'IfStatement') {
          const loggerNode = node.consequent[0]
          expect((0, _lib.generate)(loggerNode).code).toMatch(
            /add req\.http\.Vaceline-Branch-Log = "\(anonymous\).*";/
          )
        }
      },
    })
  })
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW5zL2JyYW5jaC1sb2cvaW5kZXgudGVzdC50cyJdLCJuYW1lcyI6WyJjb2RlIiwidHJpbSIsImRlc2NyaWJlIiwiYXN0IiwiaXQiLCJlbnRyeSIsIm5vZGUiLCJ0eXBlIiwiaWQiLCJuYW1lIiwibG9nZ2VyTm9kZSIsImJvZHkiLCJleHBlY3QiLCJ0b01hdGNoIiwidG9NYXRjaE9iamVjdCIsImxlZnQiLCJtZW1iZXIiLCJzdGRDb2xsZWN0IiwicmVxVG9SZXNwIiwic2xpY2UiLCJjb25zZXF1ZW50Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7O0FBSUEsTUFBTUEsSUFBSSxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUQsQ0FzQlhDLElBdEJXLEVBQWI7QUF3QkFDLFFBQVEsQ0FBQyxpQkFBRCxFQUFvQixNQUFNO0FBQ2hDLFFBQU1DLEdBQUcsR0FBRyxnQkFBTUgsSUFBTixDQUFaO0FBRUFJLEVBQUFBLEVBQUUsQ0FBQyxtREFBRCxFQUFzRCxNQUFNO0FBQzVELG1CQUFnQkQsR0FBaEI7QUFFQSx1QkFBU0EsR0FBVCxFQUFjO0FBQ1pFLE1BQUFBLEtBQUssQ0FBQztBQUFFQyxRQUFBQTtBQUFGLE9BQUQsRUFBd0Q7QUFDM0QsWUFBSUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMscUJBQWxCLEVBQXlDO0FBQ3ZDLGNBQUlELElBQUksQ0FBQ0UsRUFBTCxDQUFRQyxJQUFSLEtBQWlCLFVBQXJCLEVBQWlDO0FBQy9CLGtCQUFNQyxVQUFVLEdBQUdKLElBQUksQ0FBQ0ssSUFBTCxDQUFVLENBQVYsQ0FBbkI7QUFFQUMsWUFBQUEsTUFBTSxDQUFDLG1CQUFTRixVQUFULEVBQXFCVixJQUF0QixDQUFOLENBQWtDYSxPQUFsQyxDQUNFLHdEQURGO0FBR0QsV0FORCxNQU1PO0FBQ0wsa0JBQU1ILFVBQVUsR0FBR0osSUFBSSxDQUFDSyxJQUFMLENBQVUsQ0FBVixDQUFuQjtBQUVBQyxZQUFBQSxNQUFNLENBQUNGLFVBQUQsQ0FBTixDQUFtQkksYUFBbkIsQ0FBaUM7QUFDL0JQLGNBQUFBLElBQUksRUFBRSxjQUR5QjtBQUUvQlEsY0FBQUEsSUFBSSxFQUFFO0FBQUVDLGdCQUFBQSxNQUFNLEVBQUU7QUFBRVAsa0JBQUFBLElBQUksRUFBRTtBQUFSO0FBQVY7QUFGeUIsYUFBakM7QUFLQUcsWUFBQUEsTUFBTSxDQUFDLG1CQUFTRixVQUFULEVBQXFCVixJQUF0QixDQUFOLENBQWtDYSxPQUFsQyxDQUNFLGtEQURGO0FBR0Q7O0FBRUQsY0FBSVAsSUFBSSxDQUFDRSxFQUFMLENBQVFDLElBQVIsS0FBaUIsYUFBckIsRUFBb0M7QUFDbEMsa0JBQU0sQ0FBQ1EsVUFBRCxFQUFhQyxTQUFiLElBQTBCWixJQUFJLENBQUNLLElBQUwsQ0FBVVEsS0FBVixDQUFnQixDQUFDLENBQWpCLENBQWhDO0FBRUFQLFlBQUFBLE1BQU0sQ0FBQyxtQkFBU0ssVUFBVCxFQUFxQmpCLElBQXRCLENBQU4sQ0FBa0NhLE9BQWxDLENBQ0UsNENBREY7QUFHQUQsWUFBQUEsTUFBTSxDQUFDLG1CQUFTTSxTQUFULEVBQW9CbEIsSUFBckIsQ0FBTixDQUFpQ2EsT0FBakMsQ0FDRSxtRUFERjtBQUdEO0FBQ0YsU0E5QkQsTUE4Qk8sSUFBSVAsSUFBSSxDQUFDQyxJQUFMLEtBQWMsYUFBbEIsRUFBaUM7QUFDdEMsZ0JBQU1HLFVBQVUsR0FBR0osSUFBSSxDQUFDYyxVQUFMLENBQWdCLENBQWhCLENBQW5CO0FBRUFSLFVBQUFBLE1BQU0sQ0FBQyxtQkFBU0YsVUFBVCxFQUFxQlYsSUFBdEIsQ0FBTixDQUFrQ2EsT0FBbEMsQ0FDRSx5REFERjtBQUdEO0FBQ0Y7O0FBdkNXLEtBQWQ7QUF5Q0QsR0E1Q0MsQ0FBRjtBQTZDRCxDQWhETyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2UsIHRyYXZlcnNlLCBnZW5lcmF0ZSB9IGZyb20gJy4uLy4uL2xpYidcbmltcG9ydCBCcmFuY2hMb2dQbHVnaW4gZnJvbSAnLidcbmltcG9ydCB7IE5vZGVQYXRoIH0gZnJvbSAnLi4vLi4vdHJhdmVyc2VyL3BhdGgnXG5pbXBvcnQgeyBBZGRTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBTdWJyb3V0aW5lU3RhdGVtZW50IH0gZnJvbSAnLi4vLi4vbm9kZXMnXG5cbmNvbnN0IGNvZGUgPSBgXG5cbnN1YiB2Y2xfcmVjdiB7XG4gIGlmICh0cnVlKSB7XG4gICAgc2V0IHJlcS5odHRwLlRlc3QgPSAxO1xuICB9IGVsc2UgaWYgKGZhbHNlKSB7XG4gICAgc2V0IHJlcS5odHRwLlRlc3QgPSAxO1xuICB9IGVsc2Uge1xuICAgIHNldCByZXEuaHR0cC5UZXN0ID0gMTtcbiAgfVxufVxuXG5zdWIgbXlfZnVuY3Rpb24ge1xuICBzZXQgcmVxLmh0dHAuVGVzdCA9IDE7XG59XG5cbnN1YiB2Y2xfZGVsaXZlciB7XG4gIGNhbGwgbXlfZnVuY3Rpb247XG5cbiAgc2V0IHJlcS5odHRwLlRlc3QgPSAxO1xufVxuXG5gLnRyaW0oKVxuXG5kZXNjcmliZSgnQnJhbmNoTG9nUGx1Z2luJywgKCkgPT4ge1xuICBjb25zdCBhc3QgPSBwYXJzZShjb2RlKVxuXG4gIGl0KCdzaG91bGQgY3JlYXRlIEJyYW5jaC1Mb2cgbm9kZXMgaW5zaWRlIGVhY2ggYnJhbmNoJywgKCkgPT4ge1xuICAgIEJyYW5jaExvZ1BsdWdpbihhc3QpXG5cbiAgICB0cmF2ZXJzZShhc3QsIHtcbiAgICAgIGVudHJ5KHsgbm9kZSB9OiBOb2RlUGF0aDxTdWJyb3V0aW5lU3RhdGVtZW50IHwgSWZTdGF0ZW1lbnQ+KSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdTdWJyb3V0aW5lU3RhdGVtZW50Jykge1xuICAgICAgICAgIGlmIChub2RlLmlkLm5hbWUgPT09ICd2Y2xfcmVjdicpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2dlck5vZGUgPSBub2RlLmJvZHlbMF1cblxuICAgICAgICAgICAgZXhwZWN0KGdlbmVyYXRlKGxvZ2dlck5vZGUpLmNvZGUpLnRvTWF0Y2goXG4gICAgICAgICAgICAgIC9zZXQgcmVxXFwuaHR0cFxcLlZhY2VsaW5lLUJyYW5jaC1Mb2cgPSBcIlxcKHZjbF9yZWN2XFwpLipcIjsvXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2dlck5vZGUgPSBub2RlLmJvZHlbMF1cblxuICAgICAgICAgICAgZXhwZWN0KGxvZ2dlck5vZGUpLnRvTWF0Y2hPYmplY3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnQWRkU3RhdGVtZW50JyxcbiAgICAgICAgICAgICAgbGVmdDogeyBtZW1iZXI6IHsgbmFtZTogJ1ZhY2VsaW5lLUJyYW5jaC1Mb2cnIH0gfSxcbiAgICAgICAgICAgIH0gYXMgQWRkU3RhdGVtZW50KVxuXG4gICAgICAgICAgICBleHBlY3QoZ2VuZXJhdGUobG9nZ2VyTm9kZSkuY29kZSkudG9NYXRjaChcbiAgICAgICAgICAgICAgL2FkZCByZXFcXC5odHRwXFwuVmFjZWxpbmUtQnJhbmNoLUxvZyA9IFwiXFwoLipcXCkuKlwiOy9cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobm9kZS5pZC5uYW1lID09PSAndmNsX2RlbGl2ZXInKSB7XG4gICAgICAgICAgICBjb25zdCBbc3RkQ29sbGVjdCwgcmVxVG9SZXNwXSA9IG5vZGUuYm9keS5zbGljZSgtMilcblxuICAgICAgICAgICAgZXhwZWN0KGdlbmVyYXRlKHN0ZENvbGxlY3QpLmNvZGUpLnRvTWF0Y2goXG4gICAgICAgICAgICAgICdzdGQuY29sbGVjdChyZXEuaHR0cC5WYWNlbGluZS1CcmFuY2gtTG9nKTsnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBleHBlY3QoZ2VuZXJhdGUocmVxVG9SZXNwKS5jb2RlKS50b01hdGNoKFxuICAgICAgICAgICAgICAnc2V0IHJlc3AuaHR0cC5WYWNlbGluZS1CcmFuY2gtTG9nID0gcmVxLmh0dHAuVmFjZWxpbmUtQnJhbmNoLUxvZzsnXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50Jykge1xuICAgICAgICAgIGNvbnN0IGxvZ2dlck5vZGUgPSBub2RlLmNvbnNlcXVlbnRbMF1cblxuICAgICAgICAgIGV4cGVjdChnZW5lcmF0ZShsb2dnZXJOb2RlKS5jb2RlKS50b01hdGNoKFxuICAgICAgICAgICAgL2FkZCByZXFcXC5odHRwXFwuVmFjZWxpbmUtQnJhbmNoLUxvZyA9IFwiXFwoYW5vbnltb3VzXFwpLipcIjsvXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pXG4gIH0pXG59KVxuIl19

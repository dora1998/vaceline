'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _lib = require('../../lib')

const varBranchLog = {
  type: 'Member',
  base: {
    type: 'Member',
    base: {
      type: 'Identifier',
      name: 'req',
    },
    member: {
      type: 'Identifier',
      name: 'http',
    },
  },
  member: {
    type: 'Identifier',
    name: 'Vaceline-Branch-Log',
  },
}

const getLoc = (node) =>
  node.loc ? `${node.loc.start.line}:${node.loc.start.column}` : 'synthethic'

var _default = (ast) => {
  ;(0, _lib.traverse)(ast, {
    entry({ node }) {
      if (node.type === 'SubroutineStatement') {
        if (node.id.name === 'vcl_recv') {
          node.body.unshift(
            /**
             * set req.http.Vaceline-Branch-Log = "(vcl_recv)${line}:${col}";
             */
            {
              type: 'SetStatement',
              left: varBranchLog,
              right: {
                type: 'StringLiteral',
                value: `"(${node.id.name})${getLoc(node)}"`,
              },
              operator: '=',
            }
          )
        } else {
          node.body.unshift(
            /**
             * add req.http.Vaceline-Branch-Log = "(${nodeName})${line}:${col}";
             */
            {
              type: 'AddStatement',
              left: varBranchLog,
              right: {
                type: 'StringLiteral',
                value: `"(${node.id.name})${getLoc(node)}"`,
              },
              operator: '=',
            }
          )
        }

        if (node.id.name === 'vcl_deliver') {
          node.body.push(
            /**
             * set resp.http.Vaceline-Branch-Log = std.collect(
             *   req.http.Vaceline-Branch-Log
             * );
             */
            {
              type: 'ExpressionStatement',
              body: {
                type: 'FunCallExpression',
                callee: {
                  type: 'Member',
                  base: {
                    type: 'Identifier',
                    name: 'std',
                  },
                  member: {
                    type: 'Identifier',
                    name: 'collect',
                  },
                },
                args: [varBranchLog],
              },
            },
            {
              type: 'SetStatement',
              left: {
                type: 'Member',
                base: {
                  type: 'Member',
                  base: {
                    type: 'Identifier',
                    name: 'resp',
                  },
                  member: {
                    type: 'Identifier',
                    name: 'http',
                  },
                },
                member: {
                  type: 'Identifier',
                  name: 'Vaceline-Branch-Log',
                },
              },
              right: {
                type: 'Member',
                base: {
                  type: 'Member',
                  base: {
                    type: 'Identifier',
                    name: 'req',
                  },
                  member: {
                    type: 'Identifier',
                    name: 'http',
                  },
                },
                member: {
                  type: 'Identifier',
                  name: 'Vaceline-Branch-Log',
                },
              },
              operator: '=',
            }
          )
        }
      } else if (node.type === 'IfStatement') {
        node.consequent.unshift(
          /**
           * add req.http.Vaceline-Branch-Log = "${line}:${col}";
           */
          {
            type: 'AddStatement',
            left: varBranchLog,
            right: {
              type: 'StringLiteral',
              value: node.loc
                ? `"(anonymous)${node.loc.start.line}:${node.loc.start.column}"`
                : '"synthethic"',
            },
            operator: '=',
          }
        )
      }
    },
  })
}

exports.default = _default
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW5zL2JyYW5jaC1sb2cvaW5kZXgudHMiXSwibmFtZXMiOlsidmFyQnJhbmNoTG9nIiwidHlwZSIsImJhc2UiLCJuYW1lIiwibWVtYmVyIiwiZ2V0TG9jIiwibm9kZSIsImxvYyIsInN0YXJ0IiwibGluZSIsImNvbHVtbiIsImFzdCIsImVudHJ5IiwiaWQiLCJib2R5IiwidW5zaGlmdCIsImxlZnQiLCJyaWdodCIsInZhbHVlIiwib3BlcmF0b3IiLCJwdXNoIiwiY2FsbGVlIiwiYXJncyIsImNvbnNlcXVlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFJQSxNQUFNQSxZQUFrQixHQUFHO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsUUFEbUI7QUFFekJDLEVBQUFBLElBQUksRUFBRTtBQUNKRCxJQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxJQUFBQSxJQUFJLEVBQUU7QUFBRUQsTUFBQUEsSUFBSSxFQUFFLFlBQVI7QUFBc0JFLE1BQUFBLElBQUksRUFBRTtBQUE1QixLQUZGO0FBR0pDLElBQUFBLE1BQU0sRUFBRTtBQUFFSCxNQUFBQSxJQUFJLEVBQUUsWUFBUjtBQUFzQkUsTUFBQUEsSUFBSSxFQUFFO0FBQTVCO0FBSEosR0FGbUI7QUFPekJDLEVBQUFBLE1BQU0sRUFBRTtBQUFFSCxJQUFBQSxJQUFJLEVBQUUsWUFBUjtBQUFzQkUsSUFBQUEsSUFBSSxFQUFFO0FBQTVCO0FBUGlCLENBQTNCOztBQVVBLE1BQU1FLE1BQU0sR0FBSUMsSUFBRCxJQUNiQSxJQUFJLENBQUNDLEdBQUwsR0FBWSxHQUFFRCxJQUFJLENBQUNDLEdBQUwsQ0FBU0MsS0FBVCxDQUFlQyxJQUFLLElBQUdILElBQUksQ0FBQ0MsR0FBTCxDQUFTQyxLQUFULENBQWVFLE1BQU8sRUFBM0QsR0FBK0QsWUFEakU7O2VBR2dCQyxHQUFELElBQWU7QUFDNUIscUJBQVNBLEdBQVQsRUFBYztBQUNaQyxJQUFBQSxLQUFLLENBQUM7QUFBRU4sTUFBQUE7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SSxFQUFFLFlBQVI7QUFBc0JFLGtCQUFBQSxJQUFJLEVBQUU7QUFBNUI7QUFISixlQUZEO0FBT0xDLGNBQUFBLE1BQU0sRUFBRTtBQUFFSCxnQkFBQUEsSUFBSSxFQUFFLFlBQVI7QUFBc0JFLGdCQUFBQSxJQUFJLEVBQUU7QUFBNUI7QUFQSCxhQVhUO0FBb0JFZ0IsWUFBQUEsUUFBUSxFQUFFO0FBcEJaLFdBckJGO0FBNENEO0FBQ0YsT0EvRUQsTUErRU8sSUFBSWIsSUFBSSxDQUFDTCxJQUFMLEtBQWMsYUFBbEIsRUFBaUM7QUFDdENLLFFBQUFBLElBQUksQ0FBQ2lCLFVBQUwsQ0FBZ0JSLE9BQWhCO0FBQ0U7OztBQUdBO0FBQ0VkLFVBQUFBLElBQUksRUFBRSxjQURSO0FBRUVlLFVBQUFBLElBQUksRUFBRWhCLFlBRlI7QUFHRWlCLFVBQUFBLEtBQUssRUFBRTtBQUNMaEIsWUFBQUEsSUFBSSxFQUFFLGVBREQ7QUFFTGlCLFlBQUFBLEtBQUssRUFBRVosSUFBSSxDQUFDQyxHQUFMLEdBQ0YsZUFBY0QsSUFBSSxDQUFDQyxHQUFMLENBQVNDLEtBQVQsQ0FBZUMsSUFBSyxJQUFHSCxJQUFJLENBQUNDLEdBQUwsQ0FBU0MsS0FBVCxDQUFlRSxNQUFPLEdBRHpELEdBRUg7QUFKQyxXQUhUO0FBU0VTLFVBQUFBLFFBQVEsRUFBRTtBQVRaLFNBSkY7QUFnQkQ7QUFDRjs7QUFuR1csR0FBZDtBQXFHRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHJhdmVyc2UgfSBmcm9tICcuLi8uLi9saWInXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vbm9kZXMnXG5cbi8vIHJlcS5odHRwLlZhY2VsaW5lLUJyYW5jaC1Mb2dcbmNvbnN0IHZhckJyYW5jaExvZzogTm9kZSA9IHtcbiAgdHlwZTogJ01lbWJlcicsXG4gIGJhc2U6IHtcbiAgICB0eXBlOiAnTWVtYmVyJyxcbiAgICBiYXNlOiB7IHR5cGU6ICdJZGVudGlmaWVyJywgbmFtZTogJ3JlcScgfSxcbiAgICBtZW1iZXI6IHsgdHlwZTogJ0lkZW50aWZpZXInLCBuYW1lOiAnaHR0cCcgfSxcbiAgfSxcbiAgbWVtYmVyOiB7IHR5cGU6ICdJZGVudGlmaWVyJywgbmFtZTogJ1ZhY2VsaW5lLUJyYW5jaC1Mb2cnIH0sXG59XG5cbmNvbnN0IGdldExvYyA9IChub2RlOiBOb2RlKSA9PlxuICBub2RlLmxvYyA/IGAke25vZGUubG9jLnN0YXJ0LmxpbmV9OiR7bm9kZS5sb2Muc3RhcnQuY29sdW1ufWAgOiAnc3ludGhldGhpYydcblxuZXhwb3J0IGRlZmF1bHQgKGFzdDogTm9kZSkgPT4ge1xuICB0cmF2ZXJzZShhc3QsIHtcbiAgICBlbnRyeSh7IG5vZGUgfSkge1xuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1N1YnJvdXRpbmVTdGF0ZW1lbnQnKSB7XG4gICAgICAgIGlmIChub2RlLmlkLm5hbWUgPT09ICd2Y2xfcmVjdicpIHtcbiAgICAgICAgICBub2RlLmJvZHkudW5zaGlmdChcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogc2V0IHJlcS5odHRwLlZhY2VsaW5lLUJyYW5jaC1Mb2cgPSBcIih2Y2xfcmVjdikke2xpbmV9OiR7Y29sfVwiO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdTZXRTdGF0ZW1lbnQnLFxuICAgICAgICAgICAgICBsZWZ0OiB2YXJCcmFuY2hMb2csXG4gICAgICAgICAgICAgIHJpZ2h0OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1N0cmluZ0xpdGVyYWwnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBgXCIoJHtub2RlLmlkLm5hbWV9KSR7Z2V0TG9jKG5vZGUpfVwiYCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb3BlcmF0b3I6ICc9JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZS5ib2R5LnVuc2hpZnQoXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGFkZCByZXEuaHR0cC5WYWNlbGluZS1CcmFuY2gtTG9nID0gXCIoJHtub2RlTmFtZX0pJHtsaW5lfToke2NvbH1cIjtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnQWRkU3RhdGVtZW50JyxcbiAgICAgICAgICAgICAgbGVmdDogdmFyQnJhbmNoTG9nLFxuICAgICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdTdHJpbmdMaXRlcmFsJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYFwiKCR7bm9kZS5pZC5uYW1lfSkke2dldExvYyhub2RlKX1cImAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9wZXJhdG9yOiAnPScsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuaWQubmFtZSA9PT0gJ3ZjbF9kZWxpdmVyJykge1xuICAgICAgICAgIG5vZGUuYm9keS5wdXNoKFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBzZXQgcmVzcC5odHRwLlZhY2VsaW5lLUJyYW5jaC1Mb2cgPSBzdGQuY29sbGVjdChcbiAgICAgICAgICAgICAqICAgcmVxLmh0dHAuVmFjZWxpbmUtQnJhbmNoLUxvZ1xuICAgICAgICAgICAgICogKTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnRXhwcmVzc2lvblN0YXRlbWVudCcsXG4gICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnRnVuQ2FsbEV4cHJlc3Npb24nLFxuICAgICAgICAgICAgICAgIGNhbGxlZToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ01lbWJlcicsXG4gICAgICAgICAgICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdJZGVudGlmaWVyJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N0ZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbWVtYmVyOiB7IHR5cGU6ICdJZGVudGlmaWVyJywgbmFtZTogJ2NvbGxlY3QnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhcmdzOiBbdmFyQnJhbmNoTG9nXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdTZXRTdGF0ZW1lbnQnLFxuICAgICAgICAgICAgICBsZWZ0OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ01lbWJlcicsXG4gICAgICAgICAgICAgICAgYmFzZToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ01lbWJlcicsXG4gICAgICAgICAgICAgICAgICBiYXNlOiB7IHR5cGU6ICdJZGVudGlmaWVyJywgbmFtZTogJ3Jlc3AnIH0sXG4gICAgICAgICAgICAgICAgICBtZW1iZXI6IHsgdHlwZTogJ0lkZW50aWZpZXInLCBuYW1lOiAnaHR0cCcgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbWJlcjogeyB0eXBlOiAnSWRlbnRpZmllcicsIG5hbWU6ICdWYWNlbGluZS1CcmFuY2gtTG9nJyB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdNZW1iZXInLFxuICAgICAgICAgICAgICAgIGJhc2U6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdNZW1iZXInLFxuICAgICAgICAgICAgICAgICAgYmFzZTogeyB0eXBlOiAnSWRlbnRpZmllcicsIG5hbWU6ICdyZXEnIH0sXG4gICAgICAgICAgICAgICAgICBtZW1iZXI6IHsgdHlwZTogJ0lkZW50aWZpZXInLCBuYW1lOiAnaHR0cCcgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbWJlcjogeyB0eXBlOiAnSWRlbnRpZmllcicsIG5hbWU6ICdWYWNlbGluZS1CcmFuY2gtTG9nJyB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvcGVyYXRvcjogJz0nLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgbm9kZS5jb25zZXF1ZW50LnVuc2hpZnQoXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogYWRkIHJlcS5odHRwLlZhY2VsaW5lLUJyYW5jaC1Mb2cgPSBcIiR7bGluZX06JHtjb2x9XCI7XG4gICAgICAgICAgICovXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ0FkZFN0YXRlbWVudCcsXG4gICAgICAgICAgICBsZWZ0OiB2YXJCcmFuY2hMb2csXG4gICAgICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgICB0eXBlOiAnU3RyaW5nTGl0ZXJhbCcsXG4gICAgICAgICAgICAgIHZhbHVlOiBub2RlLmxvY1xuICAgICAgICAgICAgICAgID8gYFwiKGFub255bW91cykke25vZGUubG9jLnN0YXJ0LmxpbmV9OiR7bm9kZS5sb2Muc3RhcnQuY29sdW1ufVwiYFxuICAgICAgICAgICAgICAgIDogJ1wic3ludGhldGhpY1wiJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVyYXRvcjogJz0nLFxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gIH0pXG59XG4iXX0=

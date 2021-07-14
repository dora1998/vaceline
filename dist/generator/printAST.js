'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.printNode = printNode
exports.printStatements = printStatements
exports.printDirectorStatement = exports.printTableStatement = exports.printTableDefinition = exports.printBackendStatement = exports.printBackendDefinition = exports.printAclStatement = exports.printSubroutineStatement = exports.printIfStatement = exports.printLogStatement = exports.printSyntheticStatement = exports.printRestartStatement = exports.printErrorStatement = exports.printReturnStatement = exports.printUnsetStatement = exports.printSetStatement = exports.printAddStatement = exports.printDeclareStatement = exports.printCallStatement = exports.printImportStatement = exports.printIncludeStatement = exports.printExpressionStatement = exports.printLogicalExpression = exports.printBinaryExpression = exports.printConcatExpression = exports.printFunCallExpression = exports.printUnaryExpression = exports.printBooleanExpression = exports.printValuePair = exports.printMember = exports.printIp = exports.printIdentifier = exports.printNumericLiteral = exports.printDurationLiteral = exports.printMultilineLiteral = exports.printStringLiteral = exports.printBooleanLiteral = exports.printProgram = exports.base = void 0

var _doc = require('prettier/doc')

var _nodes = require('../nodes')

function printNode(node, options) {
  switch (node.type) {
    case 'Program':
      return printProgram(node, options)

    case 'AclStatement':
      return printAclStatement(node, options)

    case 'AddStatement':
      return printAddStatement(node, options)

    case 'BackendStatement':
      return printBackendStatement(node, options)

    case 'CallStatement':
      return printCallStatement(node, options)

    case 'DeclareStatement':
      return printDeclareStatement(node, options)

    case 'ErrorStatement':
      return printErrorStatement(node, options)

    case 'ExpressionStatement':
      return printExpressionStatement(node, options)

    case 'IfStatement':
      return printIfStatement(node, options)

    case 'ImportStatement':
      return printImportStatement(node, options)

    case 'IncludeStatement':
      return printIncludeStatement(node, options)

    case 'LogStatement':
      return printLogStatement(node, options)

    case 'RestartStatement':
      return printRestartStatement(node, options)

    case 'ReturnStatement':
      return printReturnStatement(node, options)

    case 'SetStatement':
      return printSetStatement(node, options)

    case 'SubroutineStatement':
      return printSubroutineStatement(node, options)

    case 'SyntheticStatement':
      return printSyntheticStatement(node, options)

    case 'TableStatement':
      return printTableStatement(node, options)

    case 'UnsetStatement':
      return printUnsetStatement(node, options)

    case 'BooleanLiteral':
      return printBooleanLiteral(node, options)

    case 'DurationLiteral':
      return printDurationLiteral(node, options)

    case 'MultilineLiteral':
      return printMultilineLiteral(node, options)

    case 'NumericLiteral':
      return printNumericLiteral(node, options)

    case 'StringLiteral':
      return printStringLiteral(node, options)

    case 'BinaryExpression':
      return printBinaryExpression(node, options)

    case 'BooleanExpression':
      return printBooleanExpression(node, options)

    case 'ConcatExpression':
      return printConcatExpression(node, options)

    case 'FunCallExpression':
      return printFunCallExpression(node, options)

    case 'Identifier':
      return printIdentifier(node, options)

    case 'Ip':
      return printIp(node, options)

    case 'LogicalExpression':
      return printLogicalExpression(node, options)

    case 'Member':
      return printMember(node, options)

    case 'UnaryExpression':
      return printUnaryExpression(node, options)

    case 'ValuePair':
      return printValuePair(node, options)

    case 'BackendDefinition':
      return printBackendDefinition(node, options)

    case 'TableDefinition':
      return printTableDefinition(node, options)

    case 'DirectorStatement':
      return printDirectorStatement(node, options)
  }
}

function printStatements(stmts) {
  const doc = []
  let lastLine =
    (stmts[0] && (0, _nodes.isLocated)(stmts[0]) && getLastLine(stmts[0])) || 1

  for (const stmt of stmts) {
    if ((0, _nodes.isLocated)(stmt) && stmt.loc.start.line - lastLine > 0) {
      // Compare the next line with previous line of the last node
      // TODO: Set max number of empty lines between statements
      let delta = getFirstLine(stmt) - lastLine - 1

      while (delta--) {
        doc.push(_doc.builders.hardline)
      } // Set last line of the current node as the last line to compare
      // with in the next iteration

      lastLine = getLastLine(stmt)
    }

    doc.push(printNode(stmt), _doc.builders.hardline)
  }

  doc.pop()
  return _doc.builders.concat(doc)
}

function getFirstLine(node) {
  var _ref,
    _node$leadingComments,
    _node$leadingComments2,
    _node$leadingComments3

  // first leading comment or first line of node
  return (_ref =
    (_node$leadingComments = node.leadingComments) === null ||
    _node$leadingComments === void 0
      ? void 0
      : (_node$leadingComments2 = _node$leadingComments[0]) === null ||
        _node$leadingComments2 === void 0
      ? void 0
      : (_node$leadingComments3 = _node$leadingComments2.loc) === null ||
        _node$leadingComments3 === void 0
      ? void 0
      : _node$leadingComments3.start.line) !== null && _ref !== void 0
    ? _ref
    : node.loc.start.line
}

function getLastLine(node) {
  var _ref2,
    _node$trailingComment,
    _node$trailingComment2,
    _node$trailingComment3,
    _node$trailingComment4

  // last trailing comment or last line of node
  return (_ref2 =
    (_node$trailingComment = node.trailingComments) === null ||
    _node$trailingComment === void 0
      ? void 0
      : (_node$trailingComment2 =
          _node$trailingComment[
            ((_node$trailingComment4 = node.trailingComments) === null ||
            _node$trailingComment4 === void 0
              ? void 0
              : _node$trailingComment4.length) - 1
          ]) === null || _node$trailingComment2 === void 0
      ? void 0
      : (_node$trailingComment3 = _node$trailingComment2.loc) === null ||
        _node$trailingComment3 === void 0
      ? void 0
      : _node$trailingComment3.end.line) !== null && _ref2 !== void 0
    ? _ref2
    : node.loc.end.line
}

const base = (printer) => {
  return (node, options) => {
    var _node$leadingComments4, _node$trailingComment5

    let printed = printer(node, options)
    if (
      (_node$leadingComments4 = node.leadingComments) === null ||
      _node$leadingComments4 === void 0
        ? void 0
        : _node$leadingComments4.length
    )
      printed = _doc.builders.concat([
        _doc.builders.join(
          _doc.builders.hardline,
          node.leadingComments.map((comment) => comment.value)
        ),
        _doc.builders.hardline,
        printed,
      ])
    if (
      (_node$trailingComment5 = node.trailingComments) === null ||
      _node$trailingComment5 === void 0
        ? void 0
        : _node$trailingComment5.length
    )
      printed = _doc.builders.concat([
        printed,
        ' ',
        ...node.trailingComments.map((comment) => comment.value),
      ]) // TODO: print innerComments

    return printed
  }
}

exports.base = base
const printProgram = base((node) => {
  return printStatements(node.body)
})
exports.printProgram = printProgram
const printBooleanLiteral = base((node) => {
  return node.value
})
exports.printBooleanLiteral = printBooleanLiteral
const printStringLiteral = base((node) => {
  return node.value
})
exports.printStringLiteral = printStringLiteral
const printMultilineLiteral = base((node) => {
  return node.value
})
exports.printMultilineLiteral = printMultilineLiteral
const printDurationLiteral = base((node) => {
  return node.value
})
exports.printDurationLiteral = printDurationLiteral
const printNumericLiteral = base((node) => {
  return node.value
})
exports.printNumericLiteral = printNumericLiteral
const printIdentifier = base((node) => {
  return node.name
})
exports.printIdentifier = printIdentifier
const printIp = base((node) => {
  return node.cidr ? `"${node.value}"/${node.cidr}` : `"${node.value}"`
})
exports.printIp = printIp
const printMember = base((node, options) => {
  const { neverBreak = false, broken = false } =
    options !== null && options !== void 0 ? options : {}
  const shouldBreak =
    !neverBreak && // break if child is also a Member or if also parent is already broken
    (node.base.type === 'Member' || broken) // printExpr('Member',  {})

  return _doc.builders.concat([
    _doc.builders.group(
      _doc.builders.concat([
        printNode(node.base, {
          neverBreak,
          broken: shouldBreak,
        }),
        _doc.builders.indent(
          _doc.builders.concat([
            shouldBreak ? _doc.builders.softline : '',
            '.',
            printIdentifier(node.member),
          ])
        ),
      ])
    ),
  ])
})
exports.printMember = printMember
const printValuePair = base((node) => {
  return _doc.builders.concat([
    printNode(node.base),
    ':',
    printIdentifier(node.name),
  ])
})
exports.printValuePair = printValuePair
const printBooleanExpression = base((node) => {
  return _doc.builders.group(
    _doc.builders.concat([
      _doc.builders.indent(
        _doc.builders.concat([
          '(',
          _doc.builders.ifBreak(_doc.builders.softline, ''),
          printNode(node.body),
        ])
      ),
      _doc.builders.ifBreak(_doc.builders.softline, ''),
      ')',
    ])
  )
})
exports.printBooleanExpression = printBooleanExpression
const printUnaryExpression = base((node) => {
  return _doc.builders.concat([node.operator, printNode(node.argument)])
})
exports.printUnaryExpression = printUnaryExpression
const printFunCallExpression = base((node) => {
  return _doc.builders.concat([
    printNode(node.callee),
    '(',
    _doc.builders.group(
      _doc.builders.concat([
        _doc.builders.indent(
          _doc.builders.concat([
            _doc.builders.ifBreak(_doc.builders.line, ''),
            _doc.builders.join(
              _doc.builders.concat([',', _doc.builders.line]),
              node.args.map((n) => printNode(n))
            ),
            _doc.builders.ifBreak(',', ''),
          ])
        ),
        _doc.builders.ifBreak(_doc.builders.line, ''),
      ])
    ),
    ')',
  ])
})
exports.printFunCallExpression = printFunCallExpression
const printConcatExpression = base((node) => {
  return _doc.builders.group(
    _doc.builders.indent(
      _doc.builders.join(
        _doc.builders.line,
        node.body.map((n) => printNode(n))
      )
    )
  )
})
exports.printConcatExpression = printConcatExpression
const printBinaryExpression = base((node) => {
  const left =
    node.left.type === 'BinaryExpression'
      ? _doc.builders.concat(['(', printBinaryExpression(node.left), ')'])
      : printNode(node.left)
  return _doc.builders.group(
    _doc.builders.concat([
      left,
      ' ',
      _doc.builders.indent(
        _doc.builders.concat([
          node.operator,
          _doc.builders.line,
          printNode(node.right),
        ])
      ),
    ])
  )
})
exports.printBinaryExpression = printBinaryExpression
const printLogicalExpression = base((node) => {
  const left =
    node.left.type === 'LogicalExpression' &&
    node.operator === '||' &&
    node.left.operator === '&&'
      ? _doc.builders.concat(['(', printLogicalExpression(node.left), ')'])
      : printNode(node.left)
  const right =
    node.right.type === 'LogicalExpression' &&
    node.operator === '||' &&
    node.right.operator === '&&'
      ? _doc.builders.concat(['(', printLogicalExpression(node.right), ')'])
      : printNode(node.right)
  return _doc.builders.group(
    _doc.builders.concat([
      left,
      ' ',
      _doc.builders.indent(
        _doc.builders.concat([node.operator, _doc.builders.line, right])
      ),
    ])
  )
})
exports.printLogicalExpression = printLogicalExpression
const printExpressionStatement = base((node) => {
  return _doc.builders.concat([printNode(node.body), ';'])
})
exports.printExpressionStatement = printExpressionStatement
const printIncludeStatement = base((node) => {
  return _doc.builders.concat([
    'include ',
    printStringLiteral(node.module),
    ';',
  ])
})
exports.printIncludeStatement = printIncludeStatement
const printImportStatement = base((node) => {
  return _doc.builders.concat(['import ', printNode(node.module), ';'])
})
exports.printImportStatement = printImportStatement
const printCallStatement = base((node) => {
  return _doc.builders.concat(['call ', printNode(node.subroutine), ';'])
})
exports.printCallStatement = printCallStatement
const printDeclareStatement = base((node) => {
  return _doc.builders.concat([
    'declare ',
    'local ',
    printNode(node.id, {
      neverBreak: true,
    }),
    ' ',
    node.valueType,
    ';',
  ])
})
exports.printDeclareStatement = printDeclareStatement
const printAddStatement = base((node) => {
  return _doc.builders.group(
    _doc.builders.indent(
      _doc.builders.concat([
        'add ',
        printNode(node.left, {
          neverBreak: true,
        }),
        ' ',
        node.operator,
        _doc.builders.line,
        printNode(node.right),
        ';',
      ])
    )
  )
})
exports.printAddStatement = printAddStatement
const printSetStatement = base((node) => {
  return _doc.builders.group(
    _doc.builders.indent(
      _doc.builders.concat([
        'set ',
        printNode(node.left, {
          neverBreak: true,
        }),
        ' ',
        node.operator,
        _doc.builders.line,
        printNode(node.right, {
          neverBreak: true,
        }),
        ';',
      ])
    )
  )
})
exports.printSetStatement = printSetStatement
const printUnsetStatement = base((node) => {
  return _doc.builders.concat([
    'unset ',
    printNode(node.id, {
      neverBreak: true,
    }),
    ';',
  ])
})
exports.printUnsetStatement = printUnsetStatement
const printReturnStatement = base((node) => {
  // TODO: handle the optional parens
  return _doc.builders.concat(['return ', '(', node.action, ')', ';'])
})
exports.printReturnStatement = printReturnStatement
const printErrorStatement = base((node) => {
  return _doc.builders.concat([
    _doc.builders.join(
      ' ',
      [
        'error',
        node.status.toString(),
        node.message && printNode(node.message),
      ].filter(Boolean)
    ),
    ';',
  ])
})
exports.printErrorStatement = printErrorStatement
const printRestartStatement = base(() => {
  return 'restart;'
})
exports.printRestartStatement = printRestartStatement
const printSyntheticStatement = base((node) => {
  return _doc.builders.concat(['synthetic ', printNode(node.response), ';'])
})
exports.printSyntheticStatement = printSyntheticStatement
const printLogStatement = base((node) => {
  return _doc.builders.concat(['log ', printNode(node.content), ';'])
})
exports.printLogStatement = printLogStatement
const printIfStatement = base((node) => {
  const doc = [
    'if ',
    _doc.builders.group(
      _doc.builders.concat([
        _doc.builders.indent(
          _doc.builders.concat([
            '(',
            _doc.builders.ifBreak(_doc.builders.hardline, ''),
            printNode(node.test),
          ])
        ),
        _doc.builders.ifBreak(_doc.builders.hardline, ''),
        ') ',
      ])
    ),
    '{',
    _doc.builders.indent(
      _doc.builders.concat([
        _doc.builders.hardline,
        printStatements(node.consequent),
      ])
    ),
    _doc.builders.hardline,
    '}',
  ]

  if (node.alternative) {
    const alternative = Array.isArray(node.alternative)
      ? [
          ' else {',
          _doc.builders.indent(
            _doc.builders.concat([
              _doc.builders.hardline,
              printStatements(node.alternative),
            ])
          ),
          _doc.builders.hardline,
          '}',
        ]
      : [' else ', printIfStatement(node.alternative)]
    return _doc.builders.concat([...doc, ...alternative])
  }

  return _doc.builders.concat(doc)
})
exports.printIfStatement = printIfStatement
const printSubroutineStatement = base((node) => {
  return _doc.builders.concat([
    'sub ',
    printIdentifier(node.id),
    ' {',
    _doc.builders.indent(
      _doc.builders.concat([_doc.builders.hardline, printStatements(node.body)])
    ),
    _doc.builders.hardline,
    '}',
  ])
})
exports.printSubroutineStatement = printSubroutineStatement
const printAclStatement = base((node) => {
  return _doc.builders.concat([
    'acl ',
    printIdentifier(node.id),
    ' {',
    _doc.builders.indent(
      _doc.builders.concat([
        _doc.builders.hardline,
        _doc.builders.join(
          _doc.builders.hardline,
          node.body
            .map((ip) => printIp(ip))
            .map((doc) => _doc.builders.concat([doc, ';']))
        ),
      ])
    ),
    _doc.builders.hardline,
    '}',
  ])
})
exports.printAclStatement = printAclStatement
const printBackendDefinition = base((node) => {
  const printedValue = Array.isArray(node.value)
    ? _doc.builders.concat([
        '{',
        _doc.builders.indent(
          _doc.builders.concat([
            _doc.builders.hardline,
            _doc.builders.join(
              _doc.builders.hardline,
              node.value.map((v) => printBackendDefinition(v))
            ),
          ])
        ),
        _doc.builders.hardline,
        '}',
      ])
    : _doc.builders.concat([printNode(node.value), ';'])
  return _doc.builders.concat(['.', node.key, ' = ', printedValue])
})
exports.printBackendDefinition = printBackendDefinition
const printBackendStatement = base((node) => {
  return _doc.builders.concat([
    'backend ',
    printIdentifier(node.id),
    ' ',
    _doc.builders.concat([
      '{',
      _doc.builders.indent(
        _doc.builders.concat([
          _doc.builders.hardline,
          _doc.builders.join(
            _doc.builders.hardline,
            node.body.map((d) => printBackendDefinition(d))
          ),
        ])
      ),
      _doc.builders.hardline,
      '}',
    ]),
  ])
})
exports.printBackendStatement = printBackendStatement
const printTableDefinition = base((node) => {
  return _doc.builders.concat([node.key, ':', node.value])
})
/**
 * asdfasdf
 */

exports.printTableDefinition = printTableDefinition
const printTableStatement = base((node) => {
  return _doc.builders.concat([
    'table ',
    printIdentifier(node.id),
    ' {',
    _doc.builders.indent(
      _doc.builders.concat([
        _doc.builders.hardline,
        _doc.builders.join(
          _doc.builders.concat([',', _doc.builders.hardline]),
          node.body.map((td) => printTableDefinition(td))
        ), // TODO: handle trailing comma
        // ',',
      ])
    ),
    _doc.builders.hardline,
    '}',
  ])
})
exports.printTableStatement = printTableStatement
const printDirectorStatement = base((node) => {
  return _doc.builders.concat([
    'director ',
    printIdentifier(node.id),
    ' ',
    printIdentifier(node.directorType),
    ' {',
    _doc.builders.indent(
      _doc.builders.concat([
        _doc.builders.hardline,
        _doc.builders.join(
          _doc.builders.hardline,
          node.body.map((item) => {
            if ('backend' in item) {
              return _doc.builders.concat([
                '{ ',
                _doc.builders.join(' ', [
                  '.backend = ' + item.backend + ';',
                  ...item.attributes.map(
                    (attr) => '.' + attr.key + ' = ' + attr.value + ';'
                  ),
                ]),
                ' }',
              ])
            }

            return _doc.builders.concat([
              '.' + item.key + ' = ' + item.value + ';',
            ])
          })
        ),
      ])
    ),
    _doc.builders.hardline,
    '}',
  ])
})
exports.printDirectorStatement = printDirectorStatement
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW5lcmF0b3IvcHJpbnRBU1QudHMiXSwibmFtZXMiOlsicHJpbnROb2RlIiwibm9kZSIsIm9wdGlvbnMiLCJ0eXBlIiwicHJpbnRQcm9ncmFtIiwicHJpbnRBY2xTdGF0ZW1lbnQiLCJwcmludEFkZFN0YXRlbWVudCIsInByaW50QmFja2VuZFN0YXRlbWVudCIsInByaW50Q2FsbFN0YXRlbWVudCIsInByaW50RGVjbGFyZVN0YXRlbWVudCIsInByaW50RXJyb3JTdGF0ZW1lbnQiLCJwcmludEV4cHJlc3Npb25TdGF0ZW1lbnQiLCJwcmludElmU3RhdGVtZW50IiwicHJpbnRJbXBvcnRTdGF0ZW1lbnQiLCJwcmludEluY2x1ZGVTdGF0ZW1lbnQiLCJwcmludExvZ1N0YXRlbWVudCIsInByaW50UmVzdGFydFN0YXRlbWVudCIsInByaW50UmV0dXJuU3RhdGVtZW50IiwicHJpbnRTZXRTdGF0ZW1lbnQiLCJwcmludFN1YnJvdXRpbmVTdGF0ZW1lbnQiLCJwcmludFN5bnRoZXRpY1N0YXRlbWVudCIsInByaW50VGFibGVTdGF0ZW1lbnQiLCJwcmludFVuc2V0U3RhdGVtZW50IiwicHJpbnRCb29sZWFuTGl0ZXJhbCIsInByaW50RHVyYXRpb25MaXRlcmFsIiwicHJpbnRNdWx0aWxpbmVMaXRlcmFsIiwicHJpbnROdW1lcmljTGl0ZXJhbCIsInByaW50U3RyaW5nTGl0ZXJhbCIsInByaW50QmluYXJ5RXhwcmVzc2lvbiIsInByaW50Qm9vbGVhbkV4cHJlc3Npb24iLCJwcmludENvbmNhdEV4cHJlc3Npb24iLCJwcmludEZ1bkNhbGxFeHByZXNzaW9uIiwicHJpbnRJZGVudGlmaWVyIiwicHJpbnRJcCIsInByaW50TG9naWNhbEV4cHJlc3Npb24iLCJwcmludE1lbWJlciIsInByaW50VW5hcnlFeHByZXNzaW9uIiwicHJpbnRWYWx1ZVBhaXIiLCJwcmludEJhY2tlbmREZWZpbml0aW9uIiwicHJpbnRUYWJsZURlZmluaXRpb24iLCJwcmludERpcmVjdG9yU3RhdGVtZW50IiwicHJpbnRTdGF0ZW1lbnRzIiwic3RtdHMiLCJkb2MiLCJsYXN0TGluZSIsImdldExhc3RMaW5lIiwic3RtdCIsImxvYyIsInN0YXJ0IiwibGluZSIsImRlbHRhIiwiZ2V0Rmlyc3RMaW5lIiwicHVzaCIsImIiLCJoYXJkbGluZSIsInBvcCIsImNvbmNhdCIsImxlYWRpbmdDb21tZW50cyIsInRyYWlsaW5nQ29tbWVudHMiLCJsZW5ndGgiLCJlbmQiLCJiYXNlIiwicHJpbnRlciIsInByaW50ZWQiLCJqb2luIiwibWFwIiwiY29tbWVudCIsInZhbHVlIiwiYm9keSIsIm5hbWUiLCJjaWRyIiwibmV2ZXJCcmVhayIsImJyb2tlbiIsInNob3VsZEJyZWFrIiwiZ3JvdXAiLCJpbmRlbnQiLCJzb2Z0bGluZSIsIm1lbWJlciIsImlmQnJlYWsiLCJvcGVyYXRvciIsImFyZ3VtZW50IiwiY2FsbGVlIiwiYXJncyIsIm4iLCJsZWZ0IiwicmlnaHQiLCJtb2R1bGUiLCJzdWJyb3V0aW5lIiwiaWQiLCJ2YWx1ZVR5cGUiLCJhY3Rpb24iLCJzdGF0dXMiLCJ0b1N0cmluZyIsIm1lc3NhZ2UiLCJmaWx0ZXIiLCJCb29sZWFuIiwicmVzcG9uc2UiLCJjb250ZW50IiwidGVzdCIsImNvbnNlcXVlbnQiLCJhbHRlcm5hdGl2ZSIsIkFycmF5IiwiaXNBcnJheSIsImlwIiwicHJpbnRlZFZhbHVlIiwidiIsImtleSIsImQiLCJ0ZCIsImRpcmVjdG9yVHlwZSIsIml0ZW0iLCJiYWNrZW5kIiwiYXR0cmlidXRlcyIsImF0dHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUdPLFNBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQStCQyxPQUEvQixFQUFzRDtBQUMzRCxVQUFRRCxJQUFJLENBQUNFLElBQWI7QUFDRSxTQUFLLFNBQUw7QUFDRSxhQUFPQyxZQUFZLENBQUNILElBQUQsRUFBT0MsT0FBUCxDQUFuQjs7QUFFRixTQUFLLGNBQUw7QUFDRSxhQUFPRyxpQkFBaUIsQ0FB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QTlCLEdBQXNDLEdBRC9DLENBRk8sQ0FBWixDQUZjLEVBUWQsSUFSYyxDQUFULENBQVA7QUFVRDs7QUFDRCxXQUFPZCxjQUFFRyxNQUFGLENBQVMsQ0FBQyxNQUFNc0QsSUFBSSxDQUFDSixHQUFYLEdBQWlCLEtBQWpCLEdBQXlCSSxJQUFJLENBQUMzQyxLQUE5QixHQUFzQyxHQUF2QyxDQUFULENBQVA7QUFDRCxHQWRELENBRkYsQ0FGTyxDQUFULENBREYsQ0FOYyxFQTZCZGQsY0FBRUMsUUE3QlksRUE4QmQsR0E5QmMsQ0FBVCxDQUFQO0FBZ0NELENBakN5QyxDQUFuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvYywgYnVpbGRlcnMgYXMgYiB9IGZyb20gJ3ByZXR0aWVyL2RvYydcbmltcG9ydCB7IE5vZGUsIGlzTG9jYXRlZCwgTG9jYXRlZCB9IGZyb20gJy4uL25vZGVzJ1xuaW1wb3J0ICogYXMgZCBmcm9tICcuLi9ub2RlcydcblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50Tm9kZShub2RlOiBOb2RlLCBvcHRpb25zPzogb2JqZWN0KTogRG9jIHtcbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdQcm9ncmFtJzpcbiAgICAgIHJldHVybiBwcmludFByb2dyYW0obm9kZSwgb3B0aW9ucylcblxuICAgIGNhc2UgJ0FjbFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRBY2xTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdBZGRTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50QWRkU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnQmFja2VuZFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRCYWNrZW5kU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnQ2FsbFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRDYWxsU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnRGVjbGFyZVN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnREZWNsYXJlU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnRXJyb3JTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50RXJyb3JTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRJZlN0YXRlbWVudChub2RlLCBvcHRpb25zKVxuICAgIGNhc2UgJ0ltcG9ydFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRJbXBvcnRTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdJbmNsdWRlU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEluY2x1ZGVTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdMb2dTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50TG9nU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnUmVzdGFydFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRSZXN0YXJ0U3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFJldHVyblN0YXRlbWVudChub2RlLCBvcHRpb25zKVxuICAgIGNhc2UgJ1NldFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRTZXRTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdTdWJyb3V0aW5lU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFN1YnJvdXRpbmVTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdTeW50aGV0aWNTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50U3ludGhldGljU3RhdGVtZW50KG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnVGFibGVTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50VGFibGVTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdVbnNldFN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRVbnNldFN0YXRlbWVudChub2RlLCBvcHRpb25zKVxuXG4gICAgY2FzZSAnQm9vbGVhbkxpdGVyYWwnOlxuICAgICAgcmV0dXJuIHByaW50Qm9vbGVhbkxpdGVyYWwobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdEdXJhdGlvbkxpdGVyYWwnOlxuICAgICAgcmV0dXJuIHByaW50RHVyYXRpb25MaXRlcmFsKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnTXVsdGlsaW5lTGl0ZXJhbCc6XG4gICAgICByZXR1cm4gcHJpbnRNdWx0aWxpbmVMaXRlcmFsKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnTnVtZXJpY0xpdGVyYWwnOlxuICAgICAgcmV0dXJuIHByaW50TnVtZXJpY0xpdGVyYWwobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdTdHJpbmdMaXRlcmFsJzpcbiAgICAgIHJldHVybiBwcmludFN0cmluZ0xpdGVyYWwobm9kZSwgb3B0aW9ucylcblxuICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50QmluYXJ5RXhwcmVzc2lvbihub2RlLCBvcHRpb25zKVxuICAgIGNhc2UgJ0Jvb2xlYW5FeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludEJvb2xlYW5FeHByZXNzaW9uKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnQ29uY2F0RXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRDb25jYXRFeHByZXNzaW9uKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnRnVuQ2FsbEV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50RnVuQ2FsbEV4cHJlc3Npb24obm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgIHJldHVybiBwcmludElkZW50aWZpZXIobm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdJcCc6XG4gICAgICByZXR1cm4gcHJpbnRJcChub2RlLCBvcHRpb25zKVxuICAgIGNhc2UgJ0xvZ2ljYWxFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludExvZ2ljYWxFeHByZXNzaW9uKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnTWVtYmVyJzpcbiAgICAgIHJldHVybiBwcmludE1lbWJlcihub2RlLCBvcHRpb25zKVxuICAgIGNhc2UgJ1VuYXJ5RXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRVbmFyeUV4cHJlc3Npb24obm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdWYWx1ZVBhaXInOlxuICAgICAgcmV0dXJuIHByaW50VmFsdWVQYWlyKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnQmFja2VuZERlZmluaXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50QmFja2VuZERlZmluaXRpb24obm9kZSwgb3B0aW9ucylcbiAgICBjYXNlICdUYWJsZURlZmluaXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50VGFibGVEZWZpbml0aW9uKG5vZGUsIG9wdGlvbnMpXG4gICAgY2FzZSAnRGlyZWN0b3JTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50RGlyZWN0b3JTdGF0ZW1lbnQobm9kZSwgb3B0aW9ucylcbiAgfVxufVxuXG50eXBlIFByaW50ZXJGdW5jPFQgZXh0ZW5kcyBOb2RlLCBVIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PiA9IChcbiAgbm9kZTogVCxcbiAgb3B0aW9ucz86IFVcbikgPT4gRG9jXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFN0YXRlbWVudHMoc3RtdHM6IEFycmF5PGQuU3RhdGVtZW50Pik6IERvYyB7XG4gIGNvbnN0IGRvYyA9IFtdXG5cbiAgbGV0IGxhc3RMaW5lOiBudW1iZXIgPVxuICAgIChzdG10c1swXSAmJiBpc0xvY2F0ZWQoc3RtdHNbMF0pICYmIGdldExhc3RMaW5lKHN0bXRzWzBdKSkgfHwgMVxuXG4gIGZvciAoY29uc3Qgc3RtdCBvZiBzdG10cykge1xuICAgIGlmIChpc0xvY2F0ZWQoc3RtdCkgJiYgc3RtdC5sb2Muc3RhcnQubGluZSAtIGxhc3RMaW5lID4gMCkge1xuICAgICAgLy8gQ29tcGFyZSB0aGUgbmV4dCBsaW5lIHdpdGggcHJldmlvdXMgbGluZSBvZiB0aGUgbGFzdCBub2RlXG4gICAgICAvLyBUT0RPOiBTZXQgbWF4IG51bWJlciBvZiBlbXB0eSBsaW5lcyBiZXR3ZWVuIHN0YXRlbWVudHNcbiAgICAgIGxldCBkZWx0YSA9IGdldEZpcnN0TGluZShzdG10KSAtIGxhc3RMaW5lIC0gMVxuXG4gICAgICB3aGlsZSAoZGVsdGEtLSkge1xuICAgICAgICBkb2MucHVzaChiLmhhcmRsaW5lKVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbGFzdCBsaW5lIG9mIHRoZSBjdXJyZW50IG5vZGUgYXMgdGhlIGxhc3QgbGluZSB0byBjb21wYXJlXG4gICAgICAvLyB3aXRoIGluIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgbGFzdExpbmUgPSBnZXRMYXN0TGluZShzdG10KVxuICAgIH1cblxuICAgIGRvYy5wdXNoKHByaW50Tm9kZShzdG10KSwgYi5oYXJkbGluZSlcbiAgfVxuXG4gIGRvYy5wb3AoKVxuXG4gIHJldHVybiBiLmNvbmNhdChkb2MpXG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0TGluZShub2RlOiBMb2NhdGVkPE5vZGU+KTogbnVtYmVyIHtcbiAgLy8gZmlyc3QgbGVhZGluZyBjb21tZW50IG9yIGZpcnN0IGxpbmUgb2Ygbm9kZVxuICByZXR1cm4gbm9kZS5sZWFkaW5nQ29tbWVudHM/LlswXT8ubG9jPy5zdGFydC5saW5lID8/IG5vZGUubG9jLnN0YXJ0LmxpbmVcbn1cblxuZnVuY3Rpb24gZ2V0TGFzdExpbmUobm9kZTogTG9jYXRlZDxOb2RlPik6IG51bWJlciB7XG4gIC8vIGxhc3QgdHJhaWxpbmcgY29tbWVudCBvciBsYXN0IGxpbmUgb2Ygbm9kZVxuICByZXR1cm4gKFxuICAgIG5vZGUudHJhaWxpbmdDb21tZW50cz8uW25vZGUudHJhaWxpbmdDb21tZW50cz8ubGVuZ3RoIC0gMV0/LmxvYz8uZW5kLmxpbmUgPz9cbiAgICBub2RlLmxvYy5lbmQubGluZVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBiYXNlID0gPFQgZXh0ZW5kcyBOb2RlLCBVIGV4dGVuZHMgb2JqZWN0PihcbiAgcHJpbnRlcjogUHJpbnRlckZ1bmM8VCwgVT5cbik6IFByaW50ZXJGdW5jPFQsIFU+ID0+IHtcbiAgcmV0dXJuIChub2RlOiBULCBvcHRpb25zPzogVSkgPT4ge1xuICAgIGxldCBwcmludGVkID0gcHJpbnRlcihub2RlLCBvcHRpb25zKVxuXG4gICAgaWYgKG5vZGUubGVhZGluZ0NvbW1lbnRzPy5sZW5ndGgpXG4gICAgICBwcmludGVkID0gYi5jb25jYXQoW1xuICAgICAgICBiLmpvaW4oXG4gICAgICAgICAgYi5oYXJkbGluZSxcbiAgICAgICAgICBub2RlLmxlYWRpbmdDb21tZW50cy5tYXAoKGNvbW1lbnQpID0+IGNvbW1lbnQudmFsdWUpXG4gICAgICAgICksXG4gICAgICAgIGIuaGFyZGxpbmUsXG4gICAgICAgIHByaW50ZWQsXG4gICAgICBdKVxuXG4gICAgaWYgKG5vZGUudHJhaWxpbmdDb21tZW50cz8ubGVuZ3RoKVxuICAgICAgcHJpbnRlZCA9IGIuY29uY2F0KFtcbiAgICAgICAgcHJpbnRlZCxcbiAgICAgICAgJyAnLFxuICAgICAgICAuLi5ub2RlLnRyYWlsaW5nQ29tbWVudHMubWFwKChjb21tZW50KSA9PiBjb21tZW50LnZhbHVlKSxcbiAgICAgIF0pXG5cbiAgICAvLyBUT0RPOiBwcmludCBpbm5lckNvbW1lbnRzXG5cbiAgICByZXR1cm4gcHJpbnRlZFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwcmludFByb2dyYW0gPSBiYXNlKChub2RlOiBkLlByb2dyYW0pID0+IHtcbiAgcmV0dXJuIHByaW50U3RhdGVtZW50cyhub2RlLmJvZHkpXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRCb29sZWFuTGl0ZXJhbCA9IGJhc2UoKG5vZGU6IGQuQm9vbGVhbkxpdGVyYWwpID0+IHtcbiAgcmV0dXJuIG5vZGUudmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludFN0cmluZ0xpdGVyYWwgPSBiYXNlKChub2RlOiBkLlN0cmluZ0xpdGVyYWwpID0+IHtcbiAgcmV0dXJuIG5vZGUudmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludE11bHRpbGluZUxpdGVyYWwgPSBiYXNlKChub2RlOiBkLk11bHRpbGluZUxpdGVyYWwpID0+IHtcbiAgcmV0dXJuIG5vZGUudmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludER1cmF0aW9uTGl0ZXJhbCA9IGJhc2UoKG5vZGU6IGQuRHVyYXRpb25MaXRlcmFsKSA9PiB7XG4gIHJldHVybiBub2RlLnZhbHVlXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnROdW1lcmljTGl0ZXJhbCA9IGJhc2UoKG5vZGU6IGQuTnVtZXJpY0xpdGVyYWwpID0+IHtcbiAgcmV0dXJuIG5vZGUudmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludElkZW50aWZpZXIgPSBiYXNlKChub2RlOiBkLklkZW50aWZpZXIpID0+IHtcbiAgcmV0dXJuIG5vZGUubmFtZVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50SXAgPSBiYXNlKChub2RlOiBkLklwKSA9PiB7XG4gIHJldHVybiBub2RlLmNpZHIgPyBgXCIke25vZGUudmFsdWV9XCIvJHtub2RlLmNpZHJ9YCA6IGBcIiR7bm9kZS52YWx1ZX1cImBcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludE1lbWJlcjogUHJpbnRlckZ1bmM8XG4gIGQuTWVtYmVyLFxuICB7IG5ldmVyQnJlYWs/OiBib29sZWFuOyBicm9rZW4/OiBib29sZWFuIH1cbj4gPSBiYXNlKChub2RlLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgbmV2ZXJCcmVhayA9IGZhbHNlLCBicm9rZW4gPSBmYWxzZSB9ID0gb3B0aW9ucyA/PyB7fVxuXG4gIGNvbnN0IHNob3VsZEJyZWFrID1cbiAgICAhbmV2ZXJCcmVhayAmJlxuICAgIC8vIGJyZWFrIGlmIGNoaWxkIGlzIGFsc28gYSBNZW1iZXIgb3IgaWYgYWxzbyBwYXJlbnQgaXMgYWxyZWFkeSBicm9rZW5cbiAgICAobm9kZS5iYXNlLnR5cGUgPT09ICdNZW1iZXInIHx8IGJyb2tlbilcblxuICAvLyBwcmludEV4cHIoJ01lbWJlcicsICB7fSlcbiAgcmV0dXJuIGIuY29uY2F0KFtcbiAgICBiLmdyb3VwKFxuICAgICAgYi5jb25jYXQoW1xuICAgICAgICBwcmludE5vZGUobm9kZS5iYXNlLCB7XG4gICAgICAgICAgbmV2ZXJCcmVhayxcbiAgICAgICAgICBicm9rZW46IHNob3VsZEJyZWFrLFxuICAgICAgICB9KSxcbiAgICAgICAgYi5pbmRlbnQoXG4gICAgICAgICAgYi5jb25jYXQoW1xuICAgICAgICAgICAgc2hvdWxkQnJlYWsgPyBiLnNvZnRsaW5lIDogJycsXG4gICAgICAgICAgICAnLicsXG4gICAgICAgICAgICBwcmludElkZW50aWZpZXIobm9kZS5tZW1iZXIpLFxuICAgICAgICAgIF0pXG4gICAgICAgICksXG4gICAgICBdKVxuICAgICksXG4gIF0pXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRWYWx1ZVBhaXIgPSBiYXNlKChub2RlOiBkLlZhbHVlUGFpcikgPT4ge1xuICByZXR1cm4gYi5jb25jYXQoW3ByaW50Tm9kZShub2RlLmJhc2UpLCAnOicsIHByaW50SWRlbnRpZmllcihub2RlLm5hbWUpXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEJvb2xlYW5FeHByZXNzaW9uID0gYmFzZSgobm9kZTogZC5Cb29sZWFuRXhwcmVzc2lvbikgPT4ge1xuICByZXR1cm4gYi5ncm91cChcbiAgICBiLmNvbmNhdChbXG4gICAgICBiLmluZGVudChcbiAgICAgICAgYi5jb25jYXQoWycoJywgYi5pZkJyZWFrKGIuc29mdGxpbmUsICcnKSwgcHJpbnROb2RlKG5vZGUuYm9keSldKVxuICAgICAgKSxcbiAgICAgIGIuaWZCcmVhayhiLnNvZnRsaW5lLCAnJyksXG4gICAgICAnKScsXG4gICAgXSlcbiAgKVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50VW5hcnlFeHByZXNzaW9uID0gYmFzZSgobm9kZTogZC5VbmFyeUV4cHJlc3Npb24pID0+IHtcbiAgcmV0dXJuIGIuY29uY2F0KFtub2RlLm9wZXJhdG9yLCBwcmludE5vZGUobm9kZS5hcmd1bWVudCldKVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50RnVuQ2FsbEV4cHJlc3Npb24gPSBiYXNlKChub2RlOiBkLkZ1bkNhbGxFeHByZXNzaW9uKSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbXG4gICAgcHJpbnROb2RlKG5vZGUuY2FsbGVlKSxcbiAgICAnKCcsXG4gICAgYi5ncm91cChcbiAgICAgIGIuY29uY2F0KFtcbiAgICAgICAgYi5pbmRlbnQoXG4gICAgICAgICAgYi5jb25jYXQoW1xuICAgICAgICAgICAgYi5pZkJyZWFrKGIubGluZSwgJycpLFxuICAgICAgICAgICAgYi5qb2luKFxuICAgICAgICAgICAgICBiLmNvbmNhdChbJywnLCBiLmxpbmVdKSxcbiAgICAgICAgICAgICAgbm9kZS5hcmdzLm1hcCgobikgPT4gcHJpbnROb2RlKG4pKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGIuaWZCcmVhaygnLCcsICcnKSxcbiAgICAgICAgICBdKVxuICAgICAgICApLFxuICAgICAgICBiLmlmQnJlYWsoYi5saW5lLCAnJyksXG4gICAgICBdKVxuICAgICksXG4gICAgJyknLFxuICBdKVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50Q29uY2F0RXhwcmVzc2lvbiA9IGJhc2UoKG5vZGU6IGQuQ29uY2F0RXhwcmVzc2lvbikgPT4ge1xuICByZXR1cm4gYi5ncm91cChcbiAgICBiLmluZGVudChcbiAgICAgIGIuam9pbihcbiAgICAgICAgYi5saW5lLFxuICAgICAgICBub2RlLmJvZHkubWFwKChuKSA9PiBwcmludE5vZGUobikpXG4gICAgICApXG4gICAgKVxuICApXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRCaW5hcnlFeHByZXNzaW9uOiBQcmludGVyRnVuYzxkLkJpbmFyeUV4cHJlc3Npb24+ID0gYmFzZShcbiAgKG5vZGU6IGQuQmluYXJ5RXhwcmVzc2lvbikgPT4ge1xuICAgIGNvbnN0IGxlZnQgPVxuICAgICAgbm9kZS5sZWZ0LnR5cGUgPT09ICdCaW5hcnlFeHByZXNzaW9uJ1xuICAgICAgICA/IGIuY29uY2F0KFsnKCcsIHByaW50QmluYXJ5RXhwcmVzc2lvbihub2RlLmxlZnQpLCAnKSddKVxuICAgICAgICA6IHByaW50Tm9kZShub2RlLmxlZnQpXG5cbiAgICByZXR1cm4gYi5ncm91cChcbiAgICAgIGIuY29uY2F0KFtcbiAgICAgICAgbGVmdCxcbiAgICAgICAgJyAnLFxuICAgICAgICBiLmluZGVudChiLmNvbmNhdChbbm9kZS5vcGVyYXRvciwgYi5saW5lLCBwcmludE5vZGUobm9kZS5yaWdodCldKSksXG4gICAgICBdKVxuICAgIClcbiAgfVxuKVxuXG5leHBvcnQgY29uc3QgcHJpbnRMb2dpY2FsRXhwcmVzc2lvbjogUHJpbnRlckZ1bmM8ZC5Mb2dpY2FsRXhwcmVzc2lvbj4gPSBiYXNlKFxuICAobm9kZTogZC5Mb2dpY2FsRXhwcmVzc2lvbikgPT4ge1xuICAgIGNvbnN0IGxlZnQgPVxuICAgICAgbm9kZS5sZWZ0LnR5cGUgPT09ICdMb2dpY2FsRXhwcmVzc2lvbicgJiZcbiAgICAgIG5vZGUub3BlcmF0b3IgPT09ICd8fCcgJiZcbiAgICAgIG5vZGUubGVmdC5vcGVyYXRvciA9PT0gJyYmJ1xuICAgICAgICA/IGIuY29uY2F0KFsnKCcsIHByaW50TG9naWNhbEV4cHJlc3Npb24obm9kZS5sZWZ0KSwgJyknXSlcbiAgICAgICAgOiBwcmludE5vZGUobm9kZS5sZWZ0KVxuXG4gICAgY29uc3QgcmlnaHQgPVxuICAgICAgbm9kZS5yaWdodC50eXBlID09PSAnTG9naWNhbEV4cHJlc3Npb24nICYmXG4gICAgICBub2RlLm9wZXJhdG9yID09PSAnfHwnICYmXG4gICAgICBub2RlLnJpZ2h0Lm9wZXJhdG9yID09PSAnJiYnXG4gICAgICAgID8gYi5jb25jYXQoWycoJywgcHJpbnRMb2dpY2FsRXhwcmVzc2lvbihub2RlLnJpZ2h0KSwgJyknXSlcbiAgICAgICAgOiBwcmludE5vZGUobm9kZS5yaWdodClcblxuICAgIHJldHVybiBiLmdyb3VwKFxuICAgICAgYi5jb25jYXQoW2xlZnQsICcgJywgYi5pbmRlbnQoYi5jb25jYXQoW25vZGUub3BlcmF0b3IsIGIubGluZSwgcmlnaHRdKSldKVxuICAgIClcbiAgfVxuKVxuXG5leHBvcnQgY29uc3QgcHJpbnRFeHByZXNzaW9uU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5FeHByZXNzaW9uU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbcHJpbnROb2RlKG5vZGUuYm9keSksICc7J10pXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRJbmNsdWRlU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5JbmNsdWRlU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbJ2luY2x1ZGUgJywgcHJpbnRTdHJpbmdMaXRlcmFsKG5vZGUubW9kdWxlKSwgJzsnXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEltcG9ydFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuSW1wb3J0U3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbJ2ltcG9ydCAnLCBwcmludE5vZGUobm9kZS5tb2R1bGUpLCAnOyddKVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50Q2FsbFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuQ2FsbFN0YXRlbWVudCkgPT4ge1xuICByZXR1cm4gYi5jb25jYXQoWydjYWxsICcsIHByaW50Tm9kZShub2RlLnN1YnJvdXRpbmUpLCAnOyddKVxufSlcblxuZXhwb3J0IHR5cGUgRGVjbGFyZVZhbHVlVHlwZSA9XG4gIHwgJ1NUUklORydcbiAgfCAnQk9PTCdcbiAgfCAnQk9PTEVBTidcbiAgfCAnSU5URUdFUidcbiAgfCAnRkxPQVQnXG5cbmV4cG9ydCBjb25zdCBwcmludERlY2xhcmVTdGF0ZW1lbnQgPSBiYXNlKChub2RlOiBkLkRlY2xhcmVTdGF0ZW1lbnQpID0+IHtcbiAgcmV0dXJuIGIuY29uY2F0KFtcbiAgICAnZGVjbGFyZSAnLFxuICAgICdsb2NhbCAnLFxuICAgIHByaW50Tm9kZShub2RlLmlkLCB7IG5ldmVyQnJlYWs6IHRydWUgfSksXG4gICAgJyAnLFxuICAgIG5vZGUudmFsdWVUeXBlLFxuICAgICc7JyxcbiAgXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEFkZFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuQWRkU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmdyb3VwKFxuICAgIGIuaW5kZW50KFxuICAgICAgYi5jb25jYXQoW1xuICAgICAgICAnYWRkICcsXG4gICAgICAgIHByaW50Tm9kZShub2RlLmxlZnQsIHsgbmV2ZXJCcmVhazogdHJ1ZSB9KSxcbiAgICAgICAgJyAnLFxuICAgICAgICBub2RlLm9wZXJhdG9yLFxuICAgICAgICBiLmxpbmUsXG4gICAgICAgIHByaW50Tm9kZShub2RlLnJpZ2h0KSxcbiAgICAgICAgJzsnLFxuICAgICAgXSlcbiAgICApXG4gIClcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludFNldFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuU2V0U3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmdyb3VwKFxuICAgIGIuaW5kZW50KFxuICAgICAgYi5jb25jYXQoW1xuICAgICAgICAnc2V0ICcsXG4gICAgICAgIHByaW50Tm9kZShub2RlLmxlZnQsIHsgbmV2ZXJCcmVhazogdHJ1ZSB9KSxcbiAgICAgICAgJyAnLFxuICAgICAgICBub2RlLm9wZXJhdG9yLFxuICAgICAgICBiLmxpbmUsXG4gICAgICAgIHByaW50Tm9kZShub2RlLnJpZ2h0LCB7IG5ldmVyQnJlYWs6IHRydWUgfSksXG4gICAgICAgICc7JyxcbiAgICAgIF0pXG4gICAgKVxuICApXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRVbnNldFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuVW5zZXRTdGF0ZW1lbnQpID0+IHtcbiAgcmV0dXJuIGIuY29uY2F0KFsndW5zZXQgJywgcHJpbnROb2RlKG5vZGUuaWQsIHsgbmV2ZXJCcmVhazogdHJ1ZSB9KSwgJzsnXSlcbn0pXG5cbmV4cG9ydCB0eXBlIFJldHVybkFjdGlvbk5hbWUgPVxuICB8ICdwYXNzJ1xuICB8ICdoaXRfZm9yX3Bhc3MnXG4gIHwgJ2xvb2t1cCdcbiAgfCAncGlwZSdcbiAgfCAnZGVsaXZlcidcblxuZXhwb3J0IGNvbnN0IHByaW50UmV0dXJuU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5SZXR1cm5TdGF0ZW1lbnQpID0+IHtcbiAgLy8gVE9ETzogaGFuZGxlIHRoZSBvcHRpb25hbCBwYXJlbnNcbiAgcmV0dXJuIGIuY29uY2F0KFsncmV0dXJuICcsICcoJywgbm9kZS5hY3Rpb24sICcpJywgJzsnXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEVycm9yU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5FcnJvclN0YXRlbWVudCkgPT4ge1xuICByZXR1cm4gYi5jb25jYXQoW1xuICAgIGIuam9pbihcbiAgICAgICcgJyxcbiAgICAgIFtcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgbm9kZS5zdGF0dXMudG9TdHJpbmcoKSxcbiAgICAgICAgbm9kZS5tZXNzYWdlICYmIHByaW50Tm9kZShub2RlLm1lc3NhZ2UpLFxuICAgICAgXS5maWx0ZXIoQm9vbGVhbikgYXMgQXJyYXk8RG9jPlxuICAgICksXG4gICAgJzsnLFxuICBdKVxufSlcblxuZXhwb3J0IGNvbnN0IHByaW50UmVzdGFydFN0YXRlbWVudCA9IGJhc2UoKCkgPT4ge1xuICByZXR1cm4gJ3Jlc3RhcnQ7J1xufSlcblxuZXhwb3J0IGNvbnN0IHByaW50U3ludGhldGljU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5TeW50aGV0aWNTdGF0ZW1lbnQpID0+IHtcbiAgcmV0dXJuIGIuY29uY2F0KFsnc3ludGhldGljICcsIHByaW50Tm9kZShub2RlLnJlc3BvbnNlKSwgJzsnXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludExvZ1N0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuTG9nU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbJ2xvZyAnLCBwcmludE5vZGUobm9kZS5jb250ZW50KSwgJzsnXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludElmU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5JZlN0YXRlbWVudCkgPT4ge1xuICBjb25zdCBkb2MgPSBbXG4gICAgJ2lmICcsXG4gICAgYi5ncm91cChcbiAgICAgIGIuY29uY2F0KFtcbiAgICAgICAgYi5pbmRlbnQoXG4gICAgICAgICAgYi5jb25jYXQoWycoJywgYi5pZkJyZWFrKGIuaGFyZGxpbmUsICcnKSwgcHJpbnROb2RlKG5vZGUudGVzdCldKVxuICAgICAgICApLFxuICAgICAgICBiLmlmQnJlYWsoYi5oYXJkbGluZSwgJycpLFxuICAgICAgICAnKSAnLFxuICAgICAgXSlcbiAgICApLFxuICAgICd7JyxcbiAgICBiLmluZGVudChiLmNvbmNhdChbYi5oYXJkbGluZSwgcHJpbnRTdGF0ZW1lbnRzKG5vZGUuY29uc2VxdWVudCldKSksXG4gICAgYi5oYXJkbGluZSxcbiAgICAnfScsXG4gIF1cblxuICBpZiAobm9kZS5hbHRlcm5hdGl2ZSkge1xuICAgIGNvbnN0IGFsdGVybmF0aXZlOiBBcnJheTxEb2M+ID0gQXJyYXkuaXNBcnJheShub2RlLmFsdGVybmF0aXZlKVxuICAgICAgPyBbXG4gICAgICAgICAgJyBlbHNlIHsnLFxuICAgICAgICAgIGIuaW5kZW50KGIuY29uY2F0KFtiLmhhcmRsaW5lLCBwcmludFN0YXRlbWVudHMobm9kZS5hbHRlcm5hdGl2ZSldKSksXG4gICAgICAgICAgYi5oYXJkbGluZSxcbiAgICAgICAgICAnfScsXG4gICAgICAgIF1cbiAgICAgIDogWycgZWxzZSAnLCBwcmludElmU3RhdGVtZW50KG5vZGUuYWx0ZXJuYXRpdmUpXVxuXG4gICAgcmV0dXJuIGIuY29uY2F0KFsuLi5kb2MsIC4uLmFsdGVybmF0aXZlXSlcbiAgfVxuXG4gIHJldHVybiBiLmNvbmNhdChkb2MpXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRTdWJyb3V0aW5lU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5TdWJyb3V0aW5lU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbXG4gICAgJ3N1YiAnLFxuICAgIHByaW50SWRlbnRpZmllcihub2RlLmlkKSxcbiAgICAnIHsnLFxuICAgIGIuaW5kZW50KGIuY29uY2F0KFtiLmhhcmRsaW5lLCBwcmludFN0YXRlbWVudHMobm9kZS5ib2R5KV0pKSxcbiAgICBiLmhhcmRsaW5lLFxuICAgICd9JyxcbiAgXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEFjbFN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuQWNsU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbXG4gICAgJ2FjbCAnLFxuICAgIHByaW50SWRlbnRpZmllcihub2RlLmlkKSxcbiAgICAnIHsnLFxuICAgIGIuaW5kZW50KFxuICAgICAgYi5jb25jYXQoW1xuICAgICAgICBiLmhhcmRsaW5lLFxuICAgICAgICBiLmpvaW4oXG4gICAgICAgICAgYi5oYXJkbGluZSxcbiAgICAgICAgICBub2RlLmJvZHkubWFwKChpcCkgPT4gcHJpbnRJcChpcCkpLm1hcCgoZG9jKSA9PiBiLmNvbmNhdChbZG9jLCAnOyddKSlcbiAgICAgICAgKSxcbiAgICAgIF0pXG4gICAgKSxcbiAgICBiLmhhcmRsaW5lLFxuICAgICd9JyxcbiAgXSlcbn0pXG5cbmV4cG9ydCBjb25zdCBwcmludEJhY2tlbmREZWZpbml0aW9uOiBQcmludGVyRnVuYzxkLkJhY2tlbmREZWZpbml0aW9uPiA9IGJhc2UoXG4gIChub2RlOiBkLkJhY2tlbmREZWZpbml0aW9uKSA9PiB7XG4gICAgY29uc3QgcHJpbnRlZFZhbHVlOiBEb2MgPSBBcnJheS5pc0FycmF5KG5vZGUudmFsdWUpXG4gICAgICA/IGIuY29uY2F0KFtcbiAgICAgICAgICAneycsXG4gICAgICAgICAgYi5pbmRlbnQoXG4gICAgICAgICAgICBiLmNvbmNhdChbXG4gICAgICAgICAgICAgIGIuaGFyZGxpbmUsXG4gICAgICAgICAgICAgIGIuam9pbihcbiAgICAgICAgICAgICAgICBiLmhhcmRsaW5lLFxuICAgICAgICAgICAgICAgIG5vZGUudmFsdWUubWFwKCh2KSA9PiBwcmludEJhY2tlbmREZWZpbml0aW9uKHYpKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApLFxuICAgICAgICAgIGIuaGFyZGxpbmUsXG4gICAgICAgICAgJ30nLFxuICAgICAgICBdKVxuICAgICAgOiBiLmNvbmNhdChbcHJpbnROb2RlKG5vZGUudmFsdWUpLCAnOyddKVxuXG4gICAgcmV0dXJuIGIuY29uY2F0KFsnLicsIG5vZGUua2V5LCAnID0gJywgcHJpbnRlZFZhbHVlXSlcbiAgfVxuKVxuXG5leHBvcnQgY29uc3QgcHJpbnRCYWNrZW5kU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5CYWNrZW5kU3RhdGVtZW50KSA9PiB7XG4gIHJldHVybiBiLmNvbmNhdChbXG4gICAgJ2JhY2tlbmQgJyxcbiAgICBwcmludElkZW50aWZpZXIobm9kZS5pZCksXG4gICAgJyAnLFxuICAgIGIuY29uY2F0KFtcbiAgICAgICd7JyxcbiAgICAgIGIuaW5kZW50KFxuICAgICAgICBiLmNvbmNhdChbXG4gICAgICAgICAgYi5oYXJkbGluZSxcbiAgICAgICAgICBiLmpvaW4oXG4gICAgICAgICAgICBiLmhhcmRsaW5lLFxuICAgICAgICAgICAgbm9kZS5ib2R5Lm1hcCgoZCkgPT4gcHJpbnRCYWNrZW5kRGVmaW5pdGlvbihkKSlcbiAgICAgICAgICApLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIGIuaGFyZGxpbmUsXG4gICAgICAnfScsXG4gICAgXSksXG4gIF0pXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnRUYWJsZURlZmluaXRpb24gPSBiYXNlKChub2RlOiBkLlRhYmxlRGVmaW5pdGlvbikgPT4ge1xuICByZXR1cm4gYi5jb25jYXQoW25vZGUua2V5LCAnOicsIG5vZGUudmFsdWVdKVxufSlcblxuLyoqXG4gKiBhc2RmYXNkZlxuICovXG5cbmV4cG9ydCBjb25zdCBwcmludFRhYmxlU3RhdGVtZW50ID0gYmFzZSgobm9kZTogZC5UYWJsZVN0YXRlbWVudCkgPT4ge1xuICByZXR1cm4gYi5jb25jYXQoW1xuICAgICd0YWJsZSAnLFxuICAgIHByaW50SWRlbnRpZmllcihub2RlLmlkKSxcbiAgICAnIHsnLFxuICAgIGIuaW5kZW50KFxuICAgICAgYi5jb25jYXQoW1xuICAgICAgICBiLmhhcmRsaW5lLFxuICAgICAgICBiLmpvaW4oXG4gICAgICAgICAgYi5jb25jYXQoWycsJywgYi5oYXJkbGluZV0pLFxuICAgICAgICAgIG5vZGUuYm9keS5tYXAoKHRkKSA9PiBwcmludFRhYmxlRGVmaW5pdGlvbih0ZCkpXG4gICAgICAgICksXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSB0cmFpbGluZyBjb21tYVxuICAgICAgICAvLyAnLCcsXG4gICAgICBdKVxuICAgICksXG4gICAgYi5oYXJkbGluZSxcbiAgICAnfScsXG4gIF0pXG59KVxuXG5leHBvcnQgY29uc3QgcHJpbnREaXJlY3RvclN0YXRlbWVudCA9IGJhc2UoKG5vZGU6IGQuRGlyZWN0b3JTdGF0ZW1lbnQpID0+IHtcbiAgcmV0dXJuIGIuY29uY2F0KFtcbiAgICAnZGlyZWN0b3IgJyxcbiAgICBwcmludElkZW50aWZpZXIobm9kZS5pZCksXG4gICAgJyAnLFxuICAgIHByaW50SWRlbnRpZmllcihub2RlLmRpcmVjdG9yVHlwZSksXG4gICAgJyB7JyxcbiAgICBiLmluZGVudChcbiAgICAgIGIuY29uY2F0KFtcbiAgICAgICAgYi5oYXJkbGluZSxcbiAgICAgICAgYi5qb2luKFxuICAgICAgICAgIGIuaGFyZGxpbmUsXG4gICAgICAgICAgbm9kZS5ib2R5Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCdiYWNrZW5kJyBpbiBpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBiLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgJ3sgJyxcbiAgICAgICAgICAgICAgICBiLmpvaW4oJyAnLCBbXG4gICAgICAgICAgICAgICAgICAnLmJhY2tlbmQgPSAnICsgaXRlbS5iYWNrZW5kICsgJzsnLFxuICAgICAgICAgICAgICAgICAgLi4uaXRlbS5hdHRyaWJ1dGVzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGF0dHIpID0+ICcuJyArIGF0dHIua2V5ICsgJyA9ICcgKyBhdHRyLnZhbHVlICsgJzsnXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICcgfScsXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYi5jb25jYXQoWycuJyArIGl0ZW0ua2V5ICsgJyA9ICcgKyBpdGVtLnZhbHVlICsgJzsnXSlcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgXSlcbiAgICApLFxuICAgIGIuaGFyZGxpbmUsXG4gICAgJ30nLFxuICBdKVxufSlcbiJdfQ==

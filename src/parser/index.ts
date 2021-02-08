import { Tokenizer, Token, TokenType } from './tokenizer'
import { Node, Located, NodeType, Statement, Program, Position } from '../nodes'
import { createError } from './create-error'
import { TokenReader } from './token-reader'

import { isToken } from '../utils/token'
import { parseStmt } from './statement/index'
import { parseCompound } from './compound'
import { buildDebug } from '../utils/debug'

const debug = {
  start: buildDebug('parser:start'),
  finish: buildDebug('parser:finish'),
  trace: buildDebug('parser:trace'),
}

export const parse = (source: string): Program => new Parser(source).parse()

interface ParsingState {
  token: Token
  pos: Position
}

export class Parser extends TokenReader {
  source: string

  constructor(source: string /* opts: { keywords?: Array<string> } = {} */) {
    const tokens = new Tokenizer(source).tokenize()

    super(tokens)

    this.source = source
  }

  parse(): Located<Program> {
    const body = parseCompound<Statement>(this, parseStmt)

    return {
      type: 'Program',
      body,
      loc: {
        start: { offset: 0, line: 1, column: 1 },
        end: this.getCurrentToken().loc.end,
      },
    }
  }

  parseNode<T extends NodeType>(
    token: Token,
    parse: (state: ParsingState) => Node & { type: T }
  ): Located<Node & { type: T }> {
    debug.start(token)

    const state: ParsingState = {
      token,
      pos: token.loc.start,
    }

    const node = parse(state)

    if (!node.loc) {
      node.loc = {
        start: state.pos,
        end: this.getCurrentToken().loc.end,
      }
    }

    debug.finish(node)

    // @ts-expect-error FIXME:
    return node
  }

  validateNode<T extends Array<NodeType>>(
    node: Located,
    ...types: T
  ): Located<Node & { type: T[number] }> {
    if (!types.includes(node.type)) {
      throw createError(
        this.source,
        'Expected one of [' + types.join(', ') + ']',
        node.loc.start,
        node.loc.end
      )
    }

    return node as Located<Node & { type: T }>
  }

  validateToken<T extends TokenType, U extends string>(
    token: Token,
    type: T,
    value?: U
  ): Token & { type: T; value: U } {
    if (!isToken(token, type, value)) {
      throw createError(
        this.source,
        `Expected '${value}' ${type} token`,
        token.loc.start,
        token.loc.end
      )
    }

    return token as Token & { type: T; value: U }
  }
}

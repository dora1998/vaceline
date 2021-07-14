import { Token, TokenType } from './tokenizer'
import { Node, Located, NodeType, Program, Position, Comment } from '../nodes'
export declare const parse: (source: string) => Program
interface ParsingState {
  token: Token
  pos: Position
  comments?: Array<Comment>
}
export declare class Parser {
  source: string
  private reader
  constructor(source: string)
  parse(): Located<Program>
  parseNode<T extends NodeType>(
    token: Token,
    parse: (
      state: ParsingState
    ) => Node & {
      type: T
    }
  ): Located<
    Node & {
      type: T
    }
  >
  parseLeadingComments(pos: Position): Array<Comment>
  parseInnerComments(): Array<Comment>
  parseTrailingComments(): Array<Comment>
  read(): Token
  peek(): Token | undefined
  take(): void
  getCursor(): number
  jumpTo(cur: number): void
  getCurrentToken(): Token
  validateNode<T extends Array<NodeType>>(
    node: Located<Node>,
    ...types: T
  ): Located<
    Node & {
      type: T[number]
    }
  >
  validateToken<T extends TokenType, U extends string>(
    token: Token,
    type: T,
    value?: U
  ): Token & {
    type: T
    value: U
  }
}
export {}

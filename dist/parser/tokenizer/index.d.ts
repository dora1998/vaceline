import { Location } from '../../nodes'
export declare type TokenType =
  | 'ident'
  | 'symbol'
  | 'operator'
  | 'comment'
  | 'string'
  | 'numeric'
  | 'boolean'
export interface Token {
  type: TokenType
  value: string
  loc: Location
}
export declare const getJoinedRegExp: (s: Array<string | RegExp>) => string
export declare class Tokenizer {
  raw: string
  source: ReadonlyArray<string>
  constructor(raw: string)
  tokenize(): Array<Token>
}

import { Expression, Located } from '../../nodes'
import { Token } from '../tokenizer'
import { Parser } from '..'
export interface Stack<T> {
  [I: number]: T
  push: Array<T>['push']
  pop: Array<T>['pop']
  length: Array<T>['length']
}
export declare function parseExpr(
  p: Parser,
  token?: Token,
  shortcut?: boolean
): Located<Expression>

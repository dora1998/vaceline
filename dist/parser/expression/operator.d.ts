import { Parser } from '..'
import { Expression, Located } from '../../nodes'
import { Token } from '../tokenizer'
export declare function parseOperatorExpr(
  p: Parser,
  token?: Token,
  shortcut?: boolean
): Located<Expression>

import { Parser } from '..'
import { Located, Expression } from '../../nodes'
import { Token } from '../tokenizer'
export declare function parseHumbleExpr(
  p: Parser,
  token?: Token
): Located<Expression>

import { Literal, Located } from '../nodes'
import { Token } from './tokenizer'
import { Parser } from '.'
export declare function parseLiteral(
  p: Parser,
  token?: Token
): Located<Literal> | null

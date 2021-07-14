import { Parser } from '..'
import { Identifier, Member, Located, ValuePair } from '../../nodes'
import { Token } from '../tokenizer'
declare type Id = Member | ValuePair | Identifier
export declare function parseId(
  p: Parser,
  token?: Token,
  base?: Located<Exclude<Id, ValuePair>>
): Located<Id>
export declare function parseIdentifier(
  p: Parser,
  token?: Token
): Located<Identifier>
export {}

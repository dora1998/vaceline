import { Statement } from '../../nodes'
import { Parser } from '..'
import { Token } from '../tokenizer'
export declare function parseStmt(p: Parser, token?: Token): Statement

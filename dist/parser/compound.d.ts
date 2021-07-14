import { Parser } from '.'
import { Token } from './tokenizer'
interface CompoundOptions {
  until: string
  delimiter: string
  semi: boolean
}
export declare function parseCompound<T>(
  p: Parser,
  parse: (p: Parser, token: Token) => T,
  { until, delimiter, semi }?: Partial<CompoundOptions> | undefined
): Array<T>
export {}

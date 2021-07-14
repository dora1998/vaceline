import { Parser } from '..'
export declare function parseIp(
  p: Parser,
  token?: import('../tokenizer').Token
): import('../../nodes').Ip & {
  type: 'Ip'
} & {
  loc: import('../../nodes').Location
}

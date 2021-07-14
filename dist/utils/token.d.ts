import { Token, TokenType } from '../parser/tokenizer'
export declare function isToken<
  Type extends TokenType,
  RefinedToken extends Token & {
    type: Type
    value: string
  }
>(
  token: Token | undefined,
  type: Type,
  value?: string | RegExp
): token is RefinedToken

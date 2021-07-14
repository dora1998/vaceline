import { Comment } from '../nodes'
import { Token } from './tokenizer'
export declare class TokenReader {
  private tokens
  private cur
  comments: Array<Comment>
  constructor(tokens: Array<Token>)
  getCurrentToken(): Token
  jumpTo(cur: number): void
  getCursor(): number
  getToken(cur: number): Token | null
  read(): Token
  peek(skip?: number): Token | undefined
  take(): void
}

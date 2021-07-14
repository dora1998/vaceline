import { Position } from '../nodes'
export declare function createError(
  source: string,
  message: string,
  start: Position,
  end: Position
): SyntaxError

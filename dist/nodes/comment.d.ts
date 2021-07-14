import { BaseNode } from '.'
export declare type Comment = CommentLine
export interface CommentLine
  extends Omit<BaseNode, 'leadingComments' | 'trailingComments'> {
  type: 'CommentLine'
  value: string
}

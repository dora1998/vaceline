import { Program } from './program'
import { Expression } from './expression'
import { Statement } from './statement'
import { Location } from './location'
import { Comment } from './comment'
export * from './program'
export * from './statement'
export * from './expression'
export * from './literal'
export * from './location'
export * from './comment'
export declare type Node = Program | Statement | Expression
export declare type PlainNode<N extends Node> = Omit<N, keyof Node>
export declare type Located<N extends Node> = N & {
  loc: Location
}
export declare function isLocated<T extends Node>(node: T): node is Located<T>
export interface BaseNode {
  type: string
  loc?: Location
  leadingComments?: Array<Comment>
  innerComments?: Array<Comment>
  trailingComments?: Array<Comment>
}
export declare type NodeType = Node['type']

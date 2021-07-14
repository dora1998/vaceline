import { Node } from '../nodes'
export interface Handler {
  entry?(path: NodePath<Node>): void
}
export interface TraversalContext {
  parent: Node | null
  parentPath: NodePath<Node> | null
  inList: boolean
  key?: number
  state: unknown
}
export declare class NodePath<T extends Node = Node>
  implements TraversalContext {
  node: T
  parent: Node | null
  state: unknown
  parentPath: NodePath<Node> | null
  context: TraversalContext
  listKey?: string
  inList: boolean
  parentKey?: string
  key?: number
  constructor(node: T, context: TraversalContext)
}

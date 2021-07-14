import { Node } from '../nodes'
import { NodePath, TraversalContext, Handler } from './path'
export declare function traverseNode(
  node: Node,
  callback: (path: NodePath, context: TraversalContext) => void,
  context?: TraversalContext
): void
export declare function traverse(
  ast: Node,
  handler: Handler,
  context?: TraversalContext
): void
export declare function createPathArray(
  ast: Node,
  context?: TraversalContext
): Array<NodePath>

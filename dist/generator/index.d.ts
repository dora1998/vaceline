import { PrinterOptions } from 'prettier/doc'
import { Node } from '../nodes'
export declare type GenerateOptions = {} & PrinterOptions
export declare function generate(
  ast: Node,
  options?: Partial<GenerateOptions>
): {
  code: string
  map?: string
}

import { parse, generate } from './lib'
import { GenerateOptions } from './generator'
import { Program } from './nodes'
interface TransformResult {
  code: string
  map: string
  ast: Program
}
export { parse, generate as transformFromAst }
export declare type Options = {} & GenerateOptions
export declare function transform(
  code: string,
  options?: Partial<Options>
): TransformResult
export declare function transformFile(
  filePath: string,
  options?: Partial<Options>
): TransformResult

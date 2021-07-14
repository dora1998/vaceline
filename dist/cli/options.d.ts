import yargs from 'yargs'
import { GenerateOptions } from '../generator'
export declare type CliOptions = GenerateOptions & {
  source: string
  stdin: boolean
  ast: boolean
  outDir: string
  debug: boolean
  silent: boolean
}
export declare const optionParser: yargs.Argv<CliOptions>

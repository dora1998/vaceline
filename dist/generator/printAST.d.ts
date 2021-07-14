import { Doc } from 'prettier/doc'
import { Node } from '../nodes'
import * as d from '../nodes'
export declare function printNode(node: Node, options?: object): Doc
declare type PrinterFunc<T extends Node, U extends object = object> = (
  node: T,
  options?: U
) => Doc
export declare function printStatements(stmts: Array<d.Statement>): Doc
export declare const base: <T extends Node, U extends object>(
  printer: PrinterFunc<T, U>
) => PrinterFunc<T, U>
export declare const printProgram: PrinterFunc<d.Program, object>
export declare const printBooleanLiteral: PrinterFunc<d.BooleanLiteral, object>
export declare const printStringLiteral: PrinterFunc<d.StringLiteral, object>
export declare const printMultilineLiteral: PrinterFunc<
  d.MultilineLiteral,
  object
>
export declare const printDurationLiteral: PrinterFunc<
  d.DurationLiteral,
  object
>
export declare const printNumericLiteral: PrinterFunc<d.NumericLiteral, object>
export declare const printIdentifier: PrinterFunc<d.Identifier, object>
export declare const printIp: PrinterFunc<d.Ip, object>
export declare const printMember: PrinterFunc<
  d.Member,
  {
    neverBreak?: boolean
    broken?: boolean
  }
>
export declare const printValuePair: PrinterFunc<d.ValuePair, object>
export declare const printBooleanExpression: PrinterFunc<
  d.BooleanExpression,
  object
>
export declare const printUnaryExpression: PrinterFunc<
  d.UnaryExpression,
  object
>
export declare const printFunCallExpression: PrinterFunc<
  d.FunCallExpression,
  object
>
export declare const printConcatExpression: PrinterFunc<
  d.ConcatExpression,
  object
>
export declare const printBinaryExpression: PrinterFunc<d.BinaryExpression>
export declare const printLogicalExpression: PrinterFunc<d.LogicalExpression>
export declare const printExpressionStatement: PrinterFunc<
  d.ExpressionStatement,
  object
>
export declare const printIncludeStatement: PrinterFunc<
  d.IncludeStatement,
  object
>
export declare const printImportStatement: PrinterFunc<
  d.ImportStatement,
  object
>
export declare const printCallStatement: PrinterFunc<d.CallStatement, object>
export declare type DeclareValueType =
  | 'STRING'
  | 'BOOL'
  | 'BOOLEAN'
  | 'INTEGER'
  | 'FLOAT'
export declare const printDeclareStatement: PrinterFunc<
  d.DeclareStatement,
  object
>
export declare const printAddStatement: PrinterFunc<d.AddStatement, object>
export declare const printSetStatement: PrinterFunc<d.SetStatement, object>
export declare const printUnsetStatement: PrinterFunc<d.UnsetStatement, object>
export declare type ReturnActionName =
  | 'pass'
  | 'hit_for_pass'
  | 'lookup'
  | 'pipe'
  | 'deliver'
export declare const printReturnStatement: PrinterFunc<
  d.ReturnStatement,
  object
>
export declare const printErrorStatement: PrinterFunc<d.ErrorStatement, object>
export declare const printRestartStatement: PrinterFunc<Node, object>
export declare const printSyntheticStatement: PrinterFunc<
  d.SyntheticStatement,
  object
>
export declare const printLogStatement: PrinterFunc<d.LogStatement, object>
export declare const printIfStatement: PrinterFunc<d.IfStatement, object>
export declare const printSubroutineStatement: PrinterFunc<
  d.SubroutineStatement,
  object
>
export declare const printAclStatement: PrinterFunc<d.AclStatement, object>
export declare const printBackendDefinition: PrinterFunc<d.BackendDefinition>
export declare const printBackendStatement: PrinterFunc<
  d.BackendStatement,
  object
>
export declare const printTableDefinition: PrinterFunc<
  d.TableDefinition,
  object
>
/**
 * asdfasdf
 */
export declare const printTableStatement: PrinterFunc<d.TableStatement, object>
export declare const printDirectorStatement: PrinterFunc<
  d.DirectorStatement,
  object
>
export {}

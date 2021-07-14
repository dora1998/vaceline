export interface SourcePosition {
  identifierName?: string
  line: number
  column: number
  filename?: string
}
export declare class Buffer {
  private buf
  private innerQueue
  position: {
    line: number
    column: number
  }
  sourcePosition: SourcePosition
  getBuf(): ReadonlyArray<string>
  getQueue(): ReadonlyArray<string>
  getCurrentLine(): number
  getCurrentColumn(): number
  getSourcePosition(): SourcePosition
  getSourceLine(): number
  getSourceColumn(): number
  get(): string
  append(str: string, source?: SourcePosition): void
  removeTrailing(str: string): void
  endsWith(str: string): boolean
  queue(str: string, source?: SourcePosition): void
  moveCursor(str: string, source?: SourcePosition): void
  flush(): void
}

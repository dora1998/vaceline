export declare const binary: Set<string>
export declare const unary: Set<string>
export declare const logical: Set<string>
export declare const assign: Set<string>
export declare const operators: Set<string>
export declare function getPrecedence(op: string): 1 | 0 | 2 | 3

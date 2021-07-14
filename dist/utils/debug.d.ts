import debug from 'debug'
declare const vaceline: debug.Debugger
export declare const buildDebug: (
  namespace: string,
  delimiter?: string | undefined
) => debug.Debugger
export { vaceline as debugVacel }

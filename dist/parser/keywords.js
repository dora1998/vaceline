'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.returnActions = exports.keywords = exports.topLevelKeywords = void 0
const topLevelKeywords = new Set([
  'include',
  'import',
  'sub',
  'acl',
  'backend',
  'table',
])
exports.topLevelKeywords = topLevelKeywords
const keywords = new Set([
  // statement directives
  'call',
  'declare',
  'local',
  'declare',
  'local',
  'add',
  'set',
  'unset',
  'return',
  'error',
  'restart',
  'synthetic',
  'log',
  'if',
  'else',
  'director',
  ...topLevelKeywords,
]) // https://book.varnish-software.com/4.0/chapters/VCL_Basics.html#legal-return-actions

exports.keywords = keywords
const returnActions = new Set([
  'deliver',
  'fetch',
  'restart',
  'hash',
  'pass',
  'pipe',
  'synth',
  'purge',
  'lookup', // Fastly
  'deliver_stale',
])
exports.returnActions = returnActions
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIva2V5d29yZHMudHMiXSwibmFtZXMiOlsidG9wTGV2ZWxLZXl3b3JkcyIsIlNldCIsImtleXdvcmRzIiwicmV0dXJuQWN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTUEsZ0JBQWdCLEdBQUcsSUFBSUMsR0FBSixDQUFRLENBQ3RDLFNBRHNDLEVBRXRDLFFBRnNDLEVBR3RDLEtBSHNDLEVBSXRDLEtBSnNDLEVBS3RDLFNBTHNDLEVBTXRDLE9BTnNDLENBQVIsQ0FBekI7O0FBU0EsTUFBTUMsUUFBUSxHQUFHLElBQUlELEdBQUosQ0FBUSxDQUM5QjtBQUNBLE1BRjhCLEVBRzlCLFNBSDhCLEVBSTlCLE9BSjhCLEVBSzlCLFNBTDhCLEVBTTlCLE9BTjhCLEVBTzlCLEtBUDhCLEVBUTlCLEtBUjhCLEVBUzlCLE9BVDhCLEVBVTlCLFFBVjhCLEVBVzlCLE9BWDhCLEVBWTlCLFNBWjhCLEVBYTlCLFdBYjhCLEVBYzlCLEtBZDhCLEVBZTlCLElBZjhCLEVBZ0I5QixNQWhCOEIsRUFpQjlCLFVBakI4QixFQWtCOUIsR0FBR0QsZ0JBbEIyQixDQUFSLENBQWpCLEMsQ0FxQlA7OztBQUNPLE1BQU1HLGFBQWEsR0FBRyxJQUFJRixHQUFKLENBQVEsQ0FDbkMsU0FEbUMsRUFFbkMsT0FGbUMsRUFHbkMsU0FIbUMsRUFJbkMsTUFKbUMsRUFLbkMsTUFMbUMsRUFNbkMsTUFObUMsRUFPbkMsT0FQbUMsRUFRbkMsT0FSbUMsRUFTbkMsUUFUbUMsRUFXbkM7QUFDQSxlQVptQyxDQUFSLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHRvcExldmVsS2V5d29yZHMgPSBuZXcgU2V0KFtcbiAgJ2luY2x1ZGUnLFxuICAnaW1wb3J0JyxcbiAgJ3N1YicsXG4gICdhY2wnLFxuICAnYmFja2VuZCcsXG4gICd0YWJsZScsXG5dKVxuXG5leHBvcnQgY29uc3Qga2V5d29yZHMgPSBuZXcgU2V0KFtcbiAgLy8gc3RhdGVtZW50IGRpcmVjdGl2ZXNcbiAgJ2NhbGwnLFxuICAnZGVjbGFyZScsXG4gICdsb2NhbCcsXG4gICdkZWNsYXJlJyxcbiAgJ2xvY2FsJyxcbiAgJ2FkZCcsXG4gICdzZXQnLFxuICAndW5zZXQnLFxuICAncmV0dXJuJyxcbiAgJ2Vycm9yJyxcbiAgJ3Jlc3RhcnQnLFxuICAnc3ludGhldGljJyxcbiAgJ2xvZycsXG4gICdpZicsXG4gICdlbHNlJyxcbiAgJ2RpcmVjdG9yJyxcbiAgLi4udG9wTGV2ZWxLZXl3b3Jkcyxcbl0pXG5cbi8vIGh0dHBzOi8vYm9vay52YXJuaXNoLXNvZnR3YXJlLmNvbS80LjAvY2hhcHRlcnMvVkNMX0Jhc2ljcy5odG1sI2xlZ2FsLXJldHVybi1hY3Rpb25zXG5leHBvcnQgY29uc3QgcmV0dXJuQWN0aW9ucyA9IG5ldyBTZXQoW1xuICAnZGVsaXZlcicsXG4gICdmZXRjaCcsXG4gICdyZXN0YXJ0JyxcbiAgJ2hhc2gnLFxuICAncGFzcycsXG4gICdwaXBlJyxcbiAgJ3N5bnRoJyxcbiAgJ3B1cmdlJyxcbiAgJ2xvb2t1cCcsXG5cbiAgLy8gRmFzdGx5XG4gICdkZWxpdmVyX3N0YWxlJyxcbl0pXG4iXX0=

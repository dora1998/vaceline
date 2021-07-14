'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.optionParser = void 0

var _fs = _interopRequireDefault(require('fs'))

var _path = _interopRequireDefault(require('path'))

var _yargs = _interopRequireDefault(require('yargs'))

var _assert = _interopRequireDefault(require('assert'))

var _utils = require('./utils')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const optionParser = _yargs.default
  .locale('en')
  .scriptName('vaceline')
  .alias('h', 'help')
  .alias('v', 'version')
  .strict()
  .usage('$0 [source]', 'Transpile VCL', (y) =>
    y // meta options such as `example` are currently not
      // working where there is only a default command
      // nesting definitions seems work around
      // https://github.com/yargs/yargs/issues/1331
      .showHelpOnFail(false, 'Specify --help for available options\n')
      .example('- $0 path/to/file.vcl', '')
      .example('- $0 path/to/dir', '')
      .example('- cat file | $0', '')
      .example('- $0 file -d dist', '')
      .positional('source', {
        type: 'string',
        desc: 'Source file/dir to transpile',
        coerce: _path.default.resolve,
      })
      .check((opts) => {
        if (!_utils.isFromStdin) {
          ;(0, _assert.default)(
            opts.source,
            new Error('Source must be present')
          )
          ;(0, _assert.default)(
            _fs.default.existsSync(opts.source),
            new Error('File not found at ' + opts.source)
          )
        }

        if (opts.source && _utils.isFromStdin) {
          throw new Error(
            'Source and input from stdin cannot be passed at the same time'
          )
        }

        return true
      })
      .option('ast', {
        type: 'boolean',
        desc: 'Output as AST',
        coerce: Boolean,
      })
      .option('out-dir', {
        type: 'string',
        alias: 'd',
        desc: 'Output dir',
        coerce: _path.default.resolve,
        normalize: true,
      }) // .option('o', {
      //   type: 'string',
      //   alias: 'out-file',
      //   desc: 'Output File',
      //   coerce: path.resolve,
      // })
      .option('silent', {
        type: 'boolean',
        alias: 's',
        desc: 'Disable any logging',
        default: false,
      })
      .option('debug', {
        type: 'boolean',
        desc: 'Enable debug logging',
        default: false,
      })
      .option('minify', {
        type: 'boolean',
        default: true,
      })
      .option('no-comments', {
        type: 'boolean',
        default: true,
      })
      .option('printWidth', {
        type: 'number',
        default: 80,
      })
      .option('tabWidth', {
        type: 'number',
        default: 2,
      })
      .option('useTabs', {
        type: 'boolean',
        default: false,
      })
  )

exports.optionParser = optionParser
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvb3B0aW9ucy50cyJdLCJuYW1lcyI6WyJvcHRpb25QYXJzZXIiLCJ5YXJncyIsImxvY2FsZSIsInNjcmlwdE5hbWUiLCJhbGlhcyIsInN0cmljdCIsInVzYWdlIiwieSIsInNob3dIZWxwT25GYWlsIiwiZXhhbXBsZSIsInBvc2l0aW9uYWwiLCJ0eXBlIiwiZGVzYyIsImNvZXJjZSIsInBhdGgiLCJyZXNvbHZlIiwiY2hlY2siLCJvcHRzIiwiaXNGcm9tU3RkaW4iLCJzb3VyY2UiLCJFcnJvciIsImZzIiwiZXhpc3RzU3luYyIsIm9wdGlvbiIsIkJvb2xlYW4iLCJub3JtYWxpemUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFXTyxNQUFNQSxZQUFZLEdBQUdDLGVBQ3pCQyxNQUR5QixDQUNsQixJQURrQixFQUV6QkMsVUFGeUIsQ0FFZCxVQUZjLEVBR3pCQyxLQUh5QixDQUduQixHQUhtQixFQUdkLE1BSGMsRUFJekJBLEtBSnlCLENBSW5CLEdBSm1CLEVBSWQsU0FKYyxFQUt6QkMsTUFMeUIsR0FNekJDLEtBTnlCLENBTW5CLGFBTm1CLEVBTUosZUFOSSxFQU1jQyxDQUFELElBQ3JDQSxDQUFDLENBQ0M7QUFDQTtBQUNBO0FBQ0E7QUFKRCxDQUtFQyxjQUxILENBS2tCLEtBTGxCLEVBS3lCLHdDQUx6QixFQU1HQyxPQU5ILENBTVcsdUJBTlgsRUFNb0MsRUFOcEMsRUFPR0EsT0FQSCxDQU9XLGtCQVBYLEVBTytCLEVBUC9CLEVBUUdBLE9BUkgsQ0FRVyxpQkFSWCxFQVE4QixFQVI5QixFQVNHQSxPQVRILENBU1csbUJBVFgsRUFTZ0MsRUFUaEMsRUFXR0MsVUFYSCxDQVdjLFFBWGQsRUFXd0I7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxRQURjO0FBRXBCQyxFQUFBQSxJQUFJLEVBQUUsOEJBRmM7QUFHcEJDLEVBQUFBLE1BQU0sRUFBRUMsY0FBS0M7QUFITyxDQVh4QixFQWdCR0MsS0FoQkgsQ0FnQlVDLElBQUQsSUFBK0I7QUFDcEMsTUFBSSxDQUFDQyxrQkFBTCxFQUFrQjtBQUNoQix5QkFBT0QsSUFBSSxDQUFDRSxNQUFaLEVBQW9CLElBQUlDLEtBQUosQ0FBVSx3QkFBVixDQUFwQjtBQUNBLHlCQUNFQyxZQUFHQyxVQUFILENBQWNMLElBQUksQ0FBQ0UsTUFBbkIsQ0FERixFQUVFLElBQUlDLEtBQUosQ0FBVSx1QkFBdUJILElBQUksQ0FBQ0UsTUFBdEMsQ0FGRjtBQUlEOztBQUVELE1BQUlGLElBQUksQ0FBQ0UsTUFBTCxJQUFlRCxrQkFBbkIsRUFBZ0M7QUFDOUIsVUFBTSxJQUFJRSxLQUFKLENBQ0osK0RBREksQ0FBTjtBQUdEOztBQUVELFNBQU8sSUFBUDtBQUNELENBaENILEVBaUNHRyxNQWpDSCxDQWlDVSxLQWpDVixFQWlDaUI7QUFDYlosRUFBQUEsSUFBSSxFQUFFLFNBRE87QUFFYkMsRUFBQUEsSUFBSSxFQUFFLGVBRk87QUFHYkMsRUFBQUEsTUFBTSxFQUFFVztBQUhLLENBakNqQixFQXNDR0QsTUF0Q0gsQ0FzQ1UsU0F0Q1YsRUFzQ3FCO0FBQ2pCWixFQUFBQSxJQUFJLEVBQUUsUUFEVztBQUVqQlAsRUFBQUEsS0FBSyxFQUFFLEdBRlU7QUFHakJRLEVBQUFBLElBQUksRUFBRSxZQUhXO0FBSWpCQyxFQUFBQSxNQUFNLEVBQUVDLGNBQUtDLE9BSkk7QUFLakJVLEVBQUFBLFNBQVMsRUFBRTtBQUxNLENBdENyQixFQTZDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsREYsQ0FtREdGLE1BbkRILENBbURVLFFBbkRWLEVBbURvQjtBQUNoQlosRUFBQUEsSUFBSSxFQUFFLFNBRFU7QUFFaEJQLEVBQUFBLEtBQUssRUFBRSxHQUZTO0FBR2hCUSxFQUFBQSxJQUFJLEVBQUUscUJBSFU7QUFJaEJjLEVBQUFBLE9BQU8sRUFBRTtBQUpPLENBbkRwQixFQXlER0gsTUF6REgsQ0F5RFUsT0F6RFYsRUF5RG1CO0FBQ2ZaLEVBQUFBLElBQUksRUFBRSxTQURTO0FBRWZDLEVBQUFBLElBQUksRUFBRSxzQkFGUztBQUdmYyxFQUFBQSxPQUFPLEVBQUU7QUFITSxDQXpEbkIsRUE4REdILE1BOURILENBOERVLFFBOURWLEVBOERvQjtBQUNoQlosRUFBQUEsSUFBSSxFQUFFLFNBRFU7QUFFaEJlLEVBQUFBLE9BQU8sRUFBRTtBQUZPLENBOURwQixFQWtFR0gsTUFsRUgsQ0FrRVUsYUFsRVYsRUFrRXlCO0FBQ3JCWixFQUFBQSxJQUFJLEVBQUUsU0FEZTtBQUVyQmUsRUFBQUEsT0FBTyxFQUFFO0FBRlksQ0FsRXpCLEVBc0VHSCxNQXRFSCxDQXNFVSxZQXRFVixFQXNFd0I7QUFDcEJaLEVBQUFBLElBQUksRUFBRSxRQURjO0FBRXBCZSxFQUFBQSxPQUFPLEVBQUU7QUFGVyxDQXRFeEIsRUEwRUdILE1BMUVILENBMEVVLFVBMUVWLEVBMEVzQjtBQUNsQlosRUFBQUEsSUFBSSxFQUFFLFFBRFk7QUFFbEJlLEVBQUFBLE9BQU8sRUFBRTtBQUZTLENBMUV0QixFQThFR0gsTUE5RUgsQ0E4RVUsU0E5RVYsRUE4RXFCO0FBQ2pCWixFQUFBQSxJQUFJLEVBQUUsU0FEVztBQUVqQmUsRUFBQUEsT0FBTyxFQUFFO0FBRlEsQ0E5RXJCLENBUHdCLENBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB5YXJncyBmcm9tICd5YXJncydcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuaW1wb3J0IHsgR2VuZXJhdGVPcHRpb25zIH0gZnJvbSAnLi4vZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgaXNGcm9tU3RkaW4gfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBDbGlPcHRpb25zID0gR2VuZXJhdGVPcHRpb25zICYge1xuICBzb3VyY2U6IHN0cmluZ1xuICBzdGRpbjogYm9vbGVhblxuICBhc3Q6IGJvb2xlYW5cbiAgb3V0RGlyOiBzdHJpbmdcbiAgZGVidWc6IGJvb2xlYW5cbiAgc2lsZW50OiBib29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCBvcHRpb25QYXJzZXIgPSB5YXJnc1xuICAubG9jYWxlKCdlbicpXG4gIC5zY3JpcHROYW1lKCd2YWNlbGluZScpXG4gIC5hbGlhcygnaCcsICdoZWxwJylcbiAgLmFsaWFzKCd2JywgJ3ZlcnNpb24nKVxuICAuc3RyaWN0KClcbiAgLnVzYWdlKCckMCBbc291cmNlXScsICdUcmFuc3BpbGUgVkNMJywgKHkpID0+XG4gICAgeVxuICAgICAgLy8gbWV0YSBvcHRpb25zIHN1Y2ggYXMgYGV4YW1wbGVgIGFyZSBjdXJyZW50bHkgbm90XG4gICAgICAvLyB3b3JraW5nIHdoZXJlIHRoZXJlIGlzIG9ubHkgYSBkZWZhdWx0IGNvbW1hbmRcbiAgICAgIC8vIG5lc3RpbmcgZGVmaW5pdGlvbnMgc2VlbXMgd29yayBhcm91bmRcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95YXJncy95YXJncy9pc3N1ZXMvMTMzMVxuICAgICAgLnNob3dIZWxwT25GYWlsKGZhbHNlLCAnU3BlY2lmeSAtLWhlbHAgZm9yIGF2YWlsYWJsZSBvcHRpb25zXFxuJylcbiAgICAgIC5leGFtcGxlKCctICQwIHBhdGgvdG8vZmlsZS52Y2wnLCAnJylcbiAgICAgIC5leGFtcGxlKCctICQwIHBhdGgvdG8vZGlyJywgJycpXG4gICAgICAuZXhhbXBsZSgnLSBjYXQgZmlsZSB8ICQwJywgJycpXG4gICAgICAuZXhhbXBsZSgnLSAkMCBmaWxlIC1kIGRpc3QnLCAnJylcblxuICAgICAgLnBvc2l0aW9uYWwoJ3NvdXJjZScsIHtcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRlc2M6ICdTb3VyY2UgZmlsZS9kaXIgdG8gdHJhbnNwaWxlJyxcbiAgICAgICAgY29lcmNlOiBwYXRoLnJlc29sdmUsXG4gICAgICB9KVxuICAgICAgLmNoZWNrKChvcHRzOiBQYXJ0aWFsPENsaU9wdGlvbnM+KSA9PiB7XG4gICAgICAgIGlmICghaXNGcm9tU3RkaW4pIHtcbiAgICAgICAgICBhc3NlcnQob3B0cy5zb3VyY2UsIG5ldyBFcnJvcignU291cmNlIG11c3QgYmUgcHJlc2VudCcpKVxuICAgICAgICAgIGFzc2VydChcbiAgICAgICAgICAgIGZzLmV4aXN0c1N5bmMob3B0cy5zb3VyY2UgYXMgc3RyaW5nKSxcbiAgICAgICAgICAgIG5ldyBFcnJvcignRmlsZSBub3QgZm91bmQgYXQgJyArIG9wdHMuc291cmNlKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLnNvdXJjZSAmJiBpc0Zyb21TdGRpbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdTb3VyY2UgYW5kIGlucHV0IGZyb20gc3RkaW4gY2Fubm90IGJlIHBhc3NlZCBhdCB0aGUgc2FtZSB0aW1lJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9KVxuICAgICAgLm9wdGlvbignYXN0Jywge1xuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlc2M6ICdPdXRwdXQgYXMgQVNUJyxcbiAgICAgICAgY29lcmNlOiBCb29sZWFuLFxuICAgICAgfSlcbiAgICAgIC5vcHRpb24oJ291dC1kaXInLCB7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBhbGlhczogJ2QnLFxuICAgICAgICBkZXNjOiAnT3V0cHV0IGRpcicsXG4gICAgICAgIGNvZXJjZTogcGF0aC5yZXNvbHZlLFxuICAgICAgICBub3JtYWxpemU6IHRydWUsXG4gICAgICB9KVxuICAgICAgLy8gLm9wdGlvbignbycsIHtcbiAgICAgIC8vICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAvLyAgIGFsaWFzOiAnb3V0LWZpbGUnLFxuICAgICAgLy8gICBkZXNjOiAnT3V0cHV0IEZpbGUnLFxuICAgICAgLy8gICBjb2VyY2U6IHBhdGgucmVzb2x2ZSxcbiAgICAgIC8vIH0pXG4gICAgICAub3B0aW9uKCdzaWxlbnQnLCB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgYWxpYXM6ICdzJyxcbiAgICAgICAgZGVzYzogJ0Rpc2FibGUgYW55IGxvZ2dpbmcnLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCdkZWJ1ZycsIHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZXNjOiAnRW5hYmxlIGRlYnVnIGxvZ2dpbmcnLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCdtaW5pZnknLCB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCduby1jb21tZW50cycsIHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgfSlcbiAgICAgIC5vcHRpb24oJ3ByaW50V2lkdGgnLCB7XG4gICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZWZhdWx0OiA4MCxcbiAgICAgIH0pXG4gICAgICAub3B0aW9uKCd0YWJXaWR0aCcsIHtcbiAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgIGRlZmF1bHQ6IDIsXG4gICAgICB9KVxuICAgICAgLm9wdGlvbigndXNlVGFicycsIHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIH0pXG4gICkgYXMgeWFyZ3MuQXJndjxDbGlPcHRpb25zPlxuIl19

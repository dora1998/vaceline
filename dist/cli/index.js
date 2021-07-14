#! /usr/bin/env node
'use strict'

var _fs = _interopRequireDefault(require('fs'))

var _path = _interopRequireDefault(require('path'))

var stream = _interopRequireWildcard(require('stream'))

var _util = require('util')

var _console = require('console')

var _mkdirp = _interopRequireDefault(require('mkdirp'))

var _debug = _interopRequireDefault(require('debug'))

var _options = require('./options')

var utils = _interopRequireWildcard(require('./utils'))

var _ = require('..')

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function () {
    return cache
  }
  return cache
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const console = new _console.Console(process.stderr, process.stderr) // const pipeline = promisify(stream.pipeline)

const writeFile = _fs.default.promises
  ? _fs.default.promises.writeFile
  : (0, _util.promisify)(_fs.default.writeFile)

function createStream(...strs) {
  const readable = new stream.Readable()
  strs.forEach((str) => readable.push(str))
  readable.push(null)
  return readable
}

async function main(opts) {
  const shouldOutputToFile = !!opts.outDir

  if (opts.debug === true) {
    _debug.default.enable('vaceline:*')

    require('source-map-support').install()
  } else if (typeof opts.debug === 'string') {
    _debug.default.enable(`vaceline:${opts.debug}:*`)

    require('source-map-support').install()
  }

  const inputPaths = utils.isFromStdin
    ? ['/dev/stdin']
    : _fs.default.statSync(opts.source).isDirectory()
    ? utils.readdirr(opts.source)
    : [opts.source]
  const writings = []
  if (shouldOutputToFile && !_fs.default.existsSync(opts.outDir))
    _mkdirp.default.sync(opts.outDir)

  for (const filePath of inputPaths) {
    const readablePath =
      filePath === '/dev/stdin'
        ? 'stdin'
        : _path.default.relative(_path.default.resolve(), filePath)
    if (!opts.silent) console.time(readablePath)
    const output = opts.ast
      ? JSON.stringify(
          (0, _.parse)(_fs.default.readFileSync(filePath, 'utf8')),
          null,
          2
        )
      : (0, _.transformFile)(filePath, opts).code
    if (!opts.silent) console.timeEnd(readablePath)

    if (shouldOutputToFile) {
      const additionalExt = opts.ast ? '.json' : ''
      const outputPath =
        _path.default.join(
          opts.outDir,
          opts.source
            ? _path.default.join(
                opts.source === filePath // input source is a file
                  ? _path.default.basename(filePath) // input source is a directory, keep nested structure
                  : _path.default.relative(opts.source, filePath)
              ) // input is from stdin so we cannot determine the filename
            : 'index.vcl'
        ) + additionalExt
      writings.push(writeFile(outputPath, output))
      continue
    }

    await new Promise((resolve) =>
      createStream(output, '\n').pipe(
        _fs.default
          .createWriteStream('/dev/stdout')
          .addListener('unpipe', () => resolve(undefined))
      )
    )
  }

  await Promise.all(writings)
  if (!opts.silent)
    console.log(`Successfully compiled ${writings.length} files with Vaceline.`)
}

const opts = _options.optionParser.argv

const logError = (err) => opts.silent || console.error(err.stack) // eslint-disable-next-line
// @ts-ignore wrong type info for `process.on` in node/global.d.ts

process.on('unhandledRejection', logError)
process.on('uncaughtException', logError)
main(opts)
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaW5kZXgudHMiXSwibmFtZXMiOlsiY29uc29sZSIsIkNvbnNvbGUiLCJwcm9jZXNzIiwic3RkZXJyIiwid3JpdGVGaWxlIiwiZnMiLCJwcm9taXNlcyIsImNyZWF0ZVN0cmVhbSIsInN0cnMiLCJyZWFkYWJsZSIsInN0cmVhbSIsIlJlYWRhYmxlIiwiZm9yRWFjaCIsInN0ciIsInB1c2giLCJtYWluIiwib3B0cyIsInNob3VsZE91dHB1dFRvRmlsZSIsIm91dERpciIsImRlYnVnIiwiZW5hYmxlIiwicmVxdWlyZSIsImluc3RhbGwiLCJpbnB1dFBhdGhzIiwidXRpbHMiLCJpc0Zyb21TdGRpbiIsInN0YXRTeW5jIiwic291cmNlIiwiaXNEaXJlY3RvcnkiLCJyZWFkZGlyciIsIndyaXRpbmdzIiwiZXhpc3RzU3luYyIsIm1rZGlycCIsInN5bmMiLCJmaWxlUGF0aCIsInJlYWRhYmxlUGF0aCIsInBhdGgiLCJyZWxhdGl2ZSIsInJlc29sdmUiLCJzaWxlbnQiLCJ0aW1lIiwib3V0cHV0IiwiYXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlYWRGaWxlU3luYyIsImNvZGUiLCJ0aW1lRW5kIiwiYWRkaXRpb25hbEV4dCIsIm91dHB1dFBhdGgiLCJqb2luIiwiYmFzZW5hbWUiLCJQcm9taXNlIiwicGlwZSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiYWRkTGlzdGVuZXIiLCJ1bmRlZmluZWQiLCJhbGwiLCJsb2ciLCJsZW5ndGgiLCJvcHRpb25QYXJzZXIiLCJhcmd2IiwibG9nRXJyb3IiLCJlcnIiLCJlcnJvciIsInN0YWNrIiwib24iXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFFQSxNQUFNQSxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosQ0FBWUMsT0FBTyxDQUFDQyxNQUFwQixFQUE0QkQsT0FBTyxDQUFDQyxNQUFwQyxDQUFo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QUtDLFFBQUwsQ0FBY3JCLElBQUksQ0FBQ1csTUFBbkIsRUFBMkJPLFFBQTNCLENBTE4sQ0FESixHQVFJO0FBQ0EsaUJBWE4sSUFZSWMsYUFiTjtBQWVBbEIsTUFBQUEsUUFBUSxDQUFDaEIsSUFBVCxDQUFjVixTQUFTLENBQUM2QyxVQUFELEVBQWFSLE1BQWIsQ0FBdkI7QUFFQTtBQUNEOztBQUVELFVBQU0sSUFBSVcsT0FBSixDQUFhZCxPQUFELElBQ2hCL0IsWUFBWSxDQUFDa0MsTUFBRCxFQUFTLElBQVQsQ0FBWixDQUEyQlksSUFBM0IsQ0FDRWhELFlBQ0dpRCxpQkFESCxDQUNxQixhQURyQixFQUVHQyxXQUZILENBRWUsUUFGZixFQUV5QixNQUFNakIsT0FBTyxDQUFDa0IsU0FBRCxDQUZ0QyxDQURGLENBREksQ0FBTjtBQU9EOztBQUVELFFBQU1KLE9BQU8sQ0FBQ0ssR0FBUixDQUFZM0IsUUFBWixDQUFOO0FBRUEsTUFBSSxDQUFDZCxJQUFJLENBQUN1QixNQUFWLEVBQ0V2QyxPQUFPLENBQUMwRCxHQUFSLENBQWEseUJBQXdCNUIsUUFBUSxDQUFDNkIsTUFBTyx1QkFBckQ7QUFDSDs7QUFFRCxNQUFNM0MsSUFBSSxHQUFHNEMsc0JBQWFDLElBQTFCOztBQUVBLE1BQU1DLFFBQVEsR0FBSUMsR0FBRCxJQUFnQi9DLElBQUksQ0FBQ3VCLE1BQUwsSUFBZXZDLE9BQU8sQ0FBQ2dFLEtBQVIsQ0FBY0QsR0FBRyxDQUFDRSxLQUFsQixDQUFoRCxDLENBQ0E7QUFDQTs7O0FBQ0EvRCxPQUFPLENBQUNnRSxFQUFSLENBQVcsb0JBQVgsRUFBaUNKLFFBQWpDO0FBQ0E1RCxPQUFPLENBQUNnRSxFQUFSLENBQVcsbUJBQVgsRUFBZ0NKLFFBQWhDO0FBRUEvQyxJQUFJLENBQUNDLElBQUQsQ0FBSiIsInNvdXJjZXNDb250ZW50IjpbIiMhIC91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyBzdHJlYW0gZnJvbSAnc3RyZWFtJ1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcbmltcG9ydCB7IENvbnNvbGUgfSBmcm9tICdjb25zb2xlJ1xuXG5pbXBvcnQgbWtkaXJwIGZyb20gJ21rZGlycCdcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1ZydcblxuaW1wb3J0IHsgb3B0aW9uUGFyc2VyLCBDbGlPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscydcblxuaW1wb3J0IHsgcGFyc2UsIHRyYW5zZm9ybUZpbGUgfSBmcm9tICcuLidcblxuY29uc3QgY29uc29sZSA9IG5ldyBDb25zb2xlKHByb2Nlc3Muc3RkZXJyLCBwcm9jZXNzLnN0ZGVycilcblxuLy8gY29uc3QgcGlwZWxpbmUgPSBwcm9taXNpZnkoc3RyZWFtLnBpcGVsaW5lKVxuY29uc3Qgd3JpdGVGaWxlID0gZnMucHJvbWlzZXMgPyBmcy5wcm9taXNlcy53cml0ZUZpbGUgOiBwcm9taXNpZnkoZnMud3JpdGVGaWxlKVxuXG5mdW5jdGlvbiBjcmVhdGVTdHJlYW0oLi4uc3RyczogQXJyYXk8c3RyaW5nPikge1xuICBjb25zdCByZWFkYWJsZSA9IG5ldyBzdHJlYW0uUmVhZGFibGUoKVxuICBzdHJzLmZvckVhY2goKHN0cikgPT4gcmVhZGFibGUucHVzaChzdHIpKVxuICByZWFkYWJsZS5wdXNoKG51bGwpXG5cbiAgcmV0dXJuIHJlYWRhYmxlXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4ob3B0czogQ2xpT3B0aW9ucykge1xuICBjb25zdCBzaG91bGRPdXRwdXRUb0ZpbGUgPSAhIW9wdHMub3V0RGlyXG5cbiAgaWYgKG9wdHMuZGVidWcgPT09IHRydWUpIHtcbiAgICBkZWJ1Zy5lbmFibGUoJ3ZhY2VsaW5lOionKVxuICAgIHJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmRlYnVnID09PSAnc3RyaW5nJykge1xuICAgIGRlYnVnLmVuYWJsZShgdmFjZWxpbmU6JHtvcHRzLmRlYnVnfToqYClcbiAgICByZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcbiAgfVxuXG4gIGNvbnN0IGlucHV0UGF0aHMgPSB1dGlscy5pc0Zyb21TdGRpblxuICAgID8gWycvZGV2L3N0ZGluJ11cbiAgICA6IGZzLnN0YXRTeW5jKG9wdHMuc291cmNlKS5pc0RpcmVjdG9yeSgpXG4gICAgPyB1dGlscy5yZWFkZGlycihvcHRzLnNvdXJjZSlcbiAgICA6IFtvcHRzLnNvdXJjZV1cblxuICBjb25zdCB3cml0aW5nczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXVxuXG4gIGlmIChzaG91bGRPdXRwdXRUb0ZpbGUgJiYgIWZzLmV4aXN0c1N5bmMob3B0cy5vdXREaXIpKVxuICAgIG1rZGlycC5zeW5jKG9wdHMub3V0RGlyKVxuXG4gIGZvciAoY29uc3QgZmlsZVBhdGggb2YgaW5wdXRQYXRocykge1xuICAgIGNvbnN0IHJlYWRhYmxlUGF0aCA9XG4gICAgICBmaWxlUGF0aCA9PT0gJy9kZXYvc3RkaW4nXG4gICAgICAgID8gJ3N0ZGluJ1xuICAgICAgICA6IHBhdGgucmVsYXRpdmUocGF0aC5yZXNvbHZlKCksIGZpbGVQYXRoKVxuXG4gICAgaWYgKCFvcHRzLnNpbGVudCkgY29uc29sZS50aW1lKHJlYWRhYmxlUGF0aClcblxuICAgIGNvbnN0IG91dHB1dCA9IG9wdHMuYXN0XG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHBhcnNlKGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKSksIG51bGwsIDIpXG4gICAgICA6IHRyYW5zZm9ybUZpbGUoZmlsZVBhdGgsIG9wdHMpLmNvZGVcblxuICAgIGlmICghb3B0cy5zaWxlbnQpIGNvbnNvbGUudGltZUVuZChyZWFkYWJsZVBhdGgpXG5cbiAgICBpZiAoc2hvdWxkT3V0cHV0VG9GaWxlKSB7XG4gICAgICBjb25zdCBhZGRpdGlvbmFsRXh0ID0gb3B0cy5hc3QgPyAnLmpzb24nIDogJydcblxuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9XG4gICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICBvcHRzLm91dERpcixcbiAgICAgICAgICBvcHRzLnNvdXJjZVxuICAgICAgICAgICAgPyBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgb3B0cy5zb3VyY2UgPT09IGZpbGVQYXRoXG4gICAgICAgICAgICAgICAgICA/IC8vIGlucHV0IHNvdXJjZSBpcyBhIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5iYXNlbmFtZShmaWxlUGF0aClcbiAgICAgICAgICAgICAgICAgIDogLy8gaW5wdXQgc291cmNlIGlzIGEgZGlyZWN0b3J5LCBrZWVwIG5lc3RlZCBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5yZWxhdGl2ZShvcHRzLnNvdXJjZSwgZmlsZVBhdGgpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogLy8gaW5wdXQgaXMgZnJvbSBzdGRpbiBzbyB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBmaWxlbmFtZVxuICAgICAgICAgICAgICAnaW5kZXgudmNsJ1xuICAgICAgICApICsgYWRkaXRpb25hbEV4dFxuXG4gICAgICB3cml0aW5ncy5wdXNoKHdyaXRlRmlsZShvdXRwdXRQYXRoLCBvdXRwdXQpKVxuXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxuICAgICAgY3JlYXRlU3RyZWFtKG91dHB1dCwgJ1xcbicpLnBpcGUoXG4gICAgICAgIGZzXG4gICAgICAgICAgLmNyZWF0ZVdyaXRlU3RyZWFtKCcvZGV2L3N0ZG91dCcpXG4gICAgICAgICAgLmFkZExpc3RlbmVyKCd1bnBpcGUnLCAoKSA9PiByZXNvbHZlKHVuZGVmaW5lZCkpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwod3JpdGluZ3MpXG5cbiAgaWYgKCFvcHRzLnNpbGVudClcbiAgICBjb25zb2xlLmxvZyhgU3VjY2Vzc2Z1bGx5IGNvbXBpbGVkICR7d3JpdGluZ3MubGVuZ3RofSBmaWxlcyB3aXRoIFZhY2VsaW5lLmApXG59XG5cbmNvbnN0IG9wdHMgPSBvcHRpb25QYXJzZXIuYXJndlxuXG5jb25zdCBsb2dFcnJvciA9IChlcnI6IEVycm9yKSA9PiBvcHRzLnNpbGVudCB8fCBjb25zb2xlLmVycm9yKGVyci5zdGFjaylcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuLy8gQHRzLWlnbm9yZSB3cm9uZyB0eXBlIGluZm8gZm9yIGBwcm9jZXNzLm9uYCBpbiBub2RlL2dsb2JhbC5kLnRzXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBsb2dFcnJvcilcbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgbG9nRXJyb3IpXG5cbm1haW4ob3B0cylcbiJdfQ==

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.NodePath = void 0

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

class NodePath {
  // hub: HubInterface;
  // contexts: Array<TraversalContext>;
  // data: Object;
  // shouldSkip: boolean;
  // shouldStop: boolean;
  // removed: boolean;
  // opts?: Object
  // skipKeys?: Object
  // container?: Object | Array<Object>
  // scope?: Scope;
  // type?: string
  // typeAnnotation?: Object
  constructor(node, context) {
    _defineProperty(this, 'node', void 0)

    _defineProperty(this, 'parent', void 0)

    _defineProperty(this, 'state', void 0)

    _defineProperty(this, 'parentPath', void 0)

    _defineProperty(this, 'context', void 0)

    _defineProperty(this, 'listKey', void 0)

    _defineProperty(this, 'inList', void 0)

    _defineProperty(this, 'parentKey', void 0)

    _defineProperty(this, 'key', void 0)

    this.node = node
    this.parent = context.parent
    this.parentPath = context.parentPath
    this.inList = context.inList
    this.key = context.key
    this.state = context.state
  } // getSibling(key: number) {
  //   if (this.inList) return this.parentPath.nodes
  // }
  // TODO:
  // Manipulation
  // replaceWith() {}
  // replaceWithMultiple() {}
  // insertBefore() {}
  // insertAfter() {}
  // remove() {}
}

exports.NodePath = NodePath
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmF2ZXJzZXIvcGF0aC50cyJdLCJuYW1lcyI6WyJOb2RlUGF0aCIsImNvbnN0cnVjdG9yIiwibm9kZSIsImNvbnRleHQiLCJwYXJlbnQiLCJwYXJlbnRQYXRoIiwiaW5MaXN0Iiwia2V5Iiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWNPLE1BQU1BLFFBQU4sQ0FBa0U7QUFJdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBS0E7QUFDQTtBQUNBO0FBRUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFVQyxPQUFWLEVBQXFDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQzlDLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUVBLFNBQUtFLE1BQUwsR0FBY0QsT0FBTyxDQUFDQyxNQUF0QjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JGLE9BQU8sQ0FBQ0UsVUFBMUI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILE9BQU8sQ0FBQ0csTUFBdEI7QUFDQSxTQUFLQyxHQUFMLEdBQVdKLE9BQU8sQ0FBQ0ksR0FBbkI7QUFFQSxTQUFLQyxLQUFMLEdBQWFMLE9BQU8sQ0FBQ0ssS0FBckI7QUFDRCxHQWpDc0UsQ0FtQ3ZFO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUE3Q3VFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL25vZGVzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZXIge1xuICBlbnRyeT8ocGF0aDogTm9kZVBhdGg8Tm9kZT4pOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhdmVyc2FsQ29udGV4dCB7XG4gIHBhcmVudDogTm9kZSB8IG51bGxcbiAgcGFyZW50UGF0aDogTm9kZVBhdGg8Tm9kZT4gfCBudWxsXG4gIGluTGlzdDogYm9vbGVhblxuICBrZXk/OiBudW1iZXJcbiAgc3RhdGU6IHVua25vd25cbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVQYXRoPFQgZXh0ZW5kcyBOb2RlID0gTm9kZT4gaW1wbGVtZW50cyBUcmF2ZXJzYWxDb250ZXh0IHtcbiAgbm9kZTogVFxuXG4gIHBhcmVudDogTm9kZSB8IG51bGxcbiAgLy8gaHViOiBIdWJJbnRlcmZhY2U7XG4gIC8vIGNvbnRleHRzOiBBcnJheTxUcmF2ZXJzYWxDb250ZXh0PjtcbiAgLy8gZGF0YTogT2JqZWN0O1xuICAvLyBzaG91bGRTa2lwOiBib29sZWFuO1xuICAvLyBzaG91bGRTdG9wOiBib29sZWFuO1xuICAvLyByZW1vdmVkOiBib29sZWFuO1xuICBzdGF0ZSE6IHVua25vd25cbiAgLy8gb3B0cz86IE9iamVjdFxuICAvLyBza2lwS2V5cz86IE9iamVjdFxuICBwYXJlbnRQYXRoITogTm9kZVBhdGg8Tm9kZT4gfCBudWxsXG4gIGNvbnRleHQhOiBUcmF2ZXJzYWxDb250ZXh0XG4gIC8vIGNvbnRhaW5lcj86IE9iamVjdCB8IEFycmF5PE9iamVjdD5cbiAgbGlzdEtleT86IHN0cmluZ1xuICBpbkxpc3Q6IGJvb2xlYW5cbiAgcGFyZW50S2V5Pzogc3RyaW5nXG4gIGtleT86IG51bWJlclxuICAvLyBzY29wZT86IFNjb3BlO1xuICAvLyB0eXBlPzogc3RyaW5nXG4gIC8vIHR5cGVBbm5vdGF0aW9uPzogT2JqZWN0XG5cbiAgY29uc3RydWN0b3Iobm9kZTogVCwgY29udGV4dDogVHJhdmVyc2FsQ29udGV4dCkge1xuICAgIHRoaXMubm9kZSA9IG5vZGVcblxuICAgIHRoaXMucGFyZW50ID0gY29udGV4dC5wYXJlbnRcbiAgICB0aGlzLnBhcmVudFBhdGggPSBjb250ZXh0LnBhcmVudFBhdGhcbiAgICB0aGlzLmluTGlzdCA9IGNvbnRleHQuaW5MaXN0XG4gICAgdGhpcy5rZXkgPSBjb250ZXh0LmtleVxuXG4gICAgdGhpcy5zdGF0ZSA9IGNvbnRleHQuc3RhdGVcbiAgfVxuXG4gIC8vIGdldFNpYmxpbmcoa2V5OiBudW1iZXIpIHtcbiAgLy8gICBpZiAodGhpcy5pbkxpc3QpIHJldHVybiB0aGlzLnBhcmVudFBhdGgubm9kZXNcbiAgLy8gfVxuXG4gIC8vIFRPRE86XG4gIC8vIE1hbmlwdWxhdGlvblxuICAvLyByZXBsYWNlV2l0aCgpIHt9XG4gIC8vIHJlcGxhY2VXaXRoTXVsdGlwbGUoKSB7fVxuICAvLyBpbnNlcnRCZWZvcmUoKSB7fVxuICAvLyBpbnNlcnRBZnRlcigpIHt9XG4gIC8vIHJlbW92ZSgpIHt9XG59XG4iXX0=

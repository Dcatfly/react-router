//这个包该更新了。。最新版本已经3.0了这个还是1.7 api已经不一样了
import pathToRegexp from "path-to-regexp";

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  //pathToRegexp.compile的作用是通过指定的path规则生成函数用来生成真正的path
  const generator = pathToRegexp.compile(path);
  //这里做了缓存 但是没有清缓存的操作
  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
function generatePath(path = "/", params = {}) {
  // 看起来pretty参数似乎代表着不转义。
  // var toPath = pathToRegexp.compile('/user/:id')
  // toPath({ id: ':' }, { pretty: true }) //=> "/user/:"
  return path === "/" ? path : compilePath(path)(params, { pretty: true });
}

export default generatePath;

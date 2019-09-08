import React from "react";
import PropTypes from "prop-types";
import { createLocation, createPath } from "history";
import invariant from "tiny-invariant";
import warning from "tiny-warning";

import Router from "./Router";

function addLeadingSlash(path) {
  // 实际上文档上说了正确的basename应该是以/开头的。
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname
  };
}

function stripBasename(basename, location) {
  if (!basename) return location;

  const base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return {
    ...location,
    pathname: location.pathname.substr(base.length)
  };
}

function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}

function staticHandler(methodName) {
  return () => {
    invariant(false, "You cannot %s with <StaticRouter>", methodName);
  };
}

function noop() {}

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 * 主要用于ssr和test，不能真正改变location，只是在context中做记录。
 */
class StaticRouter extends React.Component {
  navigateTo(location, action) {
    const { basename = "", context = {} } = this.props;
    context.action = action;
    context.location = addBasename(basename, createLocation(location));
    context.url = createURL(context.location);
  }

  handlePush = location => this.navigateTo(location, "PUSH");
  handleReplace = location => this.navigateTo(location, "REPLACE");
  handleListen = () => noop;
  handleBlock = () => noop;

  render() {
    const { basename = "", context = {}, location = "/", ...rest } = this.props;

    // 这里模拟了一个history的对象结构
    const history = {
      createHref: path => addLeadingSlash(basename + createURL(path)),
      action: "POP",
      location: stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return <Router {...rest} history={history} staticContext={context} />;
  }
}

if (__DEV__) {
  StaticRouter.propTypes = {
    basename: PropTypes.string,
    context: PropTypes.object,
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  StaticRouter.prototype.componentDidMount = function() {
    warning(
      !this.props.history,
      "<StaticRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { StaticRouter as Router }`."
    );
  };
}

export default StaticRouter;

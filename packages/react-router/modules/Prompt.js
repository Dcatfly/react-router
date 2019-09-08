import React from "react";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";

import Lifecycle from "./Lifecycle";
import RouterContext from "./RouterContext";

/**
 * The public API for prompting the user before navigating away from a screen.
 * 用来做跳转提醒
 */
function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {context => {
        invariant(context, "You should not use <Prompt> outside a <Router>");

        if (!when || context.staticContext) return null;

        // 看起来history中存在了block方法可以做prompt
        const method = context.history.block;

        // message传给Lifecycle干嘛。。
        return (
          <Lifecycle
            onMount={self => {
              self.release = method(message);
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                self.release();
                self.release = method(message);
              }
            }}
            onUnmount={self => {
              self.release();
            }}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

if (__DEV__) {
  const messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

  Prompt.propTypes = {
    when: PropTypes.bool,
    message: messageType.isRequired
  };
}

export default Prompt;

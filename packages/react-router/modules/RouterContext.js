// TODO: Replace with React.createContext once we can assume React 16+
//一个针对于新版context的Polyfill 应该是由于发布了v5.0并且与v4兼容需要的
import createContext from "mini-create-react-context";

const createNamedContext = name => {
  const context = createContext();
  context.displayName = name;

  return context;
};

const context = /*#__PURE__*/ createNamedContext("Router");
export default context;

//因为react-router不止支持web，还支持rn，所以有了分包，react-router是基础包
//react-router中包括：MemoryRouter Prompt Redirect Route Router StaticRouter Switch generatePath matchPath withRouter __RouterContext
export * from "react-router";

export { default as BrowserRouter } from "./BrowserRouter";
export { default as HashRouter } from "./HashRouter";
export { default as Link } from "./Link";
export { default as NavLink } from "./NavLink";

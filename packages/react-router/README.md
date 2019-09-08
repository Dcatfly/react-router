# react-router

Declarative routing for [React](https://facebook.github.io/react).

## Code Review

初看有点乱，因为目录中存在三个地方看起来都存在源码。实际上根目录中的文件和`es/*`下面的文件都是废弃的引用方式。根据`rollup.config.js`可以发现实际入口在`modules`下。

- [x] [generatePath.js](./modules/generatePath.js)
- [x] [Lifecycle.js](./modules/Lifecycle.js)
- [x] [matchPath.js](./modules/matchPath.js)
- [x] [MemoryRouter.js](./modules/MemoryRouter.js)
- [x] [Prompt.js](./modules/Prompt.js)
- [x] [Redirect.js](./modules/Redirect.js)
- [x] [Route.js](./modules/Route.js)
- [x] [Router.js](./modules/Router.js)
- [x] [RouterContext.js](./modules/RouterContext.js)
- [x] [StaticRouter.js](./modules/)
- [x] [Switch.js](./modules/Switch.js)
- [x] [withRouter.js](./modules/withRouter.js)

## Credits

React Router is built and maintained by [React Training](https://reacttraining.com).

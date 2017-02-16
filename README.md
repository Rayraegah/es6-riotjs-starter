# riot-starter

> Webpack2 tooling for building SPA / PWA / offline front-end apps with [Riot](https://riotjs.com) :fire:

Using `riot-starter` will kickstart your next application! :100: It is designed to fit the "90% use-case" for those who want to build offline-first web apps (see [features](#features) below).

> :triangular_flag_on_post: **Important:** This is meant for _client-side_ apps only; there is **no support** included for universal / server-side rendering.

## Features

* Offline Caching (via `serviceWorker`)
* LESS & Autoprefixer
* Asset Versioning (aka "cache-busting")
* ES2015 (ES6) and ES2016 (ES7) support
* Webpack Bundle Analysis (see [dashboard](#dashboard))
* Hot Module Replacement (HMR) for all files
* [Lighthouse](https://github.com/GoogleChrome/lighthouse) certified

## Install

```sh
npm install
npm run watch
```

> :exclamation: **Pro Tip:** Use [Yarn](https://yarnpkg.com/) to install dependencies 3x faster than NPM!

## Development

### Commands

Any of the following commands can (and should :wink:) be run from the command line.

> If using [Yarn](https://yarnpkg.com/), all instances of `npm` can be replaced with `yarn`. :ok_hand:

#### build

```
$ npm run build
```

Compiles all files. Output is sent to the `dist` directory.

#### start

```
$ npm start
```

Runs your application (from the `dist` directory) in the browser.

#### watch

```
$ npm run watch
```

Like [`start`](#start), but will auto-compile & auto-reload the server after any file changes within the `src` directory.

### Dashboard

With [`webpack-dashboard`](https://github.com/FormidableLabs/webpack-dashboard), it's much easier to see what's happening inside your bundles. In addition to de-cluttering your `webpack-dev-server` log, you can quickly make sense of your bundles' `import`s and sizes.

![dashboard](src/static/img/dev-dash.jpg)

The dashboard is meant to be interactive (scrollable). If you are having issues, please see the author's note:

> ***OS X Terminal.app users:*** Make sure that **View → Allow Mouse Reporting** is enabled, otherwise scrolling through logs and modules won't work. If your version of Terminal.app doesn't have this feature, you may want to check out an alternative such as [iTerm2](https://www.iterm2.com/index.html).

## License

MIT © [Severan Rye](https://rayraegah.github.io)

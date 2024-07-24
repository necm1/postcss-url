# PostCSS URL (Optimized)

This project is an optimized version of the original [postcss-url](https://github.com/postcss/postcss-url) plugin. The original code was outdated, so updates have been made to improve performance, readability, and maintainability. This version provides the same core functionalities as the original but has been modernized to keep up with current best practices and technologies.

## Changes and Improvements

- Improved performance with asynchronous processing
- Enhanced readability and maintainability with modern TypeScript
- Simplified and flexible configuration options
- Support for dynamic imports and better handling of URL transformations

## Installation

```console
$ npm install postcss @necm1/postcss-url
```

## Basic Example - Rebase

```typescript
// dependencies
import fs from 'fs';
import postcss from 'postcss';
import url from '@necm1/postcss-url';

// css to be processed
const css = fs.readFileSync('input.css', 'utf8');

// process css
postcss()
  .use(
    url({
      url: 'rebase',
    }),
  )
  .process(css, {
    from: 'src/stylesheet/index.css',
    to: 'dist/index.css',
  })
  .then((result) => {
    console.log(result.css);
  });
```

### Before:

```css
.element {
  background: url('images/sprite.png');
}
```

### After:

```css
.element {
  /* rebasing path by new destination */
  background: url('../src/stylesheet/images/sprite.png');
}
```

## Inline

```typescript
// postcss-url options
const options = {
  url: 'inline',
  basePath: 'src/stylesheet',
};

postcss()
  .use(url(options))
  .process(css, {
    from: 'src/stylesheet/index.css',
    to: 'dist/index.css',
  })
  .then((result) => {
    console.log(result.css);
  });
```

### Before:

```css
.element {
  background: url('/images/sprite.png');
  filter: url('/images/circle.svg');
}
```

### After:

```css
.element {
  /* inlined png as base64 */
  background: url('data:image/png;base64,R0lGODlhAQABAJH/AP///wAAAP///wAAACH/C0FET0JFOklSMS4');
  /* inlined svg as encodeURIComponent */
  filter: url('data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E');
}
```

## Copy

```typescript
// postcss-url options
const options = {
  url: 'copy',
  basePath: 'node_modules/bootstrap',
  assetsPath: 'dist/img',
  useHash: true,
  filterExtensions: ['.png', '.jpg', '.gif'],
};

postcss()
  .use(url(options))
  .process(css, {
    from: 'src/stylesheet/index.css',
    to: 'dist/index.css',
  })
  .then((result) => {
    console.log(result.css);
  });
```

### Before:

```css
.element {
  background: url('/images/sprite.png');
}
```

### After:

```css
.element {
  /* copy 'sprite.png' from 'node_modules/bootstrap/images/' to 'dist/img/' */
  /* and rename it by hash function */
  background: url('img/a2ds3kfu.png');
}
```

## Multiple Options

By default, the first matched option is processed. Use `multi: true` in `custom` to process with other options.

```typescript
const options = [
  { filterExtensions: ['.png'], url: 'copy', assetsPath: 'img', useHash: true },
  { filterExtensions: ['.svg'], url: 'inline' },
  { filterExtensions: ['.gif'], url: 'rebase' },
  // using custom function to build url
  { customUrl: (asset) => `https://cdn.url/${asset.url}` },
];

postcss()
  .use(url(options))
  .process(css, {
    from: 'src/stylesheet/index.css',
    to: 'dist/index.css',
  })
  .then((result) => {
    console.log(result.css);
  });
```

## Notes

This version of the plugin is based on the original available at [postcss-url](https://github.com/postcss/postcss-url). Visit the original repository for more information and historical context.

---

By optimizing the original code, we have achieved significant improvements in performance and readability. This version is now better suited to modern requirements and provides a reliable solution for processing URLs in CSS files.

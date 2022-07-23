---
nav:
  path: /plugins
  order: 2
group:
  path: /rollup
  title: rollup
---

# rollup-plugin-generate-style

A rollup plugin, mainly used to generate automatic import js file generation of `css`, `less` and `sass`.

Born for [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)~

## Usage

```bash
$ npm i @montagejs/rollup-plugin-generate-style --save-dev
```

```ts
import gStyle from '@montagejs/rollup-plugin-generate-style';

export default {
    plugins: [
        gStyle()
    ]
}

```

As shown below, we can see that an `index.js` file is generated in the `style` directory, which will automatically import `index.css` to serve `babel-plugin-import`.

```
.
📦package-xxx
    ┣ 📂es
    ┣  ┗ 📂style
    ┃     ┗ 📜index.css
    ┣  ┗ 📜index.js
    ┣ 📂lib
    ┃  ┗ 📂style
    ┃     ┗ 📜index.css
    ┃  ┗ 📜index.js
    ┣ 📂node_modules
    ┣ 📂src
    ┃  ┗ 📜index.tsx
    ┃  ┗ 📜index.less
    ┣ 📜.gitignore
    ┗ 📜package.json
    
          ↓ ↓ ↓ ↓ ↓ ↓

.
📦package-xxx
    ┣ 📂es
    ┣  ┗ 📂style
    ┃     ┗ 📜index.css
    ┃     ┗ 📜index.js（`import './index.css'`）
    ┣  ┗ 📜index.js
    ┣ 📂lib
    ┃  ┗ 📂style
    ┃     ┗ 📜index.css
    ┃     ┗ 📜index.js（`import './index.css'`）
    ┃  ┗ 📜index.js
    ┣ 📂node_modules
    ┣ 📂src
    ┃  ┗ 📜index.tsx
    ┃  ┗ 📜index.less
    ┣ 📜.gitignore
    ┗ 📜package.json
```



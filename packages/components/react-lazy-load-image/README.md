# React-Lazy-Load-Image

`react` image lazy loading component with built-in image preloading capabilities.

## Usage

```bash
$ npm i @montagejs/react-lazy-load-image --save
```

```tsx
import { FC } from 'react';
import ReactLazyLoadImage, { ReactLazyLoadImageProvider } from '@montagejs/react-lazy-load-image';

const ReactLazyLoadImageDemo: FC = () => {

    return (
        <ReactLazyLoadImageProvider
            getPopupContainer={() => document.querySelector('.img-container')}
        >
            <div className="img-container" >
                <ReactLazyLoadImage
                    src={
                        'xxxx'
                    }
                />
            </div>
        </ReactLazyLoadImageProvider>
    );
};

export default ReactLazyLoadImageDemo;

```

## API

Main parameter configuration：

**`ReactLazyLoadImageProvider`**

| props               | desc                                           | type                                    | default                          | version  |
|---------------------|------------------------------------------------|-----------------------------------------|----------------------------------|----------|
| `getPopupContainer` | A container that listens to viewport scrolling | `() => HTMLElement`                     | `() => document.documentContent` | `>0.0.4` |
| `preload`           | Whether to enable preloading                   | `boolean            ｜ { src: string; }` | `false`                          | `>0.0.4` |
| `disabledLoading`   | Whether to disable native `loading`            | `boolean        `                       | `false`                          | `>0.0.4` |

**`ReactLazyLoadImage`**

`Props` is consistent with native `img`.

---
nav:
  path: /components
group:
  path: /mit
  title: MIT
order: 2
---

# React-Lazy-Load-Image

`react` 图片懒加载组件，内置图片预加载能力。

## Usage

```bash
$ npm i @montagejs/react-lazy-load-image --save
```

## 代码演示

#### 基本使用

借助浏览器原生 `img` 标签 的 `loading` 能力实现懒加载。

<code src="./demo/index.tsx"></code>

#### 开启预加载

在懒加载过程中使用预加载占位。

<code src="./demo/preload-demo.tsx"></code>

#### 优雅降级

在不支持 `loading` 属性或者使用方主动关闭 `loading` 能力时，启用优雅降级方案。

<code src="./demo/sub-level-demo.tsx"></code>

## API

主要参数配置：

**`ReactLazyLoadImageProvider`**

| 参数                  | 说明               | 类型                                      | 默认值                              | 版本       |
|---------------------|------------------|-----------------------------------------|----------------------------------|----------|
| `getPopupContainer` | 监听视口滚动的容器        | `() => HTMLElement`                     | `() => document.documentContent` | `>0.0.4` |
| `preload`           | 是否开启预加载          | `boolean            ｜ { src: string; }` | `false`                          | `>0.0.4` |
| `disabledLoading`   | 是否禁用原生 `loading` | `boolean        `                       | `false`                          | `>0.0.4` |

**`ReactLazyLoadImage`**

`Props` 与 原生 `img` 保持一致。

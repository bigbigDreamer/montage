# @montagejs/pangu

`PanGu`（盘古），有开天辟地之意。

## Design brain map

![](https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/PanGu.png)

## Milestone

- [x] Lazy Load Route
- [x] Auto SetUp Page Title
- [x] AOP Plugin
  - [x] Inner Plugin With forRoutes
- [x] HOC
- [x] Hooks
  - [x] useRouter
  - [x] useQuery
- [x] Preload Route Source
  - [x] Plugin IOC
  - [ ] Provider 
    - [ ] `useProvider` consume 
- [ ] Keep-Alive Router
- [ ] PanGuFC

## Install

```bash
$ npm i @montagejs/pangu
```

## Usage

```ts
import PanGu from "@montagejs/pangu";

const app = new PanGu({
    routes: [],
    mode: 'history'
})

app.start();
```

## Inspiration Warehouse

- [react-launcher](https://github.com/myNameIsDu/react-launcher)


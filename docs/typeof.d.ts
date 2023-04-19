/// <reference types="less" />
declare module '*.module.less' {
  const less: {
    readonly [key: string]: string
  }
  export default less
}
/// <reference types="css" />
declare module '*.module.css' {
  const css: {
    readonly [key: string]: string
  }
  export default css
}
/// <reference types="vue" />
declare module '*.vue' {
  const vue: {
    readonly [key: string]: string
  }
  export default vue
}
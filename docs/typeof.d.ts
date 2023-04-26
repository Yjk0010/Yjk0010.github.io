/// <reference types="scss" />
declare module '*.module.scss' {
  const scss: {
    readonly [key: string]: string
  }
  export default scss
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
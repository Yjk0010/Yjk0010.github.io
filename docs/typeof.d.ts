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
/// <reference types="jpg" />
declare module '*.jpg' {
  const jpg: {
    readonly [key: string]: string
  }
  export default jpg
}
/// <reference types="png" />
declare module '*.png' {
  const png: {
    readonly [key: string]: string
  }
  export default png
}
/// <reference types="gif" />
declare module '*.gif' {
  const gif: {
    readonly [key: string]: string
  }
  export default gif
}
/// <reference types="quantize" />
declare module 'quantize'

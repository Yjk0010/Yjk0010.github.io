// 在一个 .d.ts 文件中
declare global {
  interface Document {
    startViewTransition(callback: () => Promise<void>): any;
  }
}
export { };
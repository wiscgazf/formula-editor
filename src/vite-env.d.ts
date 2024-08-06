/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window{
  MathJax: any;
  MathQuill: any;
  Vue: any;
}

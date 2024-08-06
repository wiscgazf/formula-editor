import type {App} from 'vue'
import FormulaEditor from './components/FormulaEditor'
import ZfButton from './components/Button'

const components = [FormulaEditor, ZfButton]

// 定义 install 方法
const install = function (app: App) {
  components.forEach(component => {
    app.component(component.name || component.__name as string, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {FormulaEditor, ZfButton}

export default {
  install
}

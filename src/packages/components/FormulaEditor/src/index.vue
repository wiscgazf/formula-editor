<script setup lang="ts">
import {defineOptions, ref, onMounted, nextTick, computed} from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HighlightLatex from '../mathquill/highlight'

defineOptions({
  name: 'FormulaEditor',
})

const fontsList = [
  {
    text: 'ABC 常规',
    latex: 'mathrm',
    id: '1',
  },
  {
    text: 'ABC 斜体',
    latex: 'mathit',
    id: '2',
  },
  {
    text: 'ABC 加粗',
    latex: 'mathbf',
    id: '3',
  },
  {
    text: 'ABC 斜粗',
    latex: 'boldsymbol',
    id: '4',
  },
  {
    text: 'ABC 下划线',
    latex: 'underline',
    id: '5',
  },
]

// 是否初次加载
const firstSta = ref<boolean>(true)

// 是否是latex输入
const isLatex = ref<boolean>(false)

// latex 内容 (添加默认颜色初始化后清空，防止首次更改字体颜色出现回显原始内容)
const latexVal = ref<string>('\\color{#333333}')

// latex El
const latexEl = ref<HTMLDivElement | null>(null)

// mathquill Ins
const mathQuillIns = ref<any>(null)

// mathquill El
const mathQuillEl = ref(null)

// 高亮latex Ins
const highLightIns = ref<InstanceType<typeof HighlightLatex>>(null)

// 颜色
const latexColor = ref<string>('#333333')

// 选中的文本
const selectText = ref<string>('')

// mathjax 预览指令
const vMathjax = {
  created: (el: HTMLDivElement) => {
    initFormulaPreview(el)
  },
  updated: (el: HTMLDivElement) => {
    initFormulaPreview(el)
  },
}

// mathjax预览添加 array模式
const calcLatexVal = computed<string>(() => {
  if (window.MathJax) {
    return `$$\\begin{array}{l}${latexVal.value || ''}\\end{array}$$`
  }
  return ''
})

onMounted(() => {
  const modules = import.meta.glob('../mathquill/mathquill.js')
  for (const path in modules) {
    modules[path]().then(() => {
      console.log('init formula.js completed!')
      initFormulaEditor()
    })
  }
})

// 初始化 mathquil 编辑器
const initFormulaEditor = () => {
  mathQuillIns.value = window.MathQuill.getInterface(2).MathField(
    mathQuillEl.value,
    {
      handlers: {
        edit: () => {
          latexVal.value = mathQuillIns.value?.latex()
        },
      },
    },
  )
  mathQuillIns.value?.latex(latexVal.value)
  mathQuillIns.value?.focus()
  mathquillKeydown()
  mathquillMouseUp()
}

// 检测mathquill键盘按下
const mathquillKeydown = () => {
  mathQuillIns.value?.__controller.container.on('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey) {
      mathQuillIns.value?.write('\\\\')
    }
  })
}

// 检测mathquill鼠标松开
const mathquillMouseUp = () => {
  mathQuillIns.value?.__controller.container.on('mouseup', () => {
    const selection = mathQuillIns.value?.__controller.cursor.selection
    if (selection) {
      selectText.value = extractColorText(selection.join('latex'))
    }
  })
}

// 颜色changge
const colorChange = () => {
  let n = selectText.value
  let L = ''
  let C = ''
  if (!n) {
    return
  }
  L = extractColorText(latexColor.value)
  C = x(n, 'color')
  mathQuillIns.value?.write(`\\color{${L}}{${C}}`)
  mathQuillIns.value?.__controller.selectLeft()
}

// 设置字体
const settingFont = (L: string) => {
  let n = selectText.value
  if (!n) {
    return
  }
  let e = x(n, 'weight')
  mathQuillIns.value?.write(`\\${L}{${e}}`)
  mathQuillIns.value?.__controller.selectLeft()
}

// 获取需要替换的color hex
const extractColorText = (L: string) => {
  let n = L,
    e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (/^(rgb|RGB)/.test(n)) {
    for (
      var o = n.replace(/(?:\(|\)|rgba|RGBA|rgb|RGB)*/g, '').split(','),
        i = '#',
        r = 0;
      r < o.length;
      r++
    ) {
      let L = Number(o[r]).toString(16)
      3 === r
        ? ((L = Math.round(255 * Number(o[r])).toString(16)),
        (L = 1 === L.length ? '0' + L : L))
        : L.length < 2 && (L = '0' + L),
      (i += L)
    }
    return 7 !== i.length && 9 !== i.length && (i = n), i
  }
  if (e.test(n)) {
    let t = n.replace(/#/, '').split('')
    if (6 === t.length) return n
    if (3 === t.length) {
      let l = '#'
      for (let L = 0; L < t.length; L += 1) l += t[L] + t[L]
      return l
    }
  }
  return n
}

const x = (L: string, n: string) => {
  let e
  'color' == n
    ? (e = /(\\color\{[^{}]*\})/g)
    : 'weight' == n &&
      (e = /(\\boldsymbol|\\mathrm|\\mathbf\\mathit\\underline)/g)
  const o = L.match(e as RegExp)
  return (
    null === o ||
      void 0 === o ||
      o.forEach((n) => {
        let e = L.split(n)[1],
          o = 0
        if ('{' == e.charAt(0))
          for (let i = 0; i < e.length; i++)
            if (
              ('{' == e.charAt(i) ? o++ : '}' == e.charAt(i) && o--, 0 == o)
            ) {
              let o = e.substring(0, i + 1);
              (e = e.substring(1, i)), (L = L.replace(n + o, e))
              break
            }
      }),
    L
  )
}

// 初始化公式预览
const initFormulaPreview = (dom: HTMLDivElement) => {
  if (firstSta.value) {
    dom.style.color = 'transparent'
  }
  nextTick(() => {
    window.MathJax.startup.promise.then(() => {
      window.MathJax.typesetPromise([dom]).then(() => {
        if (firstSta.value) {
          dom.style.color = 'inherit'
          firstSta.value = false
        }
      })
    })
  })
}

// 切换编辑器类型
const changeEditType = (isLatex: boolean) => {
  nextTick(() => {
    if (isLatex) {
      latexVal.value = mathQuillIns.value?.latex()
      mathQuillIns.value = null
      latexEl.value?.focus()
      highLightIns.value = new HighlightLatex(
        '.latex-el .el-textarea__inner',
        '#latex-cover',
      )
    } else {
      latexEl.value = null
      initFormulaEditor()
    }
  })
}

// latex change
const latexChange = () => {
  highLightIns.value?.textareaToDiv()
}
</script>

<template>
  <div class="formula-main">
    <div class="input-main">
      <div class="input-tool">
        <div class="tool-item fx">
          <img class="color" src="../img/color.png" alt=""/>
          <span class="title">颜色</span>
          <img class="arrow-down" src="../img/arrow-down.png" alt=""/>
          <input type="color" @input="colorChange" v-model="latexColor"/>
        </div>
        <el-popover
            placement="bottom-start"
            trigger="click"
            :show-arrow="false"
            title=""
            :offset="0"
            :width="100"
            popper-class="font-popover"
        >
          <template #reference>
            <div class="tool-item">
              <img class="font-icon" src="../img/font.png" alt=""/>
              <span class="title">字体</span>
            </div>
          </template>
          <template v-slot:content>
            <div
                :class="['font-item', 'font' + item.id]"
                v-for="item in fontsList"
                :key="item.id"
                @click="settingFont(item.latex)"
            >
              {{ item.text }}
            </div>
          </template>
        </el-popover>
        <el-switch
            v-model="isLatex"
            class="mr-a"
            active-text="Latex"
            @change="changeEditType"
        />
      </div>
      <div class="input-area">
        <div class="input-ui" v-if="!isLatex">
          <div id="quill-el" ref="mathQuillEl"></div>
        </div>
        <div class="input-latex" v-else>
          <el-input
              ref="latexEl"
              class="latex-el"
              v-model="latexVal"
              type="textarea"
              show-word-limit
              maxlength="1000"
              :autosize="false"
              @input="latexChange"
              placeholder="请输入有效的Latex公式"
          />
          <div id="latex-cover"></div>
        </div>
      </div>
    </div>
    <div class="preview-footer">
      <div class="preview-title">预览公式</div>
      <div class="latex-viewer" v-mathjax v-text="calcLatexVal"></div>
    </div>
  </div>
</template>

<style lang="css">
@import "../mathquill/mathquill.css";

.font-popover {
  .font-item {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    padding: 0 8px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;

    &.font2 {
      font-family: italic;
    }

    &.font3 {
      font-weight: bold;
    }

    &.font4 {
      font-weight: bold;
      font-family: italic;
    }

    &.font5 {
      text-decoration: underline;
    }

    &:hover {
      background: #ebecf0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="less" scoped>
@import "./index.less";
</style>

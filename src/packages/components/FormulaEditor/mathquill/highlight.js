class HighlightLatex {
  constructor(inputEl, coverEl) {
    if (!inputEl || !coverEl) {
      throw Error('Latex输入框、覆盖内容输入框必填')
      return
    }
    this.inputEl = document.querySelector(`${inputEl}`)
    this.coverEl = document.querySelector(`${coverEl}`)
    this.init()
  }

  init() {
    this.inputEl.addEventListener('scroll', () => {
      this.asyncScroll()
    })
    this.textareaToDiv()
  }

  textareaToDiv() {
    let temp = this.inputEl.value
    temp = temp
      // .replace(/\n$/g, '_65a5ba9e52a3761bd68eb531e9794ae12c1d34c167f071a6b239c855b5cf57b2') //最后一个换行符
      // .replace(/\n/g, '_dafd41284316e72de3a0b07bd1262cd142151708353024244238eec3699e22ae') //普通换行符
      // .replace(/\s/g, '_e613de3e0d3b707ade3d6a289abbab35c67d4476dc12211865d70a493d7e144c') //空格
      .replace(
        /(\+|-|\*|\/|=|>|<|!|\^|\(|\)|%)/g,
        '<span style="color: SeaGreen;" class="hl">$1</span>',
      ) // 符号
      .replace(/(\\{2})/g, '<span style="color: orange;" class="hl">$1</span>') // 双斜杠
      .replace(
        /(\\[a-zA-Z]+)/g,
        '<span style="color: #008de9;" class="hl">$1</span>',
      ) // 字母
      .replace(
        /<span style="color: #008de9;" class="hl">(\\begin|\\end)<\/span>/g,
        '<span style="color:orange;" class="hl">$1</span>',
      ) // 分组标记
      .replace(/([{}])/g, '<span style="color: #608b4e;" class="hl">$1</span>')
      .replace(
        /(\\\s{1})/g,
        '<span style="color: greenyellow;background-color: transparent" class="hl">\\ </span>',
      )
    // .replace(/_dafd41284316e72de3a0b07bd1262cd142151708353024244238eec3699e22ae/g, '<br>')
    // .replace(/_e613de3e0d3b707ade3d6a289abbab35c67d4476dc12211865d70a493d7e144c/g, '&nbsp;')
    // .replace(/_65a5ba9e52a3761bd68eb531e9794ae12c1d34c167f071a6b239c855b5cf57b2/g, '<br><span style=\'color:rgba(0,0,0,0);\'>_</span>')
    this.coverEl.innerHTML = temp
    this.asyncScroll()
  }

  asyncScroll() {
    this.coverEl.scrollLeft = this.inputEl.scrollLeft
    this.coverEl.scrollTop = this.inputEl.scrollTop
  }
}

export default HighlightLatex

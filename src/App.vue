<script setup lang="ts">
import FormulaEditor from './packages/components/FormulaEditor/src/index.vue'
import {ComponentInstance, ref} from 'vue'
// import {FormulaEditor} from '../lib/formula-editor.js'
// import {ZfButton} from '../lib/formula-editor.js'
const formulaRef = ref<ComponentInstance<typeof FormulaEditor> | null>(null)

const getLatex = () => {
  console.log('formulaRef', formulaRef.value?.latexText())
}

const latexExport = ()=>{
  formulaRef.value?.exportSvg()
}

const latexSvg = ()=>{
  console.log(formulaRef.value?.svgHtml())
}
const svgToImage = ()=>{
  formulaRef.value?.svgToImage()
}
</script>

<template>
  <div>
    <FormulaEditor ref="formulaRef"/>
    <button @click="getLatex">latex text</button>
    <button @click="latexExport">latex export</button>
    <button @click="latexSvg">latex svg</button>
    <button @click="svgToImage">latex svgToImage</button>
  </div>
</template>

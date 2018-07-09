<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Container } from './Container';
export default class ContainerCanvas extends Vue {
  el: string = '#renderCanvas'
  name: string = 'ContainerCanvas'
}
</script>

<style>
</style>

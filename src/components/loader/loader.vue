<template>
  <div class="loading" v-if="loading">
    <div class="dot-pulse"></div>
  </div>
  <slot v-else></slot>
</template>
<script lang="ts" src="./loader.ts"></script>
<template>
    <div class="johndeere">
    <div class="document" v-for="document in documents" :key="document.id">
      <ul>
        <li><input type="checkbox" @click="registerDocument(document)" /></li>
        <li v-for="(v, k) in document" :key="k">
          <span>{{ k }} : </span>
          <span>{{ v }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" src="./documentsSelection.ts"></script>
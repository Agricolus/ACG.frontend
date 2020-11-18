<template>
  <div>
    <div v-for="machine in machines" :key="machine.id">
      <a @click="showOnMap(machine)">
        {{ machine }}
      </a>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
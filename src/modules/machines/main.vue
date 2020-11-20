<template>
  <div>
    <div v-for="machine in machines" :key="machine.id">
      <a @click="centerOnMap(machine)">
        {{ machine }}
      </a>
    </div>
    <div class="bottom">
      <button>ADD MACHINE</button>
      <button @click="startImport">IMPORT MACHINE FROM PRODUCER</button>
    </div>
  </div>
</template>
<script lang="ts" src="./main.ts"></script>
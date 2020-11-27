<template>
  <div>
    <div v-for="machine in machines" :key="machine.id">
      <ul>
        <li>
          <button @click="centerOnMap(machine)">
            <i class="fas fa-crosshairs"></i>
          </button>
        </li>
        <li v-for="(v, k) in machine" :key="k">
          <span>{{ k }} : </span>
          <span>{{ v }}</span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <button>ADD MACHINE</button>
      <button @click="startImport">IMPORT MACHINE FROM PRODUCER</button>
    </div>
  </div>
</template>
<script lang="ts" src="./main.ts"></script>
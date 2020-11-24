<template>
  <div class="johndeere">
    <div class="machine" v-for="machine in machines" :key="machine.id">
      <ul>
          <li v-for="(v, k) in machine" :key="k">
              <span>{{ k }}:</span>
              <span>{{ v }}</span>
          </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" src="./machinesSelection.ts">
</script>